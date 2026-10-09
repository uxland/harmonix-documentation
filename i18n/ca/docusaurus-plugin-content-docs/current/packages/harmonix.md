---
sidebar_position: 2
sidebar_label: Nucli
---

# `@uxland/harmonix`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix)

El nucli d'Harmonix. Defineix el contracte entre un shell i els seus plugins (`Plugin`, `HarmonixApi` i els tipus relacionats), carrega els plugins (`bootstrapPlugins`) i proporciona el gestor de regions que els shells fan servir per crear regions i registrar vistes. No renderitza res i no té cap shell propi: cada aplicació en construeix un a sobre. Normalment els plugins només n'importen els tipus.

## Instal·lació

```bash
npm install @uxland/harmonix @uxland/regions lit
```

`@uxland/regions` (^1.0.0) és una dependència del nucli. Un shell també l'importa directament, pel decorador `@region` i els adaptadors de regió. `createRegionHost` retorna un mixin per a elements de Lit, així que un shell construït amb aquesta funció necessita `lit`.

## Exportacions principals

### Càrrega de plugins

| Exportació | Descripció |
| --- | --- |
| `bootstrapPlugins(plugins, apiFactory)` | Importa i inicia els plugins en paral·lel. Crida `apiFactory` un cop per plugin i després `plugin.initialize(api)`. Retorna un `BootstrappedPlugin` per plugin. Un plugin que falla es registra a la consola i no atura els altres. Llança un error si la llista és buida. |
| `PluginDefinition` | `{ pluginId, importer }`. `importer()` retorna una promesa del mòdul del plugin. |
| `Plugin<TApi>` | El que exporta un mòdul de plugin: `initialize(api)` i `dispose(api)`, totes dues asíncrones. |
| `BootstrappedPlugin<TApi>` | `{ dispose(), importedPlugin, apiInstance }`. |
| `ApiFactory<TApi>` | `(info: PluginInfo) => TApi`: construeix l'API per a un plugin. |

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

| Exportació | Descripció |
| --- | --- |
| `createRegionManager(name)` | Crea el gestor de regions del shell (un `RegionManager`). |
| `createRegionHost(regionManager)` | Retorna el mixin de Lit que han d'estendre els elements que declaren regions amb `@region`. |
| `RegionManager` / `IRegionManager` | `add`, `getRegion`, `remove`, `registerViewWithRegion`, `unregisterViewFromRegion`, `getRegisteredViews`, `clear`, `destroy` i `createRegionManager`. |

### Tipus de l'API

| Exportació | Descripció |
| --- | --- |
| `HarmonixApi` | L'API mínima que rep un plugin: `pluginInfo`, `regionManager` i `createLocaleManager(messages)`. Els shells l'amplien. |
| `HarmonixRegionManager` | El gestor de regions tal com el veuen els plugins: `registerView`, `removeView`, `activateView`, `deactivateView`, `getRegion`, `isViewActive`, `containsView`. |
| `HarmonixViewDefinition` | `{ id, factory, sortHint?, isDefault?, removeFromDomWhenDeactivated? }`. `factory` retorna una promesa d'un `HTMLElement`. |
| `HarmonixLocaleApi`, `LocalizationMessages`, `Translations` | Traduccions d'un plugin: `translate(path, variables?)`, `getCurrentLanguage()`, `getTranslations()`. |
| `HarmonixBroker`, `BrokerDisposableHandler`, `IEvent`, `IRequest` | La interfície del broker: `send`, `registerRequest`, `publish`, `subscribe`. El nucli només la defineix; cada shell la implementa. |
| `PluginInfo` | `{ pluginId }`. |

La referència completa és a [Referència de l'API](../api/Api.md), [Regions i vistes](../api/gestio-regions-i-vistes.md) i [Broker](../api/broker.md).

## Versions

El [shell de demostració](./demo-shell.md) depèn de `^1.1.6`.

## Enllaços

- [npm](https://www.npmjs.com/package/@uxland/harmonix)
- [Codi font a GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/core)
- [Construir un shell](../api/building-a-shell.md): un shell construït pas a pas sobre el nucli.
