---
sidebar_position: 1
title: Paquetes
---

import { PackagesMap } from '@site/src/components/Diagrams/PackagesMap';

# Paquetes

Harmonix se distribuye como cinco paquetes npm bajo el scope `@uxland`. El núcleo es el único que una aplicación necesita en tiempo de ejecución. Los demás te ayudan a crear, ejecutar, adaptar y publicar plugins. Cada paquete tiene su propia página en esta sección, con la instalación, las exportaciones o los comandos principales y enlaces a las guías detalladas.

<PackagesMap />

## Los paquetes

| Paquete | Para qué sirve | Quién lo usa | Cuándo | npm |
| --- | --- | --- | --- | --- |
| [`@uxland/harmonix`](./harmonix.md) | El núcleo: contrato de los plugins, `bootstrapPlugins`, gestor de regiones y tipos de la API | Autores de shells (los autores de plugins usan sus tipos) | Ejecución | [npm](https://www.npmjs.com/package/@uxland/harmonix) |
| [`@uxland/harmonix-demo-shell`](./demo-shell.md) | Un shell mínimo con tres regiones para ejecutar un plugin mientras lo desarrollas | Autores de plugins | Desarrollo | [npm](https://www.npmjs.com/package/@uxland/harmonix-demo-shell) |
| [`@uxland/create-harmonix-plugin`](./create-harmonix-plugin.md) | Crea un proyecto de plugin con React, Lit o Angular (`npm create @uxland/harmonix-plugin`) | Autores de plugins | Desarrollo (una vez, al principio) | [npm](https://www.npmjs.com/package/@uxland/create-harmonix-plugin) |
| [`@uxland/harmonix-adapters`](./adapters.md) | Envuelve un componente React en un Web Component para que se pueda registrar como vista | Autores de plugins que usan React | Ejecución | [npm](https://www.npmjs.com/package/@uxland/harmonix-adapters) |
| [`@uxland/harmonix-cli`](./cli.md) | `harmonix publish`: sube un plugin compilado a un Plugin Store | Autores de plugins | Publicación | [npm](https://www.npmjs.com/package/@uxland/harmonix-cli) |

El núcleo depende de [`@uxland/regions`](https://www.npmjs.com/package/@uxland/regions), que proporciona las regiones en sí (el decorador `@region` y los adaptadores de región). Un shell usa los dos.

## ¿Cuál necesito?

**Escribo un plugin.**

1. Crea el proyecto con [`@uxland/create-harmonix-plugin`](./create-harmonix-plugin.md). Instala todo lo demás que necesitas para desarrollar.
2. Ejecútalo dentro del [shell de demostración](./demo-shell.md) con `npm run dev`.
3. Si usas React, registra tus vistas con [`@uxland/harmonix-adapters`](./adapters.md). La plantilla de React ya lo hace.
4. Haz el build y súbelo a tu Plugin Store con [`@uxland/harmonix-cli`](./cli.md).

**Construyo una aplicación (un shell).**

Instala [`@uxland/harmonix`](./harmonix.md) y `@uxland/regions`, y escribe tu propio shell: su layout, sus regiones y la API que recibe cada plugin. Consulta [Construir un shell](../api/building-a-shell.md). El shell de demostración es una referencia que funciona, no una base para aplicaciones en producción.

**Escribo un plugin para una aplicación existente.**

Tu plugin recibe la API del shell de esa aplicación, que extiende `HarmonixApi` del núcleo. Puedes desarrollarlo igualmente de forma aislada con el creador y el shell de demostración, siempre que solo uses lo que ofrecen los dos shells, y publicarlo con la CLI en el Plugin Store de la aplicación.

**Solo quiero probar Harmonix.**

Ejecuta `npm create @uxland/harmonix-plugin@latest` y sigue [Crear un plugin](../create-plugin/create-a-plugin.mdx).
