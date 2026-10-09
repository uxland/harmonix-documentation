---
sidebar_position: 1
---

import { HeroStage } from '@site/src/components/Composition/HeroStage';

# Introducció

Harmonix és un framework per compondre una aplicació d'una sola pàgina a partir de plugins que es desenvolupen i es despleguen de manera independent. Un shell defineix regions. Cada plugin és un mòdul de JavaScript, la funció `initialize(api)` del qual registra Web Components com a vistes en aquestes regions i es comunica amb altres plugins a través d'un broker.

<HeroStage />

```typescript
import type { DemoShellApi } from "@uxland/harmonix-demo-shell";

export const initialize = async (api: DemoShellApi) => {
  await api.regionManager.registerMainView({
    id: "orders",
    factory: async () => document.createElement("orders-list"),
  });
};

export const dispose = async (api: DemoShellApi) => {
  await api.regionManager.removeView(api.regionManager.regions.main, "orders");
};
```

## Per què Harmonix

Sovint, les aplicacions grans les construeixen diversos equips, de vegades d'empreses diferents. Cada equip vol triar les seves eines i publicar al seu ritme. Tot i així, els usuaris esperen una aplicació única i coherent.

Harmonix divideix l'aplicació en dos tipus de peces:

- **El shell.** S'encarrega de la disposició de la pàgina, defineix les regions i dona una API a cada plugin. No conté cap funcionalitat de negoci.
- **Els plugins.** Cadascun aporta una funcionalitat. Un plugin pot col·locar diverses vistes en diverses regions: una llista a l'àrea principal, un comptador a la capçalera i un element al menú lateral. Totes comparteixen el codi i les dades del plugin.

Els plugins no són iframes. S'executen a la mateixa pàgina que el shell, de manera que poden fer servir els serveis que el shell exposa a la seva API i intercanviar missatges amb altres plugins.

## Principis de disseny

- **Plugins independents.** Cada plugin té el seu repositori, la seva tecnologia, la seva construcció i el seu cicle de publicació. Només ha de complir el contracte amb el shell: exportar `initialize` i `dispose`, i pintar Web Components.
- **Agnòstic de la tecnologia.** Una vista és un Web Component estàndard. Es pot escriure amb React, Angular, Lit o JavaScript sense framework.
- **Composició per regions.** El shell decideix on va cada cosa. Els plugins decideixen què hi va.
- **Acoblament feble.** Els plugins no s'importen mai entre ells. Es comuniquen a través del broker del shell.
- **Aïllament d'errors.** Si un plugin no es pot carregar o iniciar, els altres es carreguen igualment.

## Casos d'ús principals

Harmonix encaixa en aplicacions d'una sola pàgina de tipus estació de treball. En aquestes aplicacions, els usuaris veuen molta informació relacionada alhora, i les vistes han de reaccionar les unes a les altres.

És especialment útil quan una mateixa aplicació conté funcionalitats construïdes per equips o proveïdors diferents, cadascun amb la seva tecnologia i el seu cicle de publicació.

## Passos següents

- L'[Exemple d'ús](./exemple-us.md) mostra un shell i dos plugins.
- [Crear un plugin](../create-plugin/create-a-plugin.mdx) et dona un plugin que funciona en pocs minuts.
