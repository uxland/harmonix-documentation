---
sidebar_position: 3
sidebar_label: Demo shell
---

# `@uxland/harmonix-demo-shell`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix-demo-shell?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix-demo-shell)

A minimal, framework-agnostic Harmonix shell to develop and try plugins. It has a header, a side menu and a content area, each one a region, and nothing else: no business logic and no views of its own. Projects made with the [plugin creator](./create-harmonix-plugin.md) start their plugin inside it with `npm run dev`. It is meant for development; production applications build their own shell.

## Install

```bash
npm install @uxland/harmonix-demo-shell
```

The creator already adds it. `lit`, `@uxland/regions` and `@uxland/harmonix` are dependencies, not bundled, so your project and its plugins share a single copy.

## Usage

```typescript title="src/sandbox.ts"
import { bootstrapPlugins, initializeShell } from "@uxland/harmonix-demo-shell";

initializeShell(document.body, { title: "My app" });
await bootstrapPlugins([{ pluginId: "my-plugin", importer: () => import("./plugin") }]);
```

```typescript title="src/plugin.ts"
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({ id: "main", factory: async () => document.createElement("my-view") });
  await api.regionManager.registerNavigationItem({ id: "menu", label: "My plugin", mainViewId: "main" });
};

export const dispose = async (api: DemoShellApi) => {
  await api.regionManager.removeView(api.regionManager.regions.sideMenu, "menu");
  await api.regionManager.removeView(api.regionManager.regions.main, "main");
};
```

## Main exports

| Export | Description |
| --- | --- |
| `initializeShell(host?, { title? })` | Renders the shell in `host` (default `document.body`). It fills the whole window. Throws if called twice. |
| `bootstrapPlugins(plugins)` | Waits for the regions, loads the plugins with their API and, if no plugin activated a view in `main`, activates the first one registered. Call it after `initializeShell`. |
| `regions` | The region names: `header`, `side-menu` and `main`. |
| `DemoShellApi` | The API each plugin receives: `regionManager`, `broker`, `createLocaleManager` and `pluginInfo`. |
| `DemoShellRegionManager` | The `HarmonixRegionManager` methods plus `regions`, `registerMainView`, `activateMainView` and `registerNavigationItem({ id, label, icon?, mainViewId })`. |
| `DemoShellPlugin` | `Plugin<DemoShellApi>`. |
| `HarmonixDemoShell`, `HarmonixNavItem` | The custom element classes (`harmonix-demo-shell`, `harmonix-nav-item`). |

It also re-exports these types from the core: `BrokerDisposableHandler`, `HarmonixBroker`, `HarmonixLocaleApi`, `HarmonixViewDefinition`, `LocalizationMessages`, `PluginDefinition` and `PluginInfo`.

Views are stored as `pluginId::viewId`, so two plugins can use the same view id. The theme is a set of CSS custom properties (`--hx-primary`, `--hx-header-background`, `--hx-font`…) that you can override on `harmonix-demo-shell` or use in your views.

The regions, the API, the broker, translations and the theme are described in [The demo shell](../create-plugin/demo-shell.md).

## Versions

It depends on `@uxland/harmonix` `^1.1.6`, `@uxland/regions` `^1.0.0` and `lit` `^3.2.1`. It is published as an ES module only.

## Links

- [npm](https://www.npmjs.com/package/@uxland/harmonix-demo-shell)
- [Source on GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/demo-shell)
- [The demo shell](../create-plugin/demo-shell.md)
- [Building a shell](../api/building-a-shell.md): how to write your own shell, using the demo shell as a model.
