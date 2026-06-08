import DayCircle from './DayCircle';
import { getLast7Days, getDayStatus } from '../utils/wateringLogic';

export default function PlantRow({ plant, onNameClick, onDayToggle }) {
  const days = getLast7Days();

  return (
    <div className="plant-row">
      <button className="plant-name" onClick={onNameClick}>
        {plant.name}
      </button>
      <div className="plant-days">
        {days.map(date => (
          <DayCircle
            key={date}
            date={date}
            status={getDayStatus(plant, date)}
            onClick={() => onDayToggle(date)}
          />
        ))}
      </div>
    </div>
  );
}
