---
sidebar_position: 7
---

# 6- Inicialitzar el Shell

A l'arxiu `sandbox.ts` li afegirem el següent codi, on crearem un element app, l'inserirem al body i cridarem a la funció _initializeSandboxApp_ passant l'element creat. Caldrà també importar l'arxiu dels estils.

```javascript
import { initializeShell } from "@uxland/primary-shell";
import "@uxland/primary-shell/dist/style.css"; // Afegim els estils globals del shell i el Design System

// Creem un contenidor HTML on injectarem el shell més endavant
const createAndAppendSandboxApp = () => {
  const app = document.createElement("sandbox-app");
  document.body.appendChild(app);
  const sandbox = document.querySelector("sandbox-app");
  return sandbox as HTMLElement;
}
// Inicialitzem el sandbox i l'aplicació
const initializeSandboxApp = (sandbox: HTMLElement) => {
  try {
    if (sandbox) {
        initializeShell(sandbox);
      }
    }
    catch (error) {
      console.warn(error);
    }
 }

const app = createAndAppendSandboxApp();
initializeSandboxApp(app);
```

  

Hauries de veure renderitzat el Shell de primària en el navegador:

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/dc351740-8591-4255-91d7-cc2c063042a8/image.png)
