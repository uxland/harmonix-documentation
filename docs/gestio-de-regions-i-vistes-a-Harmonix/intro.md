---
sidebar_position: 1
---

# Intro

Una de les característiques de les aplicacions d'Harmonix és el concepte de Regió. Qualsevol shell basat en Harmonix, ha de crear les regions pertinents i proporcionar una **api** als plugins per a gestionar les diferents **regions** de l'aplicació. Per dur a terme totes aquestes funcionalitats, Harmonix utilitza la llibreria _@uxland/regions._

Nota: algunes funcionalitats, s'hauran d'importar d'aquesta llibreria. En versions futures, Harmonix s'encarregarà d'exportar-les fent que el shell només tingui com a dependència única Harmonix.