---
sidebar_position: 6
---

# Exemple d'ús d'una aplicació basada en Harmonix

# Visió ràpida del shell

Per explicar com funciona **Harmonix** i com pots construir una app composta de diferents plugins desenvolupats amb diferents tecnologies i per diferents clients, farem servir el [shell de demostració d'Harmonix](../create-plugin/demo-shell.md), el shell petit que proporciona Harmonix per desenvolupar i provar plugins.

  

Primer de tot, hi ha **Harmonix**, el motor principal capaç d'obtenir i unir tots aquests plugins, donar-los funcionalitats per interactuar entre ells i compondre així l'aplicació final.

  

En segon lloc, hi ha el "**Shell**", que serà l'aplicació principal i que, mitjançant Harmonix, definirà un esquelet amb regions on els plugins podran injectar diferents Web Components. Cada aplicació ha de construir un Shell diferent, ja que cadascuna tindrà un esquelet i una manera de treballar propis. El shell de demostració té tres regions: una capçalera, un menú lateral i el contingut principal. El shell, per si sol, no és més que un conjunt de contenidors, un esquelet buit. Si veiéssim el shell abans d'iniciar els plugins, veuríem una cosa semblant a aquesta:

  

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

# Visió ràpida dels plugins

I per acabar, hi ha els "**plugins**", que no són més que paquets desenvolupats per tercers, que es compilen i que, un cop publicats en un "Plugin Store", estan a punt per ser consumits pel Shell.

  

Cada plugin s'ha de compilar i empaquetar en un bundle, i genera un fitxer JavaScript, per exemple:

**_plugin1-version-23.45.js._**

  

Aquests plugins, en el seu JavaScript, han de definir un **punt d'entrada** per iniciar el seu cicle de vida. En aquest punt d'inicialització, cada plugin rep del Shell un objecte anomenat **api**. Amb aquesta API, el plugin té tot el necessari per funcionar dins del Shell. Per exemple, té una manera de registrar cada component a cada regió que s'hagi definit (capçalera, menú lateral, contingut principal), o de publicar i escoltar esdeveniments que altres plugins puguin comunicar. Cada shell pot afegir més serveis a la seva API: un client HTTP per fer crides a un backend, una manera de mostrar un missatge de notificació en pantalla, entre moltes altres coses. Aquest seria un exemple de punt d'entrada d'un plugin:

  

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

# Visió ràpida del shell amb plugins

Un cop el Shell i el framework Harmonix han donat l'ordre d'iniciar els plugins, l'esquelet del Shell passa d'estar buit a ser una aplicació composta per molts Web Components. Si ara mirem com és el DOM, seria una cosa així:

  

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

  

Com pots veure, el plugin1 i el plugin2 han pogut registrar, mitjançant l'API rebuda al seu punt d'entrada, diferents Web Components en diferents regions. Ara l'aplicació Shell ja és plena. La regió principal només mostra una vista alhora: l'altra queda amagada fins que un element del menú l'activa.

  

![Dos plugins al shell de demostració](/img/create-plugin/demo-shell-regions.png)

  

Per desenvolupar un plugin, els equips no necessiten l'aplicació final: el [creador de plugins](../create-plugin/create-a-plugin.mdx) els dona un projecte que executa el plugin al shell de demostració, de manera que poden treballar individualment i veure com quedarà el seu plugin.
