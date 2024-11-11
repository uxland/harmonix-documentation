---
sidebar_position: 1
---

# Desconnectar correctament el plugin

En el cicle de vida d'un plugin, passem per 2 fases importants; la **iniciació** (muntatge) i la **desconnexió** (desmuntatge). És important que tot allò que s'hagi fet en el muntatge del plugin (registrar vistes, subscriure's a events del broker de missatges, crear contenidors de dependències interns, etcètera), es **faci una desconnexió neta** per tal de no deixar **cap rastre en memòria** del teu plugin. Tot i que, en la majoria dels casos, l'usuari tancarà el navegador i l'aplicació de Primària morirà en aquell instant, es poden donar casos potencials en què es facin coses com canviar de pacient, renovar sessió, canvis de context, etcètera, que provoquin una nova càrrega de plugins en calent. Si no desconnectem bé els nostres plugins, podem deixar en memòria peces que poden afectar el rendiment **(memory leaks)**, o dades d'altres pacients **(barreja de dades de pacients)**.
