---
sidebar_position: 12
---

# Best practices

# Properly disconnect the plugin

In the lifecycle of a plugin, we go through 2 important phases; **initialization** (mounting) and **disconnection** (unmounting). It is important that everything that has been done in the plugin mounting (register views, subscribe to message broker events, create internal dependency containers, etc.), a **clean disconnection** is made in order not to leave **any trace in memory** of your plugin. Although, in most cases, the user will close the browser and the Primary application will die at that instant, there may be potential cases where things like changing patient, renewing session, context changes, etc., are done that trigger a hot reload of plugins. If we don't properly disconnect our plugins, we can leave pieces in memory that can affect performance **(memory leaks)**, or data from other patients **(patient data mixing)**.


<br/>

# Treat the API received at mounting as a singleton

When we initialize a plugin, we receive the API object as a parameter. It is important not to do much processing on this API, such as cloning the object, adding unnecessary references or other bad practices. We must treat this API object as a **unique singleton** that will be the source of truth and the necessary tools to work. A good practice would be to create a dependency container (for example the one created by the **_inversify_** library) and add the API as a dependency to the container so it can be resolved anywhere in our code as a singleton.

<br/>

# Use initialization correctly as the entry point and start of your plugin's lifecycle

In the "_initialize_" function that must be implemented, it is a good point to make the first necessary configurations of your plugin, as well as the first service calls and view injection to regions.

Example:

```typescript
export const initialize = async (api: PrimariaApi) => {
  registerViews(api); //view registration to regions
  await initializeLocalization(api); //plugin translation initialization
  bootstrapFeatures(api); //plugin use case initialization
  return Promise.resolve();
};
```

<br/>

# Don't make a plugin for each place where we want to show information

Remember that a plugin is an independent part of the system capable of solving different use cases of the same scope. It is important to understand that a plugin is capable of injecting different views/web components to different Shell regions, but at the same time the data shown in these components comes from the same single data source.

Example:

If we have a patient allergies plugin, in the case of Health, and we need to show 3 different views (an allergy list in the main view, an allergy counter in the header and a button to add one in the actions menu), it is not necessary and in fact **NOT RECOMMENDED**, to create 3 plugins.

Creating 3 plugins would mean triplicating a lot of code and having independent lifecycle when in reality we are dealing with the same scope. With 1 single plugin and 1 single allergy backend, data will be managed so that there will be a single source of truth that will feed these 3 components injected into 3 different Shell regions.


<br/>

# Prefix a plugin's views with the plugin id

So that 2 plugins from 2 different initiatives don't collide, creating a view with the same id (header-view, main-view) for example, it is advisable to prefix the ids of views to inject with the pluginId that always arrives at the "initialize" function.

Example:

```typescript
const pluginId = api.pluginInfo.pluginId;

api.regionManager.registerMainView({
    id: `${pluginId}-main-view`,
    factory: mainFactory
  },);
```


<br/>

# Static assets management

Each plugin must be responsible for resolving static assets such as images, fonts, etc. The Harmonix model is not a conventional application where there is a public folder with statics, since the shell does not know the implementation of the initiatives that will make plugins.

Therefore it is recommended that images, icons, fonts, etc. be in the plugin in code format, or that the plugin creates its own infrastructure to host these assets and consume them as it sees fit.


<br/>

# Properly disconnect the plugin

In the lifecycle of a plugin, we go through 2 important phases; **initialization** (mounting) and **disconnection** (unmounting). It is important that everything that has been done in the plugin mounting (register views, subscribe to message broker events, create internal dependency containers, etc.), a **clean disconnection** is made in order not to leave **any trace in memory** of your plugin. Although, in most cases, the user will close the browser and the Primary application will die at that instant, there may be potential cases where things like changing patient, renewing session, context changes, etc., are done that trigger a hot reload of plugins. If we don't properly disconnect our plugins, we can leave pieces in memory that can affect performance **(memory leaks)**, or data from other patients **(patient data mixing)**.
