---
sidebar_position: 7
---

# API

Harmonix provides an **API** to plugins in order to **inject components into the different regions** of the Shell and manage their lifecycle, as well as a **plugin information** object, and some additional functionalities.

```typescript
export interface HarmonixApi {
    regionManager: HarmonixRegionManager;
    pluginInfo: PluginInfo;
    createLocaleManager(messages: LocalizationMessages): Promise<HarmonixLocaleApi>;
}
```



Now, each Shell application instance can have its **different needs**. That is why what is recommended is that the **Shell declares a new API extending Harmonix's**, thus providing plugins with new functionalities tied to the business and needs for that specific application.

In these needs we can find interaction services, modals, authentication, translations, a global state manager, etc. You can see an example of API extension in the Primary ETC integration document provided to the different initiatives, an application based on Harmonix.
