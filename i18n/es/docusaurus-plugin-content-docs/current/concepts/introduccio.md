---
sidebar_position: 1
---

import { HeroStage } from '@site/src/components/Composition/HeroStage';

# Introducción

Harmonix es un framework para componer una aplicación de una sola página a partir de plugins que se desarrollan y se despliegan de forma independiente. Un shell define regiones. Cada plugin es un módulo JavaScript cuyo `initialize(api)` registra Web Components como vistas en esas regiones y se comunica con otros plugins a través de un broker.

<HeroStage />

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => document.createElement("orders-list"),
  });
};

export const dispose = async (api: DemoShellApi) => {
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## Por qué Harmonix

Las aplicaciones grandes las suelen construir varios equipos, a veces de empresas diferentes. Cada equipo quiere elegir sus herramientas y publicar a su ritmo. Aun así, los usuarios esperan una única aplicación coherente.

Harmonix divide la aplicación en dos tipos de piezas:

- **El shell.** Se encarga del layout de la página, define las regiones y da una API a cada plugin. No contiene funcionalidades de negocio.
- **Los plugins.** Cada uno aporta una funcionalidad. Un plugin puede poner varias vistas en varias regiones: una lista en la zona principal, un contador en la cabecera y un elemento en el menú lateral. Todas comparten el código y los datos del plugin.

Los plugins no son iframes. Se ejecutan en la misma página que el shell, así que pueden usar los servicios que el shell expone en su API e intercambiar mensajes con otros plugins.

## Principios de diseño

- **Plugins independientes.** Cada plugin tiene su propio repositorio, tecnología, build y ciclo de publicación. Solo tiene que cumplir el contrato con el shell: exportar `initialize` y `dispose`, y pintar Web Components.
- **Agnóstico de la tecnología.** Una vista es un Web Component estándar. Se puede escribir con React, Angular, Lit o JavaScript sin framework.
- **Composición mediante regiones.** El shell decide dónde va cada cosa. Los plugins deciden qué va en ella.
- **Bajo acoplamiento.** Los plugins nunca se importan entre sí. Se comunican a través del broker del shell.
- **Aislamiento de errores.** Si un plugin no se puede cargar o inicializar, los demás se cargan igualmente.

## Casos de uso principales

Harmonix encaja en aplicaciones de una sola página de tipo estación de trabajo. En estas aplicaciones el usuario ve mucha información relacionada a la vez, y las vistas deben reaccionar unas a otras.

Es especialmente útil cuando la misma aplicación contiene funcionalidades hechas por equipos o proveedores diferentes, cada uno con su propia tecnología y ciclo de publicación.

## Próximos pasos

- [Ejemplo de uso](./exemple-us.md) muestra un shell y dos plugins.
- [Crear un plugin](../create-plugin/create-a-plugin.mdx) te da un plugin que funciona en pocos minutos.
