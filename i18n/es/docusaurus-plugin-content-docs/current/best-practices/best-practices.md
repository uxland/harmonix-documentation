---
sidebar_position: 12
---

# Buenas prácticas

## Libera bien el plugin

Un plugin tiene dos momentos clave: la **inicialización** (`initialize`) y la **liberación** (`dispose`). Todo lo que hace el plugin al arrancar se tiene que deshacer al liberarlo: vistas registradas, suscripciones del broker y manejadores de peticiones, temporizadores, contenedores de dependencias, aplicaciones del framework…

Muchas veces el usuario cierra el navegador y todo desaparece. Pero un shell también puede descargar y volver a cargar los plugins sin recargar la página, por ejemplo cuando cambia el usuario o el contexto de trabajo, o cuando se renueva la sesión. Si un plugin no limpia, puede dejar cosas en memoria (**fugas de memoria**) o mostrar datos del contexto anterior (**mezcla de datos**).

```typescript
import type { BrokerDisposableHandler, DemoShellApi } from "@uxland/harmonix-demo-shell";

const handlers: BrokerDisposableHandler[] = [];
let timer: ReturnType<typeof setInterval> | undefined;

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({ id: "orders", factory: async () => document.createElement("orders-list") });
  handlers.push(api.broker.subscribe("users:changed", () => clearOrdersCache()));
  timer = setInterval(() => refreshOrders(), 60_000);
};

export const dispose = async (api: DemoShellApi) => {
  clearInterval(timer);
  for (const handler of handlers.splice(0)) handler.dispose();
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## Trata la API como un singleton

El plugin recibe su API en `initialize`. No la clones ni la envuelvas en copias. Trátala como la única fuente de verdad de todo lo que ofrece el shell.

Guarda una referencia donde el resto del plugin pueda llegar a ella. Basta con una variable a nivel de módulo. En plugins más grandes, si quieres, puedes registrarla en un contenedor de dependencias, por ejemplo con [InversifyJS](https://inversify.io/), y resolverla como singleton en cualquier parte del código.

## Usa `initialize` como punto de entrada

En `initialize` el plugin se configura, hace sus primeras llamadas a servicios y registra sus vistas. Espera (`await`) cada paso asíncrono, para que los errores lleguen a Harmonix:

```typescript
export const initialize = async (api: DemoShellApi) => {
  await registerViews(api); // register views in the regions
  await initializeLocalization(api); // set up the plugin's translations
  await bootstrapFeatures(api); // start the plugin's use cases
};
```

## Deja que `initialize` falle ante errores graves

Si el plugin no puede funcionar, por ejemplo porque falta una configuración obligatoria, deja que `initialize` lance el error. Harmonix lo registra en la consola y se salta el plugin, y los demás plugins siguen funcionando. No te tragues el error dejando el plugin a medio arrancar.

## No dependas del orden de carga de los plugins

Todos los plugins se cargan y se inicializan en paralelo. Puede que otro plugin no esté listo cuando arranca el tuyo. No llames a otros plugins durante `initialize` esperando que ya estén ahí. Usa el [broker](../api/broker.md): suscríbete a los eventos que necesites y envía las peticiones cuando el usuario actúe, no al arrancar.

## Un plugin por funcionalidad, no por vista

Un plugin es una parte independiente del sistema que resuelve los casos de uso de un ámbito. Puede inyectar vistas diferentes en regiones diferentes, todas alimentadas por los mismos datos.

Por ejemplo, un plugin de pedidos puede necesitar tres vistas: la lista de pedidos en la región principal, un contador de pedidos abiertos en la cabecera y un elemento en el menú lateral. **No** crees tres plugins para eso. Tres plugins duplicarían código y tendrían ciclos de vida separados para lo que es un solo ámbito. Con un plugin y un backend de pedidos, hay una única fuente de verdad que alimenta las tres vistas.

## Ids de las vistas

Dos plugins pueden usar el mismo id de vista, por ejemplo `main`. El shell de demostración ya separa los ids como `pluginId::viewId`, así que no chocan. Si tu shell no lo hace, ponles delante el id del plugin:

```typescript
const pluginId = api.pluginInfo.pluginId;

await api.regionManager.registerView(api.regionManager.regions.main, {
  id: `${pluginId}-main-view`,
  factory: mainFactory,
});
```

## Pon un prefijo a los nombres de los custom elements

Los nombres de los custom elements son globales en la página, y un nombre solo se puede definir una vez. Pon delante de tus nombres de etiqueta el id del plugin. Para un plugin con id `orders`, usa nombres como `orders-list` u `orders-header-counter`.

Define cada elemento una sola vez, y protege la definición, porque un plugin se puede volver a inicializar después de liberarlo:

```typescript
if (!customElements.get("orders-list")) {
  customElements.define("orders-list", OrdersList);
}
```

## Aísla los estilos con Shadow DOM

Las vistas conviven con las vistas de otros plugins. Píntalas en su propio shadow root, para que sus estilos no se escapen hacia fuera y los estilos del shell no entren. Las propiedades personalizadas de CSS sí atraviesan el shadow DOM, así que las vistas pueden seguir usando las variables de tema del shell. Consulta [Notas por framework](../create-plugin/frameworks.mdx).

## No toques nunca el DOM del shell

Un plugin solo muestra contenido a través de sus vistas en las regiones. No consultes ni modifiques los elementos del shell, ni las vistas de otros plugins. El shell puede cambiar su layout en cualquier momento, y los demás plugins no forman parte de tu contrato.

## Recursos estáticos

Cada plugin es responsable de sus propios recursos estáticos: imágenes, fuentes, iconos… Una aplicación Harmonix no es una aplicación convencional con una carpeta pública compartida, porque el shell no conoce los plugins que cargará.

Incluye los recursos en el código del plugin (por ejemplo, como SVG en línea o data URLs), o alójalos en tu propia infraestructura y cárgalos desde allí.
