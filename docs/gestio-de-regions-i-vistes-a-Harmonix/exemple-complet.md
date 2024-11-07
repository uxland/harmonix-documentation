---
sidebar_position: 6
---

# 5- Exemple complet

Podem crear un nou component per a seguir amb l'exemple, que en aquest cas serà _ExampleComponent_.

  

En la inicialització del plugin, es rep l'objecte _api_, amb un _regionManager_. Aquest objecte permetrà registrar i injectar vistes, activar-les, desactivar-les, eliminar-les i fer tot el necessari.

  

L'acció més bàsica és **registrar** una vista. Per a això, només hem de cridar al mètode _registerView_ indicant la regió on volem injectar la vista i l'objecte _View_. Aquest objecte definirà una factoria que retornarà el component que volem injectar.

  

Ara bé, s'han creat algunes funcions "helper" per tal que la injecció sigui més declarativa, com "_registerMainView_" o "_registerQuickAction_", on ja no caldrà passar-li la regió i la pròpia funció de registrar ja explica on s'injectarà, tal com hem explicat abans.

  

De la mateixa manera, també injectem el _PrimariaMenuItem_ a la regió d'accions ràpides. Aquest _PrimariaMenuItem_ tindrà la funció d'activar la vista del componen_t ExampleComponent_ en fer click.

  

La funció **_activateMainView_** del **_regionManager_** és l'encarregada de seleccionar quina és la vista activa a la regió main. Aquesta, necessita com a argument la id del plugin que s'ha registrat anteriorment, en aquest cas, "_plugin-main-view_".

  

Exemple:

  

```typescript
export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: () =>  Promise.resolve(new ExampleComponent()) ,
  });
  
  api.regionManager.registerQuickAction({
    id: "plugin-quick-action",
    factory: () => Promise.resolve(new PrimariaMenuItem("add_circle_outline", "Lit plugin", () => {
      api.regionManager.activateMainView("plugin-main-view")
    })),
  });
  return Promise.resolve();
};
```