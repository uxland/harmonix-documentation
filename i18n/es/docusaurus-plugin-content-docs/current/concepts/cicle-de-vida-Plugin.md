---
sidebar_position: 4
---

# Ciclo de vida de un Plugin

# Introducción

Un plugin es una librería/paquete de Node.js que exporta al menos una función `initialize` que recibe una API de plugin para conectar componentes a una instancia de Harmonix Shell que lo aloja.

El ciclo de vida de un plugin existe en dos categorías diferentes:

*   **Ciclo de vida offline**, es decir, todo lo que hace referencia al desarrollo, mantenimiento y aprovisionamiento de un plugin.
*   **Ciclo de vida online**, es decir, todo lo que hace referencia a cargar y evaluar un plugin dentro de una aplicación shell.

<br/>

# Ciclo de Vida Offline

El ciclo de vida offline consiste en:

1. Inicialización/Estructuración
2. Desarrollo y pruebas
3. Publicación
4. Mantenimiento
5. Actualizaciones
6. Desaprobación
7. Desactivación



Mientras que las fases (1), (2) y (4) son puramente locales, las fases (3), (5), (6) y (7) implicarán el servicio de Plugin Store. Un servicio de Plugin Store debería dar soporte a todas estas acciones. Normalmente, en la fase (3) también se puede hacer un despliegue progresivo, que implicaría comenzar solo con un subconjunto de usuarios hasta que el plugin llegue al nivel de madurez deseado.


<br/>

# Ciclo de Vida Online

El ciclo de vida online describe qué pasa cuando un plugin se debe integrar en una aplicación shell. Tenemos:

1. Carga
2. Evaluación
3. Configuración
4. Renderización
5. Desmontaje



En la fase (1) se hace una petición al servicio de Plugin Store y se recupera el script.

En la fase (2) se evalúa el script.

En la fase (3) se ejecutará la función de configuración necesaria. En la fase de renderización (4) todos los componentes registrados de la fase (3) aparecerán en la aplicación cuando sean necesarios.

En la fase (5) se ejecutará la función opcional de desmontaje.
