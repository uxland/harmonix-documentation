---
sidebar_position: 2
---

# Regions and views

A **region** is an area of the shell where plugins inject views. A **view** is an HTML element, usually a Web Component, registered by a plugin.

The shell creates the regions and gives each plugin a `regionManager` in its API. This page covers how plugins use it. To create regions in your own shell, see [Building a shell](./building-a-shell.md).

Harmonix uses the [`@uxland/regions`](https://www.npmjs.com/package/@uxland/regions) library. The core re-exports `createRegionManager` and `createRegionHost`. The `@region` decorator and the adapters come from `@uxland/regions`, which the shell depends on directly.

## `HarmonixRegionManager`

```typescript
export interface HarmonixRegionManager {
  registerView(regionName: string, view: HarmonixViewDefinition): Promise<void>;
  removeView(regionName: string, viewId: string): Promise<void>;
  activateView(regionName: string, viewId: string): Promise<void>;
  deactivateView(regionName: string, viewId: string): Promise<void>;
  getRegion(regionName: string): Promise<IRegion>;
  isViewActive(regionName: string, viewId: string): Promise<boolean>;
  containsView(regionName: string, viewId: string): Promise<boolean>;
}
```

| Method | What it does |
| --- | --- |
| `registerView(region, view)` | Registers a view in a region |
| `removeView(region, viewId)` | Removes the view from the region |
| `activateView(region, viewId)` | Shows the view. In a single-active region, it hides the view that was active |
| `deactivateView(region, viewId)` | Hides the view |
| `getRegion(region)` | The `IRegion` object of `@uxland/regions` |
| `isViewActive(region, viewId)` | Whether the view is shown |
| `containsView(region, viewId)` | Whether the view is registered in the region |

A plugin can register views in several regions.

## View definition

```typescript
export interface HarmonixViewDefinition {
  id: string;
  factory: (regionContext?: unknown) => Promise<HTMLElement>;
  sortHint?: string;
  isDefault?: boolean;
  removeFromDomWhenDeactivated?: boolean;
}
```

| Field | Description |
| --- | --- |
| `id` | Id of the view. Used by `activateView`, `removeView` and the other methods |
| `factory(regionContext?)` | Async function that creates the element. It runs the first time the view is activated. `regionContext` is the context the shell set on the region, if any |
| `sortHint` | Optional. Sort key for the views of a multiple-active region |
| `isDefault` | Optional. In a single-active region, the view is activated when it is added if no other view is active, and again whenever the active view is deactivated |
| `removeFromDomWhenDeactivated` | Optional. Removes the element from the DOM when the view is deactivated, instead of hiding it |

### View ids

In the demo shell, a view id only has to be unique within the plugin: the shell stores each view as `pluginId::viewId`. If your shell does not namespace ids this way, prefix them with `api.pluginInfo.pluginId`.

## Region types

The shell chooses how each region behaves:

- **Single-active** regions show one view at a time. Activating a view hides the previous one. The main content area is usually single-active.
- **Multiple-active** regions show all their views at once, for example a header or a menu. A view is activated as soon as it is registered.

## Shell helpers

A shell can add shortcuts so that plugins do not need to know region names. The [demo shell](../create-plugin/demo-shell.md) adds:

| Helper | What it does |
| --- | --- |
| `regions` | The region names: `regions.header`, `regions.sideMenu`, `regions.main` |
| `registerMainView(view)` | `registerView` in the `main` region |
| `activateMainView(viewId)` | `activateView` in the `main` region |
| `registerNavigationItem({ id, label, icon?, mainViewId })` | Adds an item to the side menu that activates the main view `mainViewId` |

These helpers belong to the demo shell, not to the core. Other shells can offer different ones.

## Complete example

First, the plugin defines the element it will show:

```typescript
class ExampleComponent extends HTMLElement {
  connectedCallback() {
    const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    root.innerHTML = `<h1>Hello from ${this.getAttribute("plugin-id")}</h1>`;
  }
}

if (!customElements.get("example-plugin-view")) {
  customElements.define("example-plugin-view", ExampleComponent);
}
```

Then the plugin registers it in `initialize` and removes it in `dispose`. This example uses the demo shell:

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  // Generic: a view in any region.
  await api.regionManager.registerView(api.regionManager.regions.main, {
    id: "plugin-main-view",
    factory: async () => {
      const element = new ExampleComponent();
      element.setAttribute("plugin-id", api.pluginInfo.pluginId);
      return element;
    },
  });

  // Helper: an item in the side menu that activates that view.
  await api.regionManager.registerNavigationItem({
    id: "plugin-menu",
    label: "Example",
    mainViewId: "plugin-main-view",
  });

  // Show it.
  await api.regionManager.activateMainView("plugin-main-view");
};

export const dispose = async (api: DemoShellApi) => {
  const { regions } = api.regionManager;
  await api.regionManager.removeView(regions.sideMenu, "plugin-menu");
  await api.regionManager.removeView(regions.main, "plugin-main-view");
};
```
