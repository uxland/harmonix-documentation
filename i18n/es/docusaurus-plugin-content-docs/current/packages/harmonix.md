---
sidebar_position: 2
sidebar_label: Núcleo
---

# `@uxland/harmonix`

El núcleo de Harmonix. Define el contrato entre un shell y sus plugins (`Plugin`, `HarmonixApi` y los tipos relacionados), carga los plugins (`bootstrapPlugins`) y proporciona el gestor de regiones que los shells usan para crear regiones y registrar vistas. No pinta nada ni tiene shell propio: cada aplicación construye uno encima. Normalmente los plugins solo importan sus tipos.

## Instalación

```bash
npm install @uxland/harmonix @uxland/regions lit
```

`@uxland/regions` (^1.0.0) es una dependencia del núcleo. Un shell también lo importa directamente, para el decorador `@region` y los adaptadores de región. `createRegionHost` devuelve un mixin para elementos Lit, así que un shell construido con él necesita `lit`.

## Exportaciones principales

### Carga de plugins

| Exportación | Descripción |
| --- | --- |
| `bootstrapPlugins(plugins, apiFactory)` | Importa e inicializa los plugins en paralelo. Llama a `apiFactory` una vez por plugin y después a `plugin.initialize(api)`. Devuelve un `BootstrappedPlugin` por plugin. Un plugin que falla se registra en la consola y no detiene a los demás. Lanza un error si la lista está vacía. |
| `PluginDefinition` | `{ pluginId, importer }`. `importer()` devuelve una promesa del módulo del plugin. |
| `Plugin<TApi>` | Lo que exporta un módulo de plugin: `initialize(api)` y `dispose(api)`, ambas asíncronas. |
| `BootstrappedPlugin<TApi>` | `{ dispose(), importedPlugin, apiInstance }`. |
| `ApiFactory<TApi>` | `(info: PluginInfo) => TApi`: construye la API de un plugin. |

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

### Regiones

| Exportación | Descripción |
| --- | --- |
| `createRegionManager(name)` | Crea el gestor de regiones del shell (un `RegionManager`). |
| `createRegionHost(regionManager)` | Devuelve el mixin de Lit que deben extender los elementos que declaran regiones con `@region`. |
| `RegionManager` / `IRegionManager` | `add`, `getRegion`, `remove`, `registerViewWithRegion`, `unregisterViewFromRegion`, `getRegisteredViews`, `clear`, `destroy` y `createRegionManager`. |

### Tipos de la API

| Exportación | Descripción |
| --- | --- |
| `HarmonixApi` | La API mínima que recibe un plugin: `pluginInfo`, `regionManager` y `createLocaleManager(messages)`. Los shells la extienden. |
| `HarmonixRegionManager` | El gestor de regiones tal como lo ven los plugins: `registerView`, `removeView`, `activateView`, `deactivateView`, `getRegion`, `isViewActive`, `containsView`. |
| `HarmonixViewDefinition` | `{ id, factory, sortHint?, isDefault?, removeFromDomWhenDeactivated? }`. `factory` devuelve una promesa de un `HTMLElement`. |
| `HarmonixLocaleApi`, `LocalizationMessages`, `Translations` | Traducciones de un plugin: `translate(path, variables?)`, `getCurrentLanguage()`, `getTranslations()`. |
| `HarmonixBroker`, `BrokerDisposableHandler`, `IEvent`, `IRequest` | La interfaz del broker: `send`, `registerRequest`, `publish`, `subscribe`. El núcleo solo la define; cada shell la implementa. |
| `PluginInfo` | `{ pluginId }`. |

La referencia completa está en [Referencia de la API](../api/Api.md), [Regiones y vistas](../api/gestio-regions-i-vistes.md) y [Broker](../api/broker.md).

## Versiones

La versión actual es la 1.1.6. El [shell de demostración](./demo-shell.md) depende de `^1.1.6`.

## Enlaces

- [npm](https://www.npmjs.com/package/@uxland/harmonix)
- [Código fuente en GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/core)
- [Construir un shell](../api/building-a-shell.md): un shell construido paso a paso sobre el núcleo.
