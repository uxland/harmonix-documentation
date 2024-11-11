---
sidebar_position: 2
---

# 2- Conceptes

1. **Motor harmonix**: El "core" del framework, l'encarregat d'inicialitzar l'aplicació i tots els plugins, i dotar-los de capacitats especials per ser autocontinguts d'uns d'un shell.
2. **Plugin**: Un plugin és una part independent del sistema que conté tot el necessari per executar una part específica de la funcionalitat de l'aplicació. Els plugins són reutilitzables i poden ser intercanviats entre diferents sistemes o aplicacions.
3. **Shell:** És un esquelet format per diferents regions sobre el qual els desenvolupadors poden construir i injectar els seus plugins.
4. **Regió:** És un espai definit al shell on poden injectar-se diferents vistes definides pels plugins. Les regions poden tenir característiques diferents com per exemple la capacitat de mostrar una o més d'una vista alhora, així com diferents adaptadors que alteren el seu comportament.
5. **Vista:** És la instància d'un component o conjunt de components que per si sols tenen un sentit funcional. Les vistes s'injecten en les diferents regions del shell.
6. **Sandbox.** És una aplicació segura i aïllada per desenvolupar i provar plugins de manera independent, separada dels altres mòduls. Opera com una aplicació sense plugins que imita l'aplicació real de l'Estació de Treball. És part del tooling de desenvolupament de la solució.
7. **SDK (Software Development Kit)**: Aquest és un conjunt d'eines que permet als desenvolupadors crear plugins i poder-se integrar amb el sistema, així com interactuar amb ell i altres plugins, en cas que ho necessitin.
8. **Plugin Store**: És el lloc on es publiquen i guarden tots els plugins disponibles per al seu ús. Funciona com un repositori de bundles compilats i del qual l'aplicació n'obtindrà els necessaris per compondre la UI.

  

![](https://t9012015559.p.clickup-attachments.com/t9012015559/60d2fe59-dd78-406e-8701-cea5bdc2d40f/image.png)
