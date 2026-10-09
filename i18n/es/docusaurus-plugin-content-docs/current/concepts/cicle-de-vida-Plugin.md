---
sidebar_position: 5
---

# Ciclo de vida de un plugin

Un plugin es un módulo ES, normalmente empaquetado en un único fichero JavaScript. Exporta dos funciones, y las dos devuelven una `Promise`:

- `initialize(api)` arranca el plugin.
- `dispose(api)` lo detiene y deshace todo lo que ha hecho `initialize`.

```typescript
import type { DemoShellApi, BrokerDisposableHandler } from "@uxland/harmonix-demo-shell";

let subscription: BrokerDisposableHandler | undefined;

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => document.createElement("orders-list"),
  });
  subscription = api.broker.subscribe("user:changed", () => console.log("Reload the orders"));
};

export const dispose = async (api: DemoShellApi) => {
  subscription?.dispose();
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

El ciclo de vida de un plugin tiene dos partes:

- **Ciclo de vida offline:** el desarrollo, el mantenimiento y la distribución del plugin.
- **Ciclo de vida online:** lo que le pasa al plugin dentro de un shell en ejecución.

## Ciclo de vida offline

1. Creación
2. Desarrollo y pruebas
3. Publicación
4. Mantenimiento
5. Actualizaciones
6. Obsolescencia
7. Desactivación

Las fases 1, 2 y 4 se hacen en local. Las fases 3, 5, 6 y 7 implican al Plugin Store, que debería dar soporte a todas ellas. Algunos Plugin Store también permiten un despliegue progresivo en la fase 3: una versión nueva empieza con una parte de los usuarios hasta que está lo bastante madura. Es una capacidad del Plugin Store, no de Harmonix.

## Ciclo de vida online

1. **Carga.** El shell llama al `importer()` del `PluginDefinition` del plugin. Normalmente es un `import()` dinámico de la URL del plugin en el Plugin Store, o de un módulo local durante el desarrollo.
2. **Evaluación.** El navegador evalúa el módulo, que expone `initialize` y `dispose`.
3. **Inicialización.** Harmonix llama a `initialize(api)` con una instancia de la API creada para este plugin. Todos los plugins se inicializan en paralelo. Si uno lanza un error, el error se registra en la consola y los demás plugins siguen adelante.
4. **Renderizado.** Las vistas registradas aparecen en sus regiones. La `factory` de cada vista se ejecuta cuando su región necesita el elemento.
5. **Liberación.** El shell llama a `dispose(api)`. Esta función es obligatoria, y debe deshacerlo todo: eliminar las vistas, liberar las suscripciones del broker y los manejadores de peticiones, parar los temporizadores y liberar cualquier otro recurso.

Consulta [Construir un shell](../api/building-a-shell.md) para ver la parte del shell en este proceso.
