# Release Fetch

Thin wrapper to fetch packages from GitHub releases.

## Usage

### Typescript

```ts
import { fetchLatest } from 'gh-release-fetch'

fetchLatest({ repository: 'netlify/netlify-cli', package: 'cli.tar.gz', destination: 'dist' })
```

## License

[MIT](/LICENSE)
