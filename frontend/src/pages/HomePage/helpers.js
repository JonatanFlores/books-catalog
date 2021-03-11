export function toDate(period) {
  const [monthName, , yearStr] = period.trim().toLowerCase().split(' ');
  const months = {
    janeiro: 0,
    fevereiro: 1,
    março: 2,
    abril: 3,
    maio: 4,
    junho: 5,
    julho: 6,
    agosto: 7,
    setembro: 8,
    outubro: 9,
    novembro: 10,
    dezembro: 11,
  };
  const month = months[monthName];
  const year = parseInt(yearStr, 10);
  return new Date(year, month);
}

export function compare(a, b, dir = 'asc') {
  if (dir.toLowerCase() === 'desc') {
    return a < b ? 1 : b < a ? -1 : 0;
  }
  return a > b ? 1 : b > a ? -1 : 0;
}

export function sortBooksByEdition(books) {
  return books.sort((a, b) =>
    compare(toDate(a.edition), toDate(b.edition), 'desc')
  );
}
