export function getWeeklyTrend(trips) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekly = days.map((day) => ({ day, emissions: 0 }));

  trips.forEach((trip) => {
    if (!trip.createdAt || !trip.carbonEmitted) return;

    const date = new Date(trip.createdAt);
    let weekday = date.getDay(); // 0 = Sunday → shift it

    // Convert JS format (Sun=0) → Our format (Mon=0)
    weekday = weekday === 0 ? 6 : weekday - 1;

    weekly[weekday].emissions += trip.carbonEmitted;
  });

  return weekly;
}
