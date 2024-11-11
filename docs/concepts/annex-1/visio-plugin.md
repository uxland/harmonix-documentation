---
sidebar_position: 2
---

# A1.2- Visió ràpida Plugin

I per acabar, tenim els "**plugins**", que no són més que paquets que desenvolupa un 3r, que es compilen, i que un cop publicats a un "Plugin Store" , estan llestos per ser consumits pel Shell.

  

Cada plugin, necessita compilar-se i fer un bundle, generant un arxiu JavaScript, per exemple:

**_plugin1-version-23.45.js._**

  

Aquests plugins, en el seu Javascript necessiten definir un **punt d'entrada** per iniciar el seu cicle de vida. En aquest punt d'iniciació, cada plugin rep un objecte provinent del Shell, anomenat **api**. Amb aquesta API, el plugin té tot el necessari per funcionar dins del Shell. Per exemple, té una forma per registrar cada component a cada regió que s'hagi definit (menú, header, main, footer). Té una forma per escoltar events que un altre plugin hagi pogut comunicar, o un client HTTP per fer crides a un backend, o una forma per ensenyar un missatge de notificació en pantalla, entre moltes altres coses. Això serà un exemple de punt d'entrada d'un plugin

  

```typescript
export const initialize = (api: PrimariaApi) =>{

  //registre de Web Components a l'esquelet del Shell primària
  api.registerView(shellRegions.menu, ())=> new Plugin1MenuWebComponent());
  api.registerView(shellRegions.header, ()=> new Plugin1HeaderWebComponent);
  api.registerView(shellRegions.footer, ()=> new Plugin1FooterWebComponent());
  api.registerView(shellRegions.main, ()=> new Plugin1MainWebComponent());

  //fer una crida per obtenir dades del meu plugin
  api.httpClient.request(`${apiUrl}/get-plugin-data`).then((res: any) => { console.log(res) });
}
```