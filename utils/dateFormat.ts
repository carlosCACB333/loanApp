export const dateFormat = (date: string) =>
  new Date(date).toLocaleString('es-PE', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
