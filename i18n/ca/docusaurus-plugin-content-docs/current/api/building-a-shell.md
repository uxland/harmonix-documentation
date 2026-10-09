---
sidebar_position: 4
---

# Construir un shell

El shell és l'aplicació principal. Pinta la disposició de la pàgina, crea les regions, construeix l'API que rep cada plugin i carrega els plugins.

Aquesta pàgina construeix pas a pas un shell petit. És una versió simplificada del [shell de demostració](../create-plugin/demo-shell.md), el codi complet del qual és a [GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/demo-shell/src).

El shell necessita aquests paquets:

```bash
npm install @uxland/harmonix @uxland/regions lit
```

`@uxland/harmonix` proporciona `createRegionManager`, `createRegionHost`, `bootstrapPlugins` i els tipus de l'API. `@uxland/regions` proporciona el decorador `@region` i els adaptadors de regió.

## 1. Gestor de regions i amfitrió de regions

`createRegionManager(name)` crea l'objecte que fa el seguiment de les regions i les vistes. `createRegionHost(regionManager)` retorna un mixin de Lit. Qualsevol element que declari regions l'ha d'estendre.

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

## 2. L'element del shell i les seves regions

El shell és un element de Lit que estén `RegionHost(LitElement)`. Cada regió és una propietat amb el decorador `@region`:

- `name` és el nom de la regió que fan servir els plugins.
- `targetId` és l'`id` de l'element de `render()` que contindrà les vistes.
- `adapterFactory` en defineix el comportament: `singleActiveAdapterFactory` mostra una sola vista alhora; `multipleActiveAdapterFaactory` les mostra totes. (La doble «aa» és el nom real de l'exportació a `@uxland/regions`.)

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

`@region` és un decorador antic de TypeScript: activa `experimentalDecorators` a `tsconfig.json`.

Les regions es creen després que l'element es pinti per primera vegada. Els plugins no s'han d'iniciar abans.

## 3. L'API del shell

Defineix l'API que reben els plugins. Amplia `HarmonixApi` amb els serveis del teu shell. Després escriu una `ApiFactory`, que crea una instància de l'API per a cada plugin. A `api.ts`, després del gestor de regions:

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

Els plugins comparteixen el gestor de regions i el broker, però cadascun rep el seu propi objecte d'API, amb el seu `pluginInfo`.

El nucli només defineix les interfícies. El shell les implementa:

- **Gestor de regions.** `HarmonixRegionManager` es correspon amb el gestor de regions del nucli. La versió del shell de demostració, a més, desa cada vista com a `pluginId::viewId`, de manera que dos plugins poden fer servir el mateix id de vista:

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

- **Broker.** Implementa `HarmonixBroker` (consulta [Broker](./broker.md)). El [broker en memòria](https://github.com/uxland/harmonix/blob/main/harmonix/demo-shell/src/broker.ts) del shell de demostració té unes 60 línies.
- **Traduccions.** Implementa `createLocaleManager`, que retorna un `HarmonixLocaleApi`. Consulta el fitxer [locale.ts](https://github.com/uxland/harmonix/blob/main/harmonix/demo-shell/src/locale.ts) del shell de demostració.

Afegeix-hi qualsevol altra cosa que necessitin els teus plugins: un client HTTP, autenticació, notificacions, dreceres per a les teves regions…

## 4. Carregar els plugins

Cada plugin es descriu amb una `PluginDefinition`: el seu id i un `importer` que retorna el mòdul del plugin. `bootstrapPlugins(plugins, apiFactory)` els carrega i els inicia:

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

- Crida tots els `importer()` i `initialize(api)` en paral·lel (`Promise.allSettled`).
- Crea l'API de cada plugin amb `apiFactory({ pluginId, importer })`.
- Si un plugin no es pot carregar o iniciar, registra l'error a la consola i el salta. Els altres plugins es carreguen igualment.
- Retorna un `BootstrappedPlugin` per a cada definició, amb `dispose()`, `importedPlugin` i `apiInstance`. L'entrada d'un plugin que ha fallat és `undefined`.
- Llança un error si la llista de plugins és buida.

En producció, normalment el shell construeix la llista de plugins a partir del servei de descobriment del Plugin Store.

Els plugins comparteixen amb el shell biblioteques com el framework. Els plugins es construeixen amb aquestes biblioteques com a externes, i l'aplicació les ha de posar a disposició, per exemple amb un import map.

## 5. Descarregar els plugins

Per descarregar els plugins, per exemple quan canvia l'usuari o el context, crida `dispose()` a cadascun. Aquesta funció crida el `dispose(api)` del plugin amb la mateixa instància de l'API que va rebre a `initialize`:

```typescript
await Promise.all(bootstrapped.filter(Boolean).map((plugin) => plugin.dispose()));
```
