---
sidebar_position: 3
---

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