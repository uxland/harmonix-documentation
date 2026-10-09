---
sidebar_position: 8
---

# Gestió de regions i vistes a Harmonix

# Introducció

Una de les característiques de les aplicacions d'Harmonix és el concepte de Regió. Qualsevol shell basat en Harmonix, ha de crear les regions pertinents i proporcionar una **api** als plugins per a gestionar les diferents **regions** de l'aplicació. Per dur a terme totes aquestes funcionalitats, Harmonix utilitza la llibreria _@uxland/regions._

Nota: algunes funcionalitats, s'hauran d'importar d'aquesta llibreria. En versions futures, Harmonix s'encarregarà d'exportar-les fent que el shell només tingui com a dependència única Harmonix.

<br/>

# API HarmonixRegionManager

Harmonix té una api per defecte per fer tota aquesta gestió de injecció de vistes a regions.

```typescript
export interface HarmonixRegionManager {
    registerView(regionName: string, view: HarmonixViewDefinition): Promise<void>;
    removeView(regionName: string, viewId: string): Promise<void>;
    activateView(regionName: string, viewId: string): Promise<void>;
    deactivateView(regionName: string, viewId: string): Promise<void>;
    getRegion(regionName: string): Promise<IRegion>;
    isViewActive(regionName: string, viewId: string): Promise<boolean>;
    containsView(regionName: string, viewId: string): Promise<boolean>;
}
```

  

Cada plugin pot declarar diferents vistes i injectar-les per les diferents regions.

<br/>

# Extensió API regions i creació api "amigable"

Ara bé, cada Shell pot ampliar aquesta api i crear mètodes més "amigables" pels plugins com per exemple: `registerMainView`, `registerSidebarMenu`, on només demanin l'objecte "view", i ja no faci falta que els plugins coneguin el nom de la regió, ja que el propi mètode ja és explícit de quina regió es tracta "main", "sidebar". Trobareu un exemple d'aquesta extensió al [shell de demostració d'Harmonix](../create-plugin/demo-shell.md), amb `registerMainView`, `activateMainView` i `registerNavigationItem`.


<br/>

# Creació regionManager i regionHost

El shell ha de crear l'objecte `regionManager`, l'objecte encarregat de la gestió de vistes i el regionHost, un Mixin per Lit necessari per tots aquells WebComponents que necessitin declarar regions i que està associat al `regionManager` anterior.

```typescript
const regionManager: IRegionManager = createRegionManager("hes-cc-conf");
export const HesCConfRegionHost: any = createRegionHost(regionManager as any);
```

<br/>

# Creació d'una regió al Shell

En el component del Shell, hem de fer servir el decorador **_@region_** per tal de declarar una regió, indicant el nom i qui serà el host (quina element HTML serà la capsa on s'injectaran les vistes). Exemple:

```typescript
@customElement("my-shell")
export class HesCConfShell extends HesCConfRegionHost(LitElement) {
  
  @region({ targetId: "header-right-region-container", name: shellRegions.headerRight })
  headerRightRegion: IRegion | undefined;
}
```

<br/>

# Exemple complet

Podem crear un nou component per a seguir amb l'exemple, que en aquest cas serà `ExampleComponent`.

  

En la inicialització del plugin, es rep l'objecte _api_, amb un `regionManager`. Aquest objecte permetrà registrar i injectar vistes, activar-les, desactivar-les, eliminar-les i fer tot el necessari.

  

L'acció més bàsica és **registrar** una vista. Per a això, només hem de cridar al mètode _registerView_ indicant la regió on volem injectar la vista i l'objecte _View_. Aquest objecte definirà una factoria que retornarà el component que volem injectar.

  

Ara bé, el shell pot oferir funcions "helper" perquè la injecció sigui més declarativa. El [shell de demostració d'Harmonix](../create-plugin/demo-shell.md), per exemple, té `registerMainView`, amb què ja no cal passar la regió, i `registerNavigationItem`, que afegeix al menú lateral un element que, en fer-hi clic, activa una vista de la regió `main`.

  

La funció `activateMainView` del `regionManager` és l'encarregada de seleccionar quina és la vista activa a la regió main. Necessita com a argument l'id de la vista que s'ha registrat anteriorment, en aquest cas, "_plugin-main-view_". Els ids només han de ser únics dins del plugin: el shell desa cada vista com a `pluginId::viewId`.

  

Exemple, amb el shell de demostració:

  

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);

  // Generic: a view in any region.
  await api.regionManager.registerView(api.regionManager.regions.main, {
    id: "plugin-main-view",
    factory: () => Promise.resolve(new ExampleComponent()),
  });

  // Helper: an item in the side menu that activates that view.
  await api.regionManager.registerNavigationItem({
    id: "plugin-menu",
    label: "Example",
    mainViewId: "plugin-main-view",
  });

  // Show it.
  await api.regionManager.activateMainView("plugin-main-view");
};
```
