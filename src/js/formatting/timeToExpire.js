export function timeRemaining(date) {
  const now = new Date();
  const endTime = new Date(date);

  const diffMs = endTime - now;

  if (diffMs <= 0) {
    return "Time's up!";
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
  const diffMinutes = Math.floor((diffMs / (1000 * 60)) % 60);

  if (diffDays > 1) {
    return `${diffDays} days`;
  } else if (diffDays === 1 || diffHours > 2) {
    return `${diffHours}h`;
  } else {
    return diffHours > 0
      ? `${diffHours}h ${diffMinutes}min`
      : `${diffMinutes}min`;
  }
}
