---
sidebar_position: 3
---

import { BrokerFlow } from '@site/src/components/Diagrams/BrokerFlow';

# Broker

Plugins do not import each other. They communicate through a **broker**: a message bus that the shell exposes in its API.

The core, `@uxland/harmonix`, defines the `HarmonixBroker` interface. Each shell implements it and decides whether to expose it. The [demo shell](../create-plugin/demo-shell.md) exposes it as `api.broker`, with an in-memory implementation shared by all plugins.

<BrokerFlow />

The broker has two kinds of messages:

| | Events | Requests |
| --- | --- | --- |
| Methods | `publish` / `subscribe` | `send` / `registerRequest` |
| Handlers | Any number of subscribers | Exactly one handler |
| Result | None | The handler's response |
| Use | "Something happened" | "Give me something" or "do something" |

## Events

`publish` sends an event to every subscriber. `subscribe` returns a `BrokerDisposableHandler`.

```typescript
// Orders plugin
await api.broker.publish("orders:created", { orderId: "42" });

// Header plugin
const subscription = api.broker.subscribe<{ orderId: string }>("orders:created", ({ orderId }) => {
  console.log(`New order ${orderId}`);
});
```

In the demo shell, `publish` waits for all subscribers. If one subscriber throws, the error is logged and the other subscribers still receive the event.

## Requests

`registerRequest` registers the only handler for a request. `send` calls it and returns its response.

```typescript
// Orders plugin answers
const handler = api.broker.registerRequest<{ status: string }, number>("orders:count", async ({ status }) =>
  countOrders(status),
);

// Another plugin asks
const open = await api.broker.send<{ status: string }, number>("orders:count", { status: "open" });
```

In the demo shell, `send` throws if no handler is registered, and `registerRequest` throws if the request already has one.

## Messages identified by class

A message can be identified by a string, as above, or by a class. With a class, you publish or send an instance and subscribe or register with the class itself:

```typescript
class OrderCreated {
  constructor(public readonly orderId: string) {}
}

class CountOrders {
  constructor(public readonly status: string) {}
}

api.broker.subscribe<OrderCreated>(OrderCreated, ({ orderId }) => console.log(orderId));
await api.broker.publish(new OrderCreated("42"));

api.broker.registerRequest<CountOrders, number>(CountOrders, async ({ status }) => countOrders(status));
const open = await api.broker.send<CountOrders, number>(new CountOrders("open"));
```

The class is the key, so both sides must use the same class object. This works inside a plugin, or when the classes come from a shared package that the application provides to all plugins. Two plugins that each bundle their own copy of the class do not match. Between independently built plugins, prefer string names.

The demo shell passes the handler a plain copy of the instance's properties, not the instance itself.

## Disposing handlers

`subscribe` and `registerRequest` return a `BrokerDisposableHandler`:

```typescript
export interface BrokerDisposableHandler {
  dispose: () => void;
}
```

Call `dispose()` in the plugin's `dispose`. Otherwise the handler stays registered after the plugin is unloaded.

```typescript
import type { BrokerDisposableHandler, DemoShellApi } from "@uxland/harmonix-demo-shell";

const handlers: BrokerDisposableHandler[] = [];

export const initialize = async (api: DemoShellApi) => {
  handlers.push(
    api.broker.subscribe("users:changed", () => reloadOrders()),
    api.broker.registerRequest("orders:count", async () => countOrders("open")),
  );
};

export const dispose = async (_api: DemoShellApi) => {
  for (const handler of handlers.splice(0)) handler.dispose();
};
```

## Naming messages

Message names are global to the application. Prefix them with the id of the plugin that owns them, in the form `plugin-id:event`, for example `orders:created` or `orders:count`. Document the messages your plugin publishes and answers, with their payloads: they are part of its public contract.

## Interface

```typescript
export interface HarmonixBroker {
  send<TRequest extends IRequest<TResponse>, TResponse>(message: TRequest): Promise<TResponse>;
  send<TPayload, TResponse>(requestName: string, payload: TPayload): Promise<TResponse>;

  publish<TEvent extends IEvent>(event: TEvent): Promise<void>;
  publish<TPayload>(eventName: string, payload: TPayload): Promise<void>;

  subscribe<TEvent extends IEvent>(event: IEventClass, handler: EventHandler<TEvent>): BrokerDisposableHandler;
  subscribe<TPayload>(eventName: string, handler: EventHandler<TPayload>): BrokerDisposableHandler;

  registerRequest<TRequest extends IRequest<TResponse>, TResponse>(
    request: IRequestClass<TRequest>,
    handler: RequestHandler<TRequest, TResponse>,
  ): BrokerDisposableHandler;
  registerRequest<TPayload, TResponse>(
    requestName: string,
    handler: RequestHandler<TPayload, TResponse>,
  ): BrokerDisposableHandler;
}
```

To implement a broker in your own shell, see [Building a shell](./building-a-shell.md).
