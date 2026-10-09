---
sidebar_position: 4
---

# Flujo de trabajo

Harmonix está pensado para que los equipos puedan desarrollar plugins por su cuenta, con herramientas sencillas y estándar.

## Flujo de desarrollo

1. **Construir el shell.** El equipo de la aplicación crea el shell sobre Harmonix: declara las regiones y la API, hasta que la aplicación está lista para alojar plugins. Consulta [Construir un shell](../api/building-a-shell.md).
2. **Desarrollar los plugins.** Los equipos de los plugins empiezan con el [creador de plugins](../create-plugin/create-a-plugin.mdx). Les da un proyecto que se ejecuta en el shell de demostración de Harmonix.
3. **Publicar.** Los plugins se construyen y se publican, normalmente en un Plugin Store. El store lleva el control de las versiones de cada plugin y de quién puede usarlas.
4. **Ejecutar.** La aplicación carga los plugins y los inicializa en paralelo, y así construye la aplicación final.

## Flujo de ejecución

1. El usuario abre la aplicación en el navegador.
2. El shell pinta su esqueleto, crea sus regiones y empieza a cargar los plugins.
3. Se carga cada plugin, normalmente desde el Plugin Store.
4. Se llama a la función `initialize` de cada plugin en paralelo, cada una con su propia instancia de la API. Si un plugin falla, los demás se cargan igualmente.
5. Cada plugin hace sus tareas de inicialización: registrar vistas, suscribirse a eventos, cargar datos.
6. La interfaz se compone a medida que las vistas se registran en las regiones.
7. El usuario ve una única aplicación formada por plugins diferentes y puede interactuar con ella.
