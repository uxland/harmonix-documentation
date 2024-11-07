---
sidebar_position: 9
---

# 8- Declarar arxiu d'entrada del plugin

S'ha de declarar un arxiu on s'implementen les funcions necessàries per a declarar un plugin.

  

En aquest tutorial decidim utilitzar un arxiu `plugin.ts` dins de la carpeta src:

  

```javascript
import { PrimariaApi } from "@uxland/primary-shell";

export const initialize = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
    return Promise.resolve();
};

export const dispose = (api: PrimariaApi) => {
    console.log(`Plugin ${api.pluginInfo.pluginId} disposed`);
    return Promise.resolve();
};
```

  

Ara només queda indicar-li al shell que afegeixi el plugin en el procés de càrrega. Aquí li indicarem la id de mòdul i com carregar el mòdul. En el nostre cas serà un import a l'arxiu `plugin.ts` creat anteriorment.

  

Ho farem cridant a la funció _bootstrapPlugins_ en el `main.ts`. Donant com a resultat el següent arxiu:

  

```javascript
import { bootstrapPlugins, initializeShell } from "@uxland/primary-shell";
import "@uxland/primary-shell/dist/style.css";
import { plugins } from "./plugins";

const createAndAppendSandboxApp = () => {
    const app = document.createElement("sandbox-app");
    document.body.appendChild(app);
    const sandbox = document.querySelector("sandbox-app");
    return sandbox as HTMLElement;
}

const initializeSandboxApp = (sandbox: HTMLElement) => {
    try {
        if (sandbox) {
            initializeShell(sandbox);
            bootstrapPlugins(plugins); // Cridem a la funció d'inicialització de tots els plugins
        }
    }
    catch (error) {
        console.warn(error);
    }
}

const sandbox = createAndAppendSandboxApp();
initializeSandboxApp(sandbox);
```

  

Ara hauríem de veure el log de consola una vegada hagi carregat el mòdul.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/f283f009-d22b-4b17-9973-0b5a180bfc71/image.png)
