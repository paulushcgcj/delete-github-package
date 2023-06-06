# Delete Github Package

This action will remove packages from the provided repo org.

## Inputs

### `token`

**Required** The github token or personal token. Default to `"${{ github.token }}"`.

### `type`

**Required** The Type of the package. Can be one of container, maven, npm, nuget, or rubygems.

### `user`

**Required** The organization/user name to query the package. Default to `"${{ github.repository_owner }}"`

### `name`

**Required** The name of the package as shown on the package screen

### `version`

**Required** Version of package to be removed. Ex: 1.2.4

## Example usage

```yaml
uses: paulushcgcj/delete-github-package@v1.0.0
with:
  token: ${{ github.token }}
  type: maven
  name: io.github.paulushcgcj.sample.sample-app
  version: 1.3.5-RC1
  user: ${{ github.repository_owner }}
```
