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

Ahora bien, cada Shell puede ampliar esta api y crear métodos más "amigables" para los plugins como por ejemplo: `registerMainView`, `registerSidebarMenu`, donde solo pidan el objeto "view", y ya no haga falta que los plugins conozcan el nombre de la región, ya que el propio método ya es explícito de qué región se trata "main", "sidebar". Encontraréis un ejemplo de esta extensión en el apartado 1 del [documento de integración del ETC de Primaria](https://doc.clickup.com/9012015559/d/h/8cjgwe7-3532/b3a23bc489160e1).


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



Ahora bien, se han creado algunas funciones "helper" para que la inyección sea más declarativa, como `registerMainView` o `registerNavigationMenu`, donde ya no hará falta pasarle la región y la propia función de registrar ya explica dónde se inyectará, tal como hemos explicado antes.



De la misma manera, también inyectamos el `PrimariaNavItem` en la región del menú lateral de navegación. Este `PrimariaNavItem` tendrá la función de activar la vista del componente `ExampleComponent` al hacer click.



La función `activateMainView` del `regionManager` es la encargada de seleccionar cuál es la vista activa en la región main. Esta necesita como argumento la id del plugin que se ha registrado anteriormente, en este caso, "_plugin-main-view_".



Ejemplo:



```typescript
export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: () =>  Promise.resolve(new ExampleComponent()) ,
  });

  api.regionManager.registerNavigationMenu({
    id: "plugin-quick-action",
    factory: () => Promise.resolve(new PrimariaNavItem("add_circle_outline", "Lit plugin", () => {
      api.regionManager.activateMainView("plugin-main-view")
    })),
  });
  return Promise.resolve();
};
```
