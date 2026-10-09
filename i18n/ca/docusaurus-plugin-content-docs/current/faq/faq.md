---
sidebar_position: 13
---

# Preguntes freqüents

## Què és Harmonix?

Harmonix és un framework per compondre una aplicació d'una sola pàgina a partir de plugins que es desenvolupen i es despleguen de manera independent. Un shell defineix regions, i cada plugin hi registra Web Components com a vistes.

## A qui s'adreça Harmonix?

A aplicacions construïdes per diversos equips, o per empreses diferents, on cada equip desenvolupa les seves funcionalitats amb la seva tecnologia i el seu cicle de publicació.

## Quins frameworks puc fer servir?

React, Angular, Lit o JavaScript/TypeScript sense framework: qualsevol cosa que generi un Web Component. El [creador de plugins](../create-plugin/create-a-plugin.mdx) té plantilles per a React, Lit i Angular.

## Què és el shell?

L'aplicació principal. Pinta la disposició de la pàgina, defineix les regions, construeix l'API que rep cada plugin i carrega els plugins. També proporciona els serveis comuns, com l'autenticació o les traduccions. Consulta [Construir un shell](../api/building-a-shell.md).

## Què és un plugin?

Un mòdul ES que exporta `initialize(api)` i `dispose(api)`. Aporta una funcionalitat de l'aplicació. Es pot afegir, actualitzar o eliminar sense tornar a desplegar el shell. Consulta [Cicle de vida d'un plugin](../concepts/cicle-de-vida-Plugin.md).

## Què són les regions?

Àrees del shell on els plugins injecten vistes. Algunes mostren una vista alhora; d'altres, diverses. Consulta [Regions i vistes](../api/gestio-regions-i-vistes.md).

## Què ofereix l'API d'Harmonix?

Cada plugin rep una API amb:

- `regionManager`, per registrar i activar vistes a les regions.
- `pluginInfo`, amb l'id del plugin.
- `createLocaleManager`, per traduir els missatges del plugin.

Cada shell l'amplia amb els seus propis serveis, com un broker, un client HTTP o notificacions. Consulta la [Referència de l'API](../api/Api.md).

## Com es gestionen les traduccions?

Cada plugin passa els seus missatges a `api.createLocaleManager(messages)` i obté un traductor. Harmonix només defineix la interfície; el shell la implementa i decideix l'idioma actual.

## Com es comuniquen els plugins?

A través del [broker](../api/broker.md) del shell. Un plugin pot publicar esdeveniments als quals se subscriuen tants plugins com calgui, o enviar peticions que respon un sol plugin. Els plugins no s'importen mai entre ells.

## Què passa si un plugin no es pot carregar?

L'error es registra a la consola i el plugin se salta. Els altres plugins es carreguen i s'inicien amb normalitat.

## Necessito un Plugin Store? Com publico un plugin?

Un shell pot carregar plugins des de qualsevol URL o des de mòduls locals, així que un Plugin Store no és obligatori. En producció, les aplicacions normalment en tenen un per gestionar els plugins i les versions. Per pujar un plugin, fes servir `harmonix publish` de [`@uxland/harmonix-cli`](https://www.npmjs.com/package/@uxland/harmonix-cli). Consulta [Construir i publicar](../create-plugin/build-and-publish.mdx) i [Gestió de plugins amb un Plugin Store](../concepts/gestio-plugins-plugin-store.md).

## Com desenvolupo un plugin sense l'aplicació final?

Fes servir el [creador de plugins](../create-plugin/create-a-plugin.mdx). Crea un projecte que executa el teu plugin dins del [shell de demostració](../create-plugin/demo-shell.md), un shell petit amb una capçalera, un menú lateral i una regió principal.

## Com construeixo el meu propi shell?

Fes servir `@uxland/harmonix` i `@uxland/regions` per crear les regions, defineix la teva API i carrega els plugins amb `bootstrapPlugins`. Consulta [Construir un shell](../api/building-a-shell.md).

## Dos plugins poden fer servir el mateix id de vista?

Al shell de demostració, sí: desa cada vista com a `pluginId::viewId`. En altres shells, depèn de si el shell separa els ids de les vistes per plugin. Si no ho fa, posa l'id del plugin com a prefix dels teus ids.

## Com s'aïllen els estils?

Cada vista es pinta en el seu propi Shadow DOM, de manera que els seus estils no se n'escapen i els estils del shell no hi entren. Les plantilles del creador de plugins ja ho fan. Harmonix no proporciona un aspecte comú: això correspon al shell i al seu sistema de disseny, per exemple a través de propietats personalitzades de CSS.

## Com comparteixen els plugins biblioteques com React?

Els plugins no empaqueten el framework. Es construeixen amb el framework com a extern, i l'aplicació en proporciona una sola còpia a tots els plugins. Desenvolupa amb la mateixa versió major que fa servir l'aplicació. Consulta [Construir i publicar](../create-plugin/build-and-publish.mdx).

## Com es compara Harmonix amb Module Federation, single-spa o els iframes?

- Els **iframes** aïllen completament, però cada peça necessita la seva pròpia URL i el seu servidor web, i la comunicació i els estils entre marcs són complicats.
- **Webpack Module Federation** i **single-spa** són eines generals per carregar o muntar aplicacions construïdes per separat, sovint una per ruta.
- **Harmonix** compon una sola pantalla a partir de molts plugins per regió: un plugin pot col·locar vistes en diverses regions, i els plugins es comuniquen a través de l'API i el broker del shell.

## Harmonix és adequat per a aplicacions petites?

Està pensat per a aplicacions grans amb diversos equips. També pot tenir sentit en una aplicació més petita que es preveu que creixi o que hi participin més equips.

## Harmonix admet CI/CD?

Sí. Cada plugin es construeix i es publica pel seu compte, així que cada equip pot tenir el seu propi pipeline i publicar de manera independent.

## Quins són els casos d'ús més habituals?

- Aplicacions de tipus estació de treball construïdes per equips independents.
- Plataformes SaaS on els clients activen funcionalitats diferents.
- Integració de productes d'empreses diferents en una mateixa interfície.

## On puc trobar més recursos?

Comença per [Crear un plugin](../create-plugin/create-a-plugin.mdx). El codi font és a [GitHub](https://github.com/uxland/harmonix).
