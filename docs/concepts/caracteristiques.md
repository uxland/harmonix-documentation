---
sidebar_position: 3
---

import { ShellAnatomy } from '@site/src/components/Diagrams/ShellAnatomy';

# Features

## Main features

1. **Independent development.** Teams work on different plugins independently. Each plugin has its own repository, build and release cycle.
2. **Grows by adding plugins.** New functionality is added as new plugins, without touching the shell or the other plugins.
3. **Several views per plugin.** A plugin can register views in several regions of the shell. All of them share the plugin's code and data.
4. **Heterogeneous technology.** Each team chooses the framework that fits its plugin: React, Angular, Lit or plain JavaScript.
5. **Fault isolation.** If a plugin fails to load or initialize, the error is logged and the other plugins still load.
6. **Communication between plugins.** Plugins exchange events and requests through the shell's [broker](../api/broker.md), without importing each other.
7. **Shell services.** Each shell can expose its own services (HTTP client, authentication, notifications, translations…) through its API.
8. **Faster updates.** A plugin can be updated without redeploying the shell, so fixes and features reach users sooner.

## Concepts

- **Harmonix core** (`@uxland/harmonix`). Loads and initializes the plugins, gives each one its API and provides the region manager.
- **Shell.** The main application. It is a skeleton of regions where plugins inject their views, and it builds the API each plugin receives.
- **Plugin.** An independent ES module that exports `initialize(api)` and `dispose(api)`. It contains everything needed for one feature of the application.
- **Region.** An area of the shell where views are injected. A region can show one view at a time (single-active) or several (multiple-active).
- **View.** A Web Component, registered by a plugin, that is shown in a region.
- **Broker.** The message bus between plugins: events (publish/subscribe) and requests (send/handle).
- **Sandbox.** An isolated application to develop and test plugins: a shell with only the plugins being developed. The [plugin creator](../create-plugin/create-a-plugin.mdx) sets one up with the [Harmonix demo shell](../create-plugin/demo-shell.md).
- **Plugin Store.** The service where plugins are published, and from which the application gets the plugins it loads. See [Plugin management with a Plugin Store](./gestio-plugins-plugin-store.md).

Harmonix is distributed as these packages:

| Package | Use |
| --- | --- |
| `@uxland/harmonix` | Core: plugin bootstrapping, region manager and API types |
| `@uxland/harmonix-demo-shell` | A minimal shell to develop and try plugins |
| `@uxland/create-harmonix-plugin` | Creates a new plugin project |
| `@uxland/harmonix-cli` | Publishes plugins to a Plugin Store (`harmonix publish`) |
| `@uxland/harmonix-adapters` | Turns React components into Web Components |

<ShellAnatomy />

## Comparison with other approaches

- **One plugin, many views.** With regions, one plugin can inject several views into several regions of the shell. With iframes, each embedded piece needs its own URL.
- **Beyond one-app-per-route.** Tools like Webpack Module Federation or single-spa are usually used so that each part of the page is a separate microfrontend. In a workstation, one screen often combines pieces from many teams. Harmonix composes them by region rather than by route.
- **No web server per team.** An iframe needs a web server to serve its HTML and JavaScript. A Harmonix plugin is a single JavaScript file, which a Plugin Store can serve.
- **No cross-origin issues.** Iframes can bring CORS and networking problems. Plugins run in the same page as the shell.
- **Built-in communication.** Plugins and the shell talk through the API and the broker, with a clear contract. For example, a plugin can ask the shell to show a notification.
- **Governance.** A Plugin Store (when the application provides one) can control which plugins and versions each user gets.
- **Shared libraries.** Plugins do not bundle the framework or the shell: the application provides them once, which keeps the application lighter.
- **Local development.** Teams develop with a sandbox on their own machine, instead of waiting for a shared test environment.

## Compatible technologies

Each view a plugin registers must be an HTML element, typically a [standard Web Component](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). Web Components encapsulate their styles and rendering, so they do not collide with other plugins.

Harmonix works with any JavaScript library or framework that can produce a Web Component. The plugin creator has templates for React 19, Lit 3 and Angular 20. A plugin uses the framework version that the application provides. See [Framework notes](../create-plugin/frameworks.mdx).
