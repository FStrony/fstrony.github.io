# Fernando Augusto Santos — Personal Portfolio

<p align="center">
  <strong>Senior Software Engineer · Technical Consultant</strong><br>
  Java · Spring Boot · AWS · Microservices · Backend Architecture
</p>

<p align="center">
  <a href="https://fstrony.github.io/">🌐 Live Website</a> ·
  <a href="https://www.linkedin.com/in/fstrony/">💼 LinkedIn</a> ·
  <a href="https://github.com/FStrony">🐙 GitHub</a>
</p>

<p align="center">
  <img alt="Build" src="https://github.com/FStrony/fstrony.github.io/actions/workflows/ci.yml/badge.svg">
  <img alt="GitHub Pages" src="https://img.shields.io/badge/deployed-GitHub%20Pages-222?logo=github">
</p>

---

## 👋 About

This repository contains my personal portfolio and professional website.

It serves two purposes:

- a public portfolio presenting my professional background, experience and selected work;
- a practical example of how I approach software architecture, CI/CD, quality gates, accessibility, localisation and automated deployment.

The website is intentionally designed as a small but production-oriented project rather than a static collection of pages.

> **Deep where it counts.**

---

## ✨ Highlights

- 🌍 Localised experience: **English (British English) / Português (Brasil)**
- 🧱 Shared presentation layer with locale-specific content
- 🔗 Localised routes with browser-based language selection
- 🔎 SEO metadata, structured data and search-engine discovery
- ♿ Automated accessibility testing
- 🔗 Automated link validation
- ✅ HTML validation
- ⚙️ GitHub Actions CI/CD
- 🚀 Automated deployment to GitHub Pages
- 🔄 Automatic `main → develop` synchronisation
- 🏷️ Manual Semantic Versioning release automation with automated tagging
- 🔒 Protected production branch with mandatory quality gates

---

## 🛠️ Technology Stack

| Area | Technology |
| --- | --- |
| Framework | [Astro](https://astro.build/) |
| Language | TypeScript |
| Styling | CSS |
| Testing | Playwright |
| Accessibility | axe-core |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |
| Versioning | Semantic Versioning |
| Repository workflow | Git + Pull Requests |

---

## 🧩 Architecture

The application intentionally keeps **content** separate from **presentation**.

```text
src/
├── components/
│   └── Portfolio.astro
├── content/
│   └── translations.ts
├── layouts/
│   └── Layout.astro
└── pages/
    ├── index.astro
    ├── en/
    │   └── index.astro
    └── pt-BR/
        └── index.astro
```

### Content

Portfolio content is stored separately from the page markup.

This makes it possible to support multiple locales without duplicating the entire page structure.

```text
English → en-GB
Português → pt-BR
```

### Presentation

The shared Astro component is responsible for structure and presentation, while the content layer provides locale-specific data.

This keeps the template easier to maintain and allows content changes without repeatedly modifying the page structure.

---

## 🌍 Localisation

The website supports:

- 🇬🇧 **English (British English)**
- 🇧🇷 **Português (Brasil)**

The English version intentionally follows British English conventions, reflecting my professional and academic experience in Australia.

### Routes

```text
/        → language selector
/en/     → English
/pt-BR/  → Português (Brasil)
```

The root route detects the browser language and directs visitors to the corresponding localised version:

- browsers using Portuguese → `/pt-BR/`
- other browsers → `/en/`

The language switcher allows visitors to move directly between the two localised versions.

The localisation approach is based on a shared presentation layer with locale-specific content, keeping the codebase compact and avoiding duplicated page structures.

### Resume / CV

The portfolio provides localised Resume/CV documents that follow the selected site language:

- 🇬🇧 English: [`/resume/Fernando_Augusto_Santos_Resume_EN.pdf`](/resume/Fernando_Augusto_Santos_Resume_EN.pdf)
- 🇧🇷 Português (Brasil): [`/resume/Fernando_Augusto_Santos_CV_PT-BR.pdf`](/resume/Fernando_Augusto_Santos_CV_PT-BR.pdf)

The Resume/CV link updates with the selected language and opens the corresponding PDF in a new tab.

---

## 🔎 SEO

SEO is implemented as part of the site architecture rather than as a separate post-release task.

The localised pages include:

- canonical URLs for each language version;
- `hreflang` metadata for English and Brazilian Portuguese;
- `x-default` pointing to the language-selection route;
- Open Graph metadata for social sharing;
- Twitter Card metadata;
- `Person` structured data using JSON-LD;
- automatically generated sitemap files;
- `robots.txt` configured for search-engine crawling.

The root `/` language-selection route is excluded from the sitemap because it is not a content page.

---

## ♿ Accessibility

Accessibility is treated as part of the engineering workflow rather than a manual post-release check.

The CI pipeline uses **Playwright** and **axe-core** to identify automatically detectable accessibility violations in the generated site.

The accessibility gate helped identify and correct colour-contrast issues in the original design before the check was made mandatory for production.

The goal is not to claim that automated testing proves complete accessibility. Instead, it provides a repeatable baseline for detecting common issues and prevents known regressions from silently reaching production.

---

## 🔄 CI & Quality Gates

Every pull request targeting `develop` or `main` runs the CI pipeline.

```text
                 Build
                   │
              dist artifact
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
      HTML        Links    Accessibility
      validation  validation  testing
```

### Build

Ensures that the Astro application can be built successfully.

### HTML validation

Validates the generated HTML output.

### Link validation

Checks generated pages for broken links while handling known crawler limitations for external services.

### Accessibility

Runs automated accessibility checks against the generated production artefact using Playwright and axe-core.

The build is produced once and shared with the quality-gate jobs as a workflow artefact.

---

## 🚀 Deployment

Production is hosted on **GitHub Pages**.

Deployment is intentionally separated from validation:

```text
Pull Request
     │
     ▼
    CI
     │
     ▼
   develop
     │
     ▼
Pull Request
     │
     ▼
   main
     │
     ▼
GitHub Pages
```

The production branch is protected and requires the configured quality gates to pass before merging.

---

## 🌿 Branching Strategy

The repository follows a lightweight Git workflow designed for a single-maintainer project while preserving production safeguards.

```text
feature/*
    │
    │  Pull Request
    ▼
 develop
    │
    │  Pull Request
    ▼
  main
```

### `feature/*`

Feature branches are used for both product and infrastructure changes.

Examples:

```text
feature/i18n
feature/ci-accessibility
feature/ci-release
chore/project-polish
```

Feature branches are merged into `develop` using **Squash and merge**, keeping the integration history concise and focused.

### `develop`

`develop` is the integration branch.

It is protected against deletion and force pushes.

It is intentionally not dependent on required status checks for direct branch synchronisation, because it is updated automatically from production after successful releases.

### `main`

`main` represents production.

It is protected by:

- mandatory pull requests;
- required CI quality gates;
- branch freshness checks;
- conversation resolution;
- deletion protection;
- force-push protection.

Production changes are merged from `develop` using a **merge commit**, preserving the promotion point between integration and production.

---

## 🔄 Automatic `main → develop` Synchronisation

After a production update, GitHub Actions automatically synchronises `develop` with `main`.

This keeps the integration branch aligned with the production state without requiring a manual synchronisation step after every release.

---

## 🏷️ Releases

Releases use **Semantic Versioning**:

```text
MAJOR.MINOR.PATCH
```

Release creation is intentionally manual.

The release workflow:

1. validates the requested version;
2. checks that the version is newer than the current release;
3. creates the Git tag;
4. creates the GitHub release;
5. preserves the release history in the repository.

Production deployment remains tied to the protected `main` branch.

---

## 📄 Resume / CV

The repository includes both localised versions of the professional Resume/CV:

```text
public/
└── resume/
    ├── Fernando_Augusto_Santos_Resume_EN.pdf
    └── Fernando_Augusto_Santos_CV_PT-BR.pdf
```

These documents are versioned together with the portfolio so that the public professional profile and downloadable documents remain aligned.

---

## 🧪 Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

The generated production artefact is written to:

```text
dist/
```

---

## 📁 Project Structure

```text
.
├── public/
│   ├── favicon.svg
│   ├── og.svg
│   ├── profile-mobile.jpg
│   ├── profile.jpg
│   ├── robots.txt
│   └── resume/
├── src/
│   ├── components/
│   │   └── Portfolio.astro
│   ├── content/
│   │   └── translations.ts
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       ├── index.astro
│       ├── en/
│       │   └── index.astro
│       └── pt-BR/
│           └── index.astro
├── .github/
│   └── workflows/
├── astro.config.mjs
├── package.json
├── package-lock.json
├── LICENSE.txt
└── README.md
```

---

## 🧠 Engineering Decisions

### Why Astro?

The portfolio is predominantly content-driven and benefits from a lightweight static architecture.

Astro provides a clear separation between content, components and generated output while keeping the site simple to build and deploy.

### Why separate content from presentation?

A multilingual portfolio should not require maintaining two copies of the page structure.

The goal is:

```text
same structure
+
different content
```

rather than:

```text
duplicated pages
```

This reduces maintenance and makes future localisation easier.

### Why British English?

The English version uses British English conventions to reflect my academic and professional experience in Australia.

This also keeps the public-facing portfolio linguistically consistent with how I use English professionally.

### Why GitHub Actions?

The repository is hosted on GitHub, so GitHub Actions provides a natural place to automate:

- validation;
- quality gates;
- deployment;
- branch synchronisation;
- releases.

### Why required checks on `main`?

Production changes should only be merged after the generated site has passed the project's automated quality gates.

This turns CI from an informational tool into an actual production safeguard.

### Why automatic branch synchronisation?

After a production update, `develop` should represent the same application state as `main`.

Automation removes repetitive manual maintenance while preserving a safe fast-forward-only policy.

### Why manual release versioning?

Choosing whether a change represents a patch, minor or major release is an engineering decision.

The release workflow automates the mechanical work without hiding that decision.

### Why avoid excessive tooling?

This repository deliberately avoids adding enterprise tooling solely for appearance.

The objective is to use automation where it provides practical value:

```text
Build
Quality
Accessibility
Deployment
Releases
Branch governance
```

rather than adding tools that increase maintenance without improving the project meaningfully.

---

## 🔐 Licence

The **source code** of this project is licensed under the [MIT License](./LICENSE.txt).

Personal content and branding are intentionally excluded from that licence.

Unless otherwise stated, this includes:

- personal name, biography and professional profile content;
- photographs and personal images;
- logos, monograms, visual identity and branding;
- portfolio copy and original written content;
- professional case study content and descriptions;
- other personal or proprietary materials.

The MIT licence therefore applies to the source code and associated software, **not automatically to the personal materials contained within the repository**.

See [`LICENSE.txt`](./LICENSE.txt) for the complete terms.

---

## 👤 Author

### Fernando Augusto Santos

**Senior Software Engineer · Technical Consultant**

Java · Spring Boot · AWS · Microservices · Backend Architecture

🌐 [fstrony.github.io](https://fstrony.github.io/)  
💼 [LinkedIn](https://www.linkedin.com/in/fstrony/)  
🐙 [GitHub](https://github.com/FStrony)

---

> **Deep where it counts.**
