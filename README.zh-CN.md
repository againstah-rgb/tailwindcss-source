<h1 align="center">tailwindcss-source</h1>

<p align="center">一个用于 monorepo 项目的 TailwindCss <i><b>@source</b></i> 插件。</p>

**中文** | [English](./README.md)

## 安装

```sh
pnpm add -D tailwindcss-source
```

## 使用

在 `vite.config.ts` 中：

```ts
import tailwindcss from '@tailwindcss/vite'
import { tailwindcssSource } from 'tailwindcss-source'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcssSource({ // 必须在 tailwindcss 之前
      entry: '...',
      sources: ['...']
    }),
    tailwindcss()
  ],
})
```

## 参数说明

`tailwindcssSource(option: Option)`

### Option

#### `entry` - string

TailwindCss 入口文件，即 `@import "tailwindcss"` 所在的文件。

示例：
```ts
'src/styles/index.css'
```

#### `sources` - Source[]

需要检测的源文件路径配置。

示例：
```ts
[
  {
    name: '@xx/pkg1',
    path: 'src/**/*.{css,ts,tsx}'
  },
  {
    name: '@xx/pkg2',
    path: 'src/**/*.{css,ts,tsx}'
  }
]
```
