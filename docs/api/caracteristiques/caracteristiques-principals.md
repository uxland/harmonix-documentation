---
sidebar_position: 1
---

# 1- Característiques principals

1. **Desenvolupament Independent:** Els equips de desenvolupament poden treballar de manera independent en diferents plugins, la qual cosa permet una major agilitat i facilita la implementació de canvis i noves característiques.
2. **Escalabilitat:** L'arquitectura basada en plugins modulars facilita l'escalabilitat horitzontal, ja que cada plugin es pot escalar per separat. Això és particularment beneficiós en entorns on certes parts de la interfície d'usuari poden experimentar una càrrega major que altres.
3. **Reutilització de Components:** Els components de la interfície d'usuari poden ser reutilitzats en diferents parts de l'aplicació, la qual cosa pot conduir a un desenvolupament més eficient i a la consistència en l'aparença i el comportament de la interfície d'usuari.
4. **Tecnologia Heterogènia:** Els equips poden triar les tecnologies més adients per a cada plugin, la qual cosa permet la utilització de diferents marcs de treball i llibreries segons els requisits específics de cada part de la interfície d'usuari.
5. **Resistència a Fallades:** L'arquitectura basada en plugins modulars pot fer que l'aplicació sigui més resistent a fallades, ja que un error en un plugin no afectarà necessàriament a tota l'aplicació.
6. **Interactivitat:** Els plugins poden interactuar via comandes i events entre ells, això com amb els serveis que proporcioni el shell (modals, traduccions, events de negoci, etcètera)
7. **Autenticació i seguretat**: El sistema proporciona un client http per gestionar de forma més fàcil l'autenticació, conservar i refrescar la sessió i preservar la seguretat i evitar errors de creuament de dades.
8. **Millora l'Experiència de l'Usuari:** Al permetre actualitzacions incrementals i ràpides en parts específiques de la interfície d'usuari, es pot millorar l'experiència de l'usuari a l'introduir noves característiques o corregir problemes de manera més ràpida.
