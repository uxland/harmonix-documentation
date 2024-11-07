---
sidebar_position: 3
---

# 3- Utilitzar la inicialització correctament com a punt d'entrada i inici del cicle de vida del teu plugin

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