---
sidebar_position: 5
sidebar_label: Adapters
---

# `@uxland/harmonix-adapters`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix-adapters?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix-adapters)

Regions only accept HTML elements. This package turns a React component into one: it wraps the component in a Web Component with its own shadow DOM and its styles, so a React plugin can register it as a view. Lit and Angular plugins do not need it.

## Install

```bash
npm install @uxland/harmonix-adapters
```

The React plugin template already includes it.

## `wrapReactViewFactory(Component, styles, options?)`

| Parameter | Type | Description |
| --- | --- | --- |
| `Component` | `React.FC<P>` | The React component to render. |
| `styles` | `string` | CSS text. It goes into a `<style>` element in the shadow root, next to the component. |
| `options` | `WrapperOptions` (optional) | `{ fullHeight?: boolean }`. |

It returns a view factory, `(props?: P) => Promise<HTMLElement>`. Each call creates a new element (`ux-react-web-component`) that renders `Component` with `props`. React mounts the component when the element is connected to the DOM and unmounts it when the element is removed.

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

The `?inline` suffix is how Vite imports a CSS file as a string.

### `fullHeight`

By default the element that React renders into has `height: auto`, so the view is as tall as its content. With `fullHeight: true` it has `height: 100%` and the view fills the height of its region. Use it for views that should take the whole content area, like the main view of a plugin. Without `options`, `fullHeight` is `false`.

## Several React plugins on one page

Each React plugin bundles its own copy of the adapter, while React itself is provided by the application. Since 1.3.1, the adapter defines the `ux-react-web-component` custom element only if it is not defined yet, and every copy uses that one definition. Several React plugins can be loaded in the same page. With earlier versions, the second plugin failed when it tried to define the element again.

## Versions and requirements

It requires React 19: `react` and `react-dom` `^19.0.0` are dependencies of the package. Leave them out of your plugin bundle so that all plugins share the application's copy, as the React template does in `vite.config.ts`.

## Links

- [npm](https://www.npmjs.com/package/@uxland/harmonix-adapters)
- [Source on GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/adapters)
- [Framework notes](../create-plugin/frameworks.mdx): React, Lit and Angular views in a region.
- [Regions and views](../api/gestio-regions-i-vistes.md)
