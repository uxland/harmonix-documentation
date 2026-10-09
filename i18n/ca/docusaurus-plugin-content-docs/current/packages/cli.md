---
sidebar_position: 6
sidebar_label: CLI
---

# `@uxland/harmonix-cli`

L'eina de línia d'ordres d'Harmonix. Té una sola ordre, `harmonix publish`, que puja un plugin construït a un Plugin Store. No construeix el plugin ni en canvia la versió: executa primer la construcció i posa tu mateix la `version` a `package.json`.

## Instal·lació

Executa-la amb `npx`, sense instal·lar-la:

```bash
npx @uxland/harmonix-cli publish
```

O instal·la-la com a dependència de desenvolupament i fes servir l'ordre `harmonix`:

```bash
npm install --save-dev @uxland/harmonix-cli
npx harmonix publish
```

## `harmonix publish`

Executa-la des de la carpeta del plugin, la que té el seu `package.json`.

```bash
npm run build
npx harmonix publish
```

### Què llegeix de `package.json`

Només busca `package.json` a la carpeta actual.

| Camp | Ús |
| --- | --- |
| `name` | S'envia com a identificador del plugin. |
| `version` | S'envia com a número de versió. |
| `module` | Camí del fitxer construït que es puja, relatiu a la carpeta actual. L'ordre falla si falta o si el fitxer no existeix. |

### Què puja

Una petició `POST` a l'URL del registre, exactament tal com està configurada, amb un cos `multipart/form-data`:

| Camp del formulari | Valor |
| --- | --- |
| `pluginId` | `name` de `package.json` |
| `versionNumber` | `version` de `package.json` |
| `file` | El contingut del fitxer `module` |

La clau d'API va a la capçalera `x-api-key`. Si va bé, mostra `✅ Plugin published:` seguit de la resposta del servidor.

### Configuració

L'ordre necessita una URL de registre i una clau d'API. Les pren, en ordre creixent de prioritat, de:

1. El primer `.harmonixrc` que troba començant per la carpeta actual i pujant per les carpetes pare (com a màxim 10 carpetes, inclosa l'actual). Només es llegeix aquest fitxer, així que un `.harmonixrc` a l'arrel d'un monorepo serveix per a tots els seus plugins.
2. `~/.harmonixrc`, a la teva carpeta personal. Els seus valors substitueixen els del fitxer del projecte.
3. Les opcions de la línia d'ordres, que substitueixen tots dos fitxers.

```ini title=".harmonixrc"
registry=https://your-plugin-store.example.com/upload
apiKey=your-api-key
```

Cada línia és `clau=valor`. Les línies que comencen per `#` s'ignoren. Un valor no pot contenir `=`: només es llegeix el text entre el primer i el segon `=`.

| Opció | Substitueix | Descripció |
| --- | --- | --- |
| `--registry <registry>` | `registry` | L'URL de pujada del Plugin Store. |
| `--api-key <apiKey>` | `apiKey` | La clau d'API. |

```bash
npx harmonix publish --registry https://your-plugin-store.example.com/upload --api-key "$HARMONIX_API_KEY"
```

:::danger
`.harmonixrc` conté credencials: no el pugis mai al repositori. Els projectes creats amb el [creador de plugins](./create-harmonix-plugin.md) ja l'ignoren a `.gitignore`.
:::

### Errors i codi de sortida

| Missatge | Causa | Codi de sortida |
| --- | --- | --- |
| `package.json not found in: <folder>` | No hi ha `package.json` a la carpeta actual | 1 |
| `'module' field not found in package.json` | `package.json` no té `module` | 1 |
| `Compiled bundle file not found: <path>` | El fitxer `module` no existeix: primer cal construir | 1 |
| `Failed to publish: No registry configured` | No hi ha `registry` a cap `.harmonixrc` ni `--registry` | 0 |
| `Failed to publish: No API key configured` | No hi ha `apiKey` a cap `.harmonixrc` ni `--api-key` | 0 |
| `Failed to publish: <message>` | La petició ha fallat (error de xarxa o estat d'error del servidor) | 0 |

Els tres darrers casos mostren l'error però surten amb el codi 0. En un pipeline de CI, comprova que la sortida contingui `Plugin published` en lloc de confiar en el codi de sortida.

## Versions

La versió actual és la 0.0.5. Depèn d'`axios`, `commander` i `form-data`.

## Enllaços

- [npm](https://www.npmjs.com/package/@uxland/harmonix-cli)
- [Codi font a GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/cli)
- [Construir i publicar](../create-plugin/build-and-publish.mdx)
- [Gestió de plugins amb un Plugin Store](../concepts/gestio-plugins-plugin-store.md)
