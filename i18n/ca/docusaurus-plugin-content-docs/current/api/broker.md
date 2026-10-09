---
sidebar_position: 3
---

# Broker

Els plugins no s'importen entre ells. Es comuniquen a través d'un **broker**: un bus de missatges que el shell exposa a la seva API.

El nucli, `@uxland/harmonix`, defineix la interfície `HarmonixBroker`. Cada shell la implementa i decideix si l'exposa. El [shell de demostració](../create-plugin/demo-shell.md) l'exposa com a `api.broker`, amb una implementació en memòria compartida per tots els plugins.

El broker té dos tipus de missatges:

| | Esdeveniments | Peticions |
| --- | --- | --- |
| Mètodes | `publish` / `subscribe` | `send` / `registerRequest` |
| Handlers | Tants subscriptors com calgui | Exactament un handler |
| Resultat | Cap | La resposta del handler |
| Ús | «Ha passat alguna cosa» | «Dona'm alguna cosa» o «fes alguna cosa» |

## Esdeveniments

`publish` envia un esdeveniment a tots els subscriptors. `subscribe` retorna un `BrokerDisposableHandler`.

```typescript
// Orders plugin
await api.broker.publish("orders:created", { orderId: "42" });

// Header plugin
const subscription = api.broker.subscribe<{ orderId: string }>("orders:created", ({ orderId }) => {
  console.log(`New order ${orderId}`);
});
```

Al shell de demostració, `publish` espera tots els subscriptors. Si un subscriptor llança un error, l'error es registra a la consola i els altres subscriptors reben igualment l'esdeveniment.

## Peticions

`registerRequest` registra l'únic handler d'una petició. `send` el crida i en retorna la resposta.

```typescript
// Orders plugin answers
const handler = api.broker.registerRequest<{ status: string }, number>("orders:count", async ({ status }) =>
  countOrders(status),
);

// Another plugin asks
const open = await api.broker.send<{ status: string }, number>("orders:count", { status: "open" });
```

Al shell de demostració, `send` llança un error si no hi ha cap handler registrat, i `registerRequest` en llança un si la petició ja en té un.

## Missatges identificats per una classe

Un missatge es pot identificar amb una cadena, com als exemples anteriors, o amb una classe. Amb una classe, es publica o s'envia una instància i se subscriu o es registra amb la classe mateixa:

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

La classe és la clau, així que totes dues bandes han de fer servir el mateix objecte de classe. Això funciona dins d'un plugin, o quan les classes vénen d'un paquet compartit que l'aplicació proporciona a tots els plugins. Si dos plugins empaqueten cadascun la seva còpia de la classe, no coincideixen. Entre plugins construïts per separat, és millor fer servir noms en forma de cadena.

El shell de demostració passa al handler una còpia simple de les propietats de la instància, no la instància mateixa.

## Alliberar els handlers

`subscribe` i `registerRequest` retornen un `BrokerDisposableHandler`:

```typescript
export interface BrokerDisposableHandler {
  dispose: () => void;
}
```

Crida `dispose()` al `dispose` del plugin. Si no, el handler continua registrat després de descarregar el plugin.

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

## Noms dels missatges

Els noms dels missatges són globals a tota l'aplicació. Posa-hi com a prefix l'id del plugin que els defineix, en la forma `plugin-id:event`, per exemple `orders:created` o `orders:count`. Documenta els missatges que el teu plugin publica i respon, amb les seves dades: formen part del seu contracte públic.

## Interfície

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

Per implementar un broker al teu propi shell, consulta [Construir un shell](./building-a-shell.md).
