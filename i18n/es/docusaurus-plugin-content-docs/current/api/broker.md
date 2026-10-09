---
sidebar_position: 3
---

# Broker

Los plugins no se importan entre sí. Se comunican a través de un **broker**: un bus de mensajes que el shell expone en su API.

El núcleo, `@uxland/harmonix`, define la interfaz `HarmonixBroker`. Cada shell la implementa y decide si la expone. El [shell de demostración](../create-plugin/demo-shell.md) la expone como `api.broker`, con una implementación en memoria que comparten todos los plugins.

El broker tiene dos tipos de mensajes:

| | Eventos | Peticiones |
| --- | --- | --- |
| Métodos | `publish` / `subscribe` | `send` / `registerRequest` |
| Manejadores | Cualquier número de suscriptores | Exactamente un manejador |
| Resultado | Ninguno | La respuesta del manejador |
| Uso | "Ha pasado algo" | "Dame algo" o "haz algo" |

## Eventos

`publish` envía un evento a todos los suscriptores. `subscribe` devuelve un `BrokerDisposableHandler`.

```typescript
// Orders plugin
await api.broker.publish("orders:created", { orderId: "42" });

// Header plugin
const subscription = api.broker.subscribe<{ orderId: string }>("orders:created", ({ orderId }) => {
  console.log(`New order ${orderId}`);
});
```

En el shell de demostración, `publish` espera a todos los suscriptores. Si un suscriptor lanza un error, el error se registra en la consola y los demás suscriptores reciben igualmente el evento.

## Peticiones

`registerRequest` registra el único manejador de una petición. `send` lo llama y devuelve su respuesta.

```typescript
// Orders plugin answers
const handler = api.broker.registerRequest<{ status: string }, number>("orders:count", async ({ status }) =>
  countOrders(status),
);

// Another plugin asks
const open = await api.broker.send<{ status: string }, number>("orders:count", { status: "open" });
```

En el shell de demostración, `send` lanza un error si no hay ningún manejador registrado, y `registerRequest` lanza un error si la petición ya tiene uno.

## Mensajes identificados por una clase

Un mensaje se puede identificar con un string, como arriba, o con una clase. Con una clase, publicas o envías una instancia y te suscribes o registras el manejador con la propia clase:

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

La clase es la clave, así que los dos lados deben usar el mismo objeto de clase. Esto funciona dentro de un plugin, o cuando las clases vienen de un paquete compartido que la aplicación proporciona a todos los plugins. Dos plugins que incluyen cada uno su propia copia de la clase en su bundle no coinciden. Entre plugins que se construyen por separado, usa mejor nombres en string.

El shell de demostración pasa al manejador una copia simple de las propiedades de la instancia, no la instancia en sí.

## Liberar los manejadores

`subscribe` y `registerRequest` devuelven un `BrokerDisposableHandler`:

```typescript
export interface BrokerDisposableHandler {
  dispose: () => void;
}
```

Llama a `dispose()` en el `dispose` del plugin. Si no, el manejador sigue registrado después de descargar el plugin.

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

## Nombres de los mensajes

Los nombres de los mensajes son globales en toda la aplicación. Ponles delante el id del plugin al que pertenecen, con la forma `plugin-id:event`, por ejemplo `orders:created` o `orders:count`. Documenta los mensajes que tu plugin publica y responde, con sus datos: forman parte de su contrato público.

## Interfaz

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

Para implementar un broker en tu propio shell, consulta [Construir un shell](./building-a-shell.md).
