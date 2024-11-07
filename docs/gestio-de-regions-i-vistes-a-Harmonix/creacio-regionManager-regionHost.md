---
sidebar_position: 4
---

# 3- Creació regionManager i regionHost

El shell ha de crear l'objecte regionManager, l'objecte encarregat de la gestió de vistes i el regionHost, un Mixin per Lit necessari per tots aquells WebComponents que necessitin declarar regions i que està associat al regionManager anterior.

```typescript
const regionManager: IRegionManager = createRegionManager("hes-cc-conf");
export const HesCConfRegionHost: any = createRegionHost(regionManager as any);
```