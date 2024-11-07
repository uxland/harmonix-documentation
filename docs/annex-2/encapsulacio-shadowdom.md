---
sidebar_position: 1
---

# 1- Encapsulació ShadowDom

En utilitzar un plugin Angular, has de fer servir tècniques de ShadowDom per a encapsular els estils. En cas contrari, els teus components no mostraran els estils correctament, ja que Harmonix evita que es vegin afectats per estils externs.

  

L'encapsulació ShadowDom et permet separar el CSS i l'HTML d'un component. Així, evites que els estils es barregin amb altres elements del DOM. Aquí tens un exemple de com utilitzar ShadowDom en un component d'Angular:

  

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'el-meu-component',
  template: `
    <h1>Benvingut al meu component!</h1>
  `,
  styles: [`
    h1 {
      color: blue;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MiComponente {}
```

  

En aquest codi, `ViewEncapsulation.ShadowDom` assegura que els estils definits només afecten al `h1` dins de `el-meu-component`.

