export const formattedDate = (date) =>
  new Date(date).toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
