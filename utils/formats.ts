export const dateFormat = (date: string) =>
  new Date(date).toLocaleString('es-PE', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

export const currency = function (num: number) {
  return num.toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN',
  });
};
