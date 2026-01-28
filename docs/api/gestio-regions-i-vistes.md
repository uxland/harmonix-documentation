---
sidebar_position: 8
---

# Region and View Management in Harmonix

# Introduction

One of the characteristics of Harmonix applications is the Region concept. Any Harmonix-based shell must create the relevant regions and provide an **api** to plugins to manage the different **regions** of the application. To carry out all these functionalities, Harmonix uses the _@uxland/regions_ library.

Note: some functionalities will need to be imported from this library. In future versions, Harmonix will take care of exporting them making the shell only have Harmonix as a single dependency.

<br/>

# HarmonixRegionManager API

Harmonix has a default api to do all this view injection to regions management.

```typescript
export interface HarmonixRegionManager {
    registerView(regionName: string, view: HarmonixViewDefinition): Promise<void>;
    removeView(regionName: string, viewId: string): Promise<void>;
    activateView(regionName: string, viewId: string): Promise<void>;
    deactivateView(regionName: string, viewId: string): Promise<void>;
    getRegion(regionName: string): Promise<IRegion>;
    isViewActive(regionName: string, viewId: string): Promise<boolean>;
    containsView(regionName: string, viewId: string): Promise<boolean>;
}
```



Each plugin can declare different views and inject them to different regions.

<br/>

# API regions extension and "friendly" api creation

However, each Shell can extend this api and create more "friendly" methods for plugins such as: `registerMainView`, `registerSidebarMenu`, where they only ask for the "view" object, and plugins no longer need to know the region name, since the method itself is already explicit about which region it is "main", "sidebar". You will find an example of this extension in section 1 of the [Primary ETC integration document](https://doc.clickup.com/9012015559/d/h/8cjgwe7-3532/b3a23bc489160e1).


<br/>

# regionManager and regionHost creation

The shell must create the `regionManager` object, the object in charge of view management and the regionHost, a Mixin for Lit necessary for all those WebComponents that need to declare regions and that is associated with the previous `regionManager`.

```typescript
const regionManager: IRegionManager = createRegionManager("hes-cc-conf");
export const HesCConfRegionHost: any = createRegionHost(regionManager as any);
```

<br/>

# Creating a region in the Shell

In the Shell component, we must use the **_@region_** decorator to declare a region, indicating the name and who will be the host (which HTML element will be the container where views will be injected). Example:

```typescript
@customElement("my-shell")
export class HesCConfShell extends HesCConfRegionHost(LitElement) {

  @region({ targetId: "header-right-region-container", name: shellRegions.headerRight })
  headerRightRegion: IRegion | undefined;
}
```

<br/>

# Complete example

We can create a new component to continue with the example, which in this case will be `ExampleComponent`.



In the plugin initialization, the _api_ object is received, with a `regionManager`. This object will allow registering and injecting views, activating them, deactivating them, removing them and doing everything necessary.



The most basic action is to **register** a view. To do this, we just need to call the _registerView_ method indicating the region where we want to inject the view and the _View_ object. This object will define a factory that will return the component we want to inject.



However, some "helper" functions have been created so that injection is more declarative, such as `registerMainView` or `registerNavigationMenu`, where it will no longer be necessary to pass the region and the register function itself already explains where it will be injected, as we explained before.



Similarly, we also inject the `PrimariaNavItem` into the side navigation menu region. This `PrimariaNavItem` will have the function of activating the `ExampleComponent` component view when clicked.



The `activateMainView` function of the `regionManager` is in charge of selecting which is the active view in the main region. It needs as an argument the id of the plugin that was previously registered, in this case, "_plugin-main-view_".



Example:



```typescript
export const initialize = (api: PrimariaApi) => {
  console.log(`Plugin ${api.pluginInfo.pluginId} initialized`);
  api.regionManager.registerMainView({
    id: "plugin-main-view",
    factory: () =>  Promise.resolve(new ExampleComponent()) ,
  });

  api.regionManager.registerNavigationMenu({
    id: "plugin-quick-action",
    factory: () => Promise.resolve(new PrimariaNavItem("add_circle_outline", "Lit plugin", () => {
      api.regionManager.activateMainView("plugin-main-view")
    })),
  });
  return Promise.resolve();
};
```
