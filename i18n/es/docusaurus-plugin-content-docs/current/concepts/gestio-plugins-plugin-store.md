---
sidebar_position: 6
---

# Gestión de plugins con un Plugin Store

En producción, una aplicación Harmonix suele cargar sus plugins desde un **Plugin Store**. Un Plugin Store es un repositorio de plugins. Gestiona qué plugins carga la aplicación y permite a los equipos publicar y actualizar plugins sin volver a desplegar la aplicación.

## Cómo funciona

- El Plugin Store proporciona los plugins a la aplicación en tiempo de ejecución. Las nuevas funcionalidades y las actualizaciones llegan a los usuarios sin desplegar toda la aplicación.
- Tiene un **servicio de descubrimiento** que devuelve una lista JSON de los plugins disponibles, con sus metadatos, su versión y su ubicación.
- Cuando el shell arranca, obtiene esa lista y carga cada plugin desde su URL.

## Capacidades

Un Plugin Store debería ofrecer:

- **Servicio de descubrimiento.** La lista de plugins disponibles para la aplicación, con su ubicación.
- **Gestión de usuarios y proveedores.** Un panel de administración para gestionar usuarios y roles.
- **Publicación independiente.** Una API con la que cada proveedor publica versiones nuevas de sus plugins.
- **Control de versiones.** Control sobre qué versión devuelve el servicio de descubrimiento.
- **Reglas.** Condiciones sobre los plugins que devuelve el servicio de descubrimiento, por ejemplo según el rol del usuario.
- **Alojamiento de ficheros.** El store sirve los ficheros construidos de los plugins, así que los equipos de los plugins no necesitan infraestructura propia.

## Publicación

La CLI de Harmonix, `@uxland/harmonix-cli`, sube un plugin a un Plugin Store. `harmonix publish` lee el id del plugin (`name`), la `version` y el fichero que hay que subir (`module`) del `package.json` del plugin. Consulta [Build y publicación](../create-plugin/build-and-publish.mdx).

:::note
Harmonix no incluye ningún Plugin Store. Cada aplicación proporciona el suyo, con su infraestructura, su CI/CD y su administración de roles y permisos.
:::
