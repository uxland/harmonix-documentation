---
sidebar_position: 2
---

# Regiones y vistas

Una **región** es una zona del shell donde los plugins inyectan vistas. Una **vista** es un elemento HTML, normalmente un Web Component, que registra un plugin.

El shell crea las regiones y da a cada plugin un `regionManager` en su API. Esta página explica cómo lo usan los plugins. Para crear regiones en tu propio shell, consulta [Construir un shell](./building-a-shell.md).

Harmonix usa la librería [`@uxland/regions`](https://www.npmjs.com/package/@uxland/regions). El núcleo reexporta `createRegionManager` y `createRegionHost`. El decorador `@region` y los adaptadores vienen de `@uxland/regions`, del que el shell depende directamente.

## `HarmonixRegionManager`

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

| Método | Qué hace |
| --- | --- |
| `registerView(region, view)` | Registra una vista en una región |
| `removeView(region, viewId)` | Elimina la vista de la región |
| `activateView(region, viewId)` | Muestra la vista. En una región de vista activa única, oculta la vista que estaba activa |
| `deactivateView(region, viewId)` | Oculta la vista |
| `getRegion(region)` | El objeto `IRegion` de `@uxland/regions` |
| `isViewActive(region, viewId)` | Si la vista se muestra |
| `containsView(region, viewId)` | Si la vista está registrada en la región |

Un plugin puede registrar vistas en varias regiones.

## Definición de una vista

```typescript
export interface HarmonixViewDefinition {
  id: string;
  factory: (regionContext?: unknown) => Promise<HTMLElement>;
  sortHint?: string;
  isDefault?: boolean;
  removeFromDomWhenDeactivated?: boolean;
}
```

| Campo | Descripción |
| --- | --- |
| `id` | Id de la vista. Lo usan `activateView`, `removeView` y los demás métodos |
| `factory(regionContext?)` | Función asíncrona que crea el elemento. Se ejecuta la primera vez que se activa la vista. `regionContext` es el contexto que el shell ha asignado a la región, si lo hay |
| `sortHint` | Opcional. Clave de ordenación para las vistas de una región de varias vistas activas |
| `isDefault` | Opcional. En una región de vista activa única, la vista se activa al añadirla si no hay ninguna otra activa, y de nuevo cada vez que se desactiva la vista activa |
| `removeFromDomWhenDeactivated` | Opcional. Quita el elemento del DOM cuando se desactiva la vista, en lugar de ocultarlo |

### Ids de las vistas

En el shell de demostración, el id de una vista solo tiene que ser único dentro del plugin: el shell guarda cada vista como `pluginId::viewId`. Si tu shell no separa los ids de esta manera, ponles delante `api.pluginInfo.pluginId`.

## Tipos de región

El shell decide cómo se comporta cada región:

- Las regiones de **vista activa única** muestran una vista a la vez. Activar una vista oculta la anterior. La zona de contenido principal suele ser de este tipo.
- Las regiones de **varias vistas activas** muestran todas sus vistas a la vez, por ejemplo una cabecera o un menú. Una vista se activa en cuanto se registra.

## Atajos del shell

Un shell puede añadir atajos para que los plugins no tengan que conocer los nombres de las regiones. El [shell de demostración](../create-plugin/demo-shell.md) añade:

| Atajo | Qué hace |
| --- | --- |
| `regions` | Los nombres de las regiones: `regions.header`, `regions.sideMenu`, `regions.main` |
| `registerMainView(view)` | `registerView` en la región `main` |
| `activateMainView(viewId)` | `activateView` en la región `main` |
| `registerNavigationItem({ id, label, icon?, mainViewId })` | Añade al menú lateral un elemento que activa la vista principal `mainViewId` |

Estos atajos son del shell de demostración, no del núcleo. Otros shells pueden ofrecer otros.

## Ejemplo completo

Primero, el plugin define el elemento que mostrará:

```typescript
class ExampleComponent extends HTMLElement {
  connectedCallback() {
    const root = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    root.innerHTML = `<h1>Hello from ${this.getAttribute("plugin-id")}</h1>`;
  }
}

if (!customElements.get("example-plugin-view")) {
  customElements.define("example-plugin-view", ExampleComponent);
}
```

Después, el plugin lo registra en `initialize` y lo elimina en `dispose`. Este ejemplo usa el shell de demostración:

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  // Generic: a view in any region.
  await api.regionManager.registerView(api.regionManager.regions.main, {
    id: "plugin-main-view",
    factory: async () => {
      const element = new ExampleComponent();
      element.setAttribute("plugin-id", api.pluginInfo.pluginId);
      return element;
    },
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

export const dispose = async (api: DemoShellApi) => {
  const { regions } = api.regionManager;
  await api.regionManager.removeView(regions.sideMenu, "plugin-menu");
  await api.regionManager.removeView(regions.main, "plugin-main-view");
};
```
