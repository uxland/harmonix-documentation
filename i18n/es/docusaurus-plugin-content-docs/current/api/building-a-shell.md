---
sidebar_position: 4
---

# Construir un shell

El shell es la aplicación principal. Pinta el layout, crea las regiones, construye la API que recibe cada plugin y carga los plugins.

Esta página construye un shell pequeño paso a paso. Es una versión simplificada del [shell de demostración](../create-plugin/demo-shell.md), cuyo código completo está en [GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/demo-shell/src).

El shell necesita estos paquetes:

```bash
npm install @uxland/harmonix @uxland/regions lit
```

`@uxland/harmonix` proporciona `createRegionManager`, `createRegionHost`, `bootstrapPlugins` y los tipos de la API. `@uxland/regions` proporciona el decorador `@region` y los adaptadores de región.

## 1. Gestor de regiones y host de regiones

`createRegionManager(name)` crea el objeto que lleva el control de las regiones y las vistas. `createRegionHost(regionManager)` devuelve un mixin de Lit. Todo elemento que declare regiones debe extenderlo.

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

## 2. El elemento del shell y sus regiones

El shell es un elemento Lit que extiende `RegionHost(LitElement)`. Cada región es una propiedad con el decorador `@region`:

- `name` es el nombre de la región que usan los plugins.
- `targetId` es el `id` del elemento de `render()` que contendrá las vistas.
- `adapterFactory` define el comportamiento: `singleActiveAdapterFactory` muestra una vista a la vez; `multipleActiveAdapterFaactory` las muestra todas. (La doble "aa" es el nombre real de la exportación en `@uxland/regions`.)

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

`@region` es un decorador legacy de TypeScript: activa `experimentalDecorators` en `tsconfig.json`.

Las regiones se crean después de que el elemento se pinte por primera vez. Los plugins no deben arrancar antes.

## 3. La API del shell

Define la API que reciben los plugins. Extiende `HarmonixApi` con los servicios de tu shell. Después escribe un `ApiFactory`, que crea una instancia de la API por plugin. En `api.ts`, después del gestor de regiones:

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

Los plugins comparten el gestor de regiones y el broker, pero cada uno recibe su propio objeto de API, con su propio `pluginInfo`.

El núcleo solo define las interfaces. El shell las implementa:

- **Gestor de regiones.** `HarmonixRegionManager` se traduce al gestor de regiones del núcleo. La versión del shell de demostración, además, guarda cada vista como `pluginId::viewId`, para que dos plugins puedan usar el mismo id de vista:

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

- **Broker.** Implementa `HarmonixBroker` (consulta [Broker](./broker.md)). El [broker en memoria](https://github.com/uxland/harmonix/blob/main/harmonix/demo-shell/src/broker.ts) del shell de demostración tiene unas 60 líneas.
- **Traducciones.** Implementa `createLocaleManager`, que devuelve un `HarmonixLocaleApi`. Consulta el [locale.ts](https://github.com/uxland/harmonix/blob/main/harmonix/demo-shell/src/locale.ts) del shell de demostración.

Añade todo lo demás que necesiten tus plugins: un cliente HTTP, autenticación, notificaciones, atajos para tus regiones…

## 4. Cargar los plugins

Cada plugin se describe con un `PluginDefinition`: su id y un `importer` que devuelve el módulo del plugin. `bootstrapPlugins(plugins, apiFactory)` los carga y los inicializa:

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

- Llama a todos los `importer()` e `initialize(api)` en paralelo (`Promise.allSettled`).
- Crea la API de cada plugin con `apiFactory({ pluginId, importer })`.
- Registra en la consola el plugin que no se puede cargar o inicializar y se lo salta. Los demás plugins se cargan igualmente.
- Devuelve un `BootstrappedPlugin` para cada definición, con `dispose()`, `importedPlugin` y `apiInstance`. La entrada de un plugin que ha fallado es `undefined`.
- Lanza un error si la lista de plugins está vacía.

En producción, el shell suele construir la lista de plugins a partir del servicio de descubrimiento del Plugin Store.

Los plugins comparten con el shell librerías como el framework. Los plugins se construyen con esas librerías como externas, y la aplicación debe ponerlas a su disposición, por ejemplo con un import map.

## 5. Descargar los plugins

Para descargar los plugins, por ejemplo cuando cambia el usuario o el contexto, llama a `dispose()` en cada uno. Este llama al `dispose(api)` del plugin con la misma instancia de la API que recibió en `initialize`:

```typescript
await Promise.all(bootstrapped.filter(Boolean).map((plugin) => plugin.dispose()));
```
