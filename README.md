# Plant Watering Tracker

[![Live PWA](https://img.shields.io/badge/Watering_PWA-Live_PWA-4CAF50?style=for-the-badge)](https://juliasivridi.github.io/WaterPlant_PWA/)

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)
[![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)](https://juliasivridi.github.io/WaterPlant_PWA/)

A lightweight **Progressive Web App** for tracking your plant watering schedule. No backend, no account — everything lives in your browser.

**Live:** [juliasivridi.github.io/WaterPlant_PWA](https://juliasivridi.github.io/WaterPlant_PWA/)

---

## Features

- **7-day watering history** — each plant shows a row of day circles for the past week; tap any circle to toggle watered / not watered
- **Smart status colors** — circles are green (watered), orange (due today), red (overdue), or grey (not yet due), calculated automatically from each plant's frequency
- **Per-plant frequency** — set how often a plant needs water in days or weeks; the app computes the next watering date on the fly
- **Add / edit / delete** — a bottom-sheet modal lets you create new plants or update existing ones, with a confirmation step before deletion
- **Export / import** — download your data as a dated JSON file and restore it on any device
- **Offline-ready** — Service Worker caches all assets; the app works without internet after the first load
- **Installable** — add to home screen on Android and iOS, or install as a desktop app

---

## Tech Stack

| Layer | Technology |
|---|---|
| ⚛️ Framework | React 19 |
| ⚡ Build | Vite 6 + vite-plugin-pwa |
| 🎨 Styling | Plain CSS with Material Design 3 tokens |
| 🗄️ Storage | localStorage (JSON array) |
| 💾 Backup | JSON export / import |
| 🔔 Service Worker | Workbox (auto-generated via vite-plugin-pwa) |
| 🚀 Hosting | GitHub Pages (main branch → /docs folder) |

---

## Data Model

All data is stored in `localStorage` under the key `watering_plants` as a JSON array.

| Field | Type | Description |
|---|---|---|
| `id` | string | UUID |
| `name` | string | Plant name |
| `frequencyValue` | number | Watering interval (1–365) |
| `frequencyUnit` | `"days"` \| `"weeks"` | Unit for the interval |
| `wateredDates` | string[] | ISO dates when the plant was watered |
| `createdAt` | string | ISO date of creation |

---

## Local Development

```bash
git clone https://github.com/JuliaSivridi/WaterPlant_PWA.git
cd WaterPlant_PWA
npm install
npm run dev       # http://localhost:5173/WaterPlant_PWA/
```

### Deploy

```bash
npm run build     # builds to /docs
git add docs/
git commit -m "deploy"
git push
```

GitHub Pages serves from `main` → `/docs`.

---

## Install as Mobile / Desktop App

**Android:** Chrome prompts automatically, or use the browser menu → *Install app*

**iOS:** Safari → Share button → *Add to Home Screen*

**Desktop:** address bar → install icon (Chrome / Edge)
