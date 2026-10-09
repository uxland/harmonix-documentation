---
sidebar_position: 3
---

# El shell de demostración

Una aplicación Harmonix es un **shell** que define regiones y da una API a los plugins que las llenan (consulta [Ejemplo de uso](../concepts/exemple-us.md)). Cada aplicación construye su propio shell. Para desarrollar y probar plugins sin tener uno, Harmonix tiene el **shell de demostración**, [`@uxland/harmonix-demo-shell`](https://www.npmjs.com/package/@uxland/harmonix-demo-shell): el shell más pequeño posible, sin lógica de negocio y sin requisitos de framework.

Los proyectos hechos con el [creador de plugins](./create-a-plugin.mdx) ya lo usan.

## Regiones

Tiene tres regiones, y nada más:

![Las tres regiones del shell de demostración](/img/create-plugin/demo-shell-regions.png)

| Región | Nombre | Qué va en ella |
| --- | --- | --- |
| `regions.header` | `header` | La barra superior, a la derecha del logo: acciones, el usuario, un buscador… |
| `regions.sideMenu` | `side-menu` | El menú: un elemento por cada vista principal |
| `regions.main` | `main` | El contenido. Solo hay una vista activa a la vez: activar una oculta la anterior |

El plugin lee los nombres de las regiones de su API (`api.regionManager.regions`), así que no tiene que escribirlos a mano. En la imagen, dos plugins han registrado cada uno una vista principal y un elemento de menú, y un tercero muestra el usuario en la cabecera.

Cuando todos los plugins han arrancado, si ninguno ha activado una vista en `main`, el shell activa la primera que se ha registrado. Por eso el plugin que creas ya se ve cuando abres la página.

## La API

Cada plugin recibe su propia API en `initialize(api)` y `dispose(api)`. Extiende la [API de Harmonix](../api/Api.md) con lo que ofrece este shell:

```typescript
interface DemoShellApi extends HarmonixApi {
  pluginInfo: PluginInfo;               // { pluginId }
  regionManager: DemoShellRegionManager;
  broker: HarmonixBroker;
  createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```

### `regionManager`

El [gestor de regiones de Harmonix](../api/gestio-regions-i-vistes.md), sobre cualquier región, más tres atajos:

| Método | Qué hace |
| --- | --- |
| `registerView(region, view)` | Registra una vista en una región |
| `removeView(region, viewId)` | La elimina |
| `activateView(region, viewId)` / `deactivateView(region, viewId)` | La muestra o la oculta |
| `isViewActive(region, viewId)` / `containsView(region, viewId)` | Consulta su estado |
| `getRegion(region)` | El objeto región de `@uxland/regions` |
| `registerMainView(view)` | `registerView` en `main` |
| `activateMainView(viewId)` | `activateView` en `main` |
| `registerNavigationItem({ id, label, icon?, mainViewId })` | Añade al menú lateral un elemento que activa la vista `mainViewId` del mismo plugin. `icon` son uno o dos caracteres; por defecto, la primera letra de `label` |

Una vista es `{ id, factory, isDefault?, sortHint?, removeFromDomWhenDeactivated? }`, donde `factory` es una función asíncrona que devuelve un elemento HTML. Las ids solo tienen que ser únicas dentro del plugin: el shell las guarda como `pluginId::viewId`.

Por ejemplo, para mostrar algo en la cabecera:

```typescript
await api.regionManager.registerView(api.regionManager.regions.header, {
  id: "user",
  factory: async () => Object.assign(document.createElement("span"), { textContent: "Ada Lovelace" }),
});
```

### `broker`

Mensajes entre plugins, sin que se conozcan entre ellos:

- **Eventos**: `publish(name, payload)` y `subscribe(name, handler)`. Cualquier número de suscriptores; si uno falla, no detiene a los demás.
- **Peticiones**: `registerRequest(name, handler)` y `send(name, payload)`, que devuelve la respuesta del handler. Un handler por petición.

Los mensajes se pueden identificar por un nombre o por una clase. `subscribe` y `registerRequest` devuelven un objeto con `dispose()`, al que el plugin debe llamar en su propio `dispose`.

```typescript
// Plugin A answers.
const handler = api.broker.registerRequest("patients:count", async () => 42);

// Plugin B asks.
const count = await api.broker.send<unknown, number>("patients:count", {});
```

### `createLocaleManager`

Las traducciones del plugin. `translate` busca la clave en el idioma de la página (`<html lang>`), después en el primer idioma que se le da y, si no la encuentra, devuelve la clave. Las variables van en el texto como `{{name}}`:

```typescript
const locale = await api.createLocaleManager({
  en: { greeting: "Hello {{name}}" },
  ca: { greeting: "Hola {{name}}" },
});
locale.translate("greeting", { name: "Ada" }); // "Hola Ada" on a page with lang="ca"
```

## Tema

El shell usa los colores de Uxland y Harmonix y la fuente IBM Plex Sans. Son propiedades CSS personalizadas: las vistas pueden usarlas para encajar con el shell, y una aplicación puede cambiarlas en el elemento `harmonix-demo-shell`.

| Variable | Valor | Uso |
| --- | --- | --- |
| `--hx-primary` | `#12e2c7` | Botones, elemento activo |
| `--hx-on-primary` | `#053d37` | Texto sobre `--hx-primary` |
| `--hx-primary-text` | `#00756a` | Títulos y enlaces |
| `--hx-primary-deep` | `#005a52` | Cabecera |
| `--hx-primary-tint` | `#e7fcf9` | Fondos suaves |
| `--hx-secondary` | `#0c469f` | Antetítulos y enlaces secundarios |
| `--hx-ink` / `--hx-ink-muted` | `#212121` / `#4b5563` | Texto |
| `--hx-surface` / `--hx-background` / `--hx-border` | `#fff` / `#f5f7f7` / `#e2e8e7` | Superficies |
| `--hx-font` | IBM Plex Sans, fuentes del sistema | Tipografía |

## Usarlo fuera del creador

El shell de demostración es un paquete npm normal. Cualquier proyecto puede usarlo para arrancar uno o más plugins:

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

`initializeShell` pinta el shell, que ocupa toda la ventana. `bootstrapPlugins` carga los plugins y los arranca; si un plugin falla, se registra en la consola y no detiene a los demás.

:::info
El shell de demostración está pensado para desarrollo, ejemplos y documentación. Una aplicación real construye su propio shell sobre `@uxland/harmonix`, con las regiones y la API que necesitan sus plugins, tal como se describe en [Gestión de regiones y vistas](../api/gestio-regions-i-vistes.md).
:::
