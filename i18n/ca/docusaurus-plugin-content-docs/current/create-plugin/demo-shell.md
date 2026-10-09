---
sidebar_position: 3
---

# El shell de demostració

Una aplicació Harmonix és un **shell** que defineix regions i dona una API als plugins que les omplen (consulta l'[Exemple d'ús](../concepts/exemple-us.md)). Cada aplicació construeix el seu propi shell. Per desenvolupar i provar plugins sense tenir-ne cap, Harmonix té el **shell de demostració**, [`@uxland/harmonix-demo-shell`](https://www.npmjs.com/package/@uxland/harmonix-demo-shell): el shell més petit possible, sense lògica de negoci i sense requisits de framework.

Els projectes fets amb el [creador de plugins](./create-a-plugin.mdx) ja el fan servir.

## Regions

Té tres regions, i res més:

![Les tres regions del shell de demostració](/img/create-plugin/demo-shell-regions.png)

| Regió | Nom | Què hi va |
| --- | --- | --- |
| `regions.header` | `header` | La barra superior, a la dreta del logotip: accions, l'usuari, un cercador… |
| `regions.sideMenu` | `side-menu` | El menú: un element per a cada vista principal |
| `regions.main` | `main` | El contingut. Només hi ha una vista activa alhora: activar-ne una amaga l'anterior |

El plugin llegeix els noms de les regions de la seva API (`api.regionManager.regions`), així que no cal que els escrigui a mà. A la imatge, dos plugins han registrat cadascun una vista principal i un element de menú, i un tercer mostra l'usuari a la capçalera.

Quan tots els plugins s'han iniciat, si cap no ha activat una vista a `main`, el shell activa la primera que s'ha registrat. Per això el plugin que crees ja és visible quan obres la pàgina.

## L'API

Cada plugin rep la seva pròpia API a `initialize(api)` i `dispose(api)`. Amplia l'[API d'Harmonix](../api/Api.md) amb el que ofereix aquest shell:

```typescript
interface DemoShellApi extends HarmonixApi {
  pluginInfo: PluginInfo;               // { pluginId }
  regionManager: DemoShellRegionManager;
  broker: HarmonixBroker;
  createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```

### `regionManager`

El [gestor de regions d'Harmonix](../api/gestio-regions-i-vistes.md), sobre qualsevol regió, més tres dreceres:

| Mètode | Què fa |
| --- | --- |
| `registerView(region, view)` | Registra una vista en una regió |
| `removeView(region, viewId)` | L'elimina |
| `activateView(region, viewId)` / `deactivateView(region, viewId)` | La mostra o l'amaga |
| `isViewActive(region, viewId)` / `containsView(region, viewId)` | En consulta l'estat |
| `getRegion(region)` | L'objecte de regió de `@uxland/regions` |
| `registerMainView(view)` | `registerView` a `main` |
| `activateMainView(viewId)` | `activateView` a `main` |
| `registerNavigationItem({ id, label, icon?, mainViewId })` | Afegeix al menú lateral un element que activa la vista `mainViewId` del mateix plugin. `icon` és un o dos caràcters; per defecte, la primera lletra de `label` |

Una vista és `{ id, factory, isDefault?, sortHint?, removeFromDomWhenDeactivated? }`, on `factory` és una funció asíncrona que retorna un element HTML. Els ids només han de ser únics dins del plugin: el shell els desa com a `pluginId::viewId`.

Per exemple, per mostrar alguna cosa a la capçalera:

```typescript
await api.regionManager.registerView(api.regionManager.regions.header, {
  id: "user",
  factory: async () => Object.assign(document.createElement("span"), { textContent: "Ada Lovelace" }),
});
```

### `broker`

Missatges entre plugins, sense que es coneguin entre ells:

- **Events**: `publish(name, payload)` i `subscribe(name, handler)`. Hi pot haver tants subscriptors com calgui; si un falla, no atura els altres.
- **Peticions**: `registerRequest(name, handler)` i `send(name, payload)`, que retorna la resposta del handler. Un sol handler per petició.

Els missatges es poden identificar per un nom o per una classe. `subscribe` i `registerRequest` retornen un objecte amb `dispose()`, que el plugin ha de cridar al seu propi `dispose`.

```typescript
// Plugin A answers.
const handler = api.broker.registerRequest("patients:count", async () => 42);

// Plugin B asks.
const count = await api.broker.send<unknown, number>("patients:count", {});
```

### `createLocaleManager`

Les traduccions del plugin. `translate` busca la clau en l'idioma de la pàgina (`<html lang>`), després en el primer idioma que s'ha donat i, si no la troba, retorna la clau. Les variables van al text com a `{{name}}`:

```typescript
const locale = await api.createLocaleManager({
  en: { greeting: "Hello {{name}}" },
  ca: { greeting: "Hola {{name}}" },
});
locale.translate("greeting", { name: "Ada" }); // "Hola Ada" on a page with lang="ca"
```

## Tema

El shell fa servir els colors d'Uxland i d'Harmonix i la tipografia IBM Plex Sans. Són propietats personalitzades de CSS: les vistes les poden fer servir per encaixar amb el shell, i una aplicació les pot canviar a l'element `harmonix-demo-shell`.

| Variable | Valor | Ús |
| --- | --- | --- |
| `--hx-primary` | `#12e2c7` | Botons, element actiu |
| `--hx-on-primary` | `#053d37` | Text sobre `--hx-primary` |
| `--hx-primary-text` | `#00756a` | Títols i enllaços |
| `--hx-primary-deep` | `#005a52` | Capçalera |
| `--hx-primary-tint` | `#e7fcf9` | Fons suaus |
| `--hx-secondary` | `#0c469f` | Avantítols i enllaços secundaris |
| `--hx-ink` / `--hx-ink-muted` | `#212121` / `#4b5563` | Text |
| `--hx-surface` / `--hx-background` / `--hx-border` | `#fff` / `#f5f7f7` / `#e2e8e7` | Superfícies |
| `--hx-font` | IBM Plex Sans, tipografies del sistema | Tipografia |

## Fer-lo servir fora del creador

El shell de demostració és un paquet npm normal. Qualsevol projecte el pot fer servir per iniciar un o més plugins:

```bash
npm install @uxland/harmonix-demo-shell
```

```typescript
import { bootstrapPlugins, initializeShell } from "@uxland/harmonix-demo-shell";

initializeShell(document.body, { title: "My app" });
await bootstrapPlugins([
  { pluginId: "patients", importer: () => import("./patients/plugin") },
  { pluginId: "agenda", importer: () => import("./agenda/plugin") },
]);
```

`initializeShell` pinta el shell, que ocupa tota la finestra. `bootstrapPlugins` carrega els plugins i els inicia; si un plugin falla, es registra a la consola i no atura els altres.

:::info
El shell de demostració està pensat per al desenvolupament, els exemples i la documentació. Una aplicació real construeix el seu propi shell sobre `@uxland/harmonix`, amb les regions i l'API que necessiten els seus plugins, tal com es descriu a [Gestió de regions i vistes](../api/gestio-regions-i-vistes.md).
:::
