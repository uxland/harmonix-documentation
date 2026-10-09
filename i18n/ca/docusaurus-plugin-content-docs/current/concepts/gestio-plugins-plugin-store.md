---
sidebar_position: 6
---

# Gestió de plugins amb un Plugin Store

En producció, una aplicació Harmonix normalment carrega els seus plugins des d'un **Plugin Store**. Un Plugin Store és un repositori de plugins. Gestiona quins plugins carrega l'aplicació i permet que els equips publiquin i actualitzin plugins sense tornar a desplegar l'aplicació.

## Com funciona

- El Plugin Store proporciona els plugins a l'aplicació en temps d'execució. Les funcionalitats noves i les actualitzacions arriben als usuaris sense desplegar tota l'aplicació.
- Té un **servei de descobriment** que retorna una llista JSON dels plugins disponibles, amb les seves metadades, la versió i la ubicació.
- Quan el shell s'inicia, obté aquesta llista i carrega cada plugin des del seu URL.

## Capacitats

Un Plugin Store hauria d'oferir:

- **Servei de descobriment.** La llista de plugins disponibles per a l'aplicació, amb la seva ubicació.
- **Gestió d'usuaris i proveïdors.** Un tauler d'administració per gestionar els usuaris i els rols.
- **Publicació independent.** Una API a través de la qual cada proveïdor publica versions noves dels seus plugins.
- **Control de versions.** Control sobre quina versió retorna el servei de descobriment.
- **Regles.** Condicions sobre els plugins que retorna el servei de descobriment, per exemple segons el rol de l'usuari.
- **Allotjament de fitxers.** El Plugin Store serveix els fitxers dels plugins construïts, de manera que els equips de plugins no necessiten la seva pròpia infraestructura.

## Publicació

La CLI d'Harmonix, `@uxland/harmonix-cli`, puja un plugin a un Plugin Store. `harmonix publish` llegeix l'id del plugin (`name`), la versió (`version`) i el fitxer que s'ha de pujar (`module`) del `package.json` del plugin. Consulta [Construir i publicar](../create-plugin/build-and-publish.mdx).

:::note
Harmonix no inclou cap Plugin Store. Cada aplicació proporciona el seu, amb la seva infraestructura, la seva CI/CD i la seva administració de rols i permisos.
:::
