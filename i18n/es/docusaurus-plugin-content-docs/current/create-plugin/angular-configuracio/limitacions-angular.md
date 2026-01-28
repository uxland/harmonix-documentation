---
sidebar_position: 3
---

# Limitaciones Angular en Harmonix

# Encapsulación ShadowDom

Al utilizar un plugin Angular, debes usar técnicas de ShadowDom para encapsular los estilos. En caso contrario, tus componentes no mostrarán los estilos correctamente, ya que Harmonix evita que se vean afectados por estilos externos.



La encapsulación ShadowDom te permite separar el CSS y el HTML de un componente. Así, evitas que los estilos se mezclen con otros elementos del DOM. Aquí tienes un ejemplo de cómo utilizar ShadowDom en un componente de Angular:



```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'el-meu-component',
  template: `
    <h1>¡Bienvenido a mi componente!</h1>
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



En este código, `ViewEncapsulation.ShadowDom` asegura que los estilos definidos solo afecten al `h1` dentro de `el-meu-component`.

<br/>

# Limitaciones con el Routing

Los plugins en Angular no pueden interactuar directamente con el sistema de enrutamiento de la aplicación principal. Esto significa que no pueden modificar las rutas o acceder a la información de las rutas activas.


<br/>

# Versión de Angular Fijada por el Shell

La versión de Angular que utiliza tu plugin debe ser la misma que la del shell de la aplicación principal. Para asegurarte de que tu plugin sea compatible, debes declarar Angular como una dependencia externa. Esto aplicará a la hora de publicar el plugin a producción y no durante el desarrollo.
