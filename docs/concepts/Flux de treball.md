---
sidebar_position: 4
---

import { Workflow } from '@site/src/components/Diagrams/Workflow';

# Workflow

Harmonix is designed so that teams can develop plugins on their own, with simple and standard tools.

## Development workflow

<Workflow />

1. **Build the shell.** The application team creates the shell on top of Harmonix: it declares the regions and the API, until the application is ready to host plugins. See [Building a shell](../api/building-a-shell.md).
2. **Develop the plugins.** Plugin teams start with the [plugin creator](../create-plugin/create-a-plugin.mdx). It gives them a project that runs in the Harmonix demo shell.
3. **Publish.** Plugins are built and published, typically to a Plugin Store. The store keeps track of the versions of each plugin and of who can use them.
4. **Run.** The application loads the plugins and initializes them in parallel, building the final application.

## Execution flow

1. The user opens the application in the browser.
2. The shell renders its skeleton, creates its regions and starts loading the plugins.
3. Each plugin is loaded, typically from the Plugin Store.
4. The `initialize` function of each plugin is called in parallel, each with its own API instance. If one plugin fails, the others still load.
5. Each plugin performs its initialization tasks: registering views, subscribing to events, loading data.
6. The UI is composed as the views are registered in the regions.
7. The user sees a single application made of different plugins and can interact with it.
