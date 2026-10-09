---
sidebar_position: 13
---

# Preguntas frecuentes

## ¿Qué es Harmonix?

Harmonix es un framework para componer una aplicación de una sola página a partir de plugins que se desarrollan y se despliegan de forma independiente. Un shell define regiones, y cada plugin registra Web Components como vistas en esas regiones.

## ¿Para quién es Harmonix?

Para aplicaciones que construyen varios equipos, o empresas diferentes, donde cada equipo desarrolla sus propias funcionalidades con su propia tecnología y su propio ciclo de publicación.

## ¿Qué frameworks puedo usar?

React, Angular, Lit o JavaScript/TypeScript sin framework: cualquier cosa que produzca un Web Component. El [creador de plugins](../create-plugin/create-a-plugin.mdx) tiene plantillas para React, Lit y Angular.

## ¿Qué es el shell?

La aplicación principal. Pinta el layout, define las regiones, construye la API que recibe cada plugin y carga los plugins. También proporciona los servicios comunes, como la autenticación o las traducciones. Consulta [Construir un shell](../api/building-a-shell.md).

## ¿Qué es un plugin?

Un módulo ES que exporta `initialize(api)` y `dispose(api)`. Aporta una funcionalidad de la aplicación. Se puede añadir, actualizar o quitar sin volver a desplegar el shell. Consulta [Ciclo de vida de un plugin](../concepts/cicle-de-vida-Plugin.md).

## ¿Qué son las regiones?

Zonas del shell donde los plugins inyectan vistas. Algunas muestran una vista a la vez, otras muestran varias. Consulta [Regiones y vistas](../api/gestio-regions-i-vistes.md).

## ¿Qué ofrece la API de Harmonix?

Cada plugin recibe una API con:

- `regionManager`, para registrar y activar vistas en las regiones.
- `pluginInfo`, con el id del plugin.
- `createLocaleManager`, para traducir los mensajes del plugin.

Cada shell la extiende con sus propios servicios, como un broker, un cliente HTTP o notificaciones. Consulta la [Referencia de la API](../api/Api.md).

## ¿Cómo se gestionan las traducciones?

Cada plugin pasa sus mensajes a `api.createLocaleManager(messages)` y obtiene un traductor. Harmonix solo define la interfaz; el shell la implementa y decide el idioma actual.

## ¿Cómo se comunican los plugins?

A través del [broker](../api/broker.md) del shell. Un plugin puede publicar eventos a los que se suscriben otros plugins, tantos como haga falta, o enviar peticiones que responde un solo plugin. Los plugins nunca se importan entre sí.

## ¿Qué pasa si un plugin no se puede cargar?

El error se registra en la consola y el plugin se salta. Los demás plugins se cargan y se inicializan con normalidad.

## ¿Necesito un Plugin Store? ¿Cómo publico un plugin?

Un shell puede cargar plugins desde cualquier URL o desde módulos locales, así que un Plugin Store no es obligatorio. En producción, las aplicaciones suelen tener uno para gestionar los plugins y las versiones. Para subir un plugin, usa `harmonix publish` de [`@uxland/harmonix-cli`](https://www.npmjs.com/package/@uxland/harmonix-cli). Consulta [Build y publicación](../create-plugin/build-and-publish.mdx) y [Gestión de plugins con un Plugin Store](../concepts/gestio-plugins-plugin-store.md).

## ¿Cómo desarrollo un plugin sin la aplicación final?

Usa el [creador de plugins](../create-plugin/create-a-plugin.mdx). Crea un proyecto que ejecuta tu plugin dentro del [shell de demostración](../create-plugin/demo-shell.md), un shell pequeño con una cabecera, un menú lateral y una región principal.

## ¿Cómo construyo mi propio shell?

Usa `@uxland/harmonix` y `@uxland/regions` para crear las regiones, define tu API y carga los plugins con `bootstrapPlugins`. Consulta [Construir un shell](../api/building-a-shell.md).

## ¿Pueden dos plugins usar el mismo id de vista?

En el shell de demostración, sí: guarda cada vista como `pluginId::viewId`. En otros shells, depende de si el shell separa los ids de las vistas. Si no lo hace, pon delante de tus ids el id del plugin.

## ¿Cómo se aíslan los estilos?

Cada vista se pinta en su propio Shadow DOM, así que sus estilos no se escapan hacia fuera y los del shell no entran. Las plantillas del creador de plugins ya lo hacen. Harmonix no proporciona un aspecto común: eso es tarea del shell y de su sistema de diseño, por ejemplo mediante propiedades personalizadas de CSS.

## ¿Cómo comparten los plugins librerías como React?

Los plugins no incluyen el framework en su bundle. Se construyen con él como externo, y la aplicación proporciona una sola copia a todos los plugins. Desarrolla con la misma versión mayor que usa la aplicación. Consulta [Build y publicación](../create-plugin/build-and-publish.mdx).

## ¿Qué diferencia hay entre Harmonix y Module Federation, single-spa o los iframes?

- Los **iframes** aíslan por completo, pero cada pieza necesita su propia URL y su propio servidor web, y la comunicación y los estilos entre frames son complicados.
- **Webpack Module Federation** y **single-spa** son herramientas generales para cargar o montar aplicaciones construidas por separado, a menudo una por ruta.
- **Harmonix** compone una pantalla a partir de muchos plugins por región: un plugin puede poner vistas en varias regiones, y los plugins se comunican a través de la API y el broker del shell.

## ¿Harmonix sirve para aplicaciones pequeñas?

Está pensado para aplicaciones grandes con varios equipos. También puede tener sentido en una aplicación más pequeña que se espera que crezca o que implique a más equipos.

## ¿Harmonix admite CI/CD?

Sí. Cada plugin se construye y se publica por separado, así que cada equipo puede tener su propio pipeline y publicar de forma independiente.

## ¿Cuáles son los casos de uso más habituales?

- Aplicaciones de tipo estación de trabajo construidas por equipos independientes.
- Plataformas SaaS donde cada cliente activa funcionalidades diferentes.
- Integrar productos de empresas diferentes en la misma interfaz.

## ¿Dónde encuentro más recursos?

Empieza por [Crear un plugin](../create-plugin/create-a-plugin.mdx). El código fuente está en [GitHub](https://github.com/uxland/harmonix).
