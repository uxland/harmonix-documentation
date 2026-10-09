---
sidebar_position: 3
---

# Características

## Características principales

1. **Desarrollo independiente.** Los equipos trabajan en plugins diferentes de forma independiente. Cada plugin tiene su propio repositorio, build y ciclo de publicación.
2. **Crece añadiendo plugins.** Las nuevas funcionalidades se añaden como nuevos plugins, sin tocar el shell ni los demás plugins.
3. **Varias vistas por plugin.** Un plugin puede registrar vistas en varias regiones del shell. Todas comparten el código y los datos del plugin.
4. **Tecnología heterogénea.** Cada equipo elige el framework que mejor encaja con su plugin: React, Angular, Lit o JavaScript sin framework.
5. **Aislamiento de errores.** Si un plugin no se puede cargar o inicializar, el error se registra en la consola y los demás plugins se cargan igualmente.
6. **Comunicación entre plugins.** Los plugins intercambian eventos y peticiones a través del [broker](../api/broker.md) del shell, sin importarse entre sí.
7. **Servicios del shell.** Cada shell puede exponer sus propios servicios (cliente HTTP, autenticación, notificaciones, traducciones…) a través de su API.
8. **Actualizaciones más rápidas.** Un plugin se puede actualizar sin volver a desplegar el shell, así que las correcciones y las funcionalidades llegan antes a los usuarios.

## Conceptos

- **Núcleo de Harmonix** (`@uxland/harmonix`). Carga e inicializa los plugins, da a cada uno su API y proporciona el gestor de regiones.
- **Shell.** La aplicación principal. Es un esqueleto de regiones donde los plugins inyectan sus vistas, y construye la API que recibe cada plugin.
- **Plugin.** Un módulo ES independiente que exporta `initialize(api)` y `dispose(api)`. Contiene todo lo necesario para una funcionalidad de la aplicación.
- **Región.** Una zona del shell donde se inyectan vistas. Una región puede mostrar una vista a la vez (vista activa única) o varias (varias vistas activas).
- **Vista.** Un Web Component, registrado por un plugin, que se muestra en una región.
- **Broker.** El bus de mensajes entre plugins: eventos (publicar/suscribirse) y peticiones (enviar/responder).
- **Sandbox.** Una aplicación aislada para desarrollar y probar plugins: un shell solo con los plugins que se están desarrollando. El [creador de plugins](../create-plugin/create-a-plugin.mdx) prepara uno con el [shell de demostración de Harmonix](../create-plugin/demo-shell.md).
- **Plugin Store.** El servicio donde se publican los plugins y del que la aplicación obtiene los plugins que carga. Consulta [Gestión de plugins con un Plugin Store](./gestio-plugins-plugin-store.md).

Harmonix se distribuye en estos paquetes:

| Paquete | Uso |
| --- | --- |
| `@uxland/harmonix` | Núcleo: arranque de los plugins, gestor de regiones y tipos de la API |
| `@uxland/harmonix-demo-shell` | Un shell mínimo para desarrollar y probar plugins |
| `@uxland/create-harmonix-plugin` | Crea un proyecto de plugin nuevo |
| `@uxland/harmonix-cli` | Publica plugins en un Plugin Store (`harmonix publish`) |
| `@uxland/harmonix-adapters` | Convierte componentes React en Web Components |

![Un shell con sus regiones, cuyas vistas provienen de plugins del Plugin Store](/img/concepts/shell-plugin-store.png)

## Comparación con otros enfoques

- **Un plugin, muchas vistas.** Con las regiones, un plugin puede inyectar varias vistas en varias regiones del shell. Con iframes, cada pieza incrustada necesita su propia URL.
- **Más allá de una aplicación por ruta.** Herramientas como Webpack Module Federation o single-spa se suelen usar para que cada parte de la página sea un microfrontend separado. En una estación de trabajo, una misma pantalla suele combinar piezas de muchos equipos. Harmonix las compone por región, no por ruta.
- **Sin un servidor web por equipo.** Un iframe necesita un servidor web que sirva su HTML y su JavaScript. Un plugin de Harmonix es un único fichero JavaScript, que puede servir un Plugin Store.
- **Sin problemas de origen cruzado.** Los iframes pueden traer problemas de CORS y de red. Los plugins se ejecutan en la misma página que el shell.
- **Comunicación integrada.** Los plugins y el shell se comunican a través de la API y del broker, con un contrato claro. Por ejemplo, un plugin puede pedir al shell que muestre una notificación.
- **Gobernanza.** Un Plugin Store (cuando la aplicación tiene uno) puede controlar qué plugins y qué versiones recibe cada usuario.
- **Librerías compartidas.** Los plugins no incluyen el framework ni el shell en su bundle: la aplicación los proporciona una sola vez, lo que hace la aplicación más ligera.
- **Desarrollo local.** Los equipos desarrollan con un sandbox en su propia máquina, en lugar de esperar a un entorno de pruebas compartido.

## Tecnologías compatibles

Cada vista que registra un plugin debe ser un elemento HTML, normalmente un [Web Component estándar](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). Los Web Components encapsulan sus estilos y su renderizado, así que no chocan con los de otros plugins.

Harmonix funciona con cualquier librería o framework de JavaScript que pueda producir un Web Component. El creador de plugins tiene plantillas para React 19, Lit 3 y Angular 20. Un plugin usa la versión del framework que proporciona la aplicación. Consulta [Notas por framework](../create-plugin/frameworks.mdx).
