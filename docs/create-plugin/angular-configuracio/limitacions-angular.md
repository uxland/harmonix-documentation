---
sidebar_position: 3
---

# Angular Limitations in Harmonix

# ShadowDom Encapsulation

When using an Angular plugin, you must use ShadowDom techniques to encapsulate styles. Otherwise, your components will not display styles correctly, as Harmonix prevents them from being affected by external styles.



ShadowDom encapsulation allows you to separate the CSS and HTML of a component. Thus, you avoid styles mixing with other DOM elements. Here is an example of how to use ShadowDom in an Angular component:



```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'el-meu-component',
  template: `
    <h1>Welcome to my component!</h1>
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



In this code, `ViewEncapsulation.ShadowDom` ensures that the defined styles only affect the `h1` inside `el-meu-component`.

<br/>

# Routing Limitations

Plugins in Angular cannot directly interact with the main application's routing system. This means they cannot modify routes or access active route information.


<br/>

# Angular Version Fixed by the Shell

The Angular version that your plugin uses must be the same as that of the main application shell. To ensure that your plugin is compatible, you must declare Angular as an external dependency. This will apply when publishing the plugin to production and not during development.
