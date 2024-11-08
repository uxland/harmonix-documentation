---
sidebar_position: 5
---

# 5- Edita la teva aplicació

Pots començar per editar la teva aplicació obrint el directori del teu projecte en el teu editor de codi favorit.

  

*   Substitueix les regles d'estil de l'arxiu `index.css` per les següents:

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

I a continuació enllaça aquest arxiu `index.css` al head del teu arxiu `index.html`:

```css
  <link rel="stylesheet" href="./src/index.css" />
```

  

*   Crea un arxiu `sandbox.ts` a la carpeta src del projecte
*   Importa aquest arxiu `sandbox.ts` en el teu `index.html` com script d'entrada. Per a això, modifica la ruta de la següent línia per la del sandbox:

```xml
  <script type="module" src="/src/main.tsx"></script>
```

*   Al `index.html` , dins de l'etiqueta _body_ pots eliminar el següent:

  

```html
<div id="root"></div>
```

