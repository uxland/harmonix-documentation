---
sidebar_position: 4
sidebar_label: Creador de plugins
---

# `@uxland/create-harmonix-plugin`

El creador de plugins. Genera un projecte de plugin amb React, Lit o Angular que ja funciona: un plugin que registra una vista a la regió `main` i un element al menú lateral, executant-se dins del [shell de demostració](./demo-shell.md). El fas servir un cop, per començar un projecte; no és una dependència del projecte que crea.

## Ús

```bash
npm create @uxland/harmonix-plugin@latest my-plugin -- --template react
cd my-plugin
npm install
npm run dev      # the demo shell with your plugin
npm run build    # only the plugin, in dist/index.js
```

Fes servir `@latest`: sense això, npm pot reutilitzar una versió antiga del creador que tingui a la memòria cau.

| Argument | Descripció |
| --- | --- |
| `<folder>` | La carpeta que es crea. No ha d'existir o ha d'estar buida. El seu nom, en minúscules i només amb lletres, xifres i guions, es converteix en el `name` del paquet i en el `pluginId`. |
| `--template <name>`, `-t <name>` | `react`, `lit` o `angular`. |
| `--help`, `-h` | Mostra com es fa servir. |

Sense arguments, en un terminal interactiu, demana la carpeta i el framework.

Quan crea el projecte, el creador consulta la darrera versió d'`@uxland/harmonix-demo-shell` a npm i la fa servir si és més nova que la de la plantilla. També avisa si hi ha una versió més nova del creador.

## Plantilles

| | React | Lit | Angular |
| --- | --- | --- | --- |
| Punt d'entrada del plugin | `src/plugin.ts` | `src/plugin.ts` | `projects/my-plugin/src/plugin.ts` |
| Servidor de desenvolupament | http://localhost:5173 | http://localhost:5173 | http://localhost:4200 |
| Construcció | Vite | Vite | `ng build` i Vite |
| Dependències addicionals | `react`, `react-dom` 19, [`@uxland/harmonix-adapters`](./adapters.md) | `lit` 3 | Angular 20 |

Totes les plantilles construeixen un sol mòdul ES, `dist/index.js`, sense el framework ni el shell: els proporciona l'aplicació que carrega el plugin. `package.json` ja té el camp `module` que llegeix la [CLI](./cli.md) per publicar-lo, i `.gitignore` ja ignora `.harmonixrc`.

## Requisits

Node.js 20.19 o posterior.

## Enllaços

- [npm](https://www.npmjs.com/package/@uxland/create-harmonix-plugin)
- [Codi font a GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/create-plugin) (les plantilles són a `templates/`)
- [Crear un plugin](../create-plugin/create-a-plugin.mdx): la guia pas a pas.
- [Notes per framework](../create-plugin/frameworks.mdx): què canvia entre React, Lit i Angular.
- [Construir i publicar](../create-plugin/build-and-publish.mdx)
