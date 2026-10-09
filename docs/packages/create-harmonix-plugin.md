---
sidebar_position: 4
sidebar_label: Plugin creator
---

# `@uxland/create-harmonix-plugin`

[![npm](https://img.shields.io/npm/v/@uxland/create-harmonix-plugin?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/create-harmonix-plugin)

The plugin creator. It generates a plugin project with React, Lit or Angular that already works: a plugin that registers a view in the `main` region and an item in the side menu, running inside the [demo shell](./demo-shell.md). You use it once, to start a project; it is not a dependency of the project it creates.

## Usage

```bash
npm create @uxland/harmonix-plugin@latest my-plugin -- --template react
cd my-plugin
npm install
npm run dev      # the demo shell with your plugin
npm run build    # only the plugin, in dist/index.js
```

Use `@latest`: without it, npm may reuse an older version of the creator from its cache.

| Argument | Description |
| --- | --- |
| `<folder>` | The folder to create. It must not exist or must be empty. Its name, in lowercase with only letters, digits and hyphens, becomes the package `name` and the `pluginId`. |
| `--template <name>`, `-t <name>` | `react`, `lit` or `angular`. |
| `--help`, `-h` | Prints the usage. |

Without arguments, in an interactive terminal, it asks for the folder and the framework.

When it creates the project, the creator looks up the latest `@uxland/harmonix-demo-shell` on npm and uses it if it is newer than the one in the template. It also warns if a newer version of the creator exists.

## Templates

| | React | Lit | Angular |
| --- | --- | --- | --- |
| Plugin entry point | `src/plugin.ts` | `src/plugin.ts` | `projects/my-plugin/src/plugin.ts` |
| Dev server | http://localhost:5173 | http://localhost:5173 | http://localhost:4200 |
| Build | Vite | Vite | `ng build` and Vite |
| Extra dependencies | `react`, `react-dom` 19, [`@uxland/harmonix-adapters`](./adapters.md) | `lit` 3 | Angular 20 |

All templates build a single ES module, `dist/index.js`, with the framework and the shell left out: the application that loads the plugin provides them. `package.json` already has the `module` field that the [CLI](./cli.md) reads to publish it, and `.gitignore` already ignores `.harmonixrc`.

## Requirements

Node.js 20.19 or later.

## Links

- [npm](https://www.npmjs.com/package/@uxland/create-harmonix-plugin)
- [Source on GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/create-plugin) (the templates are in `templates/`)
- [Create a plugin](../create-plugin/create-a-plugin.mdx): the step-by-step guide.
- [Framework notes](../create-plugin/frameworks.mdx): what differs between React, Lit and Angular.
- [Build and publish](../create-plugin/build-and-publish.mdx)
