---
sidebar_position: 6
sidebar_label: CLI
---

# `@uxland/harmonix-cli`

[![npm](https://img.shields.io/npm/v/@uxland/harmonix-cli?label=npm&color=4bcbb6)](https://www.npmjs.com/package/@uxland/harmonix-cli)

The Harmonix command-line tool. It has one command, `harmonix publish`, which uploads a built plugin to a Plugin Store. It does not build the plugin or change its version: run your build first and set `version` in `package.json` yourself.

## Install

Run it with `npx`, without installing:

```bash
npx @uxland/harmonix-cli publish
```

Or install it as a development dependency and use the `harmonix` command:

```bash
npm install --save-dev @uxland/harmonix-cli
npx harmonix publish
```

## `harmonix publish`

Run it from the plugin folder, the one with its `package.json`.

```bash
npm run build
npx harmonix publish
```

### What it reads from `package.json`

It only looks for `package.json` in the current folder.

| Field | Use |
| --- | --- |
| `name` | Sent as the plugin id. |
| `version` | Sent as the version number. |
| `module` | Path to the built file to upload, relative to the current folder. The command fails if it is missing or the file does not exist. |

### What it uploads

One `POST` request to the registry URL, exactly as configured, with a `multipart/form-data` body:

| Form field | Value |
| --- | --- |
| `pluginId` | `name` from `package.json` |
| `versionNumber` | `version` from `package.json` |
| `file` | The contents of the `module` file |

The API key goes in the `x-api-key` header. On success, it prints `✅ Plugin published:` followed by the server's response.

### Configuration

The command needs a registry URL and an API key. It takes them from, in increasing order of priority:

1. The first `.harmonixrc` found starting at the current folder and going up through its parent folders (at most 10 folders, the current one included). Only that file is read, so a `.harmonixrc` at the root of a monorepo works for all its plugins.
2. `~/.harmonixrc`, in your home folder. Its values override those of the project file.
3. The command-line options, which override both files.

```ini title=".harmonixrc"
registry=https://your-plugin-store.example.com/upload
apiKey=your-api-key
```

Each line is `key=value`. Lines starting with `#` are ignored. A value cannot contain `=`: only the text between the first and the second `=` is read.

| Option | Overrides | Description |
| --- | --- | --- |
| `--registry <registry>` | `registry` | The upload URL of the Plugin Store. |
| `--api-key <apiKey>` | `apiKey` | The API key. |

```bash
npx harmonix publish --registry https://your-plugin-store.example.com/upload --api-key "$HARMONIX_API_KEY"
```

:::danger
`.harmonixrc` contains credentials: never commit it. Projects made with the [plugin creator](./create-harmonix-plugin.md) already ignore it in `.gitignore`.
:::

### Errors and exit code

| Message | Cause | Exit code |
| --- | --- | --- |
| `package.json not found in: <folder>` | No `package.json` in the current folder | 1 |
| `'module' field not found in package.json` | `package.json` has no `module` | 1 |
| `Compiled bundle file not found: <path>` | The `module` file does not exist: build first | 1 |
| `Failed to publish: No registry configured` | No `registry` in any `.harmonixrc` and no `--registry` | 0 |
| `Failed to publish: No API key configured` | No `apiKey` in any `.harmonixrc` and no `--api-key` | 0 |
| `Failed to publish: <message>` | The request failed (network error or an error status from the server) | 0 |

The last three cases print the error but exit with code 0. In a CI pipeline, check the output for `Plugin published` rather than relying on the exit code.

## Versions

It depends on `axios`, `commander` and `form-data`.

## Links

- [npm](https://www.npmjs.com/package/@uxland/harmonix-cli)
- [Source on GitHub](https://github.com/uxland/harmonix/tree/main/harmonix/cli)
- [Build and publish](../create-plugin/build-and-publish.mdx)
- [Plugin management with a Plugin Store](../concepts/gestio-plugins-plugin-store.md)
