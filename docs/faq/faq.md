---
sidebar_position: 13
---

# FAQ

## What is Harmonix?

Harmonix is a framework for composing a single-page application from plugins that are developed and deployed independently. A shell defines regions, and each plugin registers Web Components as views in those regions.

## Who is Harmonix for?

For applications built by several teams, or by different companies, where each team develops its own features with its own technology and release cycle.

## Which frameworks can I use?

React, Angular, Lit or plain JavaScript/TypeScript: anything that produces a Web Component. The [plugin creator](../create-plugin/create-a-plugin.mdx) has templates for React, Lit and Angular.

## What is the shell?

The main application. It renders the layout, defines the regions, builds the API each plugin receives and loads the plugins. It also provides the common services, such as authentication or translations. See [Building a shell](../api/building-a-shell.md).

## What is a plugin?

An ES module that exports `initialize(api)` and `dispose(api)`. It provides one feature of the application. It can be added, updated or removed without redeploying the shell. See [Plugin lifecycle](../concepts/cicle-de-vida-Plugin.md).

## What are regions?

Areas of the shell where plugins inject views. Some show one view at a time, others show several. See [Regions and views](../api/gestio-regions-i-vistes.md).

## What does the Harmonix API offer?

Each plugin receives an API with:

- `regionManager`, to register and activate views in the regions.
- `pluginInfo`, with the plugin id.
- `createLocaleManager`, to translate the plugin's messages.

Each shell extends it with its own services, such as a broker, an HTTP client or notifications. See the [API reference](../api/Api.md).

## How are translations handled?

Each plugin passes its messages to `api.createLocaleManager(messages)` and gets a translator. Harmonix only defines the interface; the shell implements it and decides the current language.

## How do plugins communicate?

Through the shell's [broker](../api/broker.md). A plugin can publish events that any number of plugins subscribe to, or send requests that one plugin answers. Plugins never import each other.

## What happens if a plugin fails to load?

The error is logged and the plugin is skipped. The other plugins are loaded and initialized normally.

## Do I need a Plugin Store? How do I publish a plugin?

A shell can load plugins from any URL or from local modules, so a Plugin Store is not required. In production, applications usually have one to manage plugins and versions. To upload a plugin, use `harmonix publish` from [`@uxland/harmonix-cli`](https://www.npmjs.com/package/@uxland/harmonix-cli). See [Build and publish](../create-plugin/build-and-publish.mdx) and [Plugin management with a Plugin Store](../concepts/gestio-plugins-plugin-store.md).

## How do I develop a plugin without the final application?

Use the [plugin creator](../create-plugin/create-a-plugin.mdx). It creates a project that runs your plugin inside the [demo shell](../create-plugin/demo-shell.md), a small shell with a header, a side menu and a main region.

## How do I build my own shell?

Use `@uxland/harmonix` and `@uxland/regions` to create the regions, define your API and load the plugins with `bootstrapPlugins`. See [Building a shell](../api/building-a-shell.md).

## Can two plugins use the same view id?

In the demo shell, yes: it stores each view as `pluginId::viewId`. In other shells, it depends on whether the shell namespaces view ids. If it does not, prefix your ids with the plugin id.

## How are styles isolated?

Each view renders in its own Shadow DOM, so its styles do not leak out and the shell's styles do not leak in. The plugin creator templates already do this. Harmonix does not provide a common look: that is the job of the shell and its design system, for example through CSS custom properties.

## How do plugins share libraries like React?

Plugins do not bundle the framework. They are built with it as an external, and the application provides a single copy to all plugins. Develop with the same major version the application uses. See [Build and publish](../create-plugin/build-and-publish.mdx).

## How does Harmonix compare to Module Federation, single-spa or iframes?

- **Iframes** isolate completely, but each piece needs its own URL and web server, and communication and styling across frames are hard.
- **Webpack Module Federation** and **single-spa** are general tools to load or mount separately built applications, often one per route.
- **Harmonix** composes one screen from many plugins by region: one plugin can place views in several regions, and plugins talk through the shell's API and broker.

## Is Harmonix suitable for small applications?

It is designed for large applications with several teams. It can also make sense in a smaller application that is expected to grow or to involve more teams.

## Does Harmonix support CI/CD?

Yes. Each plugin is built and published on its own, so each team can have its own pipeline and release independently.

## What are the most common use cases?

- Workstation-style applications built by independent teams.
- SaaS platforms where customers enable different features.
- Integrating products from different companies in the same interface.

## Where can I find more resources?

Start with [Create a plugin](../create-plugin/create-a-plugin.mdx). The source code is on [GitHub](https://github.com/uxland/harmonix).
