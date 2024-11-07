---
sidebar_position: 7
---

# 6- Inicialitzar el Shell

En inicialitzar el projecte, l'arxiu `main.ts` el tenim d'aquesta manera:

  

```coffeescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

  

Per a la inicialització del shell, substituirem l'arxiu `main.ts` que hem vist a dalt pel següent codi:

  

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

const sandbox = createAndAppendSandboxApp();
initializeSandboxApp(sandbox);
```

  

Elimina el contenidor "app-root" i afegeix els estils bàsics del shell a l' `index.html`:

  

```xml
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Angular plugin demo</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>

<body>

</body>

<custom-style>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      font-size: 14px;
      background-color: #f5f6fa;
      font-family: 'Roboto', sans-serif;
      pointer-events: auto !important;
      width: 100%;
      height: 100%;
    }
    html {
      font-size: 14px;
      overflow: hidden;
      font-family: 'Roboto', sans-serif;
      width: 100%;
      height: 100%;
    }
  </style>
</custom-style>
</html>
```

  

Hauries de veure renderitzat el Shell de primària en el navegador.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/d1b3bfcd-ebdc-4eef-85b1-fe6f995e8374/image.png)