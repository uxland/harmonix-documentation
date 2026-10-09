---
sidebar_position: 5
sidebar_label: Adaptadores
---

# `@uxland/harmonix-adapters`

Las regiones solo aceptan elementos HTML. Este paquete convierte un componente React en uno: envuelve el componente en un Web Component con su propio shadow DOM y sus estilos, de manera que un plugin React puede registrarlo como vista. Los plugins Lit y Angular no lo necesitan.

## Instalación

```bash
npm install @uxland/harmonix-adapters
```

La plantilla de React ya lo incluye.

## `wrapReactViewFactory(Component, styles, options?)`

| Parámetro | Tipo | Descripción |
| --- | --- | --- |
| `Component` | `React.FC<P>` | El componente React que se pinta. |
| `styles` | `string` | Texto CSS. Va dentro de un elemento `<style>` en el shadow root, junto al componente. |
| `options` | `WrapperOptions` (opcional) | `{ fullHeight?: boolean }`. |

Devuelve una factoría de vistas, `(props?: P) => Promise<HTMLElement>`. Cada llamada crea un elemento nuevo (`ux-react-web-component`) que pinta `Component` con `props`. React monta el componente cuando el elemento se conecta al DOM y lo desmonta cuando el elemento se elimina.

```typescript title="src/plugin.ts"
import { wrapReactViewFactory } from "@uxland/harmonix-adapters";
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";
import { MainView } from "./views/main-view";
import styles from "./views/main-view.css?inline";

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({
    id: "main",
    factory: () => wrapReactViewFactory(MainView, styles, { fullHeight: true })({ api }),
  });
};
```

El sufijo `?inline` es la manera en que Vite importa un fichero CSS como cadena de texto.

### `fullHeight`

Por defecto, el elemento donde React pinta tiene `height: auto`, así que la vista es tan alta como su contenido. Con `fullHeight: true` tiene `height: 100%` y la vista ocupa toda la altura de su región. Úsalo para vistas que deben ocupar toda el área de contenido, como la vista principal de un plugin. Sin `options`, `fullHeight` es `false`.

## Varios plugins React en una misma página

Cada plugin React incluye en su bundle su propia copia del adaptador, mientras que React lo proporciona la aplicación. Desde la 1.3.1, el adaptador define el custom element `ux-react-web-component` solo si todavía no está definido, y todas las copias usan esa única definición. Se pueden cargar varios plugins React en la misma página. Con versiones anteriores, el segundo plugin fallaba al intentar definir el elemento de nuevo.

## Versiones y requisitos

La versión actual en npm (`latest`) es la 1.3.1. Requiere React 19: `react` y `react-dom` `^19.0.0` son dependencias del paquete. Déjalos fuera del bundle de tu plugin para que todos los plugins compartan la copia de la aplicación, como hace la plantilla de React en `vite.config.ts`.

## Enlaces

- [npm](https://www.npmjs.com/package/@uxland/harmonix-adapters)
- [Código fuente en GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/adapters)
- [Notas por framework](../create-plugin/frameworks.mdx): vistas React, Lit y Angular en una región.
- [Regiones y vistas](../api/gestio-regions-i-vistes.md)
