---
sidebar_position: 8
---

# 7- Declarar importador de plugins

Crearem un arxiu amb les definicions dels plugins amb els seus importadors. Per a això, crearem l'arxiu `plugins.ts` a la carpeta src amb la següent forma:

  

```typescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("./plugin") as any;
export const plugins: PluginDefinition[] = [{ pluginId: "angular-plugin", importer: importer}]
```

  

Ens donarà error en l'import al no existir, de moment, la ruta "_./plugin_" que crearem en el punt següent.
