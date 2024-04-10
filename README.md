# semantic-release-config

Shareable configurations for [semantic-release](https://www.npmjs.com/package/semantic-release) with
Bedrock's conventions for branching strategy and release note generation.

## Usage

Install the NPM package in your project:

```bash
npm install --save-dev @bdrk/semantic-release-config
```

Then, in your `.releaserc.json`, remove any redundant configuration and replace it with:

```json
{
  "extends": "@bdrk/semantic-release-config/base"
}
```

### npm shared configuration

The `base` shared configuration can be used for all applications that do not publish their artifact(s) to NPM or GitHub. For
projects that _do publish their artifacts to NPM_, choose the `npm` submodule instead:

```json
{
  "extends": "@bdrk/semantic-release-config/npm"
}
```

### assets shared configuration

For projects that do not publish to npm but _do publish artifacts with GitHub releases_, choose the `assets` submodule instead:

```json
{
  "extends": "@bdrk/semantic-release-config/assets"
}
```

When using the assets shared configuration you will need to define what assets you would like published as GitHub release artifacts.

Add a key of `"assets"` with an array value into your `package.json`.
The array will contain the list of [assets](https://github.com/semantic-release/github/tree/v8.0.2#assets).  The only required field is
`path`.  Globbing is not supported with this functionality – a file or directory must exist at the defined path.

```json
  "assets": [
    {"path": "dist/assets"},
    {"path": "dist/asset.min.js", "label": "JS distribution"},
    {"path": "dist/asset.js", "label": "JS distribution", "name": "asset.min.js"}
  ]
```
