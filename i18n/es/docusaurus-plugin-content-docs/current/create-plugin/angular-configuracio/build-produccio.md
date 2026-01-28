---
sidebar_position: 4
---
# Compilación plugin en dos pasos

A diferencia de otras tecnologías, Angular tiene su empaquetador propio, y es por eso que necesitaremos hacer una compilación en dos pasos. Una para Angular, y la otra con Vite:

# 1- Compilación con Angular
Cuando se desarrolla una librería en Angular, el proceso de construcción estándar (`ng build`) genera diversos formatos para asegurar compatibilidad. Uno de los formatos clave es el FESM (Flat EcmaScript Module), a menudo ubicado en un directorio como `dist/tu-librería/fesm2022`.
Cuando Angular compila la librería a formatos como FESM, por defecto, no incluye las dependencias externas principales. Asume que la aplicación que consume la librería ya tendrá estas dependencias disponibles en su propio entorno.
Esto puede ser beneficioso para evitar duplicación de código, pero en el presente caso el plugin necesitará dependencias específicas que la `shell` no proporcionará.
Por lo tanto, en este primer paso deberemos ejecutar el siguiente comando:

```bash
ng build my-plugin --configuration production
```

Esto creará un archivo `my-plugin.mjs` en la ubicación `projects/my-plugin/dist/fesm2022`.

# 2- Compilación con Vite, configuración, ubicación de fichero y nombre
Dado que el plugin necesitará otras dependencias, será necesario hacer un segundo compilado con Vite para incluir las librerías externas que necesita el plugin. Aquí es donde entra en juego la creación del fichero `vite.postbuild.config.ts` en la raíz de la carpeta de nuestro plugin. En el ejemplo se ubica en `projects/my-plugin/vite.postbuild.config.ts`:

![](/img/vitePostbuild.png)

Y el archivo sería el siguiente:

```typescript
import { defineConfig } from 'vite';
import path from 'path';
import pckg from './package.json';

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, `dist/fesm2022/${pckg.name}.mjs`),
      formats: ['es'],
      fileName: () => `${pckg.name}-bundled.js`
    },
    rollupOptions: {
      external: [
        '@angular/animations',
        '@angular/common',
        '@angular/compiler',
        '@angular/core',
        '@angular/forms',
        '@angular/platform-browser',
        '@angular/router',
        '@uxland/primary-shell',
        'rxjs'
      ]
    }
  }
});
```



Con este segundo paso, se crea un nuevo bundle, con el propósito de crear un bundle final que sí incluya aquellas librerías externas que el plugin necesita y que no están garantizadas por el `shell`.

El build de Angular genera diversos ficheros, a menudo con extensiones como .mjs. El build de Vite, configurado como en nuestro ejemplo, generará un único fichero JavaScript (.js).
El nombre de este fichero final se determina por la configuración `fileName` dentro de `build.lib` en el fichero `vite.postbuild.config.ts.`. En nuestro ejemplo, se llama `${pckg.name}-bundled.js`.
Dado que Angular compila con el nombre del package al bundle (`${pckg.name}`), se utiliza precisamente para construir la ruta esperada al fichero FESM generado por el build. Esto asegura que Vite sepa exactamente qué fichero de entrada debe procesar desde la salida del build anterior.

Este proceso se hace dado que la compilación en Angular es especial, y esto da un control más fino sobre cómo se compila, permitiendo decidir qué dependencias externas deben ir incluidas en el bundle final.

Se deberá ir a la carpeta del plugin:
```bash
cd projects/my-plugin
```

Y posteriormente se deberá ejecutar el siguiente comando:

```bash
vite build --config vite.postbuild.config.ts
```

Esto creará el archivo `my-plugin-bundled.js` en esta ubicación -> `projects/my-plugin/dist`.

# Posibilidad de unificar los dos pasos con script
Hay la posibilidad de realizar estos dos pasos en uno mismo, mediante un script en el `package.json` de la raíz del proyecto que realice las dos llamadas. En el ejemplo que se ha mostrado anteriormente (https://stackblitz.com/~/github.com/uxland/harmonix-angular-plugin-demo) tenemos el siguiente script:
```
"build:plugin": "ng build my-plugin --configuration production && cd projects/my-plugin && vite build --config vite.postbuild.config.ts",
```
Siguiendo con el ejemplo, también hay las diferentes librerías externas proporcionadas por la shell, las cuales no haría falta modificarlas.



Se generará los compilados en `projects/my-plugin/dist`, y se debería subir el archivo `my-plugin-bundled.js` renombrado a nuestra preferencia al plugin store.
