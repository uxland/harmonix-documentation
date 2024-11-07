---
sidebar_position: 2
---

# Visió general

*   És un servei que proporciona una manera de subministrar dinàmicament plugins a una instància de Harmonix. Això permet actualitzacions en temps real i la integració de noves funcions sense desplegar tota l'aplicació.
*   Té un servei de descobriment que retorna un JSON que llista tots els plugins disponibles, incloent-hi la seva metadada i ubicacions. Aquest objecte JSON serveix com a registre per a tots els microfrontends (plugins) que la instància de Harmonix pot carregar.
*   Quan la instància de Harmonix s'inicia, recupera el llistat de plugins des de la URL especificada i analitza el JSON per obtenir els detalls de cada plugin, incloent la seva URL i versió. Finalment, els plugins es carreguen dinàmicament a l'aplicació.
