---
sidebar_position: 2
---

# Example of use

This page shows how a Harmonix application is put together. It uses the [Harmonix demo shell](../create-plugin/demo-shell.md), the small shell that Harmonix provides to develop and try plugins.

## The parts

There are three parts:

- **Harmonix** (`@uxland/harmonix`). The core that loads the plugins, gives each one an API and manages the regions.
- **The shell.** The main application. It defines a skeleton with regions where plugins inject Web Components. Each application builds its own shell, with its own layout and services.
- **The plugins.** Packages developed by other teams. They are built and published, usually to a Plugin Store, and the shell loads them.

## The shell

The demo shell has three regions: a header, a side menu and the main content. On its own, the shell is an empty skeleton. Before any plugin starts, its DOM looks like this:

```html
<harmonix-demo-shell>
  <header>
    <div id="header-region"></div>
  </header>
  <nav>
    <div id="side-menu-region"></div>
  </nav>
  <main>
    <div id="main-region"></div>
  </main>
</harmonix-demo-shell>
```

## A plugin

Each plugin is built and bundled into a JavaScript file, for example `plugin1-1.2.0.js`.

The file is an ES module that exports two functions:

- `initialize(api)` starts the plugin. The shell calls it with an **API** object. Through the API the plugin registers its views in the regions (header, side menu, main) and publishes or listens to events from other plugins. Each shell can add more services to its API, such as an HTTP client or notifications.
- `dispose(api)` stops the plugin. It must undo everything `initialize` did.

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  const { regions } = api.regionManager;

  // Register Web Components in the regions of the shell
  await api.regionManager.registerView(regions.header, { id: "header", factory: async () => new Plugin1HeaderWebComponent() });
  await api.regionManager.registerView(regions.sideMenu, { id: "menu", factory: async () => new Plugin1MenuWebComponent() });
  await api.regionManager.registerView(regions.main, { id: "main", factory: async () => new Plugin1MainWebComponent() });

  // Tell the other plugins that this one is ready
  await api.broker.publish("plugin1:ready", { pluginId: api.pluginInfo.pluginId });
};

export const dispose = async (api: DemoShellApi) => {
  const { regions } = api.regionManager;
  await api.regionManager.removeView(regions.header, "header");
  await api.regionManager.removeView(regions.sideMenu, "menu");
  await api.regionManager.removeView(regions.main, "main");
};
```

`Plugin1HeaderWebComponent` and the others are custom elements defined by the plugin.

## The shell with plugins

Once the plugins have started, the skeleton is filled with their Web Components. With two plugins, the DOM looks like this:

```html
<harmonix-demo-shell>
  <header>
    <div id="header-region">
      <plugin1-header><span>I'm Plugin 1</span></plugin1-header>
      <plugin2-header><span>I'm Plugin 2</span></plugin2-header>
    </div>
  </header>
  <nav>
    <div id="side-menu-region">
      <plugin1-menu><span>Go to Plugin 1</span></plugin1-menu>
      <plugin2-menu><span>Go to Plugin 2</span></plugin2-menu>
    </div>
  </nav>
  <main>
    <div id="main-region">
      <plugin1-main>
        <div class="box">Plugin 1 Box main</div>
      </plugin1-main>
      <plugin2-main hidden>
        <div class="box">Plugin 2 Box main</div>
      </plugin2-main>
    </div>
  </main>
</harmonix-demo-shell>
```

The header and the side menu are **multiple-active** regions: all their views are shown at once. The main region is **single-active**: only one view is shown at a time. When all the plugins have started, if no plugin has activated a main view, the demo shell activates the first one registered. The other view stays `hidden` until a menu item activates it.

![Two plugins in the demo shell](/img/create-plugin/demo-shell-regions.png)

To develop a plugin, teams do not need the final application. The [plugin creator](../create-plugin/create-a-plugin.mdx) gives them a project that runs the plugin in the demo shell, so they can work on their own and see how the plugin will look.
