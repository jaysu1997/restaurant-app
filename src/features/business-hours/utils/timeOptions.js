export function generateTimeOptions() {
  const options = [];

  for (let totalMinutes = 0; totalMinutes <= 1440; totalMinutes += 5) {
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;
    const label = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;

    options.push({ value: totalMinutes, label });
  }

  return options;
}
