---
sidebar_position: 2
---

# Regions i vistes

Una **regió** és una àrea del shell on els plugins injecten vistes. Una **vista** és un element HTML, normalment un Web Component, que registra un plugin.

El shell crea les regions i dona a cada plugin un `regionManager` a la seva API. Aquesta pàgina explica com el fan servir els plugins. Per crear regions al teu propi shell, consulta [Construir un shell](./building-a-shell.md).

Harmonix fa servir la biblioteca [`@uxland/regions`](https://www.npmjs.com/package/@uxland/regions). El nucli torna a exportar `createRegionManager` i `createRegionHost`. El decorador `@region` i els adaptadors vénen de `@uxland/regions`, de la qual el shell depèn directament.

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

| Mètode | Què fa |
| --- | --- |
| `registerView(region, view)` | Registra una vista en una regió |
| `removeView(region, viewId)` | Elimina la vista de la regió |
| `activateView(region, viewId)` | Mostra la vista. En una regió d'una sola vista activa, amaga la vista que estava activa |
| `deactivateView(region, viewId)` | Amaga la vista |
| `getRegion(region)` | L'objecte `IRegion` de `@uxland/regions` |
| `isViewActive(region, viewId)` | Si la vista es mostra |
| `containsView(region, viewId)` | Si la vista està registrada a la regió |

Un plugin pot registrar vistes en diverses regions.

## Definició d'una vista

```typescript
export interface HarmonixViewDefinition {
  id: string;
  factory: (regionContext?: unknown) => Promise<HTMLElement>;
  sortHint?: string;
  isDefault?: boolean;
  removeFromDomWhenDeactivated?: boolean;
}
```

| Camp | Descripció |
| --- | --- |
| `id` | Id de la vista. El fan servir `activateView`, `removeView` i els altres mètodes |
| `factory(regionContext?)` | Funció asíncrona que crea l'element. S'executa la primera vegada que s'activa la vista. `regionContext` és el context que el shell ha definit a la regió, si n'hi ha |
| `sortHint` | Opcional. Clau d'ordenació per a les vistes d'una regió amb diverses vistes actives |
| `isDefault` | Opcional. En una regió d'una sola vista activa, la vista s'activa quan s'afegeix si no n'hi ha cap altra d'activa, i també cada vegada que es desactiva la vista activa |
| `removeFromDomWhenDeactivated` | Opcional. Treu l'element del DOM quan es desactiva la vista, en lloc d'amagar-lo |

### Ids de les vistes

Al shell de demostració, un id de vista només ha de ser únic dins del plugin: el shell desa cada vista com a `pluginId::viewId`. Si el teu shell no separa els ids d'aquesta manera, posa-hi com a prefix `api.pluginInfo.pluginId`.

## Tipus de regions

El shell tria com es comporta cada regió:

- Les regions **d'una sola vista activa** (*single-active*) mostren una vista alhora. Activar una vista amaga l'anterior. L'àrea de contingut principal sol ser d'aquest tipus.
- Les regions **de diverses vistes actives** (*multiple-active*) mostren totes les seves vistes alhora, per exemple una capçalera o un menú. Una vista s'activa tan bon punt es registra.

## Dreceres del shell

Un shell pot afegir dreceres perquè els plugins no hagin de conèixer els noms de les regions. El [shell de demostració](../create-plugin/demo-shell.md) afegeix:

| Drecera | Què fa |
| --- | --- |
| `regions` | Els noms de les regions: `regions.header`, `regions.sideMenu`, `regions.main` |
| `registerMainView(view)` | `registerView` a la regió `main` |
| `activateMainView(viewId)` | `activateView` a la regió `main` |
| `registerNavigationItem({ id, label, icon?, mainViewId })` | Afegeix al menú lateral un element que activa la vista principal `mainViewId` |

Aquestes dreceres són del shell de demostració, no del nucli. Altres shells en poden oferir de diferents.

## Exemple complet

Primer, el plugin defineix l'element que mostrarà:

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

Després, el plugin el registra a `initialize` i l'elimina a `dispose`. Aquest exemple fa servir el shell de demostració:

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
