---
sidebar_position: 3
sidebar_label: Shell de demostració
---

# `@uxland/harmonix-demo-shell`

Un shell d'Harmonix mínim i independent del framework per desenvolupar i provar plugins. Té una capçalera, un menú lateral i una àrea de contingut, cadascun una regió, i res més: ni lògica de negoci ni vistes pròpies. Els projectes creats amb el [creador de plugins](./create-harmonix-plugin.md) hi executen el plugin amb `npm run dev`. Està pensat per al desenvolupament; les aplicacions de producció construeixen el seu propi shell.

## Instal·lació

```bash
npm install @uxland/harmonix-demo-shell
```

El creador ja l'afegeix. `lit`, `@uxland/regions` i `@uxland/harmonix` són dependències, no s'empaqueten, així que el projecte i els seus plugins comparteixen una sola còpia.

## Ús

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

## Exportacions principals

| Exportació | Descripció |
| --- | --- |
| `initializeShell(host?, { title? })` | Renderitza el shell a `host` (per defecte, `document.body`). Ocupa tota la finestra. Llança un error si es crida dues vegades. |
| `bootstrapPlugins(plugins)` | Espera les regions, carrega els plugins amb la seva API i, si cap plugin no ha activat una vista a `main`, activa la primera que s'ha registrat. Crida-la després d'`initializeShell`. |
| `regions` | Els noms de les regions: `header`, `side-menu` i `main`. |
| `DemoShellApi` | L'API que rep cada plugin: `regionManager`, `broker`, `createLocaleManager` i `pluginInfo`. |
| `DemoShellRegionManager` | Els mètodes d'`HarmonixRegionManager` més `regions`, `registerMainView`, `activateMainView` i `registerNavigationItem({ id, label, icon?, mainViewId })`. |
| `DemoShellPlugin` | `Plugin<DemoShellApi>`. |
| `HarmonixDemoShell`, `HarmonixNavItem` | Les classes dels elements personalitzats (`harmonix-demo-shell`, `harmonix-nav-item`). |

També reexporta aquests tipus del nucli: `BrokerDisposableHandler`, `HarmonixBroker`, `HarmonixLocaleApi`, `HarmonixViewDefinition`, `LocalizationMessages`, `PluginDefinition` i `PluginInfo`.

Les vistes es desen com a `pluginId::viewId`, així que dos plugins poden fer servir el mateix identificador de vista. El tema és un conjunt de propietats personalitzades de CSS (`--hx-primary`, `--hx-header-background`, `--hx-font`…) que pots sobreescriure a `harmonix-demo-shell` o fer servir a les teves vistes.

Les regions, l'API, el broker, les traduccions i el tema es descriuen a [El shell de demostració](../create-plugin/demo-shell.md).

## Versions

La versió actual és la 0.1.0. Depèn d'`@uxland/harmonix` `^1.1.6`, `@uxland/regions` `^1.0.0` i `lit` `^3.2.1`. Només es publica com a mòdul ES.

## Enllaços

- [npm](https://www.npmjs.com/package/@uxland/harmonix-demo-shell)
- [Codi font a GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/demo-shell)
- [El shell de demostració](../create-plugin/demo-shell.md)
- [Construir un shell](../api/building-a-shell.md): com escriure el teu propi shell prenent com a model el shell de demostració.
