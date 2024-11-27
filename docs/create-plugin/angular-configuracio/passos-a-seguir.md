---
sidebar_position: 2
---

# Passos a seguir

# Configura el teu Entorn de Desenvolupament

Abans de començar, necessites tenir instal·lat Node.js i npm (el gestor de paquets de Node). Pots descarregar-los des de la pàgina oficial de Node.js.


# Instal·la Angular CLI

Angular CLI és una eina que t'ajuda a crear i gestionar projectes Angular. Obre el teu terminal o línia de comandes i instal·la-ho amb la següent comanda:

  

```git
npm install -g @angular/cli
```


# Crea un Nou Projecte

Una vegada instal·lat Angular CLI, pots crear un nou projecte amb aquesta comanda:

  

```git
ng new nom-del-teu-projecte --routing=false --style=css --view-encapsulation=ShadowDom
```

  

Ens farà la següent pregunta:

  

```git
? Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? (y/N)
```

  

Li contestarem que no, i esperarem que s'instal·lin totes les dependències.


# Executa la teva Aplicació


Per veure la teva aplicació en acció, navega al directori del projecte i executa:

  

```git
cd nom-del-teu-projecte
ng serve
```

  

Això iniciarà un servidor local. Obre el teu navegador i dirigeix-te a [`http://localhost:4200`](http://localhost:4200/) per veure la teva nova aplicació Angular.


# Afegir dependència al Shell

Per a afegir la dependència "_@uxland/primary-shell"_ al teu projecte, executa la següent comanda a l'arrel del teu projecte:

  

```sql
npm install @uxland/primary-shell
```


# Inicialitzar el Shell

En inicialitzar el projecte, el fitxer `main.ts` el tenim d'aquesta manera:

  

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

  

Per a la inicialització del shell, substituirem el fitxer `main.ts` que hem vist a dalt pel següent codi:

  

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

const sandbox = createAndAppendSandboxApp();
initializeSandboxApp(sandbox);
```

  

Elimina el contenidor "app-root" i afegeix els estils bàsics del shell a l' `index.html`:

  

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

  

Hauries de veure renderitzat el Shell de primària en el navegador.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/d1b3bfcd-ebdc-4eef-85b1-fe6f995e8374/image.png)


# Generar projecte de plugin

Els plugins d'harmonix amb Angular seràn realment llibreries d'Angular. Utilitzarem l'Angular CLI per generar-la.

```bash
ng generate library my-plugin
```
Això hauria de generar una carpeta nova amb el codi my-plugin a la carpeta projects.


## Eliminar fitxers de plantilla

S'han d'eliminar els fitxer de plantilla. Eliminem la carpta `lib`i el fitxer `public-api`


## Declarar fitxer d'entrada del plugin
S'ha de declarar un fitxer on s'implementen les funcions necessàries per a declarar un plugin. Per conveni el fitxer s'anomena `plugin.ts`. Llavors, crearem el fitxer `projects/my-plugin/src/plugin.ts`.

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
És important afegir el `import "@angular/compiler";` per poder compilar en temps d'execució en l'aplicació.

En el fitxer `ng-package.json` s'ha de modificar l'entrada de la llibreria a _entryFile_ i afegir _plugin.ts_. 

```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/plugin",
  "lib": {
    "entryFile": "src/plugin.ts"
  }
}
```



## Importar plugins en el sandbox

### Declarar la definició d'importació de plugins

Crearem un fitxer amb les definicions dels plugins amb els seus importadors.
Aquí li indicarem la id de plugin i el seu mètode de càrrega.
Per a això, crearem el fitxer `plugins.ts` a la carpeta src de l'arrel:

```typescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("../projects/my-plugin/src/plugin") as any;
export const plugins: PluginDefinition[] = [{ pluginId: "angular-plugin", importer: importer}]
```

Això importarà el plugin via el fitxer d'entrada (`projects/my-plugins/src/plugin`) creat prèviament.

### Executar l'arrencada de plugins

Cridarem a la funció d'arrencada de plugins. 
Ho farem cridant a la funció _bootstrapPlugins_ en el `main.ts`, passant com a paràmetre les definicions d'importacions (`src/plugins.ts`). 

```javascript
import { bootstrapPlugins, initializeShell } from "@uxland/primary-shell";
import { plugins } from "./plugins";
//...

const initializeSandboxApp = (sandbox: HTMLElement) => {
    try {
        if (sandbox) {
            initializeShell(sandbox);
            bootstrapPlugins(plugins); // Cridem a la funció d'inicialització de tots els plugins
        }
    }
    catch (error) {
        console.warn(error);
    }
}

//...
```

Ara hauríem de veure el log de consola una vegada hagi carregat el plugin.

![](https://t9012015559.p.clickup-attachments.com/t9012015559/f283f009-d22b-4b17-9973-0b5a180bfc71/image.png)



# Injectar vistes

Ara que sabem que el plugin està inicialitzat correctament, crearem un component i l'injectarem a la regió principal utilitzant el _regionManager_ que ens proporciona l'api.
  

### Crear vista:

#### Crear component 
Crear un component amb el CLI d'Angular
```verilog
ng generate component MainView --project my-plugin --view-encapsulation ShadowDom
```

Això generarà un component d'Angular, amb la vista encapsulada en un ShadowDom, com indica.

#### Convertir en vista
Es crearà una carpeta anomenada `views`, i mourem el component `main-view` a la carpeta `views`. 

### Crear aplicació Angular:

A diferència d'altres frameworks com Lit, React... Angular requereix una instància d'aplicació, crearem la instància en el  `plugin.ts`
  

```javascript
import { createApplication } from "@angular/platform-browser"; // Afegir aquest import
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    createApplication().then(() => console.log("Angular application created")); // Afegir aquesta linea
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);

    return Promise.resolve();
};
//...
```

### Crear factoria de vista:

Crearem una factoria de vista, per poder registrar la vista principal. Crearem un fitxer `factory.ts` a la carpeta de la vista `main-view` on declararem la factoria:

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

## Injectar la vista a la regio principal

Després, per un costat registrarem una vista a la regió principal i per altre costat farem el mateix a la regió de navegació.

Per a això, utilitzarem el _regionManager_ que ens proporciona l'api.

Utilitzarem el mètode _registerMainView_ del _regionManager_ passant-li la factoria de vista. 

Canviarem també la funció dispose perquè elimini la vista quan es desactivi el plugin. Per a això, importarem shellRegions de "_@uxland/primary-shell_" que ens donarà les regions del shell i utilitzarem la regió main. Com a segon argument li passarem la id de la vista que volem eliminar. Com que voldrem eliminar la vista registrada amb la funció registerMainView, li passarem aquella mateixa id:


```typescript
import { createApplication } from "@angular/platform-browser";
import { PrimariaApi, shellRegions } from "@uxland/primary-shell";
import { viewFactory } from "./views/main-view/factory";

export const initialize = (api: PrimariaApi) => {
    createApplication().then((app) => {
        api.regionManager.registerMainView({
          id: "plugin-main-view", // Aquí declarem la id de la vista
          factory: viewFactory(app), 
        }); //Registrem la vista a la regio main amb la factoria declarada
      });
    return Promise.resolve();
};

export const dispose = (api: PrimariaApi) => {
    api.regionManager.removeView(shellRegions.main, "plugin-main-view"); // Aquí utilitzem la id de la vista del main que volem eliminar
    return Promise.resolve();
};
```

### Altres exemples d'injecció de vistes: menú navegació 
  
Per afegir una vista del plugin en el menú ràpid utilitzarem el mètode registerView del regionManager. En aquest cas, a la factoria li passarem una instància de la classe _PrimariaMenuItem_ importada del shell (_@uxland/primary-shell_), a la mateixa vegada, li passarem el literal de la icona a mostrar, el títol que apareixerà en el menú d'accions ràpides i la callback que activarà la vista registrada al main en clicar l'ítem del menú:


```typescript
//...
import { PrimariaApi, PrimariaMenuItem, shellRegions } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
  //...
    api.regionManager.registerView(shellRegions.navigationMenu,{
            id: "plugin-quick-action",
            factory: () => Promise.resolve(new PrimariaMenuItem("add_circle_outline", "Angular plugin", () => {
              api.regionManager.activateMainView("plugin-main-view");
            })),
          });
    //...
};

//...
```

Arribats a aquest punt, en el navegador veurem el següent:

  

![](/static/img/pluginSidebar.png)

  

I en clicar en el botó "Angular plugin", veurem el nostre plugin funcionant i mostrat a la regió principal:

  
![](/static/img/pluginWorking.png)



Enhorabona, has implementat el teu primer plugin a Harmonix!

Pots veure un repositori d'exemple on s'implementa un plugin amb Angular:

[https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo)