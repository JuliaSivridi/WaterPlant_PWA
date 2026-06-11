# CLAUDE.md — AI Development Workflow

## Project
**Plant Watering Tracker** — PWA для отслеживания полива растений.  
Хостинг: GitHub Pages. Без бэкенда, без БД.

## Stack
- React + Vite
- vite-plugin-pwa (Service Worker, manifest)
- localStorage (данные)
- JSON export/import (резервные копии)
- Material Design 3, Material Icons Outlined
- Mobile-first

## Workflow

### Процесс разработки
1. **Спецификация** → docs/PRD.md (требования, экраны, логика)
2. **Архитектура** → docs/Architecture.md (структура файлов, компоненты, хуки)
3. **Задачи** → docs/TASKS.md (разбивка на этапы)
4. **Реализация** → по задачам, поэтапно
5. **UI-ревью** → проверка на мобильном
6. **Документация** → docs/WORK_LOG.md

### Правила
- Каждый этап согласовывается перед следующим
- Не начинать реализацию без утверждённой архитектуры
- TASKS.md обновляется по мере выполнения (- [ ] → - [x])
- Изменения в требованиях → сначала обновить PRD.md

## Компоненты — договорённости
- Функциональные компоненты + хуки
- Без TDD
- Стиль: Material Design 3
- Иконки: Material Icons Outlined (через Google Fonts или npm)

## Данные
```
localStorage key: "watering_plants"
Формат: JSON-массив Plant[]
```

## Деплой
GitHub Actions (`.github/workflows/deploy.yml`): сборка в `dist/` и публикация
через `actions/deploy-pages` при пуше в main. Сборка в git не коммитится;
`docs/` — только документация (Pages source: GitHub Actions).

## Файловая структура (целевая)
```
watering-app/
├── public/
│   ├── manifest.json
│   └── icons/
├── src/
│   ├── components/
│   │   ├── PlantList.jsx
│   │   ├── PlantRow.jsx
│   │   ├── DayCircle.jsx
│   │   └── PlantModal.jsx
│   ├── hooks/
│   │   └── usePlants.js
│   ├── utils/
│   │   └── wateringLogic.js
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   ├── ARCHITECTURE.md
│   ├── PRD.md
│   ├── TASKS.md
│   └── tech-spec.md
└── CLAUDE.md
```
