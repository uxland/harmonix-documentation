---
sidebar_position: 6
---

# Ejemplo de uso de una aplicación basada en Harmonix - Primaria Shell

# Visión rápida Shell

Para explicar el funcionamiento de **Harmonix** y cómo se puede construir una app compuesta de diferentes plugins desarrollada en diferentes tecnologías y por diferentes clientes, explicaremos un ejemplo de cómo funciona la aplicación de la Estación de trabajo de Primaria.



Primero de todo, existe **Harmonix**, el motor principal capaz de obtener y unir todos estos plugins, dotarlos con funcionalidades para interactuar entre ellos y componiendo así la aplicación final.



Segundo, existe el "**Shell**", que será la aplicación principal y quien mediante Harmonix, definirá un esqueleto con regiones donde los plugins podrán inyectar diferentes Web Components. Cada aplicación debe construir un Shell diferente, ya que cada una tendrá un esqueleto y una forma de trabajar propios. En el caso de primaria, tenemos el "Primaria Shell". El shell, por sí solo, no es más que un conjunto de contenedores, un esqueleto vacío. Si viéramos el shell antes de iniciar los plugins, veríamos algo semejante a esto:



```typescript
<primaria-shell>
    <div id="header-region"></div>
    <div id="menu-region"></div>
    <div id="footer-region"></div>
    <div id="main-region"></div>
  </primaria-shell>
```

<br/>

# Visión rápida Plugin

Y por último, tenemos los "**plugins**", que no son más que paquetes que desarrolla un 3ro, que se compilan, y que una vez publicados en un "Plugin Store", están listos para ser consumidos por el Shell.



Cada plugin necesita compilarse y hacer un bundle, generando un archivo JavaScript, por ejemplo:

**_plugin1-version-23.45.js._**



Estos plugins, en su Javascript necesitan definir un **punto de entrada** para iniciar su ciclo de vida. En este punto de iniciación, cada plugin recibe un objeto proveniente del Shell, llamado **api**. Con esta API, el plugin tiene todo lo necesario para funcionar dentro del Shell. Por ejemplo, tiene una forma de registrar cada componente en cada región que se haya definido (menú, header, main, footer). Tiene una forma de escuchar eventos que otro plugin haya podido comunicar, o un cliente HTTP para hacer llamadas a un backend, o una forma de mostrar un mensaje de notificación en pantalla, entre muchas otras cosas. Esto sería un ejemplo de punto de entrada de un plugin:



```typescript
export const initialize = (api: PrimariaApi) =>{

  //registro de Web Components en el esqueleto del Shell primaria
  api.registerView(shellRegions.menu, ())=> new Plugin1MenuWebComponent());
  api.registerView(shellRegions.header, ()=> new Plugin1HeaderWebComponent);
  api.registerView(shellRegions.footer, ()=> new Plugin1FooterWebComponent());
  api.registerView(shellRegions.main, ()=> new Plugin1MainWebComponent());

  //hacer una llamada para obtener datos de mi plugin
  api.httpClient.request(`${apiUrl}/get-plugin-data`).then((res: any) => { console.log(res) });
}
```

<br/>

# Visión rápida Shell + Plugins

Una vez el Shell y el framework Harmonix ha dado la orden de iniciar los plugins, el esqueleto del Shell pasa de estar vacío, a ser ya una aplicación compuesta por muchos Web Components. Si ahora vemos cómo está el DOM, sería algo así:



```typescript
<primaria-shell>
    <div id="header-region">
      <plugin1-header><h1>I'm Plugin 1</h1></plugin1-header>
      <plugin2-header><h1>I'm Plugin 2</h1></plugin2-header>
    </div>
    <div id="menu-region">
      <plugin1-menu><span>Go to Plugin 1 Menu</span></plugin1-menu>
      <plugin2-menu><span>Go to Plugin 2 Menu</span></plugin2-menu>
    </div>
    <div id="footer-region">
      <plugin1-footer>Plugin 1 2024</plugin1-footer>
      <plugin2-footer><h1>Plugin 2 2024</h1></plugin2-footer>
    </div>
    <div id="main-region">
      <plugin1-main>
        <div class="box">Plugin 1 Box main</div>
      </plugin1-main>
      <plugin2-main>
        <div class="box">Plugin 2 Box main</div>
      </plugin2-main>
    </div>
  </primaria-shell>
```



Como se puede comprobar, el plugin1 y el plugin2, han sido capaces mediante la API recibida en su punto inicial, de registrar diferentes Web Components en diferentes regiones. Ahora la aplicación Shell ya está llena.



En los equipos de desarrollo se les proporciona un Sandbox para simular una aplicación donde se instala el "Primaria Shell", de esta manera pueden trabajar individualmente y ver cómo quedará su plugin.
