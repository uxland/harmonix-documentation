---
sidebar_position: 1
---

# 1- Desconnectar correctament el plugin

Un plugin és una llibreria/paquet de Node.js que exporta almenys una funció `initialize` que rep una API de plugin per a connectar components a una instància de Harmonix Shell que l'allotja.

El cicle de vida d'un plugin existeix en dues categories diferents:

*   **Cicle de vida offline**, és a dir, tot el que fa referència al desenvolupament, manteniment i provisionament d'un plugin.
*   **Cicle de vida online**, és a dir, tot el que fa referència a carregar i avaluar un plugin dins d'una aplicació shell.
