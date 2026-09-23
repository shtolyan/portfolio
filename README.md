# Anatoly Sheshenin — Portfolio

**Unity Developer · Gameplay · Multiplayer · Performance**

[View the portfolio](https://shtolyan.github.io/portfolio/) · [LinkedIn](https://www.linkedin.com/in/anatoly-sheshenin-b036ab66/) · [Email](mailto:natepo4ty@gmail.com) · [Telegram](https://t.me/shtolyan) · [GitHub](https://github.com/shtolyan)

I have 10+ years of software development experience, with a focus on Unity, gameplay systems, performance optimization, and player experience. Based in Hanoi, Vietnam (UTC+7).

## Selected projects

| Project | My role / contribution | Links |
| --- | --- | --- |
| Weed Empire — Lunkin Game | Team Lead / Unity Developer. Gameplay, optimization, asset delivery, GOAP, and contributions to progression and onboarding. | [App Store](https://apps.apple.com/us/app/weed-empire-business-strategy/id6479363149) · [Google Play](https://play.google.com/store/apps/details?id=com.lunkingames.WeedEmpire) |
| World War Armies — Hypemasters | Unity development, technical game design, and contributions to combat balance. | [App Store](https://apps.apple.com/us/app/world-war-armies-rts-game/id1506931934) |
| VR experiences — Varwin | Interactive applications, client demos, and simulations for HTC Vive and Oculus. | [Varwin](https://varwin.com/en/) |
| Shooting simulator — Sitronics KT | Training scenarios, character behavior, scoring, hit evaluation, and instructor UX. | [Interactive programs](https://xn--1-9sbclvecee0aslnx0j.xn--p1ai/misheni) |
| Heroes at War — Apex Point Games | Client/server development, gameplay, and graphics optimization. | — |
| Hex Live — independent, in development | Survival systems, resource management, character relationships, and game design. | — |
| Kura Money — independent | Product design, development, testing, and App Store release. | [App Store](https://apps.apple.com/us/app/kura-money-expense-tracker/id6760293665) |
| Aether Veil — independent | iOS product with astrology tools and interactive visualizations. | [App Store](https://apps.apple.com/us/app/aether-veil/id6760180228) |

Commercial projects describe my contributions as part of their teams. This repository contains the portfolio website, not the source code of the featured games.

## Website

A responsive pixel-art-inspired site built with semantic HTML, CSS and a small vanilla JavaScript file for scroll reveals and reading progress. Animations respect reduced-motion preferences, and content remains readable without JavaScript. No build step, analytics or API keys. Google Fonts are optional; system fonts are the fallback. Hosted with GitHub Pages from the root of `main`.

To preview locally, run `python3 -m http.server 8000` in this directory and open `http://localhost:8000`.

Update content in `index.html`, styling in `style.css` and progressive animations in `script.js`.

## Credits

Game and app imagery belongs to the respective owners and is shown to identify portfolio projects. Image source URLs are recorded in [assets/sources.json](assets/sources.json). The portrait uses Anatoly's own photo with an AI-edited voxel background and Unity T-shirt print. All other content © 2026 Anatoly Sheshenin.

### Social link preview

Open Graph and X/Twitter Card metadata are rendered directly in `index.html`, so crawlers do not need JavaScript. The versioned 1200 × 630 JPEG is `assets/portfolio-social-v2.jpg`. Its code-based layout is in `scripts/build-social-card.cjs`; regenerate with Node.js and the `sharp` package (via `NODE_PATH` if needed). When replacing the image, give it a new versioned filename and update both image URLs and metadata dimensions.
