---
sidebar_position: 2
---

# Ejemplo de uso

Esta página muestra cómo se monta una aplicación Harmonix. Usa el [shell de demostración de Harmonix](../create-plugin/demo-shell.md), el shell pequeño que Harmonix proporciona para desarrollar y probar plugins.

## Las piezas

Hay tres piezas:

- **Harmonix** (`@uxland/harmonix`). El núcleo que carga los plugins, da una API a cada uno y gestiona las regiones.
- **El shell.** La aplicación principal. Define un esqueleto con regiones donde los plugins inyectan Web Components. Cada aplicación construye su propio shell, con su propio layout y sus propios servicios.
- **Los plugins.** Paquetes que desarrollan otros equipos. Se construyen y se publican, normalmente en un Plugin Store, y el shell los carga.

## El shell

El shell de demostración tiene tres regiones: una cabecera, un menú lateral y el contenido principal. Por sí solo, el shell es un esqueleto vacío. Antes de que arranque ningún plugin, su DOM es así:

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

## Un plugin

Cada plugin se construye y se empaqueta en un fichero JavaScript, por ejemplo `plugin1-1.2.0.js`.

El fichero es un módulo ES que exporta dos funciones:

- `initialize(api)` arranca el plugin. El shell la llama con un objeto **API**. A través de la API, el plugin registra sus vistas en las regiones (cabecera, menú lateral, principal) y publica eventos de otros plugins o los escucha. Cada shell puede añadir más servicios a su API, como un cliente HTTP o notificaciones.
- `dispose(api)` detiene el plugin. Debe deshacer todo lo que ha hecho `initialize`.

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

`Plugin1HeaderWebComponent` y los demás son custom elements que define el plugin.

## El shell con plugins

Cuando los plugins han arrancado, el esqueleto se llena con sus Web Components. Con dos plugins, el DOM es así:

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

La cabecera y el menú lateral son regiones de **varias vistas activas**: todas sus vistas se muestran a la vez. La región principal es de **vista activa única**: solo se muestra una vista a la vez. Cuando todos los plugins han arrancado, si ninguno ha activado una vista principal, el shell de demostración activa la primera que se ha registrado. La otra vista queda `hidden` hasta que un elemento del menú la activa.

![Dos plugins en el shell de demostración](/img/create-plugin/demo-shell-regions.png)

Para desarrollar un plugin, los equipos no necesitan la aplicación final. El [creador de plugins](../create-plugin/create-a-plugin.mdx) les da un proyecto que ejecuta el plugin en el shell de demostración, así que pueden trabajar por su cuenta y ver cómo quedará el plugin.
