# TASKS.md — Plant Watering Tracker

**Версия:** 1.0  
**Дата:** 2026-06-08

---

## Этап 1 — Scaffold проекта

- [ ] 1.1 Создать проект: `npm create vite@latest watering-app -- --template react`
- [ ] 1.2 Установить зависимости: `vite-plugin-pwa`, `uuid`
- [ ] 1.3 Настроить `vite.config.js` — PWA плагин, base path для GitHub Pages
- [ ] 1.4 Создать `public/manifest.json`
- [ ] 1.5 Добавить иконки PWA (192×192, 512×512)
- [ ] 1.6 Убрать шаблонный код Vite, базовый `App.jsx`
- [ ] 1.7 Настроить глобальные CSS-переменные (цвета MD3, шрифты)
- [ ] 1.8 Добавить Material Icons Outlined (Google Fonts CDN)

---

## Этап 2 — Хук данных `usePlants`

- [ ] 2.1 Создать `src/hooks/usePlants.js`
- [ ] 2.2 Загрузка из localStorage при инициализации
- [ ] 2.3 Сохранение в localStorage при каждом изменении
- [ ] 2.4 `addPlant(name, frequencyValue, frequencyUnit)` → добавить с UUID и createdAt
- [ ] 2.5 `updatePlant(id, fields)` → обновить поля
- [ ] 2.6 `deletePlant(id)` → удалить по id
- [ ] 2.7 `toggleWatered(id, dateStr)` → добавить/убрать дату из wateredDates

---

## Этап 3 — Логика полива `wateringLogic.js`

- [ ] 3.1 Создать `src/utils/wateringLogic.js`
- [ ] 3.2 `getFrequencyDays(frequencyValue, frequencyUnit)` → число дней
- [ ] 3.3 `getLastWatered(wateredDates)` → последняя дата или null
- [ ] 3.4 `getNextWatering(plant)` → дата следующего полива или null
- [ ] 3.5 `getDayStatus(plant, dateStr)` → `"watered" | "ok" | "due" | "overdue"`
- [ ] 3.6 `getLast7Days()` → массив из 7 дат (от -6 до сегодня), ISO strings

---

## Этап 4 — Компонент `DayCircle`

- [ ] 4.1 Создать `src/components/DayCircle.jsx`
- [ ] 4.2 Пропсы: `date`, `status`, `onClick`
- [ ] 4.3 Отображение числа дня (число месяца)
- [ ] 4.4 Стили по статусу: серый / яркий / красный / акцентный
- [ ] 4.5 Hover и active состояния (touch-friendly, min 44px)

---

## Этап 5 — Компонент `PlantRow`

- [ ] 5.1 Создать `src/components/PlantRow.jsx`
- [ ] 5.2 Пропсы: `plant`, `onNameClick`, `onDayToggle`
- [ ] 5.3 Слева — название (кнопка → открыть редактирование)
- [ ] 5.4 Справа — 7 кружочков `DayCircle`
- [ ] 5.5 Вычисление статуса для каждого дня через `getDayStatus`
- [ ] 5.6 Адаптивность: название не переносится, кружочки не сжимаются

---

## Этап 6 — Компонент `PlantList`

- [ ] 6.1 Создать `src/components/PlantList.jsx`
- [ ] 6.2 Рендер списка `PlantRow`
- [ ] 6.3 Заглушка если список пуст («Добавьте первое растение»)
- [ ] 6.4 Скролл если строк больше чем помещается на экране

---

## Этап 7 — Компонент `PlantModal`

- [ ] 7.1 Создать `src/components/PlantModal.jsx`
- [ ] 7.2 Пропсы: `plant` (null = создание), `onSave`, `onDelete`, `onClose`
- [ ] 7.3 Поле: название растения
- [ ] 7.4 Поле: число периодичности
- [ ] 7.5 Поле: единица (дни / недели) — toggle или select
- [ ] 7.6 Кнопки: Сохранить, Отмена
- [ ] 7.7 Кнопка Удалить (только режим редактирования)
- [ ] 7.8 Диалог подтверждения удаления
- [ ] 7.9 Валидация: название не пустое, число > 0
- [ ] 7.10 Закрытие по клику на backdrop

---

## Этап 8 — Сборка `App.jsx`

- [ ] 8.1 Шапка: название приложения + кнопка меню (⋮)
- [ ] 8.2 Подключить `usePlants`, передать данные в `PlantList`
- [ ] 8.3 FAB кнопка [+] — открыть модалку создания
- [ ] 8.4 Передать `onNameClick` → открыть модалку редактирования
- [ ] 8.5 Передать `onDayToggle` → `toggleWatered`
- [ ] 8.6 Обработчики `onSave`, `onDelete`, `onClose` модалки

---

## Этап 9 — Экспорт / импорт

- [ ] 9.1 Создать `src/utils/backup.js`
- [ ] 9.2 `exportData(plants)` → скачать JSON файл с датой в имени
- [ ] 9.3 `importData(file)` → Promise, парсинг и валидация JSON
- [ ] 9.4 Меню (⋮) в шапке: пункты «Экспорт» и «Импорт»
- [ ] 9.5 Диалог подтверждения импорта («Текущие данные будут заменены»)

---

## Этап 10 — PWA и деплой

- [ ] 10.1 Проверить офлайн-работу (DevTools → Network → Offline)
- [ ] 10.2 Проверить installable (DevTools → Application → Manifest)
- [ ] 10.3 Проверить на реальном мобильном устройстве
- [ ] 10.4 Настроить GitHub Actions для деплоя на GitHub Pages
- [ ] 10.5 Настроить `base` в `vite.config.js` под имя репозитория
- [ ] 10.6 Финальная проверка после деплоя

---

## Этап 11 — Полировка UI

- [ ] 11.1 Анимация открытия/закрытия модалки
- [ ] 11.2 Плавные переходы при toggle кружочка
- [ ] 11.3 Проверка на iOS Safari (Add to Home Screen)
- [ ] 11.4 Проверка на Android Chrome
- [ ] 11.5 Обновить `docs/WORK_LOG.md`
