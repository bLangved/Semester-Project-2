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

export function timeSinceDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  const days = Math.floor(diffInSeconds / (3600 * 24));
  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  if (days >= 1) {
    return `${days} days ago`;
  } else if (hours >= 2) {
    return `${hours}h ago`;
  } else if (hours < 2 && hours >= 1) {
    return `${hours}h ${minutes}min ago`;
  } else if (hours < 1 && minutes >= 1) {
    return `${minutes}min ago`;
  } else {
    return `Just now`;
  }
}
