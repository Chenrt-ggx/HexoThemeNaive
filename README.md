# Hexo Theme Naive

![license](https://img.shields.io/github/license/Chenrt-ggx/HexoThemeNaive)
![version](https://img.shields.io/github/package-json/v/Chenrt-ggx/HexoThemeNaive)

A Vue3 and Naive UI Based CSR Hexo Blog Theme without Gallery Post and Excerpts Support.

- For demo, see [this page](https://chenrt-ggx.github.io/HexoDemoNaive).
- For usage, see [this blog](https://chenrt-ggx.github.io/category/Hexo/1).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

> Default public path '/'.

```
npm run serve
```

### Compiles and minifies for production with default public path

> Which is '/' as well.

```
npm run build
```

### Compiles and minifies for production with dynamic public path

> Which is same as 'root' in hexo.

```
cross-env VUE_PUBLIC_PATH=your-path vue-cli-service build
```

### Lints and fixes files

> I prefer run `npx prettier -w .`

```
npm run lint
```

### Generate fake blog for test

> However, not very strong.

```
cd fake && python main.py
```
