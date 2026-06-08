import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'watering_plants';

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function usePlants() {
  const [plants, setPlants] = useState(load);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plants));
  }, [plants]);

  function addPlant(name, frequencyValue, frequencyUnit) {
    setPlants(prev => [...prev, {
      id: uuidv4(),
      name,
      frequencyValue: Number(frequencyValue),
      frequencyUnit,
      wateredDates: [],
      createdAt: new Date().toISOString().slice(0, 10),
    }]);
  }

  function updatePlant(id, fields) {
    setPlants(prev => prev.map(p => p.id === id ? { ...p, ...fields } : p));
  }

  function deletePlant(id) {
    setPlants(prev => prev.filter(p => p.id !== id));
  }

  function toggleWatered(id, dateStr) {
    setPlants(prev => prev.map(p => {
      if (p.id !== id) return p;
      const has = p.wateredDates.includes(dateStr);
      return {
        ...p,
        wateredDates: has
          ? p.wateredDates.filter(d => d !== dateStr)
          : [...p.wateredDates, dateStr],
      };
    }));
  }

  function replacePlants(data) {
    setPlants(data);
  }

  return { plants, addPlant, updatePlant, deletePlant, toggleWatered, replacePlants };
}
