# ARCHITECTURE.md — Plant Watering Tracker

**Версия:** 1.0  
**Дата:** 2026-06-08

---

## Файловая структура

```
watering-app/
├── public/
│   ├── manifest.json          # PWA манифест
│   └── icons/
│       ├── icon-192.png
│       └── icon-512.png
├── src/
│   ├── components/
│   │   ├── DayCircle.jsx      # Один кружочек-день
│   │   ├── PlantRow.jsx       # Строка растения (название + 7 кружочков)
│   │   ├── PlantList.jsx      # Список всех строк
│   │   └── PlantModal.jsx     # Модалка создания/редактирования
│   ├── hooks/
│   │   └── usePlants.js       # Всё состояние приложения + localStorage
│   ├── utils/
│   │   ├── wateringLogic.js   # Вычисление статусов полива
│   │   └── backup.js          # Экспорт/импорт JSON
│   ├── App.jsx                # Корень: шапка, FAB, оркестрация
│   ├── App.css                # Глобальные стили + CSS-переменные
│   └── main.jsx               # Точка входа
├── docs/
│   ├── TASKS.md
│   └── WORK_LOG.md
├── CLAUDE.md
├── PRD.md
├── ARCHITECTURE.md
└── vite.config.js
```

---

## Поток данных

```
localStorage
    ↕ (чтение/запись)
usePlants (хук)
    ↓ plants[], addPlant, updatePlant, deletePlant, toggleWatered
App.jsx
    ├── PlantList → PlantRow → DayCircle
    │       ↑ wateringLogic.js (getDayStatus, getLast7Days)
    └── PlantModal (создание / редактирование / удаление)
```

Единый источник правды — массив `plants` в хуке `usePlants`.  
Компоненты не хранят данные, только получают пропсы и вызывают колбэки.

---

## Модули

### `src/hooks/usePlants.js`

```js
// Возвращает:
{
  plants,          // Plant[]
  addPlant,        // (name, freqValue, freqUnit) => void
  updatePlant,     // (id, fields) => void
  deletePlant,     // (id) => void
  toggleWatered,   // (id, dateStr) => void
}
```

Внутри: `useState` + `useEffect` для синхронизации с localStorage.

---

### `src/utils/wateringLogic.js`

```js
getFrequencyDays(value, unit)        // → number (дней)
getLastWatered(wateredDates)         // → "YYYY-MM-DD" | null
getNextWatering(plant)               // → "YYYY-MM-DD" | null
getDayStatus(plant, dateStr)         // → "watered"|"ok"|"due"|"overdue"
getLast7Days()                       // → ["YYYY-MM-DD", ...] (7 штук)
```

Чистые функции, без сайд-эффектов. Легко тестировать.

---

### `src/utils/backup.js`

```js
exportData(plants)    // скачать watering-backup-YYYY-MM-DD.json
importData(file)      // → Promise<Plant[]>, бросает Error если невалидный
```

---

### `src/components/DayCircle.jsx`

```jsx
<DayCircle
  date="2026-06-08"        // ISO string
  status="due"             // "watered"|"ok"|"due"|"overdue"
  onClick={() => {}}       // toggle
/>
```

Отображает число месяца, стиль определяется через `status`.

---

### `src/components/PlantRow.jsx`

```jsx
<PlantRow
  plant={plant}
  onNameClick={() => openModal(plant)}
  onDayToggle={(dateStr) => toggleWatered(plant.id, dateStr)}
/>
```

Внутри вычисляет `getLast7Days()` и `getDayStatus()` для каждого дня.

---

### `src/components/PlantModal.jsx`

```jsx
<PlantModal
  plant={plant | null}     // null = режим создания
  onSave={(data) => {}}    // { name, frequencyValue, frequencyUnit }
  onDelete={() => {}}      // только редактирование
  onClose={() => {}}
/>
```

Управляет локальным состоянием формы. Валидация перед `onSave`.

---

## CSS-переменные (MD3-палитра)

```css
:root {
  --color-primary: #4CAF50;       /* акцент — полив сегодня */
  --color-watered: #81C784;       /* полито */
  --color-overdue: #E53935;       /* просрочено */
  --color-neutral: #9E9E9E;       /* не нужен полив */
  --color-surface: #FFFFFF;
  --color-on-surface: #1C1B1F;
  --color-surface-variant: #F5F5F5;
  --color-outline: #E0E0E0;
  --radius-circle: 50%;
  --radius-modal: 28px;
  --size-circle: 36px;
}
```

---

## PWA — `vite.config.js`

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/watering-app/',   // имя репозитория на GitHub
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Plant Watering Tracker',
        short_name: 'Watering',
        theme_color: '#4CAF50',
        background_color: '#FFFFFF',
        display: 'standalone',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ]
      }
    })
  ]
})
```

---

## GitHub Actions — деплой

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```
