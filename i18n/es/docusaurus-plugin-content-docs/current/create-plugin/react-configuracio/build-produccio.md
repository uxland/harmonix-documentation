---
sidebar_position: 3
---

# Compilación plugin

# Configuración vite

La configuración del archivo `vite.config.ts` define como externas las dependencias "react", "react-dom" y "@uxland/primary-shell", indicando que no se deben incluir en el paquete final. Y se incluye la definición de `inlineDynamicImports: true`, que fuerza a incluir todas las importaciones dinámicas en un único archivo.
Esto es necesario para evitar la duplicidad de dependencias grandes o comunes en el paquete y reducir el tamaño del archivo final, asegurando que los plugins compartan estas dependencias en lugar de incluirlas por duplicado. De esta manera se tiene un solo archivo de salida:

```typescript
import { defineConfig, loadEnv } from "vite";
import pkg from "./package.json";
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    define: {
      'process.env': {NODE_ENV: "production"},
    },
    build: {
      lib: {
        entry: "./src/plugin.ts",
        fileName: "index",
        name: pkg.name,
        formats: ["es"]
      },
      rollupOptions: {
        external: ["react", "react-dom",  "@uxland/primary-shell", "react-dom/client"],
        output: {
          globals: {
            "@uxland/primary-shell": "@uxland/primary-shell",
          },
          inlineDynamicImports: true,
          manualChunks: undefined,
        },
      },
      minify: true,
      sourcemap: true,
    },
  });
};
```

A este último concepto de unidad de archivo, también se suma la definición de `manualChunks: undefined`, que al establecerse como _undefined_, lo que se hace es desactivar la funcionalidad de dividir los módulos en diferentes fragmentos.


<br/>

# Build para producción

Una vez se tiene el plugin finalizado, se debe preparar para poder desplegarlo en la Plugin Store.
Para generar el paquete final del plugin, se deben ejecutar estos dos comandos siguientes:

<br/>

```bash
npm install
npm run vite build
```

<br/>

Seguidamente se crea automáticamente la carpeta _dist_. Dentro de esta carpeta, el archivo `index.js` es el que se deberá subir a la Plugin Store.


![](/img/directory.png)


<br/>
