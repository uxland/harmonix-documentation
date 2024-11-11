---
sidebar_position: 3
---

# A1.3- Visió ràpida Shell + Plugins

Un cop el Shell i el framework Harmonix ha donat l'ordre d'iniciar els plugins, l'esquelet del Shell passa d'estar buit, a ser ja una aplicació composta per molts Web Components. Si ara veiem com està el DOM, seria quelcom així:

  

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

  

Com es pot comprovar, el plugin1 i el plugin2, han sigut capaços mitjançant l'API rebuda en el seu punt inicial, de registrar diferents Web Components en diferents regions. Ara l'aplicació Shell ja és plena.

  

En els equips de desenvolupament se'ls hi proporciona un Sandbox per simular una aplicació on s'instal·la el "Primaria Shell", d'aquesta manera poden treballar individualment i veure com quedarà el seu plugin.
