---
sidebar_position: 3
---

# Flux de treball

Harmonix ha estat creat per construir aplicacions on l'**experiència de desenvolupament** esdevé un punt clau, per això la comoditat pel desenvolupador és una prioritat.

  

Això s'aconsegueix gràcies a **l'autonomia** de desenvolupament de plugins, juntament amb el conjunt d'eines de configuració **senzilla i estàndard.**

  

El **flux de desenvolupament** passa per una **primera fase de creació del Shell** basat en Harmonix, on es declaren les regions principals i es configuren les eines necessàries fins que l'aplicació esdevé en un estat de "**fàbrica de plugins**". És llavors quan els desenvolupadors poden començar a crear plugins amb el sandbox proporcionat i que aniran a parar en aquest Shell.

  

Els plugins són **compilats i desplegats al Plugin Store**, i des d'allà es portarà un control sobre les versions de cada plugin i es configurarà els rols i permisos necessaris. Finalment, l'aplicació amb el motor Harmonix obtindrà aquests plugins i els **executarà asíncronament**, construint així l'aplicació final.

A continuació, es detalla el **flux d'execució** d'una aplicació Harmonix:

  

0- L'usuari obre l'aplicació al Browser al domini corresponent

1- El shell, mitjançant Harmonix, crea l'esquelet, l'objecte API i inicia el procés principal d'obtenció de plugins

2- Es descarreguen els fitxers de cada plugin publicats al Plugin Store

3- Es crida la funció d'iniciació de cada plugin de forma paral·lela

4- Cada plugin realitza les tasques que ha definit en el seu punt d'inicialització

5- La UI es va component a mesura que es van resolent els registres de components de plugins

7- L'usuari veu finalment una sola aplicació composta de diferents plugins i Web Components i pot interactuar amb ella.