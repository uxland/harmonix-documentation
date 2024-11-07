---
sidebar_position: 10
---

# 9- Injectar el plugin a les vistes

Una vegada hem creat el plugin, ja podem registrar les vistes. Per una banda registrarem una vista a la regió principal, i per l'altre farem el mateix però a la zona on es troben les accions ràpides (zona inferior del sidebar).

Per a això, utilitzarem el _regionManager_ que ens proporciona l'api i els seus mètodes _registerMenu, registerQuickAction o registerMainView_ per escollir en quina regió injectar-los:

  

*   Utilitzarem el mètode _registerMainView_ del _regionManager_ passant-li la vista. En aquest cas aprofitarem el component _MyElement_ del boilerplate de Vite com a exemple. L'arxiu `plugin.ts`:

  

```javascript
import { PrimariaApi } from "@uxland/primary-shell";
import { MyElement } from "./my-element";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view", // Aquí declarem la id de la vista
    factory: () =>  Promise.resolve(new MyElement()) ,
  });
  
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  return Promise.resolve();
}
```

*   Canviarem també la funció dispose per a que elimini la vista quan es desactivi el plugin. Per a això importarem _shellRegions_ de "_@uxland/primary-shell_" que ens donarà les regions del shell i utilitzarem la regió main, que és on hem registrat la vista prèviament. Com a segon argument, li passarem l'id de la vista que volem eliminar. Com que voldrem eliminar la vista registrada amb la funció _registerMainView_, li passarem aquella mateixa id:

```javascript
import { PrimariaApi, shellRegions } from "@uxland/primary-shell";
import { MyElement } from "./my-element";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view", // Aquí declarem la id de la vista
    factory: () =>  Promise.resolve(new MyElement()) ,
  }); 
  
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
```

  

```javascript
  api.regionManager.removeView(shellRegions.main, "plugin-main-view"); //Aquí utilitzarem la id de la vista del main que volem eliminar
  return Promise.resolve();
}
```

  

*   Per a afegir el plugin en el menú ràpid, utilitzarem el mètode _registerQuickAction_ del _regionManager_. En aquest cas, a la factoria li passarem una instància de la classe _PrimariaMenuItem_ importada del shell (_@uxland/primary-shell_), i a la mateixa vegada, li passarem el literal de la icona a mostrar i el títol que es mostrarà en el menú d'accions ràpides i la callback que activarà la vista registrada al main al clicar l'ítem del menú:

```typescript
import { PrimariaApi, PrimariaMenuItem, shellRegions } from "@uxland/primary-shell";
import { MyElement } from "./my-element";

export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: () =>  Promise.resolve(new MyElement()) ,
  },);
  
  api.regionManager.registerView(shellRegions.navigationMenu,{
    id: "plugin-quick-action",
    factory: () => Promise.resolve(new PrimariaMenuItem("add_circle_outline", "Lit plugin", () => {
        api.regionManager.activateMainView("plugin-main-view");
  })),
  });
  return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
  api.regionManager.removeView(shellRegions.main, "plugin-main-view"); // Aquí utilitzarem la id de la vista del main que volem eliminar
api.regionManager.removeView(shellRegions.navigationMenu, "plugin-quick-action");
  return Promise.resolve();
}
```

  

Arribats a aquest punt, en el navegador veurem el següent:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/7210c360-7360-4a06-a837-0b7f8065985d/image.png)

  

I quan fem click sobre el botó "Lit plugin" del menú ràpid, veurem el nostre plugin funcionant i mostrat a la regió principal:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/4b1e7f87-0396-4117-bc0f-62a988f7cdbe/image.png)

  

Enhorabona, has implementat el teu primer plugin a Harmonix!

Si vols veure el resultat d'aquesta configuració i creació d'un plugin d'Harmonix amb Lit, aquí es mostra una demo del repositori:

[https://stackblitz.com/~/github.com/uxland/harmonix-lit-plugin-demo](https://stackblitz.com/~/github.com/uxland/harmonix-lit-plugin-demo)