---
sidebar_position: 2
---

# Crear un plugin

# Configura tu Entorno de Desarrollo

Antes de comenzar, necesitas tener instalado Node.js y npm (el gestor de paquetes de Node). Puedes descargarlos desde la página oficial de Node.js.


# Crea un Nuevo Proyecto

Una vez instalado Node, puedes crear un nuevo proyecto. Recomendamos utilizar Vite y TypeScript usando, por ejemplo, este comando:



```git
npm create vite@latest lit-plugin-demo -- --template lit-ts
```



Sigue las instrucciones en pantalla para configurar tu proyecto.


# Ejecuta tu Aplicación

Para ver tu aplicación en acción, navega al directorio de tu proyecto y ejecuta:



```git
cd nombre-de-tu-proyecto
npm install
npm run dev
```



Esto iniciará un servidor local. Abre tu navegador y dirígete a [`http://localhost:5173`](http://localhost:5173/) (puerto por defecto de Vite) para ver tu nueva aplicación Lit.


# Edita tu Aplicación

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

*   Crea un archivo `sandbox.ts` en la carpeta src del proyecto
*   Importa este archivo `sandbox.ts` en tu `index.html` como script de entrada. Para ello, modifica la ruta de la siguiente línea por la del sandbox:

```xml
  <script type="module" src="/src/my-element.ts"></script>
```

*   En el `index.html` elimina las siguientes líneas:



```html
<my-element>
  <h1>Vite + Lit</h1>
</my-element>
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



![](/img/pluginLit1.png)



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

export const plugins: PluginDefinition[] = [{ pluginId: "lit-plugin", importer: importer }];
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



![](https://t9012015559.p.clickup-attachments.com/t9012015559/bf8f57cb-8238-4a24-80e2-f40105da69db/console.png)



# Inyectar el plugin a las vistas

Una vez hemos creado el plugin, ya podemos registrar las vistas. Registraremos una vista en la región del menú lateral de navegación.

Para ello, utilizaremos el `regionManager` que nos proporciona el api y sus métodos `registerMainView` y `registerNavigationMenu` para escoger en qué región inyectarlos:



*   Utilizaremos el método `registerMainView` del `regionManager` pasándole la vista. En este caso aprovecharemos el componente _MyElement_ del boilerplate de Vite como ejemplo. El archivo `plugin.ts`:



```javascript
import { PrimariaApi } from "@uxland/primary-shell";
import { MyElement } from "./my-element";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view", // Aquí declaramos la id de la vista
    factory: () =>  Promise.resolve(new MyElement()) ,
  });

  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  return Promise.resolve();
}
```

*   Cambiaremos también la función dispose para que elimine la vista cuando se desactive el plugin. Para ello accederemos a la región "main" que nos da el api, que es donde hemos registrado la vista previamente. Como segundo argumento, le pasaremos el id de la vista que queremos eliminar. Como querremos eliminar la vista registrada con la función `registerMainView`, le pasaremos aquella misma id:

```javascript
import { PrimariaApi } from "@uxland/primary-shell";
import { MyElement } from "./my-element";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view", // Aquí declaramos la id de la vista
    factory: () =>  Promise.resolve(new MyElement()) ,
  });

  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  const main = api.regionManager.regions.shell.main;
  api.regionManager.removeView(main, "plugin-main-view"); //Aquí utilizaremos la id de la vista del main que queremos eliminar
  return Promise.resolve();
}
```



*   Para añadir el plugin en el menú lateral, utilizaremos el método `registerView` del `regionManager`, al cual se le especifica la región (`navigationMenu`). En este caso, a la factoría le pasaremos una instancia de la clase `PrimariaNavItem` importada del shell (_@uxland/primary-shell_), y a la misma vez, le pasaremos un objeto de configuración que tendrá la propiedad "icon" con el literal del icono a mostrar, "label" con el título que se mostrará en el menú y "callbackFn" con la callback que activará la vista registrada en main al clicar el ítem del menú:

```typescript
import { PrimariaApi, PrimariaNavItem } from "@uxland/primary-shell";
import { MyElement } from "./my-element";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: () =>  Promise.resolve(new MyElement()) ,
  },);

  const navigationMenu = api.regionManager.regions.shell.navigationMenu
  api.regionManager.registerView(navigationMenu,{
    id: "plugin-sidebar",
    factory: () => {
      const menuItem = new PrimariaNavItem({
        icon: "add_box",
        label: "Lit plugin",
        callbackFn: () => {
          api.regionManager.activateMainView("plugin-main-view")
        },
      });
      return Promise.resolve(menuItem);
    },
  });
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  const main = api.regionManager.regions.shell.main;
  api.regionManager.removeView(main, "plugin-main-view"); // Aquí utilizaremos la id de la vista del main que queremos eliminar
  const navigationMenu = api.regionManager.regions.shell.navigationMenu;
  api.regionManager.removeView(navigationMenu, "plugin-sidebar");
  return Promise.resolve();
}
```


Llegados a este punto, en el navegador veremos lo siguiente:


![](/img/pluginLit2.1.png)

En este punto, si se necesita integrarse con cualquier parte del plugin de Seguimiento Clínico, se requerirá añadir el archivo compilado del plugin en el Sandbox. Para incluirlo, se debe añadir el import del plugin al archivo `plugins.ts`. Este import se podrá obtener directamente del repositorio de demo que se muestra al final.
De esta manera, la vista que se visualizaría si se incorpora el plugin de Seguimiento Clínico sería la siguiente:

![](/img/pluginLit2.png)


Y cuando hagamos click sobre el botón "Lit plugin" del menú rápido, veremos nuestro plugin funcionando y mostrado en la región principal:



![](/img/pluginLit3.png)



¡Enhorabuena, has implementado tu primer plugin en Harmonix!

Si quieres ver el resultado de esta configuración y creación de un plugin de Harmonix con Lit, aquí se muestra una demo del repositorio:

[https://stackblitz.com/~/github.com/uxland/harmonix-lit-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-lit-plugin-demo)
