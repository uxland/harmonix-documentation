---
sidebar_position: 2
---

# 2- Tractar l'API que es rep en el muntatge, com a singleton

Quan inicialitzem un plugin, rebem per paràmetre l'objecte API. És important no fer gaires tractaments en aquesta API, com clonar l'objecte, afegir referències innecessàries o altres males pràctiques. Hem de tractar aquest objecte API com un **singleton únic** i que serà la font de la veritat i les eines necessàries per treballar. Una bona pràctica seria crear un contenidor de dependències (per exemple el que crea la llibreria **_inversify_**) i afegir l'API com a dependència al contenidor perquè pugui resoldre-la en qualsevol punt del nostre codi en forma de singleton.
