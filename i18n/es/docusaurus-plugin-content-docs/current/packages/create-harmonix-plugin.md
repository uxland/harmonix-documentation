---
sidebar_position: 4
sidebar_label: Creador de plugins
---

# `@uxland/create-harmonix-plugin`

El creador de plugins. Genera un proyecto de plugin con React, Lit o Angular que ya funciona: un plugin que registra una vista en la región `main` y un elemento en el menú lateral, y que se ejecuta dentro del [shell de demostración](./demo-shell.md). Lo usas una vez, para empezar un proyecto; no es una dependencia del proyecto que crea.

## Uso

```bash
npm create @uxland/harmonix-plugin@latest my-plugin -- --template react
cd my-plugin
npm install
npm run dev      # the demo shell with your plugin
npm run build    # only the plugin, in dist/index.js
```

Usa `@latest`: sin él, npm puede reutilizar una versión anterior del creador que tenga en caché.

| Argumento | Descripción |
| --- | --- |
| `<folder>` | La carpeta que se creará. No debe existir o debe estar vacía. Su nombre, en minúsculas y solo con letras, dígitos y guiones, se convierte en el `name` del paquete y en el `pluginId`. |
| `--template <name>`, `-t <name>` | `react`, `lit` o `angular`. |
| `--help`, `-h` | Muestra el uso. |

Sin argumentos, en un terminal interactivo, pregunta la carpeta y el framework.

Cuando crea el proyecto, el creador busca la última versión de `@uxland/harmonix-demo-shell` en npm y la usa si es más nueva que la de la plantilla. También avisa si existe una versión más nueva del creador.

## Plantillas

| | React | Lit | Angular |
| --- | --- | --- | --- |
| Punto de entrada del plugin | `src/plugin.ts` | `src/plugin.ts` | `projects/my-plugin/src/plugin.ts` |
| Servidor de desarrollo | http://localhost:5173 | http://localhost:5173 | http://localhost:4200 |
| Build | Vite | Vite | `ng build` y Vite |
| Dependencias adicionales | `react`, `react-dom` 19, [`@uxland/harmonix-adapters`](./adapters.md) | `lit` 3 | Angular 20 |

Todas las plantillas generan un único módulo ES, `dist/index.js`, sin el framework ni el shell: los proporciona la aplicación que carga el plugin. `package.json` ya tiene el campo `module` que la [CLI](./cli.md) lee para publicarlo, y `.gitignore` ya ignora `.harmonixrc`.

## Requisitos

Node.js 20.19 o posterior.

## Enlaces

- [npm](https://www.npmjs.com/package/@uxland/create-harmonix-plugin)
- [Código fuente en GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/create-plugin) (las plantillas están en `templates/`)
- [Crear un plugin](../create-plugin/create-a-plugin.mdx): la guía paso a paso.
- [Notas por framework](../create-plugin/frameworks.mdx): qué cambia entre React, Lit y Angular.
- [Build y publicación](../create-plugin/build-and-publish.mdx)
