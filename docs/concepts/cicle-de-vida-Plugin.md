---
sidebar_position: 5
---

import { PluginLifecycle } from '@site/src/components/Diagrams/PluginLifecycle';

# Plugin lifecycle

A plugin is an ES module, usually bundled into a single JavaScript file. It exports two functions, both returning a `Promise`:

- `initialize(api)` starts the plugin.
- `dispose(api)` stops it and undoes everything `initialize` did.

```typescript
import type { DemoShellApi, BrokerDisposableHandler } from "@uxland/harmonix-demo-shell";

let subscription: BrokerDisposableHandler | undefined;

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => document.createElement("orders-list"),
  });
  subscription = api.broker.subscribe("user:changed", () => console.log("Reload the orders"));
};

export const dispose = async (api: DemoShellApi) => {
  subscription?.dispose();
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

A plugin's lifecycle has two parts:

- **Offline lifecycle:** development, maintenance and distribution of the plugin.
- **Online lifecycle:** what happens to the plugin inside a running shell.

## Offline lifecycle

1. Creation
2. Development and testing
3. Publication
4. Maintenance
5. Updates
6. Deprecation
7. Deactivation

Phases 1, 2 and 4 happen locally. Phases 3, 5, 6 and 7 involve the Plugin Store, which should support all of them. Some Plugin Stores also support a progressive rollout in phase 3: a new version starts with a subset of users until it is mature enough. This is a capability of the Plugin Store, not of Harmonix itself.

## Online lifecycle

<PluginLifecycle />

1. **Loading.** The shell calls the `importer()` of the plugin's `PluginDefinition`. Usually this is a dynamic `import()` of the plugin's URL in the Plugin Store, or of a local module during development.
2. **Evaluation.** The browser evaluates the module, which exposes `initialize` and `dispose`.
3. **Initialization.** Harmonix calls `initialize(api)` with an API instance created for this plugin. All plugins are initialized in parallel. If one throws, the error is logged and the other plugins carry on.
4. **Rendering.** The registered views appear in their regions. Each view's `factory` runs when its region needs the element.
5. **Disposal.** The shell calls `dispose(api)`. This function is required, and it must undo everything: remove views, dispose broker subscriptions and request handlers, stop timers, and release any other resources.

See [Building a shell](../api/building-a-shell.md) for the shell side of this process.
