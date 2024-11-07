---
sidebar_position: 10
---

# 9- Crear component i injectar el plugin en les vistes

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

###   

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
