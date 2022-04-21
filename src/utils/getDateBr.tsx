import { parseISO, format } from 'date-fns';

export const getDateWithoutHoursBr = (date: string): string => {
  const hour = parseISO(date);
  const hourBR = format(hour.setHours(hour.getHours()), `dd'/'MM'/'yy`);
  return hourBR;
};

const getDateBr = (date: string | Date, gmt = -3): string => {
  let hour;
  if (typeof date === 'string') {
    hour = parseISO(date);
  } else {
    hour = date;
  }
  const hourBR = format(
    hour.setHours(hour.getHours() + gmt),
    `dd'/'MM'/'yy 'às' HH:mm`
  );
  return hourBR;
};

export default getDateBr;
