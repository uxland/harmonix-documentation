---
sidebar_position: 2
---

# Exemple d'ús

Aquesta pàgina mostra com s'organitza una aplicació Harmonix. Fa servir el [shell de demostració d'Harmonix](../create-plugin/demo-shell.md), el shell petit que proporciona Harmonix per desenvolupar i provar plugins.

## Les peces

Hi ha tres peces:

- **Harmonix** (`@uxland/harmonix`). El nucli que carrega els plugins, dona una API a cadascun i gestiona les regions.
- **El shell.** L'aplicació principal. Defineix un esquelet amb regions on els plugins injecten Web Components. Cada aplicació construeix el seu propi shell, amb la seva disposició i els seus serveis.
- **Els plugins.** Paquets que desenvolupen altres equips. Es construeixen i es publiquen, normalment en un Plugin Store, i el shell els carrega.

## El shell

El shell de demostració té tres regions: una capçalera, un menú lateral i el contingut principal. Per si sol, el shell és un esquelet buit. Abans que s'iniciï cap plugin, el seu DOM és així:

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

Cada plugin es construeix i s'empaqueta en un fitxer JavaScript, per exemple `plugin1-1.2.0.js`.

El fitxer és un mòdul ES que exporta dues funcions:

- `initialize(api)` inicia el plugin. El shell la crida amb un objecte **API**. Amb l'API, el plugin registra les seves vistes a les regions (capçalera, menú lateral, principal) i publica esdeveniments o escolta els d'altres plugins. Cada shell pot afegir més serveis a la seva API, com un client HTTP o notificacions.
- `dispose(api)` atura el plugin. Ha de desfer tot el que ha fet `initialize`.

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

`Plugin1HeaderWebComponent` i els altres són elements personalitzats que defineix el plugin.

## El shell amb plugins

Quan els plugins s'han iniciat, l'esquelet s'omple amb els seus Web Components. Amb dos plugins, el DOM és així:

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

La capçalera i el menú lateral són regions **de diverses vistes actives**: totes les seves vistes es mostren alhora. La regió principal és **d'una sola vista activa**: només es mostra una vista alhora. Quan tots els plugins s'han iniciat, si cap plugin no ha activat una vista principal, el shell de demostració activa la primera que s'ha registrat. L'altra vista continua `hidden` fins que un element del menú l'activa.

![Dos plugins al shell de demostració](/img/create-plugin/demo-shell-regions.png)

Per desenvolupar un plugin, els equips no necessiten l'aplicació final. El [creador de plugins](../create-plugin/create-a-plugin.mdx) els dona un projecte que executa el plugin al shell de demostració, de manera que poden treballar pel seu compte i veure com quedarà el plugin.
