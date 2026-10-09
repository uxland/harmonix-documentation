---
sidebar_position: 2
sidebar_label: Core
---

# `@uxland/harmonix`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix)

The core of Harmonix. It defines the contract between a shell and its plugins (`Plugin`, `HarmonixApi` and the related types), loads the plugins (`bootstrapPlugins`) and provides the region manager that shells use to create regions and register views. It does not render anything and has no shell of its own: each application builds one on top of it. Plugins usually only import its types.

## Install

```bash
npm install @uxland/harmonix @uxland/regions lit
```

`@uxland/regions` (^1.0.0) is a dependency of the core. A shell also imports it directly, for the `@region` decorator and the region adapters. `createRegionHost` returns a mixin for Lit elements, so a shell built with it needs `lit`.

## Main exports

### Loading plugins

| Export | Description |
| --- | --- |
| `bootstrapPlugins(plugins, apiFactory)` | Imports and initializes the plugins in parallel. Calls `apiFactory` once per plugin and then `plugin.initialize(api)`. Returns one `BootstrappedPlugin` per plugin. A plugin that fails is logged to the console and does not stop the others. Throws if the list is empty. |
| `PluginDefinition` | `{ pluginId, importer }`. `importer()` returns a promise of the plugin module. |
| `Plugin<TApi>` | What a plugin module exports: `initialize(api)` and `dispose(api)`, both async. |
| `BootstrappedPlugin<TApi>` | `{ dispose(), importedPlugin, apiInstance }`. |
| `ApiFactory<TApi>` | `(info: PluginInfo) => TApi`: builds the API for one plugin. |

```typescript
import { bootstrapPlugins, type ApiFactory, type HarmonixApi } from "@uxland/harmonix";

const apiFactory: ApiFactory<HarmonixApi> = (pluginInfo) => ({
  pluginInfo,
  regionManager: createRegionManagerProxy(pluginInfo), // your shell's implementation
  createLocaleManager, // your shell's implementation
});

const plugins = await bootstrapPlugins(
  [{ pluginId: "my-plugin", importer: () => import("https://example.com/plugins/my-plugin.js") }],
  apiFactory,
);
```

### Regions

| Export | Description |
| --- | --- |
| `createRegionManager(name)` | Creates the shell's region manager (a `RegionManager`). |
| `createRegionHost(regionManager)` | Returns the Lit mixin that elements declaring regions with `@region` must extend. |
| `RegionManager` / `IRegionManager` | `add`, `getRegion`, `remove`, `registerViewWithRegion`, `unregisterViewFromRegion`, `getRegisteredViews`, `clear`, `destroy` and `createRegionManager`. |

### API types

| Export | Description |
| --- | --- |
| `HarmonixApi` | The minimum API a plugin receives: `pluginInfo`, `regionManager` and `createLocaleManager(messages)`. Shells extend it. |
| `HarmonixRegionManager` | The region manager as plugins see it: `registerView`, `removeView`, `activateView`, `deactivateView`, `getRegion`, `isViewActive`, `containsView`. |
| `HarmonixViewDefinition` | `{ id, factory, sortHint?, isDefault?, removeFromDomWhenDeactivated? }`. `factory` returns a promise of an `HTMLElement`. |
| `HarmonixLocaleApi`, `LocalizationMessages`, `Translations` | Translations for a plugin: `translate(path, variables?)`, `getCurrentLanguage()`, `getTranslations()`. |
| `HarmonixBroker`, `BrokerDisposableHandler`, `IEvent`, `IRequest` | The broker interface: `send`, `registerRequest`, `publish`, `subscribe`. The core only defines it; each shell implements it. |
| `PluginInfo` | `{ pluginId }`. |

The full reference is in [API reference](../api/Api.md), [Regions and views](../api/gestio-regions-i-vistes.md) and [Broker](../api/broker.md).

## Versions

The [demo shell](./demo-shell.md) depends on `^1.1.6`.

## Links

- [npm](https://www.npmjs.com/package/@uxland/harmonix)
- [Source on GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/core)
- [Building a shell](../api/building-a-shell.md): a step-by-step shell built on the core.
