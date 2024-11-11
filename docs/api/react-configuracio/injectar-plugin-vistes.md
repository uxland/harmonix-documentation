---
sidebar_position: 11
---

# 11- Injectar el plugin a les vistes

Una vegada hem creat el plugin i preparat les vistes, ja podem registrar-les. Per una banda registrarem una vista a la regió principal amb la seva corresponent acció ràpida del menú lateral (concretament a l'acció ràpida de "Crear"), i per l'altre farem el mateix però a la zona del header.

Per a això, utilitzarem el _regionManager_ que ens proporciona l'api i els seus mètodes _registerMenu, registerQuickAction o registerMainView_ per escollir en quina regió injectar-los:

  

*   Utilitzarem els mètodes _registerMainView_ i registerView passant-li la vista, en l'arxiu `plugin.ts`:

  

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

  

*   Canviarem també la funció dispose per a que elimini la vista quan es desactivi el plugin. Per a això importarem _shellRegions_ de "_@uxland/primary-shell_" que ens donarà les regions del shell i utilitzarem la regió main, que és on hem registrat la vista prèviament. Com a segon argument, li passarem l'id de la vista que volem eliminar. Com que voldrem eliminar la vista registrada amb la funció _registerMainView_, li passarem aquella mateixa id:

  

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

  

*   Per a afegir el plugin en el menú d'accions ràpides, utilitzarem el mètode _registerQuickAction_ del _regionManager_. En aquest cas, a la factoria li passarem una instància de la classe _PrimariaMenuItem_ importada del shell (_@uxland/primary-shell_), i a la mateixa vegada, li passarem el literal de la icona a mostrar i el títol que es mostrarà en el menú d'accions ràpides i la callback que activarà la vista registrada al main al clicar l'ítem del menú:

  

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