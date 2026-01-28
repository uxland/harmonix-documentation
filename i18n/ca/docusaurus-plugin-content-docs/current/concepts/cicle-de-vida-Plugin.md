---
sidebar_position: 4
---

# Cicle de vida d'un Plugin

# Introducció

Un plugin és una llibreria/paquet de Node.js que exporta almenys una funció `initialize` que rep una API de plugin per a connectar components a una instància de Harmonix Shell que l'allotja.

El cicle de vida d'un plugin existeix en dues categories diferents:

*   **Cicle de vida offline**, és a dir, tot el que fa referència al desenvolupament, manteniment i provisionament d'un plugin.
*   **Cicle de vida online**, és a dir, tot el que fa referència a carregar i avaluar un plugin dins d'una aplicació shell.

<br/>

# Cicle de Vida Offline

El cicle de vida offline consisteix en:

1. Inicialització/Estructuració
2. Desenvolupament i proves
3. Publicació
4. Manteniment
5. Actualitzacions
6. Desaprovació
7. Desactivació

  

Mentre que les fases (1), (2) i (4) són purament locals, les fases (3), (5), (6) i (7) implicaran el servei de Plugin Store. Un servei de Plugin Store hauria de donar suport a totes aquestes accions. Normalment, a la fase (3) també es pot fer un desplegament progressiu, que implicaria començar només amb un subconjunt d'usuaris fins que el plugin arribi al nivell de maduresa desitjat.


<br/>

# Cicle de Vida Online

El cicle de vida online descriu què passa quan un plugin s'ha d'integrar en una aplicació shell. Tenim:

1. Carrega
2. Avaluació
3. Configuració
4. Renderització
5. Desmuntatge

  

En la fase (1) es fa una petició al servei de Plugin Store i es recupera el script.

A la fase (2) s'avalua el script.

A la fase (3) s'executarà la funció de configuració necessària. En la fase de renderització (4) tots els components registrats de la fase (3) apareixeran a l'aplicació quan siguin necessaris.

A la fase (5) s'executarà la funció opcional de desmuntatge.