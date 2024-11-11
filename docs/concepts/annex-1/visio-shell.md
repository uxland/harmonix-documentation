---
sidebar_position: 1
---

# A1.1- Visió ràpida Shell

Per explicar el funcionament d'**Harmonix** i com es pot construir una app composta de diferents plugins desenvolupada en diferents tecnologies i per diferents clients, explicarem un exemple de com funciona l'aplicació de l'Estació de treball de Primària.

  

Primer de tot, existeix **Harmonix**, el motor principal capaç d'obtenir i unir tots aquests plugins, dotar-los amb funcionalitats per interactuar entre ells i composant així l'aplicació final.

  

Segon, existeix el "**Shell**", que serà l'aplicació principal i qui mitjançant Harmonix, definirà un esquelet amb regions on els plugins podran injectar diferents Web Components. Cada aplicació ha de construir un Shell diferent, ja que cadascuna tindrà un esquelet i una forma de treballar propis. En el cas de primària, tenim el "Primaria Shell". El shell, per si sol, no és més que un conjunt de contenidors, un esquelet buit. Si veiéssim el shell abans d'iniciar els plugins, veuríem quelcom semblant a això:

  

```typescript
<primaria-shell>
    <div id="header-region"></div>
    <div id="menu-region"></div>
    <div id="footer-region"></div>
    <div id="main-region"></div>
  </primaria-shell>
```