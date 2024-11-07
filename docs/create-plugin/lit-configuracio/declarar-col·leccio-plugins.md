---
sidebar_position: 9
---

# 8- Declarar una col·lecció de plugins

S'ha de declarar cada plugin que es vulgui inicialitzar en el shell. Per a això, podem crear un arxiu `plugins.ts` on exportarem l'array de les definicions dels plugins. A cada element l'indicarem l'id i una funció per a importar-ho. Exemple:

  

```coffeescript
import { PluginDefinition, Plugin } from "@uxland/primary-shell";

const importer: () => Promise<Plugin> = () => import("./plugin") as any;

export const plugins: PluginDefinition[] = [{ pluginId: "lit-plugin", importer: importer }];
```

  

Ara s'ha d'indicar al shell que inicialitzi els plugins en el procés d'inicialització de l'app de l'arxiu `sandbox.ts` anterior. Per a això, utilitzarem la funció _bootstrapPlugins_ passant-li la col·lecció de plugins que hem creat abans_._

L'arxiu quedaria d'aquesta manera:

  

```javascript
import { bootstrapPlugins, initializeShell } from "@uxland/primary-shell";
import { plugins } from "./plugins"
import "@uxland/primary-shell/dist/style.css";

const createAndAppendSandboxApp= () => {
  const app = document.createElement("sandbox-app");
  document.body.appendChild(app);
  const sandbox = document.querySelector("sandbox-app");
  return sandbox as HTMLElement;
};

const initializeSandboxApp = (sandbox: HTMLElement) => {
  try {
    if (sandbox) {
        initializeShell(sandbox);
        bootstrapPlugins(plugins); // Cridem a la funció de inicialització de tots els plugins
      }
    }
    catch (error) {
      console.warn(error);
    }
 }

const app = createAndAppendSandboxApp();
initializeSandboxApp(app);
```

  

Després d'aquests passos, ja podries veure en consola el missatge que has escrit a la funció _initializeSandboxApp_.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/bf8f57cb-8238-4a24-80e2-f40105da69db/console.png)