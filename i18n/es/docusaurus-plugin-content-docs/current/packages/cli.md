---
sidebar_position: 6
sidebar_label: CLI
---

# `@uxland/harmonix-cli`

La herramienta de línea de comandos de Harmonix. Tiene un solo comando, `harmonix publish`, que sube un plugin compilado a un Plugin Store. No hace el build del plugin ni cambia su versión: haz el build antes y pon tú mismo la `version` en `package.json`.

## Instalación

Ejecútala con `npx`, sin instalarla:

```bash
npx @uxland/harmonix-cli publish
```

O instálala como dependencia de desarrollo y usa el comando `harmonix`:

```bash
npm install --save-dev @uxland/harmonix-cli
npx harmonix publish
```

## `harmonix publish`

Ejecútalo desde la carpeta del plugin, la que tiene su `package.json`.

```bash
npm run build
npx harmonix publish
```

### Qué lee de `package.json`

Solo busca `package.json` en la carpeta actual.

| Campo | Uso |
| --- | --- |
| `name` | Se envía como id del plugin. |
| `version` | Se envía como número de versión. |
| `module` | Ruta del fichero compilado que se sube, relativa a la carpeta actual. El comando falla si falta o si el fichero no existe. |

### Qué sube

Una petición `POST` a la URL del registro, tal como está configurada, con un cuerpo `multipart/form-data`:

| Campo del formulario | Valor |
| --- | --- |
| `pluginId` | `name` de `package.json` |
| `versionNumber` | `version` de `package.json` |
| `file` | El contenido del fichero `module` |

La API key va en la cabecera `x-api-key`. Si todo va bien, muestra `✅ Plugin published:` seguido de la respuesta del servidor.

### Configuración

El comando necesita una URL de registro y una API key. Las toma de estas fuentes, de menor a mayor prioridad:

1. El primer `.harmonixrc` que encuentra empezando por la carpeta actual y subiendo por sus carpetas padre (como máximo 10 carpetas, incluida la actual). Solo lee ese fichero, así que un `.harmonixrc` en la raíz de un monorepo sirve para todos sus plugins.
2. `~/.harmonixrc`, en tu carpeta de usuario. Sus valores sobrescriben los del fichero del proyecto.
3. Las opciones de la línea de comandos, que sobrescriben los dos ficheros.

```ini title=".harmonixrc"
registry=https://your-plugin-store.example.com/upload
apiKey=your-api-key
```

Cada línea es `key=value`. Las líneas que empiezan por `#` se ignoran. Un valor no puede contener `=`: solo se lee el texto entre el primer y el segundo `=`.

| Opción | Sobrescribe | Descripción |
| --- | --- | --- |
| `--registry <registry>` | `registry` | La URL de subida del Plugin Store. |
| `--api-key <apiKey>` | `apiKey` | La API key. |

```bash
npx harmonix publish --registry https://your-plugin-store.example.com/upload --api-key "$HARMONIX_API_KEY"
```

:::danger
`.harmonixrc` contiene credenciales: no lo subas nunca al repositorio. Los proyectos hechos con el [creador de plugins](./create-harmonix-plugin.md) ya lo ignoran en `.gitignore`.
:::

### Errores y código de salida

| Mensaje | Causa | Código de salida |
| --- | --- | --- |
| `package.json not found in: <folder>` | No hay `package.json` en la carpeta actual | 1 |
| `'module' field not found in package.json` | `package.json` no tiene `module` | 1 |
| `Compiled bundle file not found: <path>` | El fichero `module` no existe: haz el build antes | 1 |
| `Failed to publish: No registry configured` | No hay `registry` en ningún `.harmonixrc` ni `--registry` | 0 |
| `Failed to publish: No API key configured` | No hay `apiKey` en ningún `.harmonixrc` ni `--api-key` | 0 |
| `Failed to publish: <message>` | La petición ha fallado (error de red o un estado de error del servidor) | 0 |

Los tres últimos casos muestran el error pero terminan con código 0. En un pipeline de CI, busca `Plugin published` en la salida en lugar de fiarte del código de salida.

## Versiones

La versión actual es la 0.0.5. Depende de `axios`, `commander` y `form-data`.

## Enlaces

- [npm](https://www.npmjs.com/package/@uxland/harmonix-cli)
- [Código fuente en GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/cli)
- [Build y publicación](../create-plugin/build-and-publish.mdx)
- [Gestión de plugins con un Plugin Store](../concepts/gestio-plugins-plugin-store.md)
