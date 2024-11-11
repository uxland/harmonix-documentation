---
sidebar_position: 5
---

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
