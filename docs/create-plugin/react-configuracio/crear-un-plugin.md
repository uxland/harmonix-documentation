---
sidebar_position: 2
---

# Crear un plugin

# Configura el teu Entorn de Desenvolupament

Inicialment, necessites tenir instal·lat Node.js i npm (el gestor de paquets de Node). Pots descarregar-los des de la pàgina oficial de Node.js.


# Crea un Nou Projecte

Un cop instal·lat Node, pots crear un nou projecte. Recomanem utilitzar Vite i TypeScript fent servir, per exemple, aquesta comanda:

  

```bash
npm create vite@latest react-plugin-demo -- --template react-ts
```

  

Segueix les instruccions en pantalla per a configurar el teu projecte.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/f0ec33fe-17c8-4ed1-bc39-addf9a57491b/image.png)


# Executa la teva Aplicació

Per veure la teva aplicació en acció, navega al directori del teu projecte i executa:

  

```bash
cd nom-del-teu-projecte
npm install
npm run dev
```

  

Això iniciarà un servidor local. Obre el teu navegador i dirigeix-te a [`http://localhost:5173`](http://localhost:5173/) (port per defecte de Vite) per veure la teva nova aplicació Lit.


# Prepara la teva aplicació abans d'editar

Abans de passar a editar l'aplicació, recomanem tenir una estructura mínima d'arxius i carpetes establerta de manera inicial, per a que posteriorment sigui més fàcil i simple dur a terme la edició dels arxius de l'aplicació. Així que pots eliminar els arxius `App.css` , `App.tsx` i `main.tsx` que es creen predeterminadement. Un exemple seria el següent:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/d654ef96-03b8-4f93-a699-0be10908d54e/image.png)

En aquest exemple es crea una carpeta per als components, i una carpeta per a les vistes que es vulguin registrar al shell (en aquest exemple dues, una per la regió del header i l'altre per la regió main). Els arxius `plugin.ts` , `plugins.ts` i `sandbox.ts` es creen en els propers passos.


# Edita la teva aplicació

Pots començar per editar la teva aplicació obrint el directori del teu projecte en el teu editor de codi favorit.

  

*   Substitueix les regles d'estil de l'arxiu `index.css` per les següents:

```css
body {
  margin: 0;
  overflow: hidden;
  font-size: 14px;
  background-color: #f5f6fa;
  font-family: 'Roboto', sans-serif;
  pointer-events: auto !important;
  width: 100%;
  height: 100%;
}

html {
  font-size: 14px;
  overflow: hidden;
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100%;
}
```

I a continuació enllaça aquest arxiu `index.css` al head del teu arxiu `index.html`:

```css
  <link rel="stylesheet" href="./src/index.css" />
```

  

*   Crea un arxiu `sandbox.ts` a la carpeta src del projecte
*   Importa aquest arxiu `sandbox.ts` en el teu `index.html` com script d'entrada. Per a això, modifica la ruta de la següent línia per la del sandbox:

```xml
  <script type="module" src="/src/main.tsx"></script>
```

*   Al `index.html` , dins de l'etiqueta _body_ pots eliminar el següent:

  

```html
<div id="root"></div>
```


# Afegir dependència al Shell

Per a afegir la dependència _@uxland/primary-shell_ al teu projecte, executa la següent comanda en l'arrel del teu projecte:

  

```bash
npm install @uxland/primary-shell
```


# Inicialitzar el Shell

A l'arxiu `sandbox.ts` li afegirem el següent codi, on crearem un element app, l'inserirem al body i cridarem a la funció _initializeSandboxApp_ passant l'element creat. Caldrà també importar l'arxiu dels estils.

```javascript
import { initializeShell } from "@uxland/primary-shell";
import "@uxland/primary-shell/dist/style.css"; // Afegim els estils globals del shell i el Design System

// Creem un contenidor HTML on injectarem el shell més endavant
const createAndAppendSandboxApp = () => {
  const app = document.createElement("sandbox-app");
  document.body.appendChild(app);
  const sandbox = document.querySelector("sandbox-app");
  return sandbox as HTMLElement;
}
// Inicialitzem el sandbox i l'aplicació
const initializeSandboxApp = (sandbox: HTMLElement) => {
  try {
    if (sandbox) {
        initializeShell(sandbox);
      }
    }
    catch (error) {
      console.warn(error);
    }
 }

const app = createAndAppendSandboxApp();
initializeSandboxApp(app);
```

  

Hauries de veure renderitzat el Shell de primària en el navegador:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/641999dd-e9bf-4adf-97c9-a071a71b8f4a/image.png)



# Declarar arxiu d'entrada plugin

S'ha de declarar un arxiu on s'implementin les funcions necessàries per a inicialitzar un plugin.

En aquest exemple crearem l'arxiu `plugin.ts` a la carpeta src amb el següent contingut:

  

```javascript
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
    return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
    Promise.resolve();
}
```


# Declarar una col·lecció de plugins

S'ha de declarar cada plugin que es vulgui inicialitzar en el shell. Per a això, podem crear un arxiu `plugins.ts` on exportarem l'array de les definicions dels plugins. A cada element l'indicarem l'id i una funció per a importar-ho. Exemple:

  

```coffeescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("./plugin") as any;

export const plugins: PluginDefinition[] = [{ pluginId: "react-plugin", importer: importer }];
```

  

Ara s'ha d'indicar al shell que inicialitzi els plugins en el procés d'inicialització de l'app de l'arxiu `sandbox.ts` anterior. Per a això, utilitzarem la funció _bootstrapPlugins_ passant-li la col·lecció de plugins que hem creat abans_._

L'arxiu quedaria d'aquesta manera:

  

```javascript
import { bootstrapPlugins, initializeShell } from "@uxland/primary-shell";
import { plugins } from "./plugins"
import "@uxland/primary-shell/dist/style.css";

const createAndAppendSandboxApp= () => {
  const app = document.createElement("sandbox-app");
  document.body.appendChild(app);
  const sandbox = document.querySelector("sandbox-app");
  return sandbox as HTMLElement;
};

const initializeSandboxApp = (sandbox: HTMLElement) => {
  try {
    if (sandbox) {
        initializeShell(sandbox);
        bootstrapPlugins(plugins); // Cridem a la funció de inicialització de tots els plugins
      }
    }
    catch (error) {
      console.warn(error);
    }
 }

const app = createAndAppendSandboxApp();
initializeSandboxApp(app);
```

  

Després d'aquests passos, ja podries veure en consola el missatge que has escrit a la funció _initializeSandboxApp_.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/ca063fcd-310e-436c-85e9-72bb4e7a6f3d/image.png)



# Preparar i adaptar les vistes

Un pas previ i molt important abans de poder injectar el plugin a les regions, és la creació dels 3 arxius que haurà de tenir cada carpeta per a la seva vista corresponent. Com s'ha mostrat anteriorment, en aquest exemple tenim dues vistes (_header_ i _main_). Per a cada vista, dins de la seva corresponent carpeta hi crearem un arxiu `factory.ts`, un `styles.css` i un `view.tsx`.

  

L'arxiu `factory.ts` declara la funciona de factoria de creació de vista.

L'arxiu `view.tsx` declara el component arrel de la vista.

L'arxiu `styles.css` declara tots els estils dels components de la vista.

  

El _"@uxland/primary-shell"_ conté una funció de utilitat _wrapReactViewFactory_ que facilita la creació de factories de vistes de components funcionals React, embolcallant el component de React amb els estils en un WebComponent.

  

En el cas del HeaderView crearíem el arxiu `factory.ts` :

  

```javascript
import { wrapReactViewFactory } from "@uxland/primary-shell";
import styles from "./styles.css?inline";
import { HeaderView } from "./view";

export const headerFactory = wrapReactViewFactory(HeaderView, styles);
```

  

L'arxiu `view.tsx` amb el component funcional de react de la vista:

```typescript
export const HeaderView = () => {
  return (
      <div>
        <div className="title">
            React Harmonix plugin
        </div>
      </div>
  );
}
```

  

I l'arxiu `styles.css` doncs serà l'estil que li apliquem a la nostre vista:

  

```css
.title {
    color: purple;
    background: orange;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid purple;
}
  
```

  

Important: en els casos en que el component que fa de vista tingui internament altres components fills, s'haurà d'importar expressament els estils dels components dels fills per a un correcte funcionament.

  

Per exemple, en el cas d'una de les vistes d'aquest exemple (_MainView_), el component _MainView_ es veu així, en el que internament té el component fill _CounterButton_:

  

```typescript
import React from 'react';
import {CounterButton} from "../../components/counter-button/counter-button";

export const MainView = () => {

const [count, setCount] = React.useState(0);
const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);

  return (
    <>
      <h1>React Harmonix plugin</h1>
      <h2>Contador: {count}</h2>
      <CounterButton onClick={increment}>Incrementar</CounterButton>
      <CounterButton onClick={decrement}>Decrementar</CounterButton>
      <h1>¡Hola, mundo!</h1>
      <p>Este es un componente funcional básico en React dentro de un Web Component.</p>
    </>
  );
};
```

  

Això significa que el seu corresponent arxiu `styles.css` a més a més d'incloure els propis estils del component pare (_MainView_), també hagi d'importar directament els estils del component fill (_CounterButton_):

  

```css
@import "../../components/counter-button/counter-button.css";

h1{
    color: blue;
}
```

I el seu corresponent arxiu `factory.ts` queda així:

```typescript
import { wrapReactViewFactory } from "@uxland/primary-shell";
import { MainView } from "./view";
import styles from "./styles.css?inline";

export const mainFactory = wrapReactViewFactory(MainView, styles);
```

  

El component _CounterButton_ esmentat, tindria el seu arxiu `counter-button.tsx` següent:

```typescript
import react, { ReactNode } from "react";
export const CounterButton: react.FC<{children: ReactNode, onClick: () => void}> = ({children, onClick}) => {
      return (
        <button className="btn-counter" onClick={onClick}>
            {children}
        </button>
      );
    };
```

I el seu arxiu d'estils `counter-button.css` següent:

```css
.btn-counter {
    background-color: #6a0dad;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.1s;
    margin: 10px;
  }
  
  .btn-counter:hover {
    background-color: #8a2be2; 
  }
  
  .btn-counter:active {
    transform: scale(0.95);
    background-color: #5b0e94;
  }
```


# Injectar el plugin a les vistes

Una vegada hem creat el plugin i preparat les vistes, ja podem registrar-les. Per una banda registrarem una vista a la regió principal amb la seva corresponent acció ràpida del menú lateral (concretament a l'acció ràpida de "Crear"), i per l'altre farem el mateix però a la zona del header.

Per a això, utilitzarem el `regionManager` que ens proporciona l'api i els seus mètodes `registerMenu`, `registerQuickAction` o `registerMainView` per escollir en quina regió injectar-los:

  

*   Utilitzarem els mètodes `registerMainView` i `registerView` passant-li la vista, en l'arxiu `plugin.ts`:

  

```typescript
import { PrimariaApi, shellRegions } from "@uxland/primary-shell";
import { mainFactory } from "./views/main/factory";
import { headerFactory } from "./views/header/factory";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view", // Aquí declarem la id de la vista
    factory: mainFactory
  },);

  api.regionManager.registerView(shellRegions.header,{
    id: "plugin-header-view", // Aquí declarem la id de la vista
    factory: headerFactory
  })
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  return Promise.resolve();
}
```

  

*   Canviarem també la funció dispose per a que elimini la vista quan es desactivi el plugin. Per a això importarem `shellRegions` de "_@uxland/primary-shell_" que ens donarà les regions del shell i utilitzarem la regió main, que és on hem registrat la vista prèviament. Com a segon argument, li passarem l'id de la vista que volem eliminar. Com que voldrem eliminar la vista registrada amb la funció `registerMainView`, li passarem aquella mateixa id:

  

```typescript
import { PrimariaApi, shellRegions } from "@uxland/primary-shell";
import { mainFactory } from "./views/main/factory";
import { headerFactory } from "./views/header/factory";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: mainFactory
  },);

  api.regionManager.registerView(shellRegions.header,{
    id: "plugin-header-view",
    factory: headerFactory
  })
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  api.regionManager.removeView(shellRegions.main, "plugin-main-view"); //Aquí utilitzarem la id de la vista del main que volem eliminar
  return Promise.resolve();
}
```

  

*   Per a afegir el plugin en el menú d'accions ràpides, utilitzarem el mètode `registerQuickAction` del `regionManager`. En aquest cas, a la factoria li passarem una instància de la classe `PrimariaMenuItem` importada del shell (_@uxland/primary-shell_), i a la mateixa vegada, li passarem el literal de la icona a mostrar i el títol que es mostrarà en el menú d'accions ràpides i la callback que activarà la vista registrada al main al clicar l'ítem del menú:

  

```typescript
import { PrimariaApi, PrimariaMenuItem, shellRegions } from "@uxland/primary-shell";
import { mainFactory } from "./views/main/factory";
import { headerFactory } from "./views/header/factory";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: mainFactory
  },);
  // Afegim registerQuickAction
  api.regionManager.registerQuickAction({
    id: "plugin-quick-action",
    factory: () => Promise.resolve(new PrimariaMenuItem("add_circle_outline", "React plugin", () => {
      api.regionManager.activateMainView("plugin-main-view");
  })),
  });

  api.regionManager.registerView(shellRegions.header,{
    id: "plugin-header-view",
    factory: headerFactory
  })
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  api.regionManager.removeView(shellRegions.main, "plugin-main-view"); //Aquí utilitzarem la id de la vista del main que volem eliminar
  return Promise.resolve();
}
```

  

Arribats a aquest punt, en el navegador veurem el següent:

![](https://t9012015559.p.clickup-attachments.com/t9012015559/eba6fa91-d203-4b78-ad34-86c181e3a068/image.png)

  

I quan fem click sobre el botó "Crear" del menú ràpid, veurem el nostre plugin "React plugin" funcionant i mostrat a la regió principal:

![](https://t9012015559.p.clickup-attachments.com/t9012015559/878b26a8-be82-4d55-a775-e9270fa7861d/image.png)

![](https://t9012015559.p.clickup-attachments.com/t9012015559/9bd3ad34-3993-4913-abd0-3d3e619e0522/image.png)

  

Enhorabona, has implementat el teu primer plugin a Harmonix!

Si vols veure el resultat d'aquesta configuració i creació d'un plugin d'Harmonix amb React, aquí es mostra una demo del repositori:

[https://stackblitz.com/~/github.com/uxland/harmonix-react-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-react-plugin-demo)