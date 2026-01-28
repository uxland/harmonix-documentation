---
sidebar_position: 6
---

# Exemple d'ús d'una aplicació basada en Harmonix - Primaria Shell

# Visió ràpida Shell

Per explicar el funcionament d'**Harmonix** i com es pot construir una app composta de diferents plugins desenvolupada en diferents tecnologies i per diferents clients, explicarem un exemple de com funciona l'aplicació de l'Estació de treball de Primària.

  

Primer de tot, existeix **Harmonix**, el motor principal capaç d'obtenir i unir tots aquests plugins, dotar-los amb funcionalitats per interactuar entre ells i composant així l'aplicació final.

  

Segon, existeix el "**Shell**", que serà l'aplicació principal i qui mitjançant Harmonix, definirà un esquelet amb regions on els plugins podran injectar diferents Web Components. Cada aplicació ha de construir un Shell diferent, ja que cadascuna tindrà un esquelet i una forma de treballar propis. En el cas de primària, tenim el "Primaria Shell". El shell, per si sol, no és més que un conjunt de contenidors, un esquelet buit. Si veiéssim el shell abans d'iniciar els plugins, veuríem quelcom semblant a això:

  

```typescript
<primaria-shell>
    <div id="header-region"></div>
    <div id="menu-region"></div>
    <div id="footer-region"></div>
    <div id="main-region"></div>
  </primaria-shell>
```

<br/>

# Visió ràpida Plugin

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

<br/>

# Visió ràpida Shell + Plugins

Un cop el Shell i el framework Harmonix ha donat l'ordre d'iniciar els plugins, l'esquelet del Shell passa d'estar buit, a ser ja una aplicació composta per molts Web Components. Si ara veiem com està el DOM, seria quelcom així:

  

```typescript
<primaria-shell>
    <div id="header-region">
      <plugin1-header><h1>I'm Plugin 1</h1></plugin1-header>
      <plugin2-header><h1>I'm Plugin 2</h1></plugin2-header>
    </div>
    <div id="menu-region">
      <plugin1-menu><span>Go to Plugin 1 Menu</span></plugin1-menu>
      <plugin2-menu><span>Go to Plugin 2 Menu</span></plugin2-menu>
    </div>
    <div id="footer-region">
      <plugin1-footer>Plugin 1 2024</plugin1-footer>
      <plugin2-footer><h1>Plugin 2 2024</h1></plugin2-footer>
    </div>
    <div id="main-region">
      <plugin1-main>
        <div class="box">Plugin 1 Box main</div>
      </plugin1-main>
      <plugin2-main>
        <div class="box">Plugin 2 Box main</div>
      </plugin2-main>
    </div>
  </primaria-shell>
```

  

Com es pot comprovar, el plugin1 i el plugin2, han sigut capaços mitjançant l'API rebuda en el seu punt inicial, de registrar diferents Web Components en diferents regions. Ara l'aplicació Shell ja és plena.

  

En els equips de desenvolupament se'ls hi proporciona un Sandbox per simular una aplicació on s'instal·la el "Primaria Shell", d'aquesta manera poden treballar individualment i veure com quedarà el seu plugin.