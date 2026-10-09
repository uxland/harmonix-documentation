---
sidebar_position: 8
---

# Gestión de regiones y vistas en Harmonix

# Introducción

Una de las características de las aplicaciones de Harmonix es el concepto de Región. Cualquier shell basado en Harmonix debe crear las regiones pertinentes y proporcionar una **api** a los plugins para gestionar las diferentes **regiones** de la aplicación. Para llevar a cabo todas estas funcionalidades, Harmonix utiliza la librería _@uxland/regions._

Nota: algunas funcionalidades se deberán importar de esta librería. En versiones futuras, Harmonix se encargará de exportarlas haciendo que el shell solo tenga como dependencia única Harmonix.

<br/>

# API HarmonixRegionManager

Harmonix tiene una api por defecto para hacer toda esta gestión de inyección de vistas a regiones.

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



Cada plugin puede declarar diferentes vistas e inyectarlas por las diferentes regiones.

<br/>

# Extensión API regions y creación api "amigable"

Ahora bien, cada Shell puede ampliar esta api y crear métodos más "amigables" para los plugins como por ejemplo: `registerMainView`, `registerSidebarMenu`, donde solo pidan el objeto "view", y ya no haga falta que los plugins conozcan el nombre de la región, ya que el propio método ya es explícito de qué región se trata "main", "sidebar". Encontrarás un ejemplo de esta extensión en el [shell de demostración de Harmonix](../create-plugin/demo-shell.md), con `registerMainView`, `activateMainView` y `registerNavigationItem`.


<br/>

# Creación regionManager y regionHost

El shell debe crear el objeto `regionManager`, el objeto encargado de la gestión de vistas y el regionHost, un Mixin para Lit necesario para todos aquellos WebComponents que necesiten declarar regiones y que está asociado al `regionManager` anterior.

```typescript
const regionManager: IRegionManager = createRegionManager("hes-cc-conf");
export const HesCConfRegionHost: any = createRegionHost(regionManager as any);
```

<br/>

# Creación de una región en el Shell

En el componente del Shell, debemos usar el decorador **_@region_** para declarar una región, indicando el nombre y quién será el host (qué elemento HTML será la caja donde se inyectarán las vistas). Ejemplo:

```typescript
@customElement("my-shell")
export class HesCConfShell extends HesCConfRegionHost(LitElement) {

  @region({ targetId: "header-right-region-container", name: shellRegions.headerRight })
  headerRightRegion: IRegion | undefined;
}
```

<br/>

# Ejemplo completo

Podemos crear un nuevo componente para seguir con el ejemplo, que en este caso será `ExampleComponent`.



En la inicialización del plugin, se recibe el objeto _api_, con un `regionManager`. Este objeto permitirá registrar e inyectar vistas, activarlas, desactivarlas, eliminarlas y hacer todo lo necesario.



La acción más básica es **registrar** una vista. Para ello, solo debemos llamar al método _registerView_ indicando la región donde queremos inyectar la vista y el objeto _View_. Este objeto definirá una factoría que retornará el componente que queremos inyectar.



Ahora bien, el shell puede ofrecer funciones "helper" para que la inyección sea más declarativa. El [shell de demostración de Harmonix](../create-plugin/demo-shell.md), por ejemplo, tiene `registerMainView`, donde ya no hace falta pasarle la región, y `registerNavigationItem`, que añade al menú lateral un elemento que, al hacer clic, activa una vista de la región `main`.



La función `activateMainView` del `regionManager` es la encargada de seleccionar cuál es la vista activa en la región main. Necesita como argumento la id de la vista que se ha registrado anteriormente, en este caso, "_plugin-main-view_". Las ids solo tienen que ser únicas dentro del plugin: el shell guarda cada vista como `pluginId::viewId`.



Ejemplo, con el shell de demostración:



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
