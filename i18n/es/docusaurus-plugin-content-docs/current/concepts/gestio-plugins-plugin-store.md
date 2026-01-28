---
sidebar_position: 5
---

# Gestión de plugins con Plugin Store

# Introducción

Cada aplicación basada en Harmonix necesita una pieza clave para poder funcionar, el Plugin Store.

El **Plugin Store** es un repositorio de plugins que proporciona un conjunto de funcionalidades para gestionar y orquestar la composición dinámica de aplicaciones Harmonix, así como la carga y actualización dinámica de los plugins.

<br/>


# Visión general

*   Es un servicio que proporciona una manera de suministrar dinámicamente plugins a una instancia de Harmonix. Esto permite actualizaciones en tiempo real y la integración de nuevas funciones sin desplegar toda la aplicación.
*   Tiene un servicio de descubrimiento que retorna un JSON que lista todos los plugins disponibles, incluyendo su metadata y ubicaciones. Este objeto JSON sirve como registro para todos los microfrontends (plugins) que la instancia de Harmonix puede cargar.
*   Cuando la instancia de Harmonix se inicia, recupera el listado de plugins desde la URL especificada y analiza el JSON para obtener los detalles de cada plugin, incluyendo su URL y versión. Finalmente, los plugins se cargan dinámicamente en la aplicación.

<br/>

# Funcionalidades

*   **Servicio de descubrimiento**. Servicio que proporciona el listado de plugins disponibles para la instancia de Harmonix y su ubicación.
*   **Gestión de usuarios y proveedores.** Proporcionará un panel de administración que permitirá la creación y administración de usuarios y roles.
*   **Despliegue independiente de plugins**. Mediante una API, los proveedores podrán desplegar nuevas versiones de sus plugins de forma independiente.
*   **Control de versiones**. Habrá un panel de administración que permitirá controlar la versión retornada en el servicio de descubrimiento.
*   **Gestión de reglas**. Permitirá la configuración de reglas sobre los plugins retornados en el servicio de despliegue, basadas en condiciones (por ejemplo, rol de usuario).
*   **CDN.** Los plugins desplegarán sus archivos compilados al servidor de Plugin Store para que sirva el contenido, evitando que los plugins requieran una infraestructura propia.



**NOTA**: El Framework Harmonix no dispone de una infraestructura propia y por lo tanto, un Plugin Store propio. Actualmente, cada proyecto de aplicación basado en Harmonix debe disponer de un Plugin Store personalizado con su infraestructura y su CI/CD correspondiente, así como su aplicación frontal y backend para gestionar los roles y permisos específicos de aquel proyecto.
