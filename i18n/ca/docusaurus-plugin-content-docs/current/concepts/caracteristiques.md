---
sidebar_position: 3
---

import { ShellAnatomy } from '@site/src/components/Diagrams/ShellAnatomy';

# Característiques

## Característiques principals

1. **Desenvolupament independent.** Els equips treballen en plugins diferents de manera independent. Cada plugin té el seu repositori, la seva construcció i el seu cicle de publicació.
2. **Creix afegint plugins.** Les funcionalitats noves s'afegeixen com a plugins nous, sense tocar el shell ni els altres plugins.
3. **Diverses vistes per plugin.** Un plugin pot registrar vistes en diverses regions del shell. Totes comparteixen el codi i les dades del plugin.
4. **Tecnologia heterogènia.** Cada equip tria el framework que s'adapta al seu plugin: React, Angular, Lit o JavaScript sense framework.
5. **Aïllament d'errors.** Si un plugin no es pot carregar o iniciar, l'error es registra a la consola i els altres plugins es carreguen igualment.
6. **Comunicació entre plugins.** Els plugins intercanvien esdeveniments i peticions a través del [broker](../api/broker.md) del shell, sense importar-se entre ells.
7. **Serveis del shell.** Cada shell pot exposar els seus propis serveis (client HTTP, autenticació, notificacions, traduccions…) a través de la seva API.
8. **Actualitzacions més ràpides.** Un plugin es pot actualitzar sense tornar a desplegar el shell, de manera que les correccions i les funcionalitats arriben abans als usuaris.

## Conceptes

- **Nucli d'Harmonix** (`@uxland/harmonix`). Carrega i inicia els plugins, dona a cadascun la seva API i proporciona el gestor de regions.
- **Shell.** L'aplicació principal. És un esquelet de regions on els plugins injecten les seves vistes, i construeix l'API que rep cada plugin.
- **Plugin.** Un mòdul ES independent que exporta `initialize(api)` i `dispose(api)`. Conté tot el necessari per a una funcionalitat de l'aplicació.
- **Regió.** Una àrea del shell on s'injecten vistes. Una regió pot mostrar una sola vista alhora (*single-active*) o diverses (*multiple-active*).
- **Vista.** Un Web Component, registrat per un plugin, que es mostra en una regió.
- **Broker.** El bus de missatges entre plugins: esdeveniments (publicació/subscripció) i peticions (enviament/resposta).
- **Sandbox.** Una aplicació aïllada per desenvolupar i provar plugins: un shell amb només els plugins que s'estan desenvolupant. El [creador de plugins](../create-plugin/create-a-plugin.mdx) en configura un amb el [shell de demostració d'Harmonix](../create-plugin/demo-shell.md).
- **Plugin Store.** El servei on es publiquen els plugins i d'on l'aplicació obté els plugins que carrega. Consulta [Gestió de plugins amb un Plugin Store](./gestio-plugins-plugin-store.md).

Harmonix es distribueix en aquests paquets:

| Paquet | Ús |
| --- | --- |
| `@uxland/harmonix` | Nucli: inici dels plugins, gestor de regions i tipus de l'API |
| `@uxland/harmonix-demo-shell` | Un shell mínim per desenvolupar i provar plugins |
| `@uxland/create-harmonix-plugin` | Crea un projecte de plugin nou |
| `@uxland/harmonix-cli` | Publica plugins en un Plugin Store (`harmonix publish`) |
| `@uxland/harmonix-adapters` | Converteix components de React en Web Components |

<ShellAnatomy />

## Comparació amb altres enfocaments

- **Un plugin, moltes vistes.** Amb les regions, un plugin pot injectar diverses vistes en diverses regions del shell. Amb iframes, cada peça incrustada necessita la seva pròpia URL.
- **Més enllà d'una aplicació per ruta.** Eines com Webpack Module Federation o single-spa se solen fer servir perquè cada part de la pàgina sigui un microfrontend separat. En una estació de treball, una sola pantalla sovint combina peces de molts equips. Harmonix les compon per regió, no per ruta.
- **Sense un servidor web per equip.** Un iframe necessita un servidor web que en serveixi l'HTML i el JavaScript. Un plugin d'Harmonix és un sol fitxer JavaScript, que pot servir un Plugin Store.
- **Sense problemes d'origen creuat.** Els iframes poden comportar problemes de CORS i de xarxa. Els plugins s'executen a la mateixa pàgina que el shell.
- **Comunicació integrada.** Els plugins i el shell es comuniquen a través de l'API i del broker, amb un contracte clar. Per exemple, un plugin pot demanar al shell que mostri una notificació.
- **Governança.** Un Plugin Store (quan l'aplicació en té un) pot controlar quins plugins i quines versions rep cada usuari.
- **Biblioteques compartides.** Els plugins no empaqueten el framework ni el shell: l'aplicació els proporciona una sola vegada, i així l'aplicació és més lleugera.
- **Desenvolupament local.** Els equips desenvolupen amb un sandbox a la seva màquina, en lloc d'esperar un entorn de proves compartit.

## Tecnologies compatibles

Cada vista que registra un plugin ha de ser un element HTML, normalment un [Web Component estàndard](https://developer.mozilla.org/en-US/docs/Web/API/Web_components). Els Web Components encapsulen els seus estils i el seu pintat, de manera que no xoquen amb altres plugins.

Harmonix funciona amb qualsevol biblioteca o framework de JavaScript que pugui generar un Web Component. El creador de plugins té plantilles per a React 19, Lit 3 i Angular 20. Un plugin fa servir la versió del framework que proporciona l'aplicació. Consulta [Notes per framework](../create-plugin/frameworks.mdx).
