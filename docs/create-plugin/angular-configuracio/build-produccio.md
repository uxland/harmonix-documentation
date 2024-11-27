---
sidebar_position: 4
---
# Compilació plugin

En el `package.json` del plugin, s'ha d'afegir el primary-shell com a peerDependency.

```
{
  "name": "my-plugin",
  "version": "0.0.1",
  "peerDependencies": {
    "@angular/common": "^19.0.0",
    "@angular/core": "^19.0.0",
    "@uxland/primay-shell": "^3.2.4" 
  },
  "dependencies": {
    "tslib": "^2.3.0"
  },
  "sideEffects": false
}

```

# Build per producció

```
ng build my-plugin
```

Es genera els compilats a dist/myplugin, s'hauria de pujar l'arxiu `fesm2022/my-plugin.mjs` renombrat a la nostre preferència al plugin store. 

