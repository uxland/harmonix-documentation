---
sidebar_position: 8
---

# 8- Declarar arxiu d'entrada plugin

S'ha de declarar un arxiu on s'implementin les funcions necessàries per a inicialitzar un plugin.

En aquest exemple crearem l'arxiu `plugin.ts` a la carpeta src amb el següent contingut:

  

```javascript
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
    return Promise.resolve();
};
export const dispose = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
    Promise.resolve();
}
```
