---
sidebar_position: 4
---

# 4- Tecnologies compatibles amb Harmonix

Harmonix és un sistema d'injecció dinàmica de plugins, on aquests plugins poden tenir N componentes/vistes injectades en N regions. Cada un d'aquests components, ha de ser un [Web Component standar](https://developer.mozilla.org/es/docs/Web/API/Web_components).

Els **Web Components** estàn establerts en l'ecosistema frontend Javascript i són una bona solució per les aplicacions basades en Harmonix, ja que encapsulen els estils i la llògica de pintat fent que no hi hagi col·lisions amb altres components i plugins.

Per tant, quan es crea un plugin sempre s'ha d'encapsular cada un dels components creats amb la tecnologia que sigui, en un Web Component. Per tant, podriem dir que **Harmonix és compatible amb qualsevol llibreria/framework de renderitzat Javascript que sigui capaç de acabar creant un Web Component**.

Hi ha diverses formes d'encapsular un component d'una llibreria Javascript, i des de l'equip de desenvolupament d'Harmonix, treballem per donar la **sol·lució més òptima** per a cada cas. Actualment, els frameworks que han estat provats i que tenim documentats són: **Vanilla JS** (Javascript natiu sense llibreria), **Lit 3** i **Angular 18**. A mesura que els consumidors d'Harmonix vagin necessitant altres com React, Vue, etcètera, anirem donant el suport i documentant.