---
sidebar_position: 2
---

# 1- API HarmonixRegionManager

Harmonix té una api per defecte per fer tota aquesta gestió de injecció de vistes a regions.

```plain
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

  

Cada plugin pot declarar diferents vistes i injectar-les per les diferents regions.