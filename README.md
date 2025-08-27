<h1 align="center">tailwindcss-source</h1>

<p align="center">A TailwindCss v4 `@source` plugin for monorepo projects.</p>

<p align="center">

</p>

## Installation

```sh
pnpm i -D tailwindcss-source
```

## Usage

In `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite'
import { tailwindcssSource } from 'tailwindcss-source'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcssSource({ // Must be before tailwindcss
      entry: '...',
      sources: '...'
    }),
    tailwindcss()
  ],
})
```

## Parameter Description

`tailwindcssSource(option: Option)`

### Option

- `entry` - string
  - TailwindCss entry file, that is, the file where `@import "tailwindcss"` is located.
- `sources` - string[]
  - source path configuration

## License

MIT License.
