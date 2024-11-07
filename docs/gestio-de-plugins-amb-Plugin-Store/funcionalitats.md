---
sidebar_position: 3
---

# Funcionalitats

*   **Servei de descobriment**. Servei que proporciona el llistat de plugins disponibles per a la instància d'Harmonix i la seva ubicació.
*   **Gestió d'usuaris i proveïdors.** Proporcionarà un panell d'administració que permetrà la creació i administració d'usuaris i rols.
*   **Desplegament independent de plugins**. Mitjançant una API, els proveïdors podran desplegar noves versions dels seus plugins de forma independent.
*   **Control de versions**. Hi haurà un panell d'administració que permetrà controlar la versió retornada en el servei de descobriment.
*   **Gestió de regles**. Permetrà la configuració de regles sobre els plugins retornats en el servei de desplegament, basades en condicions (per exemple, rol d'usuari).
*   **CDN.** Els plugins desplegaran els seus arxius compilats al servidor de Plugin Store perquè serveixi el contingut, evitant que els plugins requereixin una infraestructura pròpia.

  

**NOTA**: El Framework Harmonix no disposa d'una infraestructura pròpia i per tant, un Plugin Store propi. Actualment, cada projecte d'aplicació basat en Harmonix ha de disposar d'un Plugin Store personalitzat amb la seva infraestructura i el seu CI/CD corresponent, així com la seva aplicació frontal i backend per gestionar els rols i permisos específics d'aquell projecte.