---
sidebar_position: 3
---

# 2- Extensió API regions i creació api "amigable"

Ara bé, cada Shell pot ampliar aquesta api i crear mètodes més "amigables" pels plugins com per exemple: "registerMainView", "registerSidebarMenu", on només demanin l'objecte "view", i ja no faci falta que els plugins coneguin el nom de la regió, ja que el propi mètode ja és explícit de quina regió es tracta "main", "sidebar". Trobareu un exemple d'aquesta extensió en l'apartat 1 del [document t'integració de l'ETC de Primària](https://doc.clickup.com/9012015559/d/h/8cjgwe7-3532/b3a23bc489160e1).
