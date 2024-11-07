---
sidebar_position: 6
---

# 6- Gestió d'assets estàtics

Cada plugin ha de ser responsable de resoldre els assets estàtics com imatges, fonts, etcètera. El model harmonix no és una aplicació convencional en la que es disposa d'una carpeta public amb els estàtics, ja que el shell no coneix la implementació de les iniciatives que realitzaran plugins.

Per tant es recomana que imatges, icones, fonts, etcètera estiguin en el plugin en format codi, o sigui el plugin qui creei una infraestructura pròpia on allotjar aquests assets i consumir-los segons els convingui.
