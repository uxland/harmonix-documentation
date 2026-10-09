---
sidebar_position: 6
---

# Plugin management with a Plugin Store

In production, a Harmonix application usually loads its plugins from a **Plugin Store**. A Plugin Store is a plugin repository. It manages which plugins the application loads and lets teams publish and update plugins without redeploying the application.

## How it works

- The Plugin Store supplies plugins to the application at runtime. New features and updates reach users without deploying the whole application.
- It has a **discovery service** that returns a JSON list of the available plugins, with their metadata, version and location.
- When the shell starts, it fetches that list and loads each plugin from its URL.

## Capabilities

A Plugin Store should offer:

- **Discovery service.** The list of plugins available to the application, with their location.
- **User and provider management.** An administration panel to manage users and roles.
- **Independent publication.** An API through which each provider publishes new versions of its plugins.
- **Version control.** Control over which version the discovery service returns.
- **Rules.** Conditions on the plugins returned by the discovery service, for example by user role.
- **File hosting.** The store serves the built plugin files, so plugin teams do not need their own infrastructure.

## Publishing

The Harmonix CLI, `@uxland/harmonix-cli`, uploads a plugin to a Plugin Store. `harmonix publish` reads the plugin id (`name`), the `version` and the file to upload (`module`) from the plugin's `package.json`. See [Build and publish](../create-plugin/build-and-publish.mdx).

:::note
Harmonix does not include a Plugin Store. Each application provides its own, with its infrastructure, CI/CD and administration of roles and permissions.
:::
