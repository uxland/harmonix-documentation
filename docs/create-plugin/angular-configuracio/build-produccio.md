---
sidebar_position: 4
---
# Compilació plugin

En el `package.json` del plugin, s'ha d'afegir el primary-shell com a dependencies.

```
"dependencies": {
  "@angular/animations": "^18.1.0",
  "@angular/common": "^18.1.0",
  "@angular/compiler": "^18.1.0",
  "@angular/core": "^18.1.0",
  "@angular/forms": "^18.1.0",
  "@angular/platform-browser": "^18.1.0",
  "@angular/platform-browser-dynamic": "^18.1.0",
  "@angular/router": "^18.1.0",
  "@uxland/primary-shell": "^5.3.4",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "date-fns": "4.1.0",
  "zone.js": "~0.14.3"
},

```

# Build per producció

Quan es desenvolupa una llibreria a Angular, el procés de construcció estàndard (`ng build`) genera diversos formats per assegurar compatibilitat. Un dels formats clau és el FESM (Flat EcmaScript Module), sovint ubicat en un directori com ara `dist/la-teva-llibreria/fesm2022`. 
### Build Estàndard i les Dependències Externes
Quan Angular compila la llibreria a formats com FESM, per defecte, no inclou les dependències externes principals. Assumeix que l'aplicació que consumeix la llibreria ja tindrà aquestes dependències disponibles en el seu propi entorn.
Això pot ser beneficiari per evitar duplicació de codi, però en el present cas el plugin necessitarà dependències específiques que la `shell`no proporcionarà. 
### Necessitat d'un segon compilat amb vite
Donat que el plugin necessitarà altres dependències, serà necessari fer un segon compilat amb vite per incloure les llibreries externes que necessita el plugin. Aquí és on entra en joc el fitxer `vite.postbuild.config.ts`. Amb aquest segon pas, es crea un nou bundle, amb el propòsit de crear un bundle final que si inclogui aquelles llibreries externes que el plugin necessita i que no estan garantides pel `shell`.
Hi ha la possibilitat de realitzar aquests dos passos en un mateix, mitjançant un script al `package.json` que realitzi les dues crides. En l'exemple que s'ha mostrat anteriorment (https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo) hi tenim el següent script:
```
"build:plugin": "ng build my-plugin --configuration production && cd projects/my-plugin && vite build --config vite.postbuild.config.ts",
```
Seguint amb l'exemple, també hi han les diferents llibreries externes proporcionades per la shell, les quals no faria falta modificar-les:

``` 
rollupOptions: {
  external: [
    '@angular/animations',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/forms',
    '@angular/platform-browser',
    '@angular/router',
    '@uxland/primary-shell',
    'rxjs'
  ]
}

```
### Resultat final: un fitxer JavaScript unificat
El build d'Angular genera diversos fitxers, sovint amb extensions com .mjs. El build de Vite, configurat com en el nostre exemple, generarà un únic fitxer JavaScript (.js).
El nom d'aquest fitxer final es determina per la configuració `fileName` dins de `build.lib` al fitxer `vite.postbuild.config.ts.`. En el nostre exemple, s'anomena `${pckg.name}-bundled.js`.
Donat que Angular compila amb el nom del package al bundle (`${pckg.name}`), s'utilitza precisament per construir la ruta esperada al fitxer FESM generat pel build. Això assegura que Vite sàpiga exactament quin fitxer d'entrada ha de processar des de la sortida del build anterior.

En conclusió, aquest procés es fa donat que la compilació a Angular és especial, i això dona un control més fi sobre com es compila, permetent decidir quines dependències externes han d'anar incloses en el bundle final.

Es genera els compilats a dist/myplugin, s'hauria de pujar l'arxiu `fesm2022/my-plugin-bundled.js` renombrat a la nostre preferència al plugin store. 

