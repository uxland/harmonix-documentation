---
sidebar_position: 6
---

# Example use of a Harmonix-based application

# Quick Shell Overview

To explain how **Harmonix** works and how you can build an app composed of different plugins developed in different technologies and by different clients, we will use the [Harmonix demo shell](../create-plugin/demo-shell.md), the small shell that Harmonix provides to develop and try plugins.



First of all, there is **Harmonix**, the main engine capable of obtaining and joining all these plugins, providing them with functionalities to interact with each other and thus composing the final application.



Second, there is the "**Shell**", which will be the main application and which through Harmonix, will define a skeleton with regions where plugins can inject different Web Components. Each application must build a different Shell, as each one will have its own skeleton and way of working. The demo shell has three regions: a header, a side menu and the main content. The shell, by itself, is nothing more than a set of containers, an empty skeleton. If we saw the shell before starting the plugins, we would see something similar to this:



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

<br/>

# Quick Plugin Overview

And finally, we have the "**plugins**", which are nothing more than packages developed by a 3rd party, which are compiled, and once published to a "Plugin Store", are ready to be consumed by the Shell.



Each plugin needs to be compiled and bundled, generating a JavaScript file, for example:

**_plugin1-version-23.45.js._**



These plugins, in their Javascript, need to define an **entry point** to start their lifecycle. At this initialization point, each plugin receives an object from the Shell, called **api**. With this API, the plugin has everything it needs to function within the Shell. For example, it has a way to register each component to each region that has been defined (header, side menu, main), or to publish and listen to events that other plugins may communicate. Each shell can add more services to its API: an HTTP client to make calls to a backend, a way to show a notification message on screen, among many other things. This would be an example of a plugin entry point:



```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  const { regions } = api.regionManager;

  // registration of Web Components in the regions of the shell skeleton
  await api.regionManager.registerView(regions.header, { id: "header", factory: async () => new Plugin1HeaderWebComponent() });
  await api.regionManager.registerView(regions.sideMenu, { id: "menu", factory: async () => new Plugin1MenuWebComponent() });
  await api.regionManager.registerView(regions.main, { id: "main", factory: async () => new Plugin1MainWebComponent() });

  // tell the other plugins that this one is ready
  await api.broker.publish("plugin1:ready", { pluginId: api.pluginInfo.pluginId });
};
```

<br/>

# Quick Shell + Plugins Overview

Once the Shell and the Harmonix framework have given the order to start the plugins, the Shell skeleton goes from being empty to being an application composed of many Web Components. If we now see how the DOM looks, it would be something like this:



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



As you can see, plugin1 and plugin2 have been able, through the API received at their initial point, to register different Web Components in different regions. Now the Shell application is full. The main region shows only one view at a time: the other one stays hidden until a menu item activates it.



![Two plugins in the demo shell](/img/create-plugin/demo-shell-regions.png)



To develop a plugin, teams do not need the final application: the [plugin creator](../create-plugin/create-a-plugin.mdx) gives them a project that runs the plugin in the demo shell, so they can work individually and see how their plugin will look.
