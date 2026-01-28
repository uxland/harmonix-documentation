---
sidebar_position: 3
---

# Flujo de trabajo

Harmonix ha sido creado para construir aplicaciones donde la **experiencia de desarrollo** se convierte en un punto clave, por eso la comodidad para el desarrollador es una prioridad.



Esto se consigue gracias a **la autonomía** de desarrollo de plugins, junto con el conjunto de herramientas de configuración **sencilla y estándar.**



El **flujo de desarrollo** pasa por una **primera fase de creación del Shell** basado en Harmonix, donde se declaran las regiones principales y se configuran las herramientas necesarias hasta que la aplicación se convierte en un estado de "**fábrica de plugins**". Es entonces cuando los desarrolladores pueden comenzar a crear plugins con el sandbox proporcionado y que irán a parar en este Shell.



Los plugins son **compilados y desplegados en el Plugin Store**, y desde allí se llevará un control sobre las versiones de cada plugin y se configurará los roles y permisos necesarios. Finalmente, la aplicación con el motor Harmonix obtendrá estos plugins y los **ejecutará asincrónicamente**, construyendo así la aplicación final.

A continuación, se detalla el **flujo de ejecución** de una aplicación Harmonix:



0- El usuario abre la aplicación en el Browser en el dominio correspondiente

1- El shell, mediante Harmonix, crea el esqueleto, el objeto API e inicia el proceso principal de obtención de plugins

2- Se descargan los ficheros de cada plugin publicados en el Plugin Store

3- Se llama a la función de iniciación de cada plugin de forma paralela

4- Cada plugin realiza las tareas que ha definido en su punto de inicialización

5- La UI se va componiendo a medida que se van resolviendo los registros de componentes de plugins

7- El usuario ve finalmente una sola aplicación compuesta de diferentes plugins y Web Components y puede interactuar con ella.
