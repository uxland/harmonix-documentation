---
sidebar_position: 1
title: Packages
---

import { PackagesMap } from '@site/src/components/Diagrams/PackagesMap';

# Packages

Harmonix is distributed as five npm packages under the `@uxland` scope. The core is the only one an application needs at runtime. The others help you create, run, adapt and publish plugins. Each package has its own page in this section, with installation, main exports or commands, and links to the detailed guides.

<PackagesMap />

## The packages

| Package | What it is for | Who uses it | When | npm |
| --- | --- | --- | --- | --- |
| [`@uxland/harmonix`](./harmonix.md) | The core: plugin contract, `bootstrapPlugins`, region manager and API types | Shell authors (plugin authors use its types) | Runtime | [npm](https://www.npmjs.com/package/@uxland/harmonix) |
| [`@uxland/harmonix-demo-shell`](./demo-shell.md) | A minimal shell with three regions to run a plugin while you develop it | Plugin authors | Develop | [npm](https://www.npmjs.com/package/@uxland/harmonix-demo-shell) |
| [`@uxland/create-harmonix-plugin`](./create-harmonix-plugin.md) | Creates a plugin project with React, Lit or Angular (`npm create @uxland/harmonix-plugin`) | Plugin authors | Develop (once, at the start) | [npm](https://www.npmjs.com/package/@uxland/create-harmonix-plugin) |
| [`@uxland/harmonix-adapters`](./adapters.md) | Wraps a React component in a Web Component so it can be registered as a view | Plugin authors using React | Runtime | [npm](https://www.npmjs.com/package/@uxland/harmonix-adapters) |
| [`@uxland/harmonix-cli`](./cli.md) | `harmonix publish`: uploads a built plugin to a Plugin Store | Plugin authors | Publish | [npm](https://www.npmjs.com/package/@uxland/harmonix-cli) |

The core depends on [`@uxland/regions`](https://www.npmjs.com/package/@uxland/regions), which provides the regions themselves (the `@region` decorator and the region adapters). A shell uses both.

## Which one do I need?

**I'm writing a plugin.**

1. Create the project with [`@uxland/create-harmonix-plugin`](./create-harmonix-plugin.md). It installs everything else you need for development.
2. Run it inside the [demo shell](./demo-shell.md) with `npm run dev`.
3. If you use React, register your views with [`@uxland/harmonix-adapters`](./adapters.md). The React template already does.
4. Build it and upload it to your Plugin Store with [`@uxland/harmonix-cli`](./cli.md).

**I'm building an application (a shell).**

Install [`@uxland/harmonix`](./harmonix.md) and `@uxland/regions`, and write your own shell: its layout, its regions and the API each plugin receives. See [Building a shell](../api/building-a-shell.md). The demo shell is a working reference, not a base for production applications.

**I'm writing a plugin for an existing application.**

Your plugin receives the API of that application's shell, which extends `HarmonixApi` from the core. You can still develop it in isolation with the creator and the demo shell, as long as you only use what both shells provide, and publish it with the CLI to the application's Plugin Store.

**I only want to try Harmonix.**

Run `npm create @uxland/harmonix-plugin@latest` and follow [Create a plugin](../create-plugin/create-a-plugin.mdx).
