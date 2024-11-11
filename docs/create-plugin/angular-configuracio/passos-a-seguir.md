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

En inicialitzar el projecte, l'arxiu `main.ts` el tenim d'aquesta manera:

  

```coffeescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

  

Per a la inicialització del shell, substituirem l'arxiu `main.ts` que hem vist a dalt pel següent codi:

  

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


# Declarar importador de plugins

Crearem un arxiu amb les definicions dels plugins amb els seus importadors. Per a això, crearem l'arxiu `plugins.ts` a la carpeta src amb la següent forma:

  

```typescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("./plugin") as any;
export const plugins: PluginDefinition[] = [{ pluginId: "angular-plugin", importer: importer}]
```

  

Ens donarà error en l'import al no existir, de moment, la ruta "_./plugin_" que crearem en el punt següent.


# Declarar arxiu d'entrada del plugin

S'ha de declarar un arxiu on s'implementen les funcions necessàries per a declarar un plugin.

  

En aquest tutorial decidim utilitzar un arxiu `plugin.ts` dins de la carpeta src:

  

```javascript
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

  

Ara només queda indicar-li al shell que afegeixi el plugin en el procés de càrrega. Aquí li indicarem la id de mòdul i com carregar el mòdul. En el nostre cas serà un import a l'arxiu `plugin.ts` creat anteriorment.

  

Ho farem cridant a la funció _bootstrapPlugins_ en el `main.ts`. Donant com a resultat el següent arxiu:

  

```javascript
import { bootstrapPlugins, initializeShell } from "@uxland/primary-shell";
import "@uxland/primary-shell/dist/style.css";
import { plugins } from "./plugins";

const createAndAppendSandboxApp = () => {
    const app = document.createElement("sandbox-app");
    document.body.appendChild(app);
    const sandbox = document.querySelector("sandbox-app");
    return sandbox as HTMLElement;
}

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

const sandbox = createAndAppendSandboxApp();
initializeSandboxApp(sandbox);
```

  

Ara hauríem de veure el log de consola una vegada hagi carregat el mòdul.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/f283f009-d22b-4b17-9973-0b5a180bfc71/image.png)



# Crear component i injectar el plugin en les vistes

Ara que sabem que el plugin està inicialitzat correctament, crearem un component i l'injectarem a la vista principal utilitzant el _regionManager_ que ens proporciona la api.

  

### Crear un component:

  

Crear un component amb el CLI d'Angular

  

```verilog
ng generate component NewComponent --view-encapsulation ShadowDom
```

  

Això generarà un component d'Angular, amb la vista encapsulada en un ShadowDom, com indica.

  

Per a la demo utilitzarem com a component el _app.component_ del boilerplate d'Angular, així que afegirem la propietat _encapsulation_ a la configuració del component:

  

```typescript
import { Component, ViewEncapsulation } from "@angular/core";

@Component({
  standalone: true,
  imports: [],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = "angular-module";
}


```


### Crear aplicació Angular:

  

A diferència d'altres frameworks com Lit, React... Angular requereix una instància d'aplicació, així que la cridarem en el `plugin.ts`

  

```javascript
import { createApplication } from "@angular/platform-browser";
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    createApplication().then(() => console.log("Angular application created"));
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);

    return Promise.resolve();
};

export const dispose = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
    return Promise.resolve();
};
```

  

### Injectar plugin en les vistes:

  

Una vegada creada l'aplicació i el component, ja podem registrar les vistes amb el _regionManager_. Per a ajudar-nos, declararem la funció _viewAngularFactory_ en el plugin.ts que ens farà de factoria:

  

```typescript
const viewAngularFactory = <C>(app: ApplicationRef, component: Type<C>): () => Promise<HTMLElement> => () => {
  const host = document.createElement("host-component");
  app.injector.get(NgZone).run(() => app.bootstrap(component, host));
  return Promise.resolve(host);
}
```

  

Després, per un costat registrarem un component a la vista principal i per altre costat farem el mateix a la zona per les accions ràpides (a la zona inferior del sidebar).

Per a això, utilitzarem el _regionManager_ que ens proporciona la api i els seus mètodes _registerMenu, registerQuickAction o registerMainView_ per escollir en quina regió injectar-los:

  

*   Utilitzarem el mètode _registerMainView_ del _regionManager_ passant-li la vista.

  

*   Canviarem també la funció dispose perquè elimini la vista quan es desactivi el plugin. Per a això, importarem shellRegions de "_@uxland/primary-shell_" que ens donarà les regions del shell i utilitzarem la regió main. Com a segon argument li passarem la id de la vista que volem eliminar. Com que voldrem eliminar la vista registrada amb la funció registerMainView, li passarem aquella mateixa id:

  

```typescript
import { ApplicationRef, NgZone, Type } from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import { PrimariaApi, shellRegions } from "@uxland/primary-shell";
import { AppComponent } from "./app/app.component";

const viewAngularFactory = <C>(app: ApplicationRef, component: Type<C>): () => Promise<HTMLElement> => () => {
  const host = document.createElement("host-component");
  app.injector.get(NgZone).run(() => app.bootstrap(component, host));
  return Promise.resolve(host);
}

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);

  createApplication().then((app) => {
    api.regionManager.registerMainView({
      id: "plugin-main-view", // Aquí declarem la id de la vista
      factory: viewAngularFactory(app, AppComponent),
    })

  return Promise.resolve();
})
}

export const dispose = (api: PrimariaApi) => {
  api.regionManager.removeView(shellRegions.main, "plugin-main-view"); // Aquí utilitzem la id de la vista del main que volem eliminar
}
```

  

*   Per a afegir el plugin en el menú ràpid utilitzarem el mètode registerView del regionManager. En aquest cas, a la factoria li passarem una instància de la classe _PrimariaMenuItem_ importada del shell (_@uxland/primary-shell_), a la mateixa vegada, li passarem el literal de la icona a mostrar, el títol que apareixerà en el menú d'accions ràpides i la callback que activarà la vista registrada al main en clicar l'ítem del menú:

  

```typescript
import { ApplicationRef, NgZone, Type } from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import { PrimariaApi, PrimariaMenuItem, shellRegions } from "@uxland/primary-shell";
import { AppComponent } from "./app/app.component";

const viewAngularFactory = <C>(app: ApplicationRef, component: Type<C>): () => Promise<HTMLElement> => () => {
  const host = document.createElement("host-component");
  app.injector.get(NgZone).run(() => app.bootstrap(component, host));
  return Promise.resolve(host);
}

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);

  createApplication().then((app) => {
    api.regionManager.registerMainView({
      id: "plugin-main-view",
      factory: viewAngularFactory(app, AppComponent),
    } as any)

    api.regionManager.registerQuickAction({
      id: "plugin-quick-action",
      factory: () => Promise.resolve(new PrimariaMenuItem("add_circle_outline", "Angular plugin", () => {
        api.regionManager.activateMainView("plugin-main-view");
  })),
    });
  });

  return Promise.resolve();
};

export const dispose = (api: PrimariaApi) => {
  api.regionManager.removeView(shellRegions.main, "plugin-main-view");
};
```

  

Arribats a aquest punt, en el navegador veurem el següent:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/2c987c5c-a1c1-4858-bb2e-891f6d664164/image.png)

  

I en clicar en el botó "Angular plugin" dins del menú ràpid de "Crear", veurem el nostre plugin funcionant i mostrat a la regió principal:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/713ae18c-c628-4aa5-8e62-2977f77d34a2/image.png)

![](https://t9012015559.p.clickup-attachments.com/t9012015559/839625e6-edc9-4d94-a7ee-3fb175b8fcb8/image.png)

  

Enhorabona, has implementat el teu primer plugin a Harmonix!

Si vols veure el resultat d'aquesta configuració i creació d'un plugin d'Harmonix amb Angular, aquí es mostra una demo del repositori:

[https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo)
