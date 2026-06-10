import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toLocalISODate } from '../utils/wateringLogic';

const STORAGE_KEY = 'waterplant-plants';

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
      createdAt: toLocalISODate(new Date()),
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

  // Merge imported backup into current data (plants already carry uuid ids):
  // matching ids are updated with watering histories united, new ones added,
  // local-only plants are kept. Nothing is silently lost.
  function mergePlants(imported) {
    setPlants(prev => {
      const byId = new Map(prev.map(p => [p.id, p]));
      for (const imp of imported) {
        const cur = byId.get(imp.id);
        if (cur) {
          byId.set(imp.id, {
            ...cur,
            ...imp,
            wateredDates: [...new Set([...(cur.wateredDates ?? []), ...(imp.wateredDates ?? [])])].sort(),
          });
        } else {
          byId.set(imp.id, imp);
        }
      }
      return [...byId.values()];
    });
  }

  return { plants, addPlant, updatePlant, deletePlant, toggleWatered, mergePlants };
}
