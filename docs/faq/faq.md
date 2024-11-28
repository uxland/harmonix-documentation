---
sidebar_position: 13
---

# FAQ

# Preguntes Freqüents sobre Harmonix Framework

  

### 1\. Què és Harmonix Framework?

  

Harmonix és un framework de microfrontends dissenyat per facilitar la creació d’aplicacions SPA avançades amb equips independents. Utilitza una arquitectura modular basada en plugins per permetre la integració de components de forma escalable i flexible.

  

### 2\. Per a qui està pensat Harmonix?

  

Harmonix és ideal per a empreses grans o projectes amb equips distribuïts, on cada equip pot desenvolupar funcionalitats específiques sense afectar la resta de l’aplicació.

  

### 3\. Harmonix és compatible amb múltiples frameworks?

  

Sí. És agnòstic pel que fa a la tecnologia, compatible amb React, Angular, Lit, Vanilla JavaScript, i TypeScript, entre altres.

  

### 4\. Com es gestionen les regions?

  

Les regions són àrees definides dins l’aplicació Shell on els plugins poden injectar vistes. Aquest sistema assegura la integració visual i funcional de cada component.

  

### 5\. Què és l’aplicació Shell?

  

L’aplicació Shell actua com un contenidor principal per a tots els plugins. Gestiona les regions, la navegació i serveis comuns, com autenticació, localització o gestió d’estat.

  

### 6\. Què és un plugin a Harmonix?

  

Un plugin és un mòdul independent que proporciona funcionalitats concretes a l’aplicació. Es pot afegir, modificar o eliminar sense afectar el rendiment de l’aplicació.

  

### 7\. Quina és la funció principal de l’API de Harmonix?

  

L’API de Harmonix permet:

• Gestionar regions i injectar components.

• Accedir a informació específica del plugin (com identificadors i metadades).

• Crear funcionalitats personalitzades, com traduccions o interaccions visuals.

  

### 8\. Es pot personalitzar l’API?

  

Sí, l’API es pot estendre per adaptar-la a les necessitats específiques del projecte. Això inclou la incorporació de funcionalitats com autenticació, gestió d’estat global, traduccions, i serveis d’interacció.

  

### 9\. Com es gestiona la localització i traduccions?

Harmonix inclou eines per gestionar missatges localitzats, que es poden administrar a través de la funció createLocaleManager. Això permet integrar fàcilment idiomes múltiples en aplicacions grans.

  

### 10\. És Harmonix adequat per aplicacions petites?

  

Tot i que Harmonix està pensat per escenaris complexos, també pot ser útil en aplicacions més petites si es preveu creixement o si es necessiten múltiples equips.

  

### 11\. Harmonix és adequat per a projectes grans?

  

Sí, gràcies a la seva arquitectura modular i escalable, Harmonix està pensat per aplicacions complexes on treballen múltiples equips i proveïdors.

  

  

### 12\. Com ajuda Harmonix a la unificació d’experiències?

  

Mitjançant un sistema de regions compartides i estils coherents, Harmonix assegura que l’usuari percebi l’aplicació com un tot integrat, encara que hi participin diversos equips.

  

### 13\. Quins beneficis aporta l’agnosticisme tecnològic?

  

Permet utilitzar diferents tecnologies dins d’una mateixa aplicació, aprofitant punts forts de frameworks com React per a la interfície i Angular per a funcionalitats específiques.

  

### 14\. Harmonix suporta la integració contínua i DevOps?

  

Sí. Harmonix es pot integrar fàcilment amb pipelines de CI/CD per desplegar plugins de manera independent i mantenir versions actualitzades.

  

### 15\. Quins són els casos d’ús més comuns?

  

• Aplicacions complexes amb equips independents.

• Plataformes SaaS on els clients poden personalitzar funcionalitats.

• Integració de productes d’empreses diferents dins una mateixa interfície.

  

### 16\. On puc trobar més recursos i documentació?

  

La documentació completa està disponible a [harmonixframework.dev](https://harmonixframework.dev/), incloent-hi tutorials i bones pràctiques per començar .