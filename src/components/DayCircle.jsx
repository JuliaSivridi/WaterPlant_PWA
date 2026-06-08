export default function DayCircle({ date, status, onClick }) {
  const day = Number(date.slice(8, 10));
  return (
    <button
      className={`day-circle day-circle--${status}`}
      onClick={onClick}
      aria-label={`${date} — ${status}`}
    >
      {day}
    </button>
  );
}
