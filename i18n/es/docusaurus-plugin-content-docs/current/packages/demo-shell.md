---
sidebar_position: 3
sidebar_label: Shell de demostración
---

# `@uxland/harmonix-demo-shell`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix-demo-shell?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix-demo-shell)

Un shell de Harmonix mínimo e independiente de cualquier framework para desarrollar y probar plugins. Tiene una cabecera, un menú lateral y un área de contenido, cada uno una región, y nada más: ni lógica de negocio ni vistas propias. Los proyectos hechos con el [creador de plugins](./create-harmonix-plugin.md) arrancan su plugin dentro de él con `npm run dev`. Está pensado para el desarrollo; las aplicaciones en producción construyen su propio shell.

## Instalación

```bash
npm install @uxland/harmonix-demo-shell
```

El creador ya lo añade. `lit`, `@uxland/regions` y `@uxland/harmonix` son dependencias, no van incluidas en el bundle, así que tu proyecto y sus plugins comparten una sola copia.

## Uso

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

## Exportaciones principales

| Exportación | Descripción |
| --- | --- |
| `initializeShell(host?, { title? })` | Pinta el shell en `host` (por defecto `document.body`). Ocupa toda la ventana. Lanza un error si se llama dos veces. |
| `bootstrapPlugins(plugins)` | Espera a las regiones, carga los plugins con su API y, si ningún plugin ha activado una vista en `main`, activa la primera registrada. Llámala después de `initializeShell`. |
| `regions` | Los nombres de las regiones: `header`, `side-menu` y `main`. |
| `DemoShellApi` | La API que recibe cada plugin: `regionManager`, `broker`, `createLocaleManager` y `pluginInfo`. |
| `DemoShellRegionManager` | Los métodos de `HarmonixRegionManager` más `regions`, `registerMainView`, `activateMainView` y `registerNavigationItem({ id, label, icon?, mainViewId })`. |
| `DemoShellPlugin` | `Plugin<DemoShellApi>`. |
| `HarmonixDemoShell`, `HarmonixNavItem` | Las clases de los custom elements (`harmonix-demo-shell`, `harmonix-nav-item`). |

También reexporta estos tipos del núcleo: `BrokerDisposableHandler`, `HarmonixBroker`, `HarmonixLocaleApi`, `HarmonixViewDefinition`, `LocalizationMessages`, `PluginDefinition` y `PluginInfo`.

Las vistas se guardan como `pluginId::viewId`, así que dos plugins pueden usar el mismo id de vista. El tema es un conjunto de propiedades CSS personalizadas (`--hx-primary`, `--hx-header-background`, `--hx-font`…) que puedes sobrescribir en `harmonix-demo-shell` o usar en tus vistas.

Las regiones, la API, el broker, las traducciones y el tema se describen en [El shell de demostración](../create-plugin/demo-shell.md).

## Versiones

Depende de `@uxland/harmonix` `^1.1.6`, `@uxland/regions` `^1.0.0` y `lit` `^3.2.1`. Se publica solo como módulo ES.

## Enlaces

- [npm](https://www.npmjs.com/package/@uxland/harmonix-demo-shell)
- [Código fuente en GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/demo-shell)
- [El shell de demostración](../create-plugin/demo-shell.md)
- [Construir un shell](../api/building-a-shell.md): cómo escribir tu propio shell, con el shell de demostración como modelo.
