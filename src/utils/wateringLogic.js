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
  const date = new Date(last);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
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
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}
