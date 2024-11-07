---
sidebar_position: 5
---

# 4- Creació d'una regió al Shell

En el component del Shell, hem de fer servir el decorador **_@region_** per tal de declarar una regió, indicant el nom i qui serà el host (quina element HTML serà la capsa on s'injectaran les vistes). Exemple:

```typescript
@customElement("my-shell")
export class HesCConfShell extends HesCConfRegionHost(LitElement) {
  
  @region({ targetId: "header-right-region-container", name: shellRegions.headerRight })
  headerRightRegion: IRegion | undefined;
}
```