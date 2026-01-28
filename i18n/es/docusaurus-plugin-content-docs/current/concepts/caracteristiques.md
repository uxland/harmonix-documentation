---
sidebar_position: 2
---

# Características

# Características principales

1. **Desarrollo Independiente:** Los equipos de desarrollo pueden trabajar de manera independiente en diferentes plugins, lo que permite una mayor agilidad y facilita la implementación de cambios y nuevas características.
2. **Escalabilidad:** La arquitectura basada en plugins modulares facilita la escalabilidad horizontal, ya que cada plugin se puede escalar por separado. Esto es particularmente beneficioso en entornos donde ciertas partes de la interfaz de usuario pueden experimentar una carga mayor que otras.
3. **Reutilización de Componentes:** Los componentes de la interfaz de usuario pueden ser reutilizados en diferentes partes de la aplicación, lo que puede conducir a un desarrollo más eficiente y a la consistencia en la apariencia y el comportamiento de la interfaz de usuario.
4. **Tecnología Heterogénea:** Los equipos pueden elegir las tecnologías más adecuadas para cada plugin, lo que permite la utilización de diferentes marcos de trabajo y bibliotecas según los requisitos específicos de cada parte de la interfaz de usuario.
5. **Resistencia a Fallos:** La arquitectura basada en plugins modulares puede hacer que la aplicación sea más resistente a fallos, ya que un error en un plugin no afectará necesariamente a toda la aplicación.
6. **Interactividad:** Los plugins pueden interactuar vía comandos y eventos entre ellos, así como con los servicios que proporcione el shell (modales, traducciones, eventos de negocio, etcétera)
7. **Autenticación y seguridad**: El sistema proporciona un cliente http para gestionar de forma más fácil la autenticación, conservar y refrescar la sesión y preservar la seguridad y evitar errores de cruce de datos.
8. **Mejora la Experiencia del Usuario:** Al permitir actualizaciones incrementales y rápidas en partes específicas de la interfaz de usuario, se puede mejorar la experiencia del usuario al introducir nuevas características o corregir problemas de manera más rápida.

<br/>

# Conceptos

1. **Motor Harmonix**: El "core" del framework, el encargado de inicializar la aplicación y todos los plugins, y dotarlos de capacidades especiales para ser autocontenidos de un shell.
2. **Plugin**: Un plugin es una parte independiente del sistema que contiene todo lo necesario para ejecutar una parte específica de la funcionalidad de la aplicación. Los plugins son reutilizables y pueden ser intercambiados entre diferentes sistemas o aplicaciones.
3. **Shell:** Es un esqueleto formado por diferentes regiones sobre el cual los desarrolladores pueden construir e inyectar sus plugins.
4. **Región:** Es un espacio definido en el shell donde pueden inyectarse diferentes vistas definidas por los plugins. Las regiones pueden tener características diferentes como por ejemplo la capacidad de mostrar una o más de una vista a la vez, así como diferentes adaptadores que alteran su comportamiento.
5. **Vista:** Es la instancia de un componente o conjunto de componentes que por sí solos tienen un sentido funcional. Las vistas se inyectan en las diferentes regiones del shell.
6. **Sandbox.** Es una aplicación segura y aislada para desarrollar y probar plugins de manera independiente, separada de los otros módulos. Opera como una aplicación sin plugins que imita la aplicación real de la Estación de Trabajo. Es parte del tooling de desarrollo de la solución.
7. **SDK (Software Development Kit)**: Este es un conjunto de herramientas que permite a los desarrolladores crear plugins y poder integrarse con el sistema, así como interactuar con él y otros plugins, en caso de que lo necesiten.
8. **Plugin Store**: Es el lugar donde se publican y guardan todos los plugins disponibles para su uso. Funciona como un repositorio de bundles compilados y del cual la aplicación obtendrá los necesarios para componer la UI.



![](https://t9012015559.p.clickup-attachments.com/t9012015559/60d2fe59-dd78-406e-8701-cea5bdc2d40f/image.png)


<br/>

# Beneficios y ventajas respecto a otros enfoques o herramientas

*   Con el sistema basado en plugins y regiones, se puede conseguir que 1 solo plugin pueda inyectar **múltiples vistas** en **múltiples regiones** de la aplicación contenedora (shell). Con un sistema basado en microfrontends en iframes, debes tener una única URL por componente a inyectar.
*   Los sistemas como Webpack Model Federation, Single SPA u otras herramientas, están pensados para hacer **Microfrontends convencionales**, donde cada parte de la aplicación es un microfrontend. En estaciones de trabajo complejas, diferentes partes de la aplicación se pueden componer a base de **muchas iniciativas y verticales diferentes**, incluso mezclarse, filtrarse y necesidades funcionales complejas que estas herramientas no pueden resolver.
*   El iframe necesita un **servidor web** para servir el HTML y JS. Con nuestra solución, el **Plugin Store** serviría el compilado como repositorio de objetos, evitando que los verticales tengan que tener un servidor web (reducción drástica del costo de infraestructura y CI/CD)
*   El iframe puede generar **problemas de CORS** y requiere conocimiento por parte del proveedor desarrollador de módulos, conocimientos de infraestructura para resolver posibles problemas de red.
*   El framework implementa un sistema de **comunicación intermodular**, aplicación-plugin, reutilizable, que no requiere implementación por parte del desarrollador de plugins.
    *   Permite establecer un contrato claro entre las piezas y aumenta las posibilidades de una interacción más **transparente** app-plugin.
    *   Casos de uso de ejemplo (llamar un snackbar, utilizar un componente UI como un busy), etc
*   El Plugin Store encapsula la **complejidad de gobernanza** de permisos de plugins.
*   **Compartir librerías** comunes entre plugins, como podría ser el Design System o librerías de JS React, Vue, Lit... (**reducción en peso de la aplicación**)
*   Facilita el desarrollo de plugins proporcionando un **sandbox fácilmente instalable**, actualizable y testeable. En el caso del iframe, tendrías que esperar a hacer las pruebas en un entorno de pruebas preproductivo.
*   Proporciona una **documentación clara** de un desarrollo de plugin y, en consecuencia, una definición clara del flujo de trabajo.


<br/>

# Tecnologías compatibles con Harmonix

Harmonix es un sistema de inyección dinámica de plugins, donde estos plugins pueden tener N componentes/vistas inyectadas en N regiones. Cada uno de estos componentes debe ser un [Web Component estándar](https://developer.mozilla.org/es/docs/Web/API/Web_components).

Los **Web Components** están establecidos en el ecosistema frontend Javascript y son una buena solución para las aplicaciones basadas en Harmonix, ya que encapsulan los estilos y la lógica de pintado haciendo que no haya colisiones con otros componentes y plugins.

Por lo tanto, cuando se crea un plugin siempre se debe encapsular cada uno de los componentes creados con la tecnología que sea, en un Web Component. Por lo tanto, podríamos decir que **Harmonix es compatible con cualquier librería/framework de renderizado Javascript que sea capaz de acabar creando un Web Component**.

Hay varias formas de encapsular un componente de una librería Javascript, y desde el equipo de desarrollo de Harmonix, trabajamos para dar la **solución más óptima** para cada caso. Actualmente, los frameworks que han sido probados y que tenemos documentados son: **Vanilla JS** (Javascript nativo sin librería), **Lit 3**, **Angular 18** y **React 19**. A medida que los consumidores de Harmonix vayan necesitando otros como Vue, etcétera, iremos dando el soporte y documentando.
