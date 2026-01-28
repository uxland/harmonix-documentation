---
sidebar_position: 7
---

# API

Harmonix proporciona una **API** a los plugins para **inyectar los componentes en las diferentes regiones** del Shell y gestionar su ciclo de vida, así como un objeto de **información del plugin**, y algunas funcionalidades más.

```typescript
export interface HarmonixApi {
    regionManager: HarmonixRegionManager;
    pluginInfo: PluginInfo;
    createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```



Ahora bien, cada instancia de aplicación Shell puede tener sus **necesidades diferentes**. Es por eso, que lo que se recomienda hacer, es que el **Shell declare una nueva API extendiendo la de Harmonix**, dotando así a los plugins de nuevas funcionalidades ligadas al negocio y necesidades para aquella aplicación en concreto.

En estas necesidades podemos encontrar servicios de interacción, modales, autenticación, traducciones, un gestor de estado global, etcétera. Podéis ver un ejemplo de extensión de la Api, en el documento de integración del ETC de Primaria que se proporciona a las diferentes iniciativas, una aplicación basada en Harmonix.
