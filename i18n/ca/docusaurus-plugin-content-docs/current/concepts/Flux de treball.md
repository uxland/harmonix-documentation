---
sidebar_position: 4
---

import { Workflow } from '@site/src/components/Diagrams/Workflow';

# Flux de treball

Harmonix està pensat perquè els equips puguin desenvolupar plugins pel seu compte, amb eines senzilles i estàndard.

## Flux de desenvolupament

<Workflow />

1. **Construir el shell.** L'equip de l'aplicació crea el shell sobre Harmonix: declara les regions i l'API fins que l'aplicació està preparada per allotjar plugins. Consulta [Construir un shell](../api/building-a-shell.md).
2. **Desenvolupar els plugins.** Els equips de plugins comencen amb el [creador de plugins](../create-plugin/create-a-plugin.mdx). Els dona un projecte que s'executa al shell de demostració d'Harmonix.
3. **Publicar.** Els plugins es construeixen i es publiquen, normalment en un Plugin Store. El Plugin Store fa el seguiment de les versions de cada plugin i de qui les pot fer servir.
4. **Executar.** L'aplicació carrega els plugins i els inicia en paral·lel, i així es construeix l'aplicació final.

## Flux d'execució

1. L'usuari obre l'aplicació al navegador.
2. El shell pinta el seu esquelet, crea les regions i comença a carregar els plugins.
3. Es carrega cada plugin, normalment des del Plugin Store.
4. Es crida en paral·lel la funció `initialize` de cada plugin, cadascuna amb la seva pròpia instància de l'API. Si un plugin falla, els altres es carreguen igualment.
5. Cada plugin fa les seves tasques d'inici: registrar vistes, subscriure's a esdeveniments, carregar dades.
6. La interfície es compon a mesura que les vistes es registren a les regions.
7. L'usuari veu una sola aplicació formada per plugins diferents i hi pot interactuar.
