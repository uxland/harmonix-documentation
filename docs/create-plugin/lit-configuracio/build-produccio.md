---
sidebar_position: 3
---

# Build per producció

Una vegada es té el plugin finalitzat, s'ha de preparar per a poder-lo desplegar a la Plugin Store.
Caldrà escriure la següent comanda a la terminal per a empaquetar el plugin:

<br/>

```bash
npm run vite build
```

<br/>

La configuració de l'arxiu `vite.config.ts` defineix com a externes les dependències "lit" i "@uxland/primary-shell", indicant que no s'han d'incloure en el paquet final. Això és necessari per evitar la duplicitat de dependències grans o comunes en el paquet.
Això redueix el tamany de l'arxiu final i assegura que els plugins comparteixin aquestes dependències en comptes d'incloure-les per duplicat.

També s'inclou la definició de `inlineDynamicImports: true`, que força a incloure totes les importacions dinàmiques en un únic arxiu. Això és necessari per a que el paquet tingui un sol arxiu de sortida, en comptes de dividir-se en diferents arxius.

A aquest últim concepte d'unitat d'arxiu, també s'hi suma la definició de `manualChunks: undefined`, que en establir-se com a _undefined_, el que es fa és desactivar la funcionalitat de dividir els mòduls en diferents fragments.

