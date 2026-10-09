---
sidebar_position: 1
---

# Referència de l'API

Aquesta pàgina descriu el contracte entre un plugin i el shell, i els tipus que exporta el nucli d'Harmonix, `@uxland/harmonix`.

## El contracte del plugin

Un plugin és un mòdul ES que implementa `Plugin<TApi>`:

```typescript
export interface Plugin<TApi extends HarmonixApi> {
  initialize(api: TApi): Promise<void>;
  dispose(api: TApi): Promise<void>;
}
```

- `initialize(api)` inicia el plugin: registra vistes, se subscriu a esdeveniments i carrega el que necessita. Si llança un error, el plugin no es carrega, i això no afecta els altres plugins.
- `dispose(api)` atura el plugin. És obligatori i ha de desfer tot el que ha fet `initialize`.

`TApi` és l'API del shell on s'executa el plugin. Per al shell de demostració és `DemoShellApi`, i el paquet també exporta `DemoShellPlugin` com a drecera de `Plugin<DemoShellApi>`:

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  const locale = await api.createLocaleManager({ en: { title: "Orders" } });
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => Object.assign(document.createElement("h1"), { textContent: locale.translate("title") }),
  });
};

export const dispose = async (api: DemoShellApi) => {
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## `HarmonixApi`

Cada shell dona als seus plugins una API que amplia `HarmonixApi`:

```typescript
export interface HarmonixApi {
  regionManager: HarmonixRegionManager;
  pluginInfo: PluginInfo;
  createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```

Cada plugin rep la seva pròpia instància, que el shell crea per a aquell plugin.

### `pluginInfo`

```typescript
export interface PluginInfo {
  pluginId: string;
}
```

L'id que el shell ha donat al plugin en carregar-lo.

### `regionManager`

Registra, activa i elimina les vistes del plugin a les regions del shell. Consulta [Regions i vistes](./gestio-regions-i-vistes.md).

### `createLocaleManager`

Crea un traductor per als missatges del plugin. Rep els missatges per idioma i retorna un `HarmonixLocaleApi`:

```typescript
export interface LocalizationMessages {
  [lang: string]: Translations;
}

export interface Translations {
  [tag: string]: string | Record<string, string> | Translations;
}

export interface HarmonixLocaleApi {
  getCurrentLanguage(): string;
  translate<T = Record<string, string>>(path: string, variables?: T): string;
  getTranslations(): LocalizationMessages;
}
```

| Mètode | Què fa |
| --- | --- |
| `getCurrentLanguage()` | L'idioma actual de l'aplicació |
| `translate(path, variables?)` | El text de `path` en l'idioma actual. Les variables com `{{name}}` se substitueixen per `variables.name` |
| `getTranslations()` | Els missatges que s'han passat a `createLocaleManager` |

```typescript
const locale = await api.createLocaleManager({
  en: { orders: { title: "Orders", count: "{{count}} open orders" } },
  es: { orders: { title: "Pedidos", count: "{{count}} pedidos abiertos" } },
});

locale.translate("orders.count", { count: "3" }); // "3 open orders" in English
```

El nucli només defineix aquesta interfície; el shell la implementa. Al shell de demostració, l'idioma actual és el de l'atribut `<html lang>` de la pàgina (o el del navegador), els camins se separen amb punts i, si falta una clau, es busca en el primer idioma que s'ha donat i, si tampoc no hi és, es retorna el camí mateix.

## Ampliar l'API

Cada aplicació té les seves necessitats: un client HTTP, autenticació, notificacions, un estat global… El shell declara la seva pròpia API, que amplia `HarmonixApi` i hi afegeix aquests serveis.

El [shell de demostració](../create-plugin/demo-shell.md), per exemple, hi afegeix:

- `broker`, per intercanviar missatges entre plugins (consulta [Broker](./broker.md)).
- `regionManager.regions`, els noms de les seves regions (`header`, `side-menu`, `main`).
- `regionManager.registerMainView`, `regionManager.activateMainView` i `regionManager.registerNavigationItem`, dreceres per a les seves regions.

```typescript
export interface DemoShellApi extends HarmonixApi {
  regionManager: DemoShellRegionManager;
  broker: HarmonixBroker;
}
```

## Broker

`HarmonixBroker` és la interfície per als missatges entre plugins: esdeveniments amb `publish`/`subscribe` i peticions amb `registerRequest`/`send`. El nucli la defineix i cada shell la implementa i l'exposa. Consulta [Broker](./broker.md).

## API del costat del shell

Aquestes exportacions les fa servir el shell, no els plugins. Consulta [Construir un shell](./building-a-shell.md).

| Exportació | Què és |
| --- | --- |
| `PluginDefinition` | `{ pluginId, importer }`: com carrega el shell un plugin. `importer()` retorna una promesa del mòdul del plugin |
| `ApiFactory<TApi>` | `(info: PluginInfo) => TApi`: crea la instància de l'API per a cada plugin |
| `bootstrapPlugins(plugins, apiFactory)` | Carrega i inicia els plugins en paral·lel i retorna un `BootstrappedPlugin` per a cadascun |
| `BootstrappedPlugin<TApi>` | `{ dispose(), importedPlugin, apiInstance }`. `dispose()` crida el `dispose` del plugin amb la seva API |
| `createRegionManager(name)` | Crea el gestor de regions del shell |
| `createRegionHost(regionManager)` | Crea el mixin de Lit per als elements que declaren regions |
