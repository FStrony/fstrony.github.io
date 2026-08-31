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

- 🌍 Bilingual experience: **English (British English) / Português (Brasil)**
- 🧱 Content separated from presentation
- ♿ Automated accessibility testing
- 🔗 Automated link validation
- ✅ HTML validation
- ⚙️ GitHub Actions CI/CD
- 🚀 Automated deployment to GitHub Pages
- 🔄 Automatic `main → develop` synchronisation
- 🏷️ Manual Semantic Versioning release automation
- 📦 Reusable architecture suitable for forks
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
├── content/
│   └── translations.ts
├── layouts/
│   └── Layout.astro
└── pages/
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

The Astro page is responsible for structure and presentation, while the content layer provides locale-specific data.

This keeps the template easier to maintain and allows content changes without repeatedly modifying the page structure.

---

## 🌍 Localisation

The website supports:

- 🇬🇧 **English (British English)**
- 🇧🇷 **Português (Brasil)**

The English version intentionally follows British English conventions, reflecting my professional and academic experience in Australia.

The language switcher changes the content without maintaining separate copies of the entire page.

The localisation approach is based on a shared presentation layer with locale-specific content, keeping the codebase compact and avoiding duplicated page structures.

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

```text
main
  │
  ▼
sync workflow
  │
  ▼
fast-forward develop
```

The synchronisation intentionally uses a **fast-forward-only** strategy.

No force push or automatic conflict resolution is performed.

If the histories diverge unexpectedly, the workflow fails instead of rewriting history or making an unsafe automatic merge.

This keeps `develop` aligned with the exact state that has reached production.

---

## 📦 Release Automation

Releases are created manually through GitHub Actions.

The release workflow accepts a Semantic Version:

```text
2.1.0
```

and creates:

```text
v2.1.0
```

along with a GitHub Release and generated release notes.

### Release flow

```text
main
  │
  ▼
GitHub Actions → Release
  │
  ▼
Semantic version validation
  │
  ▼
Duplicate tag check
  │
  ▼
Tag vX.Y.Z
  │
  ▼
GitHub Release
  │
  ▼
Generated release notes
```

A dry-run mode is available to validate the release process without creating a tag or GitHub Release.

### Versioning

The project follows [Semantic Versioning](https://semver.org/):

```text
MAJOR.MINOR.PATCH
```

Examples:

```text
v2.0.0
v2.1.0
v2.1.1
```

Version selection remains an explicit release decision rather than being inferred automatically from every commit.

This keeps the release history intentional and avoids creating versions for infrastructure-only changes.

---

## 💻 Local Development

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The site will be available through the Astro development server.

### Production build

```bash
npm run build
```

The generated website is written to:

```text
dist/
```

---

## 🧪 Validation

Before opening a pull request, the main local checks are:

```bash
npm run build
git diff --check
```

The complete CI workflow performs:

```text
Build
HTML validation
Link validation
Accessibility
```

The CI pipeline is the final validation layer before production.

---

## 🍴 Fork & Reuse

This project is intentionally structured so that its technical foundation can be reused as a starting point for another personal portfolio.

If you fork this repository, **replace the personal material before publishing it**.

### Recommended fork checklist

```text
[ ] Replace personal name and biography
[ ] Replace professional profile content
[ ] Replace profile image
[ ] Replace email and phone number
[ ] Replace LinkedIn and GitHub links
[ ] Replace Open Graph / social preview assets
[ ] Replace favicon and branding
[ ] Review English content
[ ] Review Portuguese content
[ ] Review structured metadata
[ ] Review SEO metadata
[ ] Review experience and education
[ ] Review project case studies
[ ] Review GitHub Actions workflows
[ ] Configure GitHub Pages
[ ] Review release configuration
[ ] Review licence and copyright notices
```

### Content customisation

Most personal content is kept in:

```text
src/content/translations.ts
```

This is the first place to look when adapting the portfolio for another person.

### Assets

Personal and branding assets are stored under:

```text
public/
```

Typical files include:

```text
profile.png
favicon.svg
og.svg
```

### GitHub Pages

After forking:

1. enable GitHub Pages for the repository;
2. review the deployment workflow;
3. verify the repository-specific Pages configuration;
4. update canonical URLs and metadata;
5. replace personal branding and assets;
6. confirm the generated site works under the new repository.

Because deployment and repository URLs are repository-specific, the GitHub Actions configuration should always be reviewed after a fork.

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

## 🗂️ Repository Structure

```text
.
├── .github/
│   └── workflows/
│       ├── ci.yml
│       ├── deploy.yml
│       ├── release.yml
│       └── sync-develop.yml
│
├── public/
│   ├── favicon.svg
│   ├── og.svg
│   └── profile.png
│
├── src/
│   ├── content/
│   │   └── translations.ts
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
│
├── LICENSE.txt
├── README.md
├── astro.config.mjs
├── package.json
└── package-lock.json
```

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
