---
sidebar_position: 1
---

# Introducción

# Visión general

En un entorno en constante evolución y de alta demanda funcional, la eficiencia y la precisión se vuelven críticas para proporcionar servicios de primera calidad. Conscientes de esta necesidad creciente y de la dificultad de encontrar herramientas capaces de resolver casos de uso complejos, se presenta un innovador **framework** basado en un **sistema de plugins modular**, diseñado específicamente para la construcción de aplicaciones avanzadas.



El sistema de plugins ofrece una solución **completa y adaptable** que permite a los profesionales tener una **visión global** y **optimizar** su entorno de trabajo según las necesidades específicas de su práctica. Este sistema proporciona una plataforma **versátil** y de alto **rendimiento** que impulsa la eficiencia y mejora los resultados.

<br/>

# Filosofía y principios de diseño

La estrategia tecnológica basada en **plugins modulares**, a diferencia de la tecnología de microfrontends convencionales e iframes, nos permite que diferentes equipos de trabajo desarrollen estos plugins de forma **independiente** y después cada uno de ellos se inyecte visual y funcionalmente en las diferentes **regiones** que la plataforma modular proporciona, de manera que para cada plugin se podrán visualizar **diferentes vistas repartidas por la aplicación**, pero a la vez conectadas técnica y funcionalmente entre sí, ofreciendo así una **versatilidad y rendimiento** que ayudará al flujo de trabajo del profesional.



Además, los plugins, al estar inyectados y renderizados por la propia plataforma y no ser un simple iframe, tienen **acceso directo a funcionalidades y servicios** que ofrece la plataforma, así como la posibilidad de interactuar con otros plugins y evitar problemas de incompatibilidades, infraestructura y seguridad.


<br/>

# Casos de uso principales

El escenario de uso principal de una aplicación basada en el framework **Harmonix**, es toda aquella aplicación estilo "**Estación de trabajo**" y "**Single Page Application**", donde el usuario quiere ver el máximo de información posible, interconectada entre sí, reactiva y con una experiencia que haga que el proceso a realizar sea cómodo, accesible, dinámico y efectivo.



Además, Harmonix provee de una **serie de herramientas** para que estas estaciones de trabajo puedan contener diferentes plugins, construidos con **tecnologías y ciclos de vida diferentes**, donde únicamente tienen que cumplir unas **normas de adhesión** con la **aplicación principal (shell)**, pero a la vez dotar de funcionalidades de interactividad con estos plugins.



Cabe resaltar la importancia de esta **autonomía** que tienen los plugins que actúan de microfrontends, para ser desarrollados con la **tecnología** que se desee (siempre y cuando se encapsulen en un Web Component, que se detallará en puntos posteriores), y de tener un **ciclo de desarrollo y despliegue** propios totalmente agnósticos al framework y al shell, cosa que facilita y soluciona casos de uso reales donde la misma aplicación puede contener plugins e iniciativas creadas por **clientes diferentes**.
