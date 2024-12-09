---
sidebar_position: 12
---

# Best practices

# Desconnectar correctament el plugin

En el cicle de vida d'un plugin, passem per 2 fases importants; la **iniciació** (muntatge) i la **desconnexió** (desmuntatge). És important que tot allò que s'hagi fet en el muntatge del plugin (registrar vistes, subscriure's a events del broker de missatges, crear contenidors de dependències interns, etcètera), es **faci una desconnexió neta** per tal de no deixar **cap rastre en memòria** del teu plugin. Tot i que, en la majoria dels casos, l'usuari tancarà el navegador i l'aplicació de Primària morirà en aquell instant, es poden donar casos potencials en què es facin coses com canviar de pacient, renovar sessió, canvis de context, etcètera, que provoquin una nova càrrega de plugins en calent. Si no desconnectem bé els nostres plugins, podem deixar en memòria peces que poden afectar el rendiment **(memory leaks)**, o dades d'altres pacients **(barreja de dades de pacients)**.


<br/>

# Tractar l'API que es rep en el muntatge, com a singleton

Quan inicialitzem un plugin, rebem per paràmetre l'objecte API. És important no fer gaires tractaments en aquesta API, com clonar l'objecte, afegir referències innecessàries o altres males pràctiques. Hem de tractar aquest objecte API com un **singleton únic** i que serà la font de la veritat i les eines necessàries per treballar. Una bona pràctica seria crear un contenidor de dependències (per exemple el que crea la llibreria **_inversify_**) i afegir l'API com a dependència al contenidor perquè pugui resoldre-la en qualsevol punt del nostre codi en forma de singleton.

<br/>

# Utilitzar la inicialització correctament com a punt d'entrada i inici del cicle de vida del teu plugin

En la funció "_initialize_" que s'ha d'implementar, és un bon punt per fer les primeres configuracions necessàries del teu plugin, així com les primeres crides a serveis i injecció de vistes a regions.

Exemple:

```typescript
export const initialize = async (api: PrimariaApi) => {
  registerViews(api); //registre de vistes a regions
  await initializeLocalization(api); //inicialització de les traduccions del plugin
  bootstrapFeatures(api); //inicialització dels casos d'ús del plugin
  return Promise.resolve();
};
```

<br/>

# No fer un plugin per cada lloc on volem mostrar informació

Cal recordar que un plugin és una part independent del sistema capaç de resoldre diferents casos d'ús d'un mateix àmbit. És important entendre que un plugin és capaç d'injectar diferents vistes/web components a diferents regions del Shell, però alhora que les dades que es mostren en aquests components vinguin de la mateixa única font de dades.

Exemple:

Si tenim un plugin d'al·lèrgies del pacient, en el cas de Salut, i necessitem mostrar 3 vistes diferents (un llistat d'al·lèrgies a la vista principal, un comptador d'al·lèrgies a la capçalera i un botó per afegir-ne una al menú d'accions), no és necessari i de fet **NO RECOMENABLE**, crear 3 plugins.

Crear 3 plugins implicaria triplicar molt de codi i tenir el cicle de vida independent quan en realitat s'està tractant el mateix àmbit. Amb 1 sol plugin i 1 sol backend d'al·lèrgies, es gestionaran les dades de forma que hi haurà una única font de la veritat que alimentarà aquests 3 components injectats a 3 regions diferents del Shell.


<br/>

# Prefixar les vistes d'un plugin amb el id del plugin

Per tal que 2 plugins de 2 iniciatives diferents no col·lisionin, creant una vista amb el mateix id (header-view, main-view) per exemple, és recomanable prefixar els id's de les vistes a injectar amb el pluginId que arriba sempre a la funció "initialize".

Exemple:

```typescript
const pluginId = api.pluginInfo.pluginId;

api.regionManager.registerMainView({
    id: `${pluginId}-main-view`,
    factory: mainFactory
  },);
```


<br/>

# Gestió d'assets estàtics

Cada plugin ha de ser responsable de resoldre els assets estàtics com imatges, fonts, etcètera. El model Harmonix no és una aplicació convencional en la que es disposa d'una carpeta public amb els estàtics, ja que el shell no coneix la implementació de les iniciatives que realitzaran plugins.

Per tant es recomana que imatges, icones, fonts, etcètera estiguin en el plugin en format codi, o sigui el plugin qui creei una infraestructura pròpia on allotjar aquests assets i consumir-los segons els convingui.


<br/>

# Desconnectar correctament el plugin

En el cicle de vida d'un plugin, passem per 2 fases importants; la **iniciació** (muntatge) i la **desconnexió** (desmuntatge). És important que tot allò que s'hagi fet en el muntatge del plugin (registrar vistes, subscriure's a events del broker de missatges, crear contenidors de dependències interns, etcètera), es **faci una desconnexió neta** per tal de no deixar **cap rastre en memòria** del teu plugin. Tot i que, en la majoria dels casos, l'usuari tancarà el navegador i l'aplicació de Primària morirà en aquell instant, es poden donar casos potencials en què es facin coses com canviar de pacient, renovar sessió, canvis de context, etcètera, que provoquin una nova càrrega de plugins en calent. Si no desconnectem bé els nostres plugins, podem deixar en memòria peces que poden afectar el rendiment **(memory leaks)**, o dades d'altres pacients **(barreja de dades de pacients)**.