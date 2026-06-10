// Format a Date as YYYY-MM-DD in the device's local timezone.
// toISOString() would give the UTC date, which in Finland (UTC+2/+3) points
// to "yesterday" until 2-3 a.m. local time.
export function toLocalISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function getFrequencyDays(frequencyValue, frequencyUnit) {
  return frequencyUnit === 'weeks' ? frequencyValue * 7 : frequencyValue;
}

export function getLastWatered(wateredDates) {
  if (!wateredDates || wateredDates.length === 0) return null;
  return wateredDates.slice().sort().at(-1);
}

export function getNextWatering(plant) {
  const last = getLastWatered(plant.wateredDates);
  if (!last) return null;
  const days = getFrequencyDays(plant.frequencyValue, plant.frequencyUnit);
  const [y, m, d] = last.split('-').map(Number);
  const date = new Date(y, m - 1, d + days); // local-time arithmetic, no UTC parsing
  return toLocalISODate(date);
}

export function getDayStatus(plant, dateStr) {
  if (plant.wateredDates && plant.wateredDates.includes(dateStr)) return 'watered';
  const next = getNextWatering(plant);
  if (!next) return 'due';
  if (dateStr < next) return 'ok';
  if (dateStr === next) return 'due';
  return 'overdue';
}

export function getLast7Days() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(toLocalISODate(d));
  }
  return days;
}
