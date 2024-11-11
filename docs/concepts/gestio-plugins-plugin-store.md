---
sidebar_position: 6
---

# Gestió de plugins amb Plugin Store

# Introducció

Cada aplicació basada en Harmonix, necessita una peça clau per poder funcionar, el Plugin Store.

El **Plugin Store** és un repositori de plugins que proporciona un conjunt de funcionalitats per gestionar i orquestrar la composició dinàmica d'aplicacions Harmonix, així com la càrrega i actualització dinàmica dels plugins.

<br/>


# Visió general

*   És un servei que proporciona una manera de subministrar dinàmicament plugins a una instància de Harmonix. Això permet actualitzacions en temps real i la integració de noves funcions sense desplegar tota l'aplicació.
*   Té un servei de descobriment que retorna un JSON que llista tots els plugins disponibles, incloent-hi la seva metadada i ubicacions. Aquest objecte JSON serveix com a registre per a tots els microfrontends (plugins) que la instància de Harmonix pot carregar.
*   Quan la instància de Harmonix s'inicia, recupera el llistat de plugins des de la URL especificada i analitza el JSON per obtenir els detalls de cada plugin, incloent la seva URL i versió. Finalment, els plugins es carreguen dinàmicament a l'aplicació.

<br/>

# Funcionalitats

*   **Servei de descobriment**. Servei que proporciona el llistat de plugins disponibles per a la instància d'Harmonix i la seva ubicació.
*   **Gestió d'usuaris i proveïdors.** Proporcionarà un panell d'administració que permetrà la creació i administració d'usuaris i rols.
*   **Desplegament independent de plugins**. Mitjançant una API, els proveïdors podran desplegar noves versions dels seus plugins de forma independent.
*   **Control de versions**. Hi haurà un panell d'administració que permetrà controlar la versió retornada en el servei de descobriment.
*   **Gestió de regles**. Permetrà la configuració de regles sobre els plugins retornats en el servei de desplegament, basades en condicions (per exemple, rol d'usuari).
*   **CDN.** Els plugins desplegaran els seus arxius compilats al servidor de Plugin Store perquè serveixi el contingut, evitant que els plugins requereixin una infraestructura pròpia.

  

**NOTA**: El Framework Harmonix no disposa d'una infraestructura pròpia i per tant, un Plugin Store propi. Actualment, cada projecte d'aplicació basat en Harmonix ha de disposar d'un Plugin Store personalitzat amb la seva infraestructura i el seu CI/CD corresponent, així com la seva aplicació frontal i backend per gestionar els rols i permisos específics d'aquell projecte.