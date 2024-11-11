---
sidebar_position: 5
---

# 4- Edita la teva Aplicació

Pots començar per editar la teva aplicació obrint el directori del teu projecte en el teu editor de codi favorit.

  

*   Substitueix regles d'estil de l'arxiu `index.css` per les següents:

```css
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
```

*   Crea un arxiu `sandbox.ts` a la carpeta src del projecte
*   Importa aquest arxiu `sandbox.ts` en el teu `index.html` com script d'entrada. Per a això modifica la ruta de la següent línia per la del sandbox:

```xml
  <script type="module" src="/src/my-element.ts"></script>
```

*   Al `index.html` elimina les següents línies:

  

```html
<my-element>
  <h1>Vite + Lit</h1>
</my-element>
```
