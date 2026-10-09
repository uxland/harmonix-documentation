---
sidebar_position: 6
---

# Ejemplo de uso de una aplicación basada en Harmonix

# Visión rápida del Shell

Para explicar el funcionamiento de **Harmonix** y cómo se puede construir una app compuesta de diferentes plugins desarrollados en diferentes tecnologías y por diferentes clientes, usaremos el [shell de demostración de Harmonix](../create-plugin/demo-shell.md), el pequeño shell que Harmonix proporciona para desarrollar y probar plugins.



Primero de todo, existe **Harmonix**, el motor principal capaz de obtener y unir todos estos plugins, dotarlos de funcionalidades para interactuar entre ellos y componer así la aplicación final.



Segundo, existe el "**Shell**", que será la aplicación principal y quien, mediante Harmonix, definirá un esqueleto con regiones donde los plugins podrán inyectar diferentes Web Components. Cada aplicación debe construir un Shell diferente, ya que cada una tendrá un esqueleto y una forma de trabajar propios. El shell de demostración tiene tres regiones: una cabecera, un menú lateral y el contenido principal. El shell, por sí solo, no es más que un conjunto de contenedores, un esqueleto vacío. Si viéramos el shell antes de iniciar los plugins, veríamos algo semejante a esto:



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

# Visión rápida de los plugins

Y por último, tenemos los "**plugins**", que no son más que paquetes desarrollados por terceros, que se compilan y, una vez publicados en una "Plugin Store", están listos para que el Shell los consuma.



Cada plugin se debe compilar y empaquetar, y genera un fichero JavaScript, por ejemplo:

**_plugin1-version-23.45.js._**



Estos plugins, en su JavaScript, deben definir un **punto de entrada** para iniciar su ciclo de vida. En este punto de inicialización, cada plugin recibe del Shell un objeto llamado **api**. Con esta API, el plugin tiene todo lo que necesita para funcionar dentro del Shell. Por ejemplo, tiene una forma de registrar cada componente en cada región que se ha definido (cabecera, menú lateral, main), o de publicar y escuchar eventos que otros plugins puedan comunicar. Cada shell puede añadir más servicios a su API: un cliente HTTP para hacer llamadas a un backend, una forma de mostrar un mensaje de notificación en pantalla, entre muchas otras cosas. Este sería un ejemplo del punto de entrada de un plugin:



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

# Visión rápida del Shell con los plugins

Una vez el Shell y el framework Harmonix han dado la orden de iniciar los plugins, el esqueleto del Shell pasa de estar vacío a ser una aplicación compuesta de muchos Web Components. Si ahora vemos cómo queda el DOM, sería algo así:



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



Como puedes ver, plugin1 y plugin2 han podido, mediante la API recibida en su punto inicial, registrar diferentes Web Components en diferentes regiones. Ahora la aplicación Shell está llena. La región main muestra una sola vista a la vez: la otra se queda oculta hasta que un elemento del menú la activa.



![Dos plugins en el shell de demostración](/img/create-plugin/demo-shell-regions.png)



Para desarrollar un plugin, los equipos no necesitan la aplicación final: el [creador de plugins](../create-plugin/create-a-plugin.mdx) les da un proyecto que ejecuta el plugin en el shell de demostración, de manera que pueden trabajar individualmente y ver cómo quedará su plugin.
