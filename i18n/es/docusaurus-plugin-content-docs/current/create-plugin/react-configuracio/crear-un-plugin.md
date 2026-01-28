---
sidebar_position: 2
---

# Crear un plugin

# Configura tu Entorno de Desarrollo

Inicialmente, necesitas tener instalado Node.js y npm (el gestor de paquetes de Node). Puedes descargarlos desde la página oficial de Node.js.


# Crea un Nuevo Proyecto

Una vez instalado Node, puedes crear un nuevo proyecto. Recomendamos utilizar Vite y TypeScript usando, por ejemplo, este comando:



```bash
npm create vite@latest react-plugin-demo -- --template react-ts
```



Sigue las instrucciones en pantalla para configurar tu proyecto.



![](https://t9012015559.p.clickup-attachments.com/t9012015559/f0ec33fe-17c8-4ed1-bc39-addf9a57491b/image.png)


# Ejecuta tu Aplicación

Para ver tu aplicación en acción, navega al directorio de tu proyecto y ejecuta:



```bash
cd nombre-de-tu-proyecto
npm install
npm run dev
```



Esto iniciará un servidor local. Abre tu navegador y dirígete a [`http://localhost:5173`](http://localhost:5173/) (puerto por defecto de Vite) para ver tu nueva aplicación Lit.


# Prepara tu aplicación antes de editar

Antes de pasar a editar la aplicación, recomendamos tener una estructura mínima de archivos y carpetas establecida de manera inicial, para que posteriormente sea más fácil y simple llevar a cabo la edición de los archivos de la aplicación. Así que puedes eliminar los archivos `App.css`, `App.tsx` y `main.tsx` que se crean predeterminadamente. Un ejemplo sería el siguiente:



![](https://t9012015559.p.clickup-attachments.com/t9012015559/d654ef96-03b8-4f93-a699-0be10908d54e/image.png)

En este ejemplo se crea una carpeta para los componentes, y una carpeta para las vistas que se quieran registrar al shell (en este ejemplo dos, una para la región del header y la otra para la región main). Los archivos `plugin.ts`, `plugins.ts` y `sandbox.ts` se crean en los próximos pasos.


# Edita tu aplicación

Puedes comenzar por editar tu aplicación abriendo el directorio de tu proyecto en tu editor de código favorito.



*   Sustituye las reglas de estilo del archivo `index.css` por las siguientes:

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

Y a continuación enlaza este archivo `index.css` al head de tu archivo `index.html`:

```css
  <link rel="stylesheet" href="./src/index.css" />
```



*   Crea un archivo `sandbox.ts` en la carpeta src del proyecto
*   Importa este archivo `sandbox.ts` en tu `index.html` como script de entrada. Para ello, modifica la ruta de la siguiente línea por la del sandbox:

```xml
  <script type="module" src="/src/main.tsx"></script>
```

*   En el `index.html`, dentro de la etiqueta _body_ puedes eliminar lo siguiente:



```html
<div id="root"></div>
```


# Añadir dependencia al Shell

Para añadir la dependencia _@uxland/primary-shell_ a tu proyecto, ejecuta el siguiente comando en la raíz de tu proyecto:



```bash
npm install @uxland/primary-shell
```


# Inicializar el Shell

En el archivo `sandbox.ts` le añadiremos el siguiente código, donde crearemos un elemento app, lo insertaremos en el body y llamaremos a la función _initializeSandboxApp_ pasando el elemento creado. También hará falta importar el archivo de estilos.

```javascript
import { initializeShell } from "@uxland/primary-shell";
import "@uxland/primary-shell/dist/style.css"; // Añadimos los estilos globales del shell y el Design System

// Creamos un contenedor HTML donde inyectaremos el shell más adelante
const createAndAppendSandboxApp = () => {
  const app = document.createElement("sandbox-app");
  document.body.appendChild(app);
  const sandbox = document.querySelector("sandbox-app");
  return sandbox as HTMLElement;
}
// Inicializamos el sandbox y la aplicación
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



Deberías ver renderizado el Shell de primaria en el navegador:


![](/img/pluginReact3.png)



# Declarar archivo de entrada plugin

Se debe declarar un archivo donde se implementen las funciones necesarias para inicializar un plugin.

En este ejemplo crearemos el archivo `plugin.ts` en la carpeta src con el siguiente contenido:



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


# Declarar una colección de plugins

Se debe declarar cada plugin que se quiera inicializar en el shell. Para ello, podemos crear un archivo `plugins.ts` donde exportaremos el array de las definiciones de los plugins. A cada elemento le indicaremos el id y una función para importarlo. Ejemplo:



```coffeescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("./plugin") as any;

export const plugins: PluginDefinition[] = [{ pluginId: "react-plugin", importer: importer }];
```



Ahora se debe indicar al shell que inicialice los plugins en el proceso de inicialización de la app del archivo `sandbox.ts` anterior. Para ello, utilizaremos la función _bootstrapPlugins_ pasándole la colección de plugins que hemos creado antes_._

El archivo quedaría de esta manera:



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
        bootstrapPlugins(plugins); // Llamamos a la función de inicialización de todos los plugins
      }
    }
    catch (error) {
      console.warn(error);
    }
 }

const app = createAndAppendSandboxApp();
initializeSandboxApp(app);
```



Después de estos pasos, ya podrías ver en consola el mensaje que has escrito en la función _initializeSandboxApp_.



![](https://t9012015559.p.clickup-attachments.com/t9012015559/ca063fcd-310e-436c-85e9-72bb4e7a6f3d/image.png)



# Preparar y adaptar las vistas

Un paso previo y muy importante antes de poder inyectar el plugin en las regiones, es la creación de los 3 archivos que deberá tener cada carpeta para su vista correspondiente. Como se ha mostrado anteriormente, en este ejemplo tenemos dos vistas (_header_ y _main_). Para cada vista, dentro de su correspondiente carpeta crearemos un archivo `factory.ts`, un `styles.css` y un `view.tsx`.



El archivo `factory.ts` declara la función de factoría de creación de vista.

El archivo `view.tsx` declara el componente raíz de la vista.

El archivo `styles.css` declara todos los estilos de los componentes de la vista.



El _"@uxland/primary-shell"_ contiene una función de utilidad _wrapReactViewFactory_ que facilita la creación de factorías de vistas de componentes funcionales React, envolviendo el componente de React con los estilos en un WebComponent.



En el caso del HeaderView crearíamos el archivo `factory.ts`:



```javascript
import { wrapReactViewFactory } from "@uxland/primary-shell";
import styles from "./styles.css?inline";
import { HeaderView } from "./view";

export const headerFactory = wrapReactViewFactory(HeaderView, styles);
```



El archivo `view.tsx` con el componente funcional de react de la vista:

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



Y el archivo `styles.css` pues será el estilo que le aplicamos a nuestra vista:



```css
.title {
    color: purple;
    background: orange;
    padding: 5px;
    border-radius: 10px;
    border: 1px solid purple;
}

```



Importante: en los casos en que el componente que hace de vista tenga internamente otros componentes hijos, se deberá importar expresamente los estilos de los componentes de los hijos para un correcto funcionamiento.



Por ejemplo, en el caso de una de las vistas de este ejemplo (_MainView_), el componente _MainView_ se ve así, en el que internamente tiene el componente hijo _CounterButton_:



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



Esto significa que su correspondiente archivo `styles.css` además de incluir los propios estilos del componente padre (_MainView_), también deba importar directamente los estilos del componente hijo (_CounterButton_):



```css
@import "../../components/counter-button/counter-button.css";

h1{
    color: blue;
}
```
NOTA: en caso de necesitar un height y un min-height del 100% en la vista, se puede especificar con el parámetro "fullHeight". Así quedaría pues el archivo `factory.ts`:

```typescript
import { wrapReactViewFactory } from "@uxland/primary-shell";
import { MainView } from "./view";
import styles from "./styles.css?inline";

export const mainFactory = wrapReactViewFactory(MainView, styles, { fullHeight: true });
```



El componente _CounterButton_ mencionado, tendría su archivo `counter-button.tsx` siguiente:

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

Y su archivo de estilos `counter-button.css` siguiente:

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


# Inyectar el plugin a las vistas

Una vez hemos creado el plugin y preparado las vistas, ya podemos registrarlas. Registraremos una vista en la región principal con su correspondiente acción en el menú lateral.

Para ello, utilizaremos el `regionManager` que nos proporciona el api y su método `registerMainView` para registrar directamente a la región o bien el método registerView donde le tendremos que pasar la región del Shell donde los queremos registrar:



*   Utilizaremos el método `registerMainView` pasándole la vista, en el archivo `plugin.ts`:



```typescript
import { PrimariaApi } from "@uxland/primary-shell";
import { mainFactory } from "./views/main/factory";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view", // Aquí declaramos la id de la vista
    factory: ()=> mainFactory({api})
  },);
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  return Promise.resolve();
}
```



*   Cambiaremos también la función dispose para que elimine la vista cuando se desactive el plugin. Para ello accederemos a la región "main" que nos da el api, que es donde hemos registrado la vista previamente. Como segundo argumento, le pasaremos el id de la vista que queremos eliminar. Como querremos eliminar la vista registrada con la función `registerMainView`, le pasaremos aquella misma id:



```typescript
import { PrimariaApi } from "@uxland/primary-shell";
import { mainFactory } from "./views/main/factory";
import { headerFactory } from "./views/header/factory";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: mainFactory
  },);
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  const mainRegion = api.regionManager.regions.shell.main;
  api.regionManager.removeView(mainRegion, "plugin-main-view"); //Aquí utilizaremos la id de la vista del main que queremos eliminar
  return Promise.resolve();
}
```



*   Para añadir el plugin en el menú lateral, utilizaremos el método `registerView` del `regionManager`, al cual se le especifica la región (`navigationMenu`). En este caso, a la factoría le pasaremos una instancia de la clase `PrimariaNavItem` importada del shell (@uxland/primary-shell), y a la misma vez, le pasaremos un objeto de configuración que tendrá la propiedad "icon" con el literal del icono a mostrar, "label" con el título que se mostrará en el menú y "callbackFn" con la callback que activará la vista registrada en main al clicar el ítem del menú:



```typescript
import { PrimariaApi, PrimariaNavItem } from "@uxland/primary-shell";
import { mainFactory } from "./views/main/factory";
import { headerFactory } from "./views/header/factory";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: mainFactory
  },);
  // Añadimos el componente a la región del menú de navegación
  const navigationMenu = api.regionManager.regions.shell.navigationMenu;
  api.regionManager.registerView(navigationMenu, {
    id: "plugin-quick-action",
    factory: () => Promise.resolve(new PrimariaNavItem({
        icon: "add_circle_outline",
        label: "React plugin",
        callbackFn: () => {
      api.regionManager.activateMainView("plugin-main-view")}
    })),
  });
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  const mainRegion = api.regionManager.regions.shell.main;
  api.regionManager.removeView(mainRegion, "plugin-main-view"); //Aquí utilizaremos la id de la vista del main que queremos eliminar
  const navigationMenu = api.regionManager.regions.shell.navigationMenu;
  api.regionManager.removeView(navigationMenu, "plugin-quick-action"); //Aquí utilizaremos la id de la vista de navigationMenu que queremos eliminar
  return Promise.resolve();
}
```



Llegados a este punto, en el navegador veremos lo siguiente:

![](/img/pluginReact.png)

En este punto, si se necesita integrarse con cualquier parte del plugin de Seguimiento Clínico, se requerirá añadir el archivo compilado del plugin en el Sandbox. Para incluirlo, se debe añadir el import del plugin al archivo `plugins.ts`. Este import se podrá obtener directamente del repositorio de demo que se muestra al final.
De esta manera, la vista que se visualizaría si se incorpora el plugin de Seguimiento Clínico sería la siguiente:

![](/img/pluginReact1.png)


Y cuando hagamos clic sobre el botón "React plugin" del menú, veremos nuestro plugin funcionando y mostrado en la región principal:

![](/img/pluginReact2.png)



¡Enhorabuena, has implementado tu primer plugin en Harmonix!

Si quieres ver el resultado de esta configuración y creación de un plugin de Harmonix con React, aquí se muestra una demo del repositorio:

[https://stackblitz.com/~/github.com/uxland/harmonix-react-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-react-plugin-demo)
