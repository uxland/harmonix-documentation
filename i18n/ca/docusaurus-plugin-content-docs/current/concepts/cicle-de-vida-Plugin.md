---
sidebar_position: 5
---

# Cicle de vida d'un plugin

Un plugin és un mòdul ES, normalment empaquetat en un sol fitxer JavaScript. Exporta dues funcions, que retornen una `Promise`:

- `initialize(api)` inicia el plugin.
- `dispose(api)` l'atura i desfà tot el que ha fet `initialize`.

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

El cicle de vida d'un plugin té dues parts:

- **Cicle de vida fora de línia:** el desenvolupament, el manteniment i la distribució del plugin.
- **Cicle de vida en línia:** el que passa amb el plugin dins d'un shell en execució.

## Cicle de vida fora de línia

1. Creació
2. Desenvolupament i proves
3. Publicació
4. Manteniment
5. Actualitzacions
6. Obsolescència
7. Desactivació

Les fases 1, 2 i 4 tenen lloc en local. Les fases 3, 5, 6 i 7 impliquen el Plugin Store, que les hauria de permetre totes. Alguns Plugin Stores també permeten un desplegament progressiu a la fase 3: una versió nova comença amb un subconjunt d'usuaris fins que és prou madura. Això és una capacitat del Plugin Store, no d'Harmonix.

## Cicle de vida en línia

1. **Càrrega.** El shell crida l'`importer()` de la `PluginDefinition` del plugin. Normalment és un `import()` dinàmic de l'URL del plugin al Plugin Store, o d'un mòdul local durant el desenvolupament.
2. **Avaluació.** El navegador avalua el mòdul, que exposa `initialize` i `dispose`.
3. **Inici.** Harmonix crida `initialize(api)` amb una instància de l'API creada per a aquest plugin. Tots els plugins s'inicien en paral·lel. Si un llança un error, l'error es registra a la consola i els altres plugins continuen.
4. **Pintat.** Les vistes registrades apareixen a les seves regions. La `factory` de cada vista s'executa quan la seva regió necessita l'element.
5. **Alliberament.** El shell crida `dispose(api)`. Aquesta funció és obligatòria i ho ha de desfer tot: eliminar les vistes, alliberar les subscripcions i els handlers de peticions del broker, aturar els temporitzadors i alliberar qualsevol altre recurs.

Consulta [Construir un shell](../api/building-a-shell.md) per veure aquest procés des del costat del shell.
