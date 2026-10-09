---
sidebar_position: 1
---

# Introduction

Harmonix is a framework for composing a single-page application from independently developed and deployed plugins. A shell defines regions. Each plugin is a JavaScript module whose `initialize(api)` registers Web Components as views in those regions and talks to other plugins through a broker.

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => document.createElement("orders-list"),
  });
};

export const dispose = async (api: DemoShellApi) => {
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## Why Harmonix

Large applications are often built by several teams, sometimes from different companies. Each team wants to choose its tools and release on its own schedule. Users still expect one coherent application.

Harmonix splits the application into two kinds of parts:

- **The shell.** It owns the page layout, defines the regions and gives each plugin an API. It contains no business features.
- **The plugins.** Each one delivers a feature. A plugin can place several views in several regions: a list in the main area, a counter in the header and an item in the side menu. All of them share the plugin's code and data.

Plugins are not iframes. They run in the same page as the shell, so they can use the services the shell exposes through its API and exchange messages with other plugins.

## Design principles

- **Independent plugins.** Each plugin has its own repository, technology, build and release cycle. It only has to follow the contract with the shell: export `initialize` and `dispose`, and render Web Components.
- **Technology agnostic.** A view is a standard Web Component. It can be written with React, Angular, Lit or plain JavaScript.
- **Composition through regions.** The shell decides where things go. Plugins decide what goes there.
- **Loose coupling.** Plugins never import each other. They communicate through the shell's broker.
- **Fault isolation.** If a plugin fails to load or initialize, the others still load.

## Main use cases

Harmonix fits workstation-style single-page applications. In these applications users see a lot of related information at once, and the views must react to each other.

It is especially useful when the same application contains features built by different teams or vendors, each with its own technology and release cycle.

## Next steps

- [Example of use](./exemple-us.md) shows a shell and two plugins.
- [Create a plugin](../create-plugin/create-a-plugin.mdx) gets you a working plugin in a few minutes.
