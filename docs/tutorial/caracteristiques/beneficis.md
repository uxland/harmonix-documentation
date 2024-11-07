---
sidebar_position: 3
---

# 3- Beneficis i avantatges respecte altres enfocaments  o eines

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