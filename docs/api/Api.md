---
sidebar_position: 1
---

# API reference

This page describes the contract between a plugin and the shell, and the types exported by the Harmonix core, `@uxland/harmonix`.

## The plugin contract

A plugin is an ES module that implements `Plugin<TApi>`:

```typescript
export interface Plugin<TApi extends HarmonixApi> {
  initialize(api: TApi): Promise<void>;
  dispose(api: TApi): Promise<void>;
}
```

- `initialize(api)` starts the plugin: it registers views, subscribes to events and loads what it needs. If it throws, the plugin is not loaded, and the other plugins are not affected.
- `dispose(api)` stops the plugin. It is required, and must undo everything `initialize` did.

`TApi` is the API of the shell where the plugin runs. For the demo shell it is `DemoShellApi`, and the package also exports `DemoShellPlugin` as a shortcut for `Plugin<DemoShellApi>`:

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  const locale = await api.createLocaleManager({ en: { title: "Orders" } });
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => Object.assign(document.createElement("h1"), { textContent: locale.translate("title") }),
  });
};

export const dispose = async (api: DemoShellApi) => {
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## `HarmonixApi`

Every shell gives its plugins an API that extends `HarmonixApi`:

```typescript
export interface HarmonixApi {
  regionManager: HarmonixRegionManager;
  pluginInfo: PluginInfo;
  createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```

Each plugin receives its own instance, created by the shell for that plugin.

### `pluginInfo`

```typescript
export interface PluginInfo {
  pluginId: string;
}
```

The id the shell gave to the plugin when loading it.

### `regionManager`

Registers, activates and removes the plugin's views in the shell regions. See [Regions and views](./gestio-regions-i-vistes.md).

### `createLocaleManager`

Creates a translator for the plugin's own messages. It receives the messages by language and returns a `HarmonixLocaleApi`:

```typescript
export interface LocalizationMessages {
  [lang: string]: Translations;
}

export interface Translations {
  [tag: string]: string | Record<string, string> | Translations;
}

export interface HarmonixLocaleApi {
  getCurrentLanguage(): string;
  translate<T = Record<string, string>>(path: string, variables?: T): string;
  getTranslations(): LocalizationMessages;
}
```

| Method | What it does |
| --- | --- |
| `getCurrentLanguage()` | The current language of the application |
| `translate(path, variables?)` | The text for `path` in the current language. Placeholders like `{{name}}` are replaced with `variables.name` |
| `getTranslations()` | The messages given to `createLocaleManager` |

```typescript
const locale = await api.createLocaleManager({
  en: { orders: { title: "Orders", count: "{{count}} open orders" } },
  es: { orders: { title: "Pedidos", count: "{{count}} pedidos abiertos" } },
});

locale.translate("orders.count", { count: "3" }); // "3 open orders" in English
```

The core only defines this interface; the shell implements it. In the demo shell, the current language is the page's `<html lang>` (or the browser's), paths are dot-separated, and a missing key falls back to the first language given and then to the path itself.

## Extending the API

Each application has its own needs: an HTTP client, authentication, notifications, a global state… The shell declares its own API that extends `HarmonixApi` and adds those services.

The [demo shell](../create-plugin/demo-shell.md), for example, adds:

- `broker`, to exchange messages between plugins (see [Broker](./broker.md)).
- `regionManager.regions`, the names of its regions (`header`, `side-menu`, `main`).
- `regionManager.registerMainView`, `regionManager.activateMainView` and `regionManager.registerNavigationItem`, shortcuts for its regions.

```typescript
export interface DemoShellApi extends HarmonixApi {
  regionManager: DemoShellRegionManager;
  broker: HarmonixBroker;
}
```

## Broker

`HarmonixBroker` is the interface for messages between plugins: events with `publish`/`subscribe` and requests with `registerRequest`/`send`. The core defines it and each shell implements and exposes it. See [Broker](./broker.md).

## Shell-side API

These exports are used by the shell, not by plugins. See [Building a shell](./building-a-shell.md).

| Export | What it is |
| --- | --- |
| `PluginDefinition` | `{ pluginId, importer }`: how the shell loads a plugin. `importer()` returns a promise of the plugin module |
| `ApiFactory<TApi>` | `(info: PluginInfo) => TApi`: creates the API instance for each plugin |
| `bootstrapPlugins(plugins, apiFactory)` | Loads and initializes the plugins in parallel and returns a `BootstrappedPlugin` for each one |
| `BootstrappedPlugin<TApi>` | `{ dispose(), importedPlugin, apiInstance }`. `dispose()` calls the plugin's `dispose` with its API |
| `createRegionManager(name)` | Creates the shell's region manager |
| `createRegionHost(regionManager)` | Creates the Lit mixin for elements that declare regions |
