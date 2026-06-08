import PlantRow from './PlantRow';

export default function PlantList({ plants, onNameClick, onDayToggle }) {
  if (plants.length === 0) {
    return (
      <div className="plant-list--empty">
        <span className="material-symbols-outlined empty-icon">yard</span>
        <p>Добавьте первое растение</p>
      </div>
    );
  }

  return (
    <div className="plant-list">
      {plants.map(plant => (
        <PlantRow
          key={plant.id}
          plant={plant}
          onNameClick={() => onNameClick(plant)}
          onDayToggle={(date) => onDayToggle(plant.id, date)}
        />
      ))}
    </div>
  );
}
