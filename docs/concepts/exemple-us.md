---
sidebar_position: 6
---

# Example use of a Harmonix-based application - Primaria Shell

# Quick Shell Overview

To explain how **Harmonix** works and how you can build an app composed of different plugins developed in different technologies and by different clients, we will explain an example of how the Primary Workstation application works.



First of all, there is **Harmonix**, the main engine capable of obtaining and joining all these plugins, providing them with functionalities to interact with each other and thus composing the final application.



Second, there is the "**Shell**", which will be the main application and which through Harmonix, will define a skeleton with regions where plugins can inject different Web Components. Each application must build a different Shell, as each one will have its own skeleton and way of working. In the case of primary care, we have the "Primaria Shell". The shell, by itself, is nothing more than a set of containers, an empty skeleton. If we saw the shell before starting the plugins, we would see something similar to this:



```typescript
<primaria-shell>
    <div id="header-region"></div>
    <div id="menu-region"></div>
    <div id="footer-region"></div>
    <div id="main-region"></div>
  </primaria-shell>
```

<br/>

# Quick Plugin Overview

And finally, we have the "**plugins**", which are nothing more than packages developed by a 3rd party, which are compiled, and once published to a "Plugin Store", are ready to be consumed by the Shell.



Each plugin needs to be compiled and bundled, generating a JavaScript file, for example:

**_plugin1-version-23.45.js._**



These plugins, in their Javascript, need to define an **entry point** to start their lifecycle. At this initialization point, each plugin receives an object from the Shell, called **api**. With this API, the plugin has everything it needs to function within the Shell. For example, it has a way to register each component to each region that has been defined (menu, header, main, footer). It has a way to listen to events that another plugin may have communicated, or an HTTP client to make calls to a backend, or a way to show a notification message on screen, among many other things. This would be an example of a plugin entry point:



```typescript
export const initialize = (api: PrimariaApi) =>{

  //registration of Web Components to the Primaria Shell skeleton
  api.registerView(shellRegions.menu, ())=> new Plugin1MenuWebComponent());
  api.registerView(shellRegions.header, ()=> new Plugin1HeaderWebComponent);
  api.registerView(shellRegions.footer, ()=> new Plugin1FooterWebComponent());
  api.registerView(shellRegions.main, ()=> new Plugin1MainWebComponent());

  //make a call to get data from my plugin
  api.httpClient.request(`${apiUrl}/get-plugin-data`).then((res: any) => { console.log(res) });
}
```

<br/>

# Quick Shell + Plugins Overview

Once the Shell and the Harmonix framework have given the order to start the plugins, the Shell skeleton goes from being empty to being an application composed of many Web Components. If we now see how the DOM looks, it would be something like this:



```typescript
<primaria-shell>
    <div id="header-region">
      <plugin1-header><h1>I'm Plugin 1</h1></plugin1-header>
      <plugin2-header><h1>I'm Plugin 2</h1></plugin2-header>
    </div>
    <div id="menu-region">
      <plugin1-menu><span>Go to Plugin 1 Menu</span></plugin1-menu>
      <plugin2-menu><span>Go to Plugin 2 Menu</span></plugin2-menu>
    </div>
    <div id="footer-region">
      <plugin1-footer>Plugin 1 2024</plugin1-footer>
      <plugin2-footer><h1>Plugin 2 2024</h1></plugin2-footer>
    </div>
    <div id="main-region">
      <plugin1-main>
        <div class="box">Plugin 1 Box main</div>
      </plugin1-main>
      <plugin2-main>
        <div class="box">Plugin 2 Box main</div>
      </plugin2-main>
    </div>
  </primaria-shell>
```



As you can see, plugin1 and plugin2 have been able, through the API received at their initial point, to register different Web Components in different regions. Now the Shell application is full.



Development teams are provided with a Sandbox to simulate an application where the "Primaria Shell" is installed, so they can work individually and see how their plugin will look.
