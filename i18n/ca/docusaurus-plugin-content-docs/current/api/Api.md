---
sidebar_position: 7
---

# API

Harmonix proporciona una **API** als plugins per tal d'**injectar els components en les diferents regions** del Shell i gestionar el seu cicle de vida, així com un objecte d'**informació del plugin**, i algunes funcionalitats més.

```typescript
export interface HarmonixApi {
    regionManager: HarmonixRegionManager;
    pluginInfo: PluginInfo;
    createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```

  

Ara bé, cada instància d'aplicació Shell, pot tenir les seves **necessitats diferents**. És per això, que el que es recomana fer, és que el **Shell declari una nova API extenent la d'Harmonix**, dotant així als plugins de noves funcionalitats lligades al negoci i necessitats per aquella aplicació en concret.

En aquestes necessitats podem trobar serveis d'interacció, modals, autenticació, traduccions, un gestor d'estat global, etcètera. Podeu veure un exemple d'extensió de l'Api al [shell de demostració d'Harmonix](../create-plugin/demo-shell.md), que hi afegeix un broker, dreceres per a les seves regions i traduccions.