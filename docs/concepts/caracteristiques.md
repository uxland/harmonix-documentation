---
sidebar_position: 2
---

# Característiques

# Característiques principals

1. **Desenvolupament Independent:** Els equips de desenvolupament poden treballar de manera independent en diferents plugins, la qual cosa permet una major agilitat i facilita la implementació de canvis i noves característiques.
2. **Escalabilitat:** L'arquitectura basada en plugins modulars facilita l'escalabilitat horitzontal, ja que cada plugin es pot escalar per separat. Això és particularment beneficiós en entorns on certes parts de la interfície d'usuari poden experimentar una càrrega major que altres.
3. **Reutilització de Components:** Els components de la interfície d'usuari poden ser reutilitzats en diferents parts de l'aplicació, la qual cosa pot conduir a un desenvolupament més eficient i a la consistència en l'aparença i el comportament de la interfície d'usuari.
4. **Tecnologia Heterogènia:** Els equips poden triar les tecnologies més adients per a cada plugin, la qual cosa permet la utilització de diferents marcs de treball i llibreries segons els requisits específics de cada part de la interfície d'usuari.
5. **Resistència a Fallades:** L'arquitectura basada en plugins modulars pot fer que l'aplicació sigui més resistent a fallades, ja que un error en un plugin no afectarà necessàriament a tota l'aplicació.
6. **Interactivitat:** Els plugins poden interactuar via comandes i events entre ells, això com amb els serveis que proporcioni el shell (modals, traduccions, events de negoci, etcètera)
7. **Autenticació i seguretat**: El sistema proporciona un client http per gestionar de forma més fàcil l'autenticació, conservar i refrescar la sessió i preservar la seguretat i evitar errors de creuament de dades.
8. **Millora l'Experiència de l'Usuari:** Al permetre actualitzacions incrementals i ràpides en parts específiques de la interfície d'usuari, es pot millorar l'experiència de l'usuari a l'introduir noves característiques o corregir problemes de manera més ràpida.

<br/>

# Conceptes

1. **Motor Harmonix**: El "core" del framework, l'encarregat d'inicialitzar l'aplicació i tots els plugins, i dotar-los de capacitats especials per ser autocontinguts d'un shell.
2. **Plugin**: Un plugin és una part independent del sistema que conté tot el necessari per executar una part específica de la funcionalitat de l'aplicació. Els plugins són reutilitzables i poden ser intercanviats entre diferents sistemes o aplicacions.
3. **Shell:** És un esquelet format per diferents regions sobre el qual els desenvolupadors poden construir i injectar els seus plugins.
4. **Regió:** És un espai definit al shell on poden injectar-se diferents vistes definides pels plugins. Les regions poden tenir característiques diferents com per exemple la capacitat de mostrar una o més d'una vista alhora, així com diferents adaptadors que alteren el seu comportament.
5. **Vista:** És la instància d'un component o conjunt de components que per si sols tenen un sentit funcional. Les vistes s'injecten en les diferents regions del shell.
6. **Sandbox.** És una aplicació segura i aïllada per desenvolupar i provar plugins de manera independent, separada dels altres mòduls. Opera com una aplicació sense plugins que imita l'aplicació real de l'Estació de Treball. És part del tooling de desenvolupament de la solució.
7. **SDK (Software Development Kit)**: Aquest és un conjunt d'eines que permet als desenvolupadors crear plugins i poder-se integrar amb el sistema, així com interactuar amb ell i altres plugins, en cas que ho necessitin.
8. **Plugin Store**: És el lloc on es publiquen i guarden tots els plugins disponibles per al seu ús. Funciona com un repositori de bundles compilats i del qual l'aplicació n'obtindrà els necessaris per compondre la UI.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/60d2fe59-dd78-406e-8701-cea5bdc2d40f/image.png)


<br/>

# Beneficis i avantatges respecte altres enfocaments  o eines

*   Amb el sistema basat en plugins i regions, es pot aconseguir que 1 sol plugin, pugui injectar **múltiples vistes** a **múltiples regions** de l'aplicació contenidora (shell). Amb un sistema basat en microfrontends en iframes, has de tenir una única URL per component a injectar.
*   Els sistemes com Webpack Model Federation, Single SPA o altres eines, estan pensats per fer **Microfrontends convencionals**, on cada part de l'aplicació és un microfrontend. En estacions de treball complexes, diferents parts de l'aplicació es poden compondre a base de **moltes iniciatives i verticals diferents**, inclús barrejar-se, filtrar-se i necessitats funcionals complexes que aquestes eines no poden resoldre.
*   L'iframe necessita un **servidor web** per servir l'HTML i JS. Amb la nostra solució, el **Plugin Store** serviria el compilat com a repositori d'objectes, evitant que els verticals hagin de tenir un servidor web (reducció dràstica del cost d'infraestructura i CI/CD)
*   L'iframe pot generar **problemes de CORS** i requereix coneixement per part del proveïdor desenvolupador de mòduls, coneixements d'infraestructura per resoldre possibles problemes de xarxa.
*   El framework implementa un sistema de **comunicació intermodular**, aplicació-plugin, reutilitzable, que no requereix implementació per part del desenvolupador de plugins.
    *   Permet establir un contracte clar entre les peces i augmenta les possibilitats d'una interacció més **transparent** app-plugin.
    *   Casos d'ús d'exemple (cridar un snackbar, utilitzar un component UI com un busy), etc
*   El Plugin Store encapsula la **complexitat de governança** de permisos de plugins.
*   **Compartir llibreries** comunes entre plugins, com podria ser el Design System o llibreries de JS React, Vue, Lit... (**reducció en pes de l'aplicació**)
*   Facilita el desenvolupament de plugins proporcionant un **sandbox fàcilment instal·lable**, actualitzable i testejable. En el cas de l'iframe, hauries d'esperar a fer les proves a un entorn de proves preproductiu.
*   Proporciona una **documentació clara** d'un desenvolupament de plugin i, en conseqüència, una definició clara del flux de treball.


<br/>

# Tecnologies compatibles amb Harmonix

Harmonix és un sistema d'injecció dinàmica de plugins, on aquests plugins poden tenir N componentes/vistes injectades en N regions. Cada un d'aquests components, ha de ser un [Web Component standard](https://developer.mozilla.org/es/docs/Web/API/Web_components).

Els **Web Components** estàn establerts en l'ecosistema frontend Javascript i són una bona solució per les aplicacions basades en Harmonix, ja que encapsulen els estils i la llògica de pintat fent que no hi hagi col·lisions amb altres components i plugins.

Per tant, quan es crea un plugin sempre s'ha d'encapsular cada un dels components creats amb la tecnologia que sigui, en un Web Component. Per tant, podriem dir que **Harmonix és compatible amb qualsevol llibreria/framework de renderitzat Javascript que sigui capaç de acabar creant un Web Component**.

Hi ha diverses formes d'encapsular un component d'una llibreria Javascript, i des de l'equip de desenvolupament d'Harmonix, treballem per donar la **sol·lució més òptima** per a cada cas. Actualment, els frameworks que han estat provats i que tenim documentats són: **Vanilla JS** (Javascript natiu sense llibreria), **Lit 3**, **Angular 18** i **React 18+**. A mesura que els consumidors d'Harmonix vagin necessitant altres com Vue, etcètera, anirem donant el suport i documentant.