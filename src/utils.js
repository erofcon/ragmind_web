export function formatDate(dateString) {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(dateString));
}
