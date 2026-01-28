---
sidebar_position: 13
---

# FAQ

# Preguntas Frecuentes sobre Harmonix Framework



### 1\. ¿Qué es Harmonix Framework?



Harmonix es un framework de microfrontends diseñado para facilitar la creación de aplicaciones SPA avanzadas con equipos independientes. Utiliza una arquitectura modular basada en plugins para permitir la integración de componentes de forma escalable y flexible.



### 2\. ¿Para quién está pensado Harmonix?



Harmonix es ideal para empresas grandes o proyectos con equipos distribuidos, donde cada equipo puede desarrollar funcionalidades específicas sin afectar al resto de la aplicación.



### 3\. ¿Harmonix es compatible con múltiples frameworks?



Sí. Es agnóstico en cuanto a la tecnología, compatible con React, Angular, Lit, Vanilla JavaScript, y TypeScript, entre otros.



### 4\. ¿Cómo se gestionan las regiones?



Las regiones son áreas definidas dentro de la aplicación Shell donde los plugins pueden inyectar vistas. Este sistema asegura la integración visual y funcional de cada componente.



### 5\. ¿Qué es la aplicación Shell?



La aplicación Shell actúa como un contenedor principal para todos los plugins. Gestiona las regiones, la navegación y servicios comunes, como autenticación, localización o gestión de estado.



### 6\. ¿Qué es un plugin en Harmonix?



Un plugin es un módulo independiente que proporciona funcionalidades concretas a la aplicación. Se puede añadir, modificar o eliminar sin afectar el rendimiento de la aplicación.



### 7\. ¿Cuál es la función principal de la API de Harmonix?



La API de Harmonix permite:

• Gestionar regiones e inyectar componentes.

• Acceder a información específica del plugin (como identificadores y metadatos).

• Crear funcionalidades personalizadas, como traducciones o interacciones visuales.



### 8\. ¿Se puede personalizar la API?



Sí, la API se puede extender para adaptarla a las necesidades específicas del proyecto. Esto incluye la incorporación de funcionalidades como autenticación, gestión de estado global, traducciones, y servicios de interacción.



### 9\. ¿Cómo se gestiona la localización y traducciones?

Harmonix incluye herramientas para gestionar mensajes localizados, que se pueden administrar a través de la función createLocaleManager. Esto permite integrar fácilmente idiomas múltiples en aplicaciones grandes.



### 10\. ¿Es Harmonix adecuado para aplicaciones pequeñas?



Aunque Harmonix está pensado para escenarios complejos, también puede ser útil en aplicaciones más pequeñas si se prevé crecimiento o si se necesitan múltiples equipos.



### 11\. ¿Harmonix es adecuado para proyectos grandes?



Sí, gracias a su arquitectura modular y escalable, Harmonix está pensado para aplicaciones complejas donde trabajan múltiples equipos y proveedores.





### 12\. ¿Cómo ayuda Harmonix a la unificación de experiencias?



Mediante un sistema de regiones compartidas y estilos coherentes, Harmonix asegura que el usuario perciba la aplicación como un todo integrado, aunque participen diversos equipos.



### 13\. ¿Qué beneficios aporta el agnosticismo tecnológico?



Permite utilizar diferentes tecnologías dentro de una misma aplicación, aprovechando puntos fuertes de frameworks como React para la interfaz y Angular para funcionalidades específicas.



### 14\. ¿Harmonix soporta la integración continua y DevOps?



Sí. Harmonix se puede integrar fácilmente con pipelines de CI/CD para desplegar plugins de manera independiente y mantener versiones actualizadas.



### 15\. ¿Cuáles son los casos de uso más comunes?



• Aplicaciones complejas con equipos independientes.

• Plataformas SaaS donde los clientes pueden personalizar funcionalidades.

• Integración de productos de empresas diferentes dentro de una misma interfaz.



### 16\. ¿Dónde puedo encontrar más recursos y documentación?



La documentación completa está disponible en [harmonixframework.dev](https://harmonixframework.dev/), incluyendo tutoriales y buenas prácticas para comenzar.
