# Fernando Augusto Santos — Personal Website V2

Senior Software Engineer portfolio built with Astro.

## Toolchain for macOS 11 Big Sur (Intel)

- Node.js 22.23.2
- npm 10.9.8
- Astro 5.3.0
- esbuild 0.24.2

The dependency versions are intentionally pinned for macOS Big Sur compatibility. esbuild 0.24.x supports macOS 11; esbuild 0.26+ requires macOS 12 or later.

## Run

```bash
nvm use
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Design

Editorial/minimal portfolio focused on Senior Software Engineer positioning, with Java / Spring Boot / AWS as the primary technical signal, engineering principles, professional case studies, international experience, curated skills, LinkedIn/GitHub CTAs, and SEO metadata.

## Internationalisation

The site supports English (British English) and Brazilian Portuguese from the same static page. The language switcher updates the page content in the browser and persists the selected language in local storage.

Source content is separated from the page markup in `src/content/translations.ts` so the visual structure remains shared between locales.
