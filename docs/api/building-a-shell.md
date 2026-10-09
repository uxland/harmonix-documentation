---
sidebar_position: 4
---

# Building a shell

The shell is the main application. It renders the layout, creates the regions, builds the API that each plugin receives and loads the plugins.

This page builds a small shell step by step. It is a simplified version of the [demo shell](../create-plugin/demo-shell.md), whose full source is on [GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/demo-shell/src).

The shell needs these packages:

```bash
npm install @uxland/harmonix @uxland/regions lit
```

`@uxland/harmonix` provides `createRegionManager`, `createRegionHost`, `bootstrapPlugins` and the API types. `@uxland/regions` provides the `@region` decorator and the region adapters.

## 1. Region manager and region host

`createRegionManager(name)` creates the object that keeps track of regions and views. `createRegionHost(regionManager)` returns a Lit mixin. Any element that declares regions must extend it.

```typescript title="api.ts"
import { createRegionHost, createRegionManager } from "@uxland/harmonix";

export const regionManager = createRegionManager("my-shell");

// @uxland/regions does not export the mixin's type, so type it as a class mixin.
export const RegionHost = createRegionHost(regionManager as any) as unknown as <
  T extends abstract new (...args: any[]) => HTMLElement,
>(
  base: T,
) => T;
```

## 2. The shell element and its regions

The shell is a Lit element that extends `RegionHost(LitElement)`. Each region is a property with the `@region` decorator:

- `name` is the region name that plugins use.
- `targetId` is the `id` of the element in `render()` that will contain the views.
- `adapterFactory` sets the behavior: `singleActiveAdapterFactory` shows one view at a time; `multipleActiveAdapterFaactory` shows all of them. (The double "aa" is the real name of the export in `@uxland/regions`.)

```typescript title="shell.ts"
import { type IRegion, multipleActiveAdapterFaactory, region, singleActiveAdapterFactory } from "@uxland/regions";
import { LitElement, html } from "lit";
import { RegionHost } from "./api";

export const regions = { header: "header", main: "main" } as const;

export class MyShell extends RegionHost(LitElement) {
  @region({ targetId: "header-region", name: regions.header, adapterFactory: multipleActiveAdapterFaactory })
  headerRegion: IRegion | undefined;

  @region({ targetId: "main-region", name: regions.main, adapterFactory: singleActiveAdapterFactory })
  mainRegion: IRegion | undefined;

  render() {
    return html`
      <header><div id="header-region"></div></header>
      <main><div id="main-region"></div></main>
    `;
  }
}
```

`@region` is a legacy TypeScript decorator: enable `experimentalDecorators` in `tsconfig.json`.

The regions are created after the element renders for the first time. Plugins must not start before that.

## 3. The shell API

Define the API that plugins receive. It extends `HarmonixApi` with the services of your shell. Then write an `ApiFactory`, which creates one API instance per plugin. In `api.ts`, after the region manager:

```typescript title="api.ts"
import type { ApiFactory, HarmonixApi, HarmonixBroker, PluginInfo } from "@uxland/harmonix";
import { createBroker } from "./broker";
import { createLocaleManager } from "./locale";
import { createRegionManagerProxy } from "./region-manager";

export interface MyShellApi extends HarmonixApi {
  broker: HarmonixBroker;
}

const broker = createBroker();

export const apiFactory: ApiFactory<MyShellApi> = (pluginInfo: PluginInfo) => ({
  pluginInfo,
  regionManager: createRegionManagerProxy(pluginInfo, regionManager),
  broker,
  createLocaleManager,
});
```

The plugins share the region manager and the broker, but each one gets its own API object, with its own `pluginInfo`.

The core only defines the interfaces. The shell implements them:

- **Region manager.** `HarmonixRegionManager` maps to the core region manager. The demo shell's version also stores every view as `pluginId::viewId`, so two plugins can use the same view id:

  ```typescript title="region-manager.ts"
  import type { HarmonixRegionManager, IRegionManager, PluginInfo } from "@uxland/harmonix";

  export const createRegionManagerProxy = (pluginInfo: PluginInfo, manager: IRegionManager): HarmonixRegionManager => {
    const keyOf = (viewId: string) => `${pluginInfo.pluginId}::${viewId}`;
    const region = (name: string) => {
      const found = manager.getRegion(name);
      if (!found) throw new Error(`Region "${name}" not found`);
      return found;
    };
    return {
      registerView: async (name, view) => void (await manager.registerViewWithRegion(name, keyOf(view.id), view)),
      removeView: async (name, viewId) => void (await manager.unregisterViewFromRegion(name, keyOf(viewId))),
      activateView: async (name, viewId) => void (await region(name).activate(keyOf(viewId))),
      deactivateView: (name, viewId) => region(name).deactivate(keyOf(viewId)),
      getRegion: async (name) => region(name),
      isViewActive: async (name, viewId) => region(name).isViewActive(keyOf(viewId)),
      containsView: async (name, viewId) => region(name).containsView(keyOf(viewId)),
    };
  };
  ```

- **Broker.** Implement `HarmonixBroker` (see [Broker](./broker.md)). The demo shell's [in-memory broker](https://github.com/uxland/harmonix/blob/main/harmonix/demo-shell/src/broker.ts) is about 60 lines.
- **Translations.** Implement `createLocaleManager`, which returns a `HarmonixLocaleApi`. See the demo shell's [locale.ts](https://github.com/uxland/harmonix/blob/main/harmonix/demo-shell/src/locale.ts).

Add anything else your plugins need: an HTTP client, authentication, notifications, shortcuts for your regions…

## 4. Loading the plugins

Each plugin is described by a `PluginDefinition`: its id and an `importer` that returns the plugin module. `bootstrapPlugins(plugins, apiFactory)` loads and initializes them:

```typescript title="index.ts"
import { type PluginDefinition, bootstrapPlugins } from "@uxland/harmonix";
import { apiFactory, regionManager } from "./api";
import { MyShell, regions } from "./shell";

customElements.define("my-shell", MyShell);
document.body.append(document.createElement("my-shell"));

// Wait until the shell has rendered and its regions exist.
while (!Object.values(regions).every((name) => regionManager.getRegion(name))) {
  await new Promise((resolve) => setTimeout(resolve, 10));
}

const plugins: PluginDefinition[] = [
  // From a URL, for example one returned by a Plugin Store
  { pluginId: "orders", importer: () => import(/* @vite-ignore */ "https://plugins.example.com/orders/1.2.0/index.js") },
  // From a local module
  { pluginId: "user", importer: () => import("./plugins/user") },
];

const bootstrapped = await bootstrapPlugins(plugins, apiFactory);
```

`bootstrapPlugins`:

- Calls every `importer()` and `initialize(api)` in parallel (`Promise.allSettled`).
- Creates each plugin's API with `apiFactory({ pluginId, importer })`.
- Logs a plugin that fails to load or initialize and skips it. The other plugins still load.
- Returns a `BootstrappedPlugin` for each definition, with `dispose()`, `importedPlugin` and `apiInstance`. The entry of a plugin that failed is `undefined`.
- Throws if the list of plugins is empty.

In production, the shell usually builds the list of plugins from the Plugin Store's discovery service.

The plugins share libraries such as the framework with the shell. Plugins are built with those libraries as externals, and the application must make them available, for example with an import map.

## 5. Unloading the plugins

To unload the plugins, for example when the user or context changes, call `dispose()` on each one. It calls the plugin's `dispose(api)` with the same API instance it got in `initialize`:

```typescript
await Promise.all(bootstrapped.filter(Boolean).map((plugin) => plugin.dispose()));
```
