---
sidebar_position: 1
title: Paquets
---

import { PackagesMap } from '@site/src/components/Diagrams/PackagesMap';

# Paquets

Harmonix es distribueix en cinc paquets npm de l'àmbit `@uxland`. El nucli és l'únic que una aplicació necessita en temps d'execució. Els altres serveixen per crear, executar, adaptar i publicar plugins. Cada paquet té la seva pàgina en aquesta secció, amb la instal·lació, les exportacions o les ordres principals i enllaços a les guies detallades.

<PackagesMap />

## Els paquets

| Paquet | Per a què serveix | Qui el fa servir | Quan | npm |
| --- | --- | --- | --- | --- |
| [`@uxland/harmonix`](./harmonix.md) | El nucli: contracte dels plugins, `bootstrapPlugins`, gestor de regions i tipus de l'API | Autors de shells (els autors de plugins en fan servir els tipus) | Execució | [npm](https://www.npmjs.com/package/@uxland/harmonix) |
| [`@uxland/harmonix-demo-shell`](./demo-shell.md) | Un shell mínim amb tres regions per executar un plugin mentre el desenvolupes | Autors de plugins | Desenvolupament | [npm](https://www.npmjs.com/package/@uxland/harmonix-demo-shell) |
| [`@uxland/create-harmonix-plugin`](./create-harmonix-plugin.md) | Crea un projecte de plugin amb React, Lit o Angular (`npm create @uxland/harmonix-plugin`) | Autors de plugins | Desenvolupament (un cop, al començament) | [npm](https://www.npmjs.com/package/@uxland/create-harmonix-plugin) |
| [`@uxland/harmonix-adapters`](./adapters.md) | Embolcalla un component de React en un Web Component perquè es pugui registrar com a vista | Autors de plugins que fan servir React | Execució | [npm](https://www.npmjs.com/package/@uxland/harmonix-adapters) |
| [`@uxland/harmonix-cli`](./cli.md) | `harmonix publish`: puja un plugin construït a un Plugin Store | Autors de plugins | Publicació | [npm](https://www.npmjs.com/package/@uxland/harmonix-cli) |

El nucli depèn de [`@uxland/regions`](https://www.npmjs.com/package/@uxland/regions), que proporciona les regions pròpiament dites (el decorador `@region` i els adaptadors de regió). Un shell fa servir tots dos.

## Quin necessito?

**Escric un plugin.**

1. Crea el projecte amb [`@uxland/create-harmonix-plugin`](./create-harmonix-plugin.md). Instal·la tota la resta que necessites per desenvolupar.
2. Executa'l dins del [shell de demostració](./demo-shell.md) amb `npm run dev`.
3. Si fas servir React, registra les vistes amb [`@uxland/harmonix-adapters`](./adapters.md). La plantilla de React ja ho fa.
4. Construeix-lo i puja'l al teu Plugin Store amb [`@uxland/harmonix-cli`](./cli.md).

**Construeixo una aplicació (un shell).**

Instal·la [`@uxland/harmonix`](./harmonix.md) i `@uxland/regions`, i escriu el teu propi shell: la disposició, les regions i l'API que rep cada plugin. Consulta [Construir un shell](../api/building-a-shell.md). El shell de demostració és una referència que funciona, no una base per a aplicacions de producció.

**Escric un plugin per a una aplicació existent.**

El plugin rep l'API del shell d'aquella aplicació, que amplia `HarmonixApi` del nucli. El pots continuar desenvolupant de manera aïllada amb el creador i el shell de demostració, sempre que només facis servir el que proporcionen tots dos shells, i publicar-lo amb la CLI al Plugin Store de l'aplicació.

**Només vull provar Harmonix.**

Executa `npm create @uxland/harmonix-plugin@latest` i segueix [Crear un plugin](../create-plugin/create-a-plugin.mdx).
