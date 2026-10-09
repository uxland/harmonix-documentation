---
sidebar_position: 12
---

# Bones pràctiques

## Allibera bé el plugin

Un plugin té dos moments clau: l'**inici** (`initialize`) i l'**alliberament** (`dispose`). Tot el que fa el plugin quan s'inicia s'ha de desfer quan s'allibera: vistes registrades, subscripcions i handlers de peticions del broker, temporitzadors, contenidors de dependències, aplicacions del framework…

Sovint l'usuari tanca el navegador i tot desapareix. Però un shell també pot descarregar i tornar a carregar plugins sense recarregar la pàgina, per exemple quan canvia l'usuari o el context de treball, o quan es renova la sessió. Si un plugin no ho neteja tot, pot deixar coses a la memòria (**fuites de memòria**) o mostrar dades del context anterior (**barreja de dades**).

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

## Tracta l'API com un singleton

El plugin rep la seva API a `initialize`. No la clonis ni l'embolcallis en còpies. Tracta-la com l'única font de veritat de tot el que ofereix el shell.

Desa'n una referència on la resta del plugin hi pugui accedir. N'hi ha prou amb una variable de mòdul. En plugins més grans, opcionalment, la pots registrar en un contenidor de dependències, per exemple amb [InversifyJS](https://inversify.io/), i resoldre-la com a singleton a qualsevol punt del codi.

## Fes servir `initialize` com a punt d'entrada

`initialize` és on el plugin es configura, fa les primeres crides a serveis i registra les seves vistes. Espera (`await`) cada pas asíncron, perquè els errors arribin a Harmonix:

```typescript
export const initialize = async (api: DemoShellApi) => {
  await registerViews(api); // register views in the regions
  await initializeLocalization(api); // set up the plugin's translations
  await bootstrapFeatures(api); // start the plugin's use cases
};
```

## Deixa que `initialize` falli davant d'errors greus

Si el plugin no pot funcionar, per exemple perquè falta una configuració obligatòria, deixa que `initialize` llanci un error. Harmonix registra l'error a la consola i salta el plugin, i els altres plugins continuen funcionant. No t'empassis l'error deixant el plugin mig iniciat.

## No depenguis de l'ordre de càrrega dels plugins

Tots els plugins es carreguen i s'inicien en paral·lel. Pot ser que un altre plugin no estigui preparat quan s'inicia el teu. No cridis altres plugins durant `initialize` comptant que ja hi seran. Fes servir el [broker](../api/broker.md): subscriu-te als esdeveniments que necessitis i envia peticions quan l'usuari faci alguna acció, no durant l'arrencada.

## Un plugin per funcionalitat, no per vista

Un plugin és una part independent del sistema que resol els casos d'ús d'un àmbit. Pot injectar vistes diferents en regions diferents, totes alimentades per les mateixes dades.

Per exemple, un plugin de comandes pot necessitar tres vistes: la llista de comandes a la regió principal, un comptador de comandes obertes a la capçalera i un element al menú lateral. **No** creïs tres plugins per a això. Tres plugins duplicarien codi i tindrien cicles de vida separats per a un sol àmbit. Amb un plugin i un sol backend de comandes, hi ha una única font de veritat que alimenta les tres vistes.

## Ids de les vistes

Dos plugins poden fer servir el mateix id de vista, per exemple `main`. El shell de demostració ja separa els ids com a `pluginId::viewId`, de manera que no xoquen. Si el teu shell no ho fa, posa l'id del plugin com a prefix dels ids:

```typescript
const pluginId = api.pluginInfo.pluginId;

await api.regionManager.registerView(api.regionManager.regions.main, {
  id: `${pluginId}-main-view`,
  factory: mainFactory,
});
```

## Posa un prefix als noms dels elements personalitzats

Els noms dels elements personalitzats són globals a tota la pàgina, i un nom només es pot definir una vegada. Posa l'id del plugin com a prefix dels noms de les etiquetes. Per a un plugin amb l'id `orders`, fes servir noms com `orders-list` o `orders-header-counter`.

Defineix cada element una sola vegada i protegeix-ne la definició, ja que un plugin es pot tornar a iniciar després d'haver-se alliberat:

```typescript
if (!customElements.get("orders-list")) {
  customElements.define("orders-list", OrdersList);
}
```

## Aïlla els estils amb el Shadow DOM

Les vistes conviuen amb les vistes d'altres plugins. Pinta-les en el seu propi shadow root, perquè els seus estils no se n'escapin i els estils del shell no hi entrin. Les propietats personalitzades de CSS sí que travessen el shadow DOM, de manera que les vistes poden continuar fent servir les variables del tema del shell. Consulta [Notes per framework](../create-plugin/frameworks.mdx).

## No toquis mai el DOM del shell

Un plugin només mostra contingut a través de les seves vistes a les regions. No consultis ni modifiquis els elements del shell, ni les vistes d'altres plugins. El shell pot canviar la seva disposició en qualsevol moment, i els altres plugins no formen part del teu contracte.

## Recursos estàtics

Cada plugin és responsable dels seus propis recursos estàtics: imatges, tipografies, icones… Una aplicació Harmonix no és una aplicació convencional amb una carpeta pública compartida, perquè el shell no coneix els plugins que carregarà.

Inclou els recursos al codi del plugin (per exemple, com a SVG en línia o URL de dades), o allotja'ls a la teva infraestructura i carrega'ls des d'allà.
