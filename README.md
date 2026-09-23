# Sertaç Akalın — Personal Website

My portfolio for computer vision, applied AI, research, and backend engineering.

**Live website:** [sertacakalin.com](https://sertacakalin.com/)

## Featured work

- **Publications & research:** two IDAP 2026 conference papers, including the co-authored *A deployable dual-mode vision framework for adaptive intersection control and traffic analytics*, awarded **Best Applied Research Paper**. Journal extensions are in preparation.
- **Hatched Area Violation Detection:** my first-author IDAP 2026 research, built on a custom Istanbul traffic dataset with 3,897 source frames and 9,353 exported images. YOLOv8m achieved 0.773 mAP50; the full system achieved 0.889 precision, recall, and F1 on 11 real traffic videos.
- **Palmystra:** a shipped iOS application combining computer vision and LangChain-based RAG, backed by FastAPI and deployed to Google Cloud Run.
- Engineering experience at FEV Türkiye and CodeFirst, technical skills, education, and English/Turkish resumes.

## Stack

React 19, Vite, React Icons, and CSS. The site is deployed to GitHub Pages with GitHub Actions.

## Local development

Use Node.js 22, matching the deployment workflow.

```sh
npm ci
npm run dev
```

```sh
npm run lint     # Check source code
npm run build    # Generate the production site in dist/
npm run preview  # Preview the production build locally
```

## Updating content

- `src/App.jsx`: profile, experience, publications, projects, skills, and education.
- `src/App.css`: layout, styling, and responsive behavior.
- `public/cv/`: English and Turkish PDF resumes.
- `public/img/`: profile and project images.
- `index.html`: page title, search description, and social sharing metadata.
- `public/CNAME`: custom domain configuration.

Research metrics and publication statuses reflect the September 2026 CV. Keep the website and downloadable resumes in sync when updating them.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which installs dependencies, builds the site, and deploys `dist/` to GitHub Pages. The workflow can also be started manually from GitHub Actions. GitHub Pages must use **GitHub Actions** as its publishing source, with `sertacakalin.com` configured as the custom domain.

## Contact

[Email](mailto:sertac@sertacakalin.com) · [LinkedIn](https://linkedin.com/in/sertacakalin) · [GitHub](https://github.com/sertacakalin)
