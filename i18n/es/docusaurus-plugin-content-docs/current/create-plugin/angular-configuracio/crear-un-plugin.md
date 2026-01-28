---
sidebar_position: 2
---

# Crear un plugin

# Configura tu Entorno de Desarrollo

Antes de comenzar, necesitas tener instalado Node.js y npm (el gestor de paquetes de Node). Puedes descargarlos desde la página oficial de Node.js.

> Nota: Esta guía está basada en Angular 18 y cubre todas las funcionalidades disponibles en esta versión. Sin embargo, para versiones posteriores de Angular, la mayor parte de la información contenida debería ser aplicable, teniendo en cuenta las posibles variaciones introducidas en versiones más recientes. Se recomienda revisar las notas de versión oficiales para asegurar la compatibilidad completa con la versión utilizada.




# Instala Angular CLI

Angular CLI es una herramienta que te ayuda a crear y gestionar proyectos Angular. Abre tu terminal o línea de comandos e instálalo con el siguiente comando:



```git
npm install -g @angular/cli@18
```


# Crea un Nuevo Proyecto

Una vez instalado Angular CLI, puedes crear un nuevo proyecto con este comando:



```git
ng new nombre-de-tu-proyecto --routing=false --style=css --view-encapsulation=ShadowDom
```



Nos hará la siguiente pregunta:



```git
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N)
```



Le contestaremos que no, y esperaremos que se instalen todas las dependencias.


# Ejecuta tu Aplicación


Para ver tu aplicación en acción, navega al directorio del proyecto y ejecuta:



```git
cd nombre-de-tu-proyecto
ng serve
```



Esto iniciará un servidor local. Abre tu navegador y dirígete a [`http://localhost:4200`](http://localhost:4200/) para ver tu nueva aplicación Angular.


# Añadir dependencia al Shell

Para añadir la dependencia "_@uxland/primary-shell"_ a tu proyecto, ejecuta el siguiente comando en la raíz de tu proyecto:



```sql
npm install @uxland/primary-shell
```


# Inicializar el Shell

Al inicializar el proyecto, el fichero `main.ts` lo tenemos de esta manera:



```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```



Para la inicialización del shell, sustituiremos el fichero `main.ts` que hemos visto arriba por el siguiente código:



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

const sandbox = createAndAppendSandboxApp();
initializeSandboxApp(sandbox);
```



Elimina el contenedor "app-root" y añade los estilos básicos del shell en el `index.html`:



```xml
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular plugin demo</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>

</body>

<custom-style>
  <style>
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
  </style>
</custom-style>
</html>
```



Se debería ver renderizado el Shell de primaria en el navegador.



![](/img/pluginAngular1.png)


# Generar proyecto de plugin

Los plugins de Harmonix con Angular serán realmente librerías de Angular. Utilizaremos Angular CLI para generarla.

```bash
ng generate library my-plugin
```
Esto debería generar una carpeta nueva con el código my-plugin en la carpeta projects.


## Eliminar ficheros de plantilla

Se deben eliminar los ficheros de plantilla. Eliminamos la carpeta `lib` y el fichero `public-api`


## Declarar fichero de entrada del plugin
Se debe declarar un fichero donde se implementan las funciones necesarias para declarar un plugin. Por convención el fichero se llama `plugin.ts`. Entonces crearemos el fichero `projects/my-plugin/src/plugin.ts`.

```javascript
import "@angular/compiler";
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
    return Promise.resolve();
};

export const dispose = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
    return Promise.resolve();
};
```
Es importante añadir el `import "@angular/compiler";` para poder compilar en tiempo de ejecución en la aplicación.

En el fichero `ng-package.json` se debe modificar la entrada de la librería a _entryFile_ y eliminar el campo `dest`.

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "lib": {
    "entryFile": "src/plugin.ts"
  }
}
```



## Importar plugins en el sandbox

### Declarar la definición de importación de plugins

Crearemos un fichero con las definiciones de los plugins con sus importadores.
Aquí le indicaremos la id de plugin y su método de carga.
Para ello, crearemos el fichero `plugins.ts` en la carpeta src de la raíz:

```typescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("../projects/my-plugin/src/plugin") as any;
export const plugins: PluginDefinition[] = [{ pluginId: "angular-plugin", importer: importer}]
```

Esto importará el plugin vía el fichero de entrada (`projects/my-plugins/src/plugin`) creado previamente.

### Ejecutar el arranque de plugins

Llamaremos a la función de arranque de plugins.
Lo haremos llamando a la función _bootstrapPlugins_ en el `main.ts`, pasando como parámetro las definiciones de importaciones (`src/plugins.ts`).

```javascript
import { bootstrapPlugins, initializeShell } from "@uxland/primary-shell";
import { plugins } from "./plugins";
//...

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

//...
```

Ahora deberíamos ver el log de consola una vez haya cargado el plugin.

![](https://t9012015559.p.clickup-attachments.com/t9012015559/f283f009-d22b-4b17-9973-0b5a180bfc71/image.png)



# Inyectar vistas

Ahora que sabemos que el plugin está inicializado correctamente, crearemos un componente y lo inyectaremos en la región principal utilizando el `regionManager` que nos proporciona el api.


### Crear vista:

#### Crear componente
Crear un componente con el CLI de Angular
```verilog
ng generate component MainView --project my-plugin --view-encapsulation ShadowDom
```

Esto generará un componente de Angular, con la vista encapsulada en un ShadowDom, como indica.

#### Convertir en vista
Se creará una carpeta llamada `views`, y moveremos el componente `main-view` a la carpeta `views`.

### Crear aplicación Angular:

A diferencia de otros frameworks como Lit, React... Angular requiere una instancia de aplicación, crearemos la instancia en el `plugin.ts`


```javascript
import { createApplication } from "@angular/platform-browser"; // Añadir este import
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    createApplication().then(() => console.log("Angular application created")); // Añadir esta linea
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);

    return Promise.resolve();
};
//...
```

### Crear factoría de vista:

Crearemos una factoría de vista, para poder registrar la vista principal. Crearemos un fichero `factory.ts` en la carpeta de la vista `main-view` donde declararemos la factoría:

```typescript
import { ApplicationRef, NgZone, Type } from "@angular/core";
import { MainViewComponent } from "./main-view.component";

const viewAngularFactory = <C>(app: ApplicationRef, component: Type<C>): () => Promise<HTMLElement> => () => {
    const host = document.createElement("host-component");
    app.injector.get(NgZone).run(() => app.bootstrap(component, host));
    return Promise.resolve(host);
  }

  export const viewFactory = (app:ApplicationRef)  => viewAngularFactory(app, MainViewComponent);
```

## Inyectar la vista a la región principal

Después, por un lado registraremos una vista a la región principal y por otro lado haremos lo mismo a la región de navegación.

Para ello, utilizaremos el `regionManager` que nos proporciona el api.

Utilizaremos el método `registerMainView` del `regionManager` pasándole la factoría de vista.

Cambiaremos también la función dispose para que elimine la vista cuando se desactive el plugin. Para ello accederemos a las regiones del shell que nos da el api y utilizaremos la región main. Como segundo argumento le pasaremos la id de la vista que queremos eliminar. Como querremos eliminar la vista registrada con la función `registerMainView`, le pasaremos aquella misma id:


```typescript
import { createApplication } from "@angular/platform-browser";
import { PrimariaApi } from "@uxland/primary-shell";
import { viewFactory } from "./views/main-view/factory";

export const initialize = (api: PrimariaApi) => {
    createApplication().then((app) => {
        api.regionManager.registerMainView({
          id: "plugin-main-view", // Aquí declaramos la id de la vista
          factory: viewFactory(app),
        }); //Registramos la vista a la región main con la factoría declarada
      });
    return Promise.resolve();
};

export const dispose = (api: PrimariaApi) => {
  const main = api.regionManager.regions.shell.main;
  api.regionManager.removeView(main, "plugin-main-view"); // Aquí utilizamos la id de la vista del main que queremos eliminar
  return Promise.resolve();
}
```

### Otros ejemplos de inyección de vistas: menú navegación

Para añadir una vista del plugin en el menú lateral de navegación utilizaremos el método registerView del `regionManager`. En este caso, a la factoría le pasaremos una instancia de la clase `PrimariaNavItem` importada del shell (_@uxland/primary-shell_), a la misma vez, le pasaremos un objeto de configuración que tendrá la propiedad "icon" con el literal del icono a mostrar, "label" con el título que se mostrará en el menú y "callbackFn" con la callback que activará la vista registrada en main al clicar el ítem del menú:


```typescript
//...
import { PrimariaApi, PrimariaNavItem } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
  //...
    const navigationMenu = api.regionManager.regions.shell.navigationMenu;
    api.regionManager.registerView(navigationMenu,{
            id: "plugin-navigation-menu",
            factory: () => {
              const menuItem = new PrimariaNavItem({
                icon: "bolt",
                label: "Angular plugin",
                callbackFn: () => {
                  api.regionManager.activateMainView("plugin-main-view");
                },
              });
              return Promise.resolve(menuItem);
            },
          });
    //...
};

//...
```

Llegados a este punto, en el navegador veremos lo siguiente:



![](/img/pluginAngular2.png)

En este punto, si se necesita integrarse con cualquier parte del plugin de Seguimiento Clínico, se requerirá añadir el archivo compilado del plugin en el Sandbox. Para incluirlo, se debe añadir el import del plugin al archivo `plugins.ts`. Este import se podrá obtener directamente del repositorio de demo que se muestra al final.
De esta manera, la vista que se visualizaría si se incorpora el plugin de Seguimiento Clínico sería la siguiente:

![](/img/pluginAngular2.1.png)

Y al clicar en el botón "Angular plugin", veremos nuestro plugin funcionando y mostrado en la región principal:


![](/img/pluginAngular3.png)



¡Enhorabuena, has implementado tu primer plugin en Harmonix!

Puedes ver un repositorio de ejemplo donde se implementa un plugin con Angular:

[https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo)
