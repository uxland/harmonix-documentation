---
sidebar_position: 1
---

# Referencia de la API

Esta página describe el contrato entre un plugin y el shell, y los tipos que exporta el núcleo de Harmonix, `@uxland/harmonix`.

## El contrato del plugin

Un plugin es un módulo ES que implementa `Plugin<TApi>`:

```typescript
export interface Plugin<TApi extends HarmonixApi> {
  initialize(api: TApi): Promise<void>;
  dispose(api: TApi): Promise<void>;
}
```

- `initialize(api)` arranca el plugin: registra vistas, se suscribe a eventos y carga lo que necesita. Si lanza un error, el plugin no se carga, y los demás plugins no se ven afectados.
- `dispose(api)` detiene el plugin. Es obligatorio, y debe deshacer todo lo que ha hecho `initialize`.

`TApi` es la API del shell donde se ejecuta el plugin. Para el shell de demostración es `DemoShellApi`, y el paquete también exporta `DemoShellPlugin` como atajo de `Plugin<DemoShellApi>`:

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

Cada shell da a sus plugins una API que extiende `HarmonixApi`:

```typescript
export interface HarmonixApi {
  regionManager: HarmonixRegionManager;
  pluginInfo: PluginInfo;
  createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```

Cada plugin recibe su propia instancia, que el shell crea para ese plugin.

### `pluginInfo`

```typescript
export interface PluginInfo {
  pluginId: string;
}
```

El id que el shell ha dado al plugin al cargarlo.

### `regionManager`

Registra, activa y elimina las vistas del plugin en las regiones del shell. Consulta [Regiones y vistas](./gestio-regions-i-vistes.md).

### `createLocaleManager`

Crea un traductor para los mensajes propios del plugin. Recibe los mensajes por idioma y devuelve un `HarmonixLocaleApi`:

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

| Método | Qué hace |
| --- | --- |
| `getCurrentLanguage()` | El idioma actual de la aplicación |
| `translate(path, variables?)` | El texto de `path` en el idioma actual. Los marcadores como `{{name}}` se sustituyen por `variables.name` |
| `getTranslations()` | Los mensajes que se han pasado a `createLocaleManager` |

```typescript
const locale = await api.createLocaleManager({
  en: { orders: { title: "Orders", count: "{{count}} open orders" } },
  es: { orders: { title: "Pedidos", count: "{{count}} pedidos abiertos" } },
});

locale.translate("orders.count", { count: "3" }); // "3 open orders" in English
```

El núcleo solo define esta interfaz; el shell la implementa. En el shell de demostración, el idioma actual es el `<html lang>` de la página (o el del navegador), las rutas se separan con puntos y, si falta una clave, se usa el primer idioma que se ha pasado y, si tampoco está, la propia ruta.

## Extender la API

Cada aplicación tiene sus propias necesidades: un cliente HTTP, autenticación, notificaciones, un estado global… El shell declara su propia API, que extiende `HarmonixApi` y añade esos servicios.

El [shell de demostración](../create-plugin/demo-shell.md), por ejemplo, añade:

- `broker`, para intercambiar mensajes entre plugins (consulta [Broker](./broker.md)).
- `regionManager.regions`, los nombres de sus regiones (`header`, `side-menu`, `main`).
- `regionManager.registerMainView`, `regionManager.activateMainView` y `regionManager.registerNavigationItem`, atajos para sus regiones.

```typescript
export interface DemoShellApi extends HarmonixApi {
  regionManager: DemoShellRegionManager;
  broker: HarmonixBroker;
}
```

## Broker

`HarmonixBroker` es la interfaz para los mensajes entre plugins: eventos con `publish`/`subscribe` y peticiones con `registerRequest`/`send`. El núcleo la define y cada shell la implementa y la expone. Consulta [Broker](./broker.md).

## API del lado del shell

Estas exportaciones las usa el shell, no los plugins. Consulta [Construir un shell](./building-a-shell.md).

| Exportación | Qué es |
| --- | --- |
| `PluginDefinition` | `{ pluginId, importer }`: cómo carga el shell un plugin. `importer()` devuelve una promesa del módulo del plugin |
| `ApiFactory<TApi>` | `(info: PluginInfo) => TApi`: crea la instancia de la API de cada plugin |
| `bootstrapPlugins(plugins, apiFactory)` | Carga e inicializa los plugins en paralelo y devuelve un `BootstrappedPlugin` para cada uno |
| `BootstrappedPlugin<TApi>` | `{ dispose(), importedPlugin, apiInstance }`. `dispose()` llama al `dispose` del plugin con su API |
| `createRegionManager(name)` | Crea el gestor de regiones del shell |
| `createRegionHost(regionManager)` | Crea el mixin de Lit para los elementos que declaran regiones |
