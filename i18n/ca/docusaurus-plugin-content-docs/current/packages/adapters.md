---
sidebar_position: 5
sidebar_label: Adaptadors
---

# `@uxland/harmonix-adapters`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix-adapters?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix-adapters)

Les regions només accepten elements HTML. Aquest paquet converteix un component de React en un element HTML: l'embolcalla en un Web Component amb el seu propi shadow DOM i els seus estils, perquè un plugin de React el pugui registrar com a vista. Els plugins de Lit i d'Angular no el necessiten.

## Instal·lació

```bash
npm install @uxland/harmonix-adapters
```

La plantilla de React ja l'inclou.

## `wrapReactViewFactory(Component, styles, options?)`

| Paràmetre | Tipus | Descripció |
| --- | --- | --- |
| `Component` | `React.FC<P>` | El component de React que es renderitza. |
| `styles` | `string` | Text CSS. Va en un element `<style>` dins del shadow root, al costat del component. |
| `options` | `WrapperOptions` (opcional) | `{ fullHeight?: boolean }`. |

Retorna una factoria de vistes, `(props?: P) => Promise<HTMLElement>`. Cada crida crea un element nou (`ux-react-web-component`) que renderitza `Component` amb `props`. React munta el component quan l'element es connecta al DOM i el desmunta quan l'element se n'elimina.

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

El sufix `?inline` és la manera com Vite importa un fitxer CSS com a cadena.

### `fullHeight`

Per defecte, l'element on React renderitza té `height: auto`, així que la vista és tan alta com el seu contingut. Amb `fullHeight: true` té `height: 100%` i la vista ocupa tota l'alçada de la regió. Fes-lo servir per a vistes que han d'ocupar tota l'àrea de contingut, com la vista principal d'un plugin. Sense `options`, `fullHeight` és `false`.

## Diversos plugins de React en una pàgina

Cada plugin de React empaqueta la seva pròpia còpia de l'adaptador, mentre que React el proporciona l'aplicació. Des de la 1.3.1, l'adaptador només defineix l'element personalitzat `ux-react-web-component` si encara no està definit, i totes les còpies fan servir aquesta única definició. Es poden carregar diversos plugins de React a la mateixa pàgina. Amb versions anteriors, el segon plugin fallava quan intentava tornar a definir l'element.

## Versions i requisits

Requereix React 19: `react` i `react-dom` `^19.0.0` són dependències del paquet. Deixa'ls fora del paquet del plugin perquè tots els plugins comparteixin la còpia de l'aplicació, com fa la plantilla de React a `vite.config.ts`.

## Enllaços

- [npm](https://www.npmjs.com/package/@uxland/harmonix-adapters)
- [Codi font a GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/adapters)
- [Notes per framework](../create-plugin/frameworks.mdx): vistes de React, Lit i Angular en una regió.
- [Regions i vistes](../api/gestio-regions-i-vistes.md)
