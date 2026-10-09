---
sidebar_position: 12
---

# Best practices

## Dispose the plugin properly

A plugin has two key moments: **initialization** (`initialize`) and **disposal** (`dispose`). Everything the plugin does when it starts must be undone when it is disposed: registered views, broker subscriptions and request handlers, timers, dependency containers, framework applications…

Often the user closes the browser and everything goes away. But a shell can also unload and reload plugins without a page reload, for example when the user or the working context changes, or when the session is renewed. If a plugin does not clean up, it can leave things in memory (**memory leaks**) or show data from the previous context (**data mixing**).

```typescript
import type { BrokerDisposableHandler, DemoShellApi } from "@uxland/harmonix-demo-shell";

const handlers: BrokerDisposableHandler[] = [];
let timer: ReturnType<typeof setInterval> | undefined;

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({ id: "orders", factory: async () => document.createElement("orders-list") });
  handlers.push(api.broker.subscribe("users:changed", () => clearOrdersCache()));
  timer = setInterval(() => refreshOrders(), 60_000);
};

export const dispose = async (api: DemoShellApi) => {
  clearInterval(timer);
  for (const handler of handlers.splice(0)) handler.dispose();
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## Treat the API as a singleton

The plugin receives its API in `initialize`. Do not clone it or wrap it in copies. Treat it as the single source of truth for everything the shell offers.

Keep a reference where the rest of the plugin can reach it. A module-level variable is enough. In larger plugins, you can optionally register it in a dependency container, for example with [InversifyJS](https://inversify.io/), and resolve it as a singleton anywhere in your code.

## Use `initialize` as the entry point

`initialize` is where the plugin configures itself, makes its first service calls and registers its views. Await every asynchronous step, so that errors reach Harmonix:

```typescript
export const initialize = async (api: DemoShellApi) => {
  await registerViews(api); // register views in the regions
  await initializeLocalization(api); // set up the plugin's translations
  await bootstrapFeatures(api); // start the plugin's use cases
};
```

## Let `initialize` fail on fatal errors

If the plugin cannot work, for example because a required configuration is missing, let `initialize` throw. Harmonix logs the error and skips the plugin, and the other plugins keep working. Do not swallow the error and leave the plugin half started.

## Don't rely on plugin load order

All plugins are loaded and initialized in parallel. Another plugin may not be ready when yours starts. Do not call into other plugins during `initialize` expecting them to be there. Use the [broker](../api/broker.md) instead: subscribe to the events you need, and send requests when the user acts, not at start-up.

## One plugin per feature, not per view

A plugin is an independent part of the system that solves the use cases of one scope. It can inject different views into different regions, all fed by the same data.

For example, an orders plugin may need three views: the list of orders in the main region, a counter of open orders in the header and an item in the side menu. Do **not** create three plugins for that. Three plugins would duplicate code and have separate lifecycles for what is a single scope. With one plugin and one orders backend, there is a single source of truth that feeds the three views.

## View ids

Two plugins may use the same view id, for example `main`. The demo shell already namespaces ids as `pluginId::viewId`, so they do not collide. If your shell does not do this, prefix the ids with the plugin id:

```typescript
const pluginId = api.pluginInfo.pluginId;

await api.regionManager.registerView(api.regionManager.regions.main, {
  id: `${pluginId}-main-view`,
  factory: mainFactory,
});
```

## Prefix custom element tag names

Custom element names are global to the page, and a name can only be defined once. Prefix your tag names with the plugin id. For a plugin with id `orders`, use names like `orders-list` or `orders-header-counter`.

Define each element only once, and guard the definition, since a plugin can be initialized again after being disposed:

```typescript
if (!customElements.get("orders-list")) {
  customElements.define("orders-list", OrdersList);
}
```

## Isolate styles with Shadow DOM

Views live next to the views of other plugins. Render them in their own shadow root, so that their styles do not leak out and the shell styles do not leak in. CSS custom properties do go through the shadow DOM, so views can still use the shell's theme variables. See [Framework notes](../create-plugin/frameworks.mdx).

## Never touch the shell DOM

A plugin only shows content through its views in regions. Do not query or modify the shell's elements, or the views of other plugins. The shell can change its layout at any time, and other plugins are not part of your contract.

## Static assets

Each plugin is responsible for its own static assets: images, fonts, icons… A Harmonix application is not a conventional application with a shared public folder, because the shell does not know the plugins it will load.

Include the assets in the plugin's code (for example, as inline SVG or data URLs), or host them on your own infrastructure and load them from there.
