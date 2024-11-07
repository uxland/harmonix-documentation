---
sidebar_position: 4
---

# 4- No fer un plugin per cada lloc on volem mostrar informació

Cal recordar que un plugin és una part independent del sistema capaç de resoldre diferents casos d'ús d'un mateix àmbit. És important entendre que un plugin és capaç d'injectar diferents vistes/web components a diferents regions del Shell, però alhora que les dades que es mostren en aquests components vinguin de la mateixa única font de dades.

Exemple:

Si tenim un plugin d'al·lèrgies del pacient, en el cas de Salut, i necessitem mostrar 3 vistes diferents (un llistat d'al·lèrgies a la vista principal, un comptador d'al·lèrgies a la capçalera i un botó per afegir-ne una al menú d'accions), no és necessari i de fet **NO RECOMENABLE**, crear 3 plugins.

Crear 3 plugins implicaria triplicar molt de codi i tenir el cicle de vida independent quan en realitat s'està tractant el mateix àmbit. Amb 1 sol plugin i 1 sol backend d'al·lèrgies, es gestionaran les dades de forma que hi haurà una única font de la veritat que alimentarà aquests 3 components injectats a 3 regions diferents del Shell.