import { parseISO, format } from 'date-fns';

const getDateBr = (date: string): string => {
  const hour = parseISO(date);
  const hourBR = format(
    hour.setHours(hour.getHours() - 3),
    `dd'/'MM'/'yy 'às' HH:mm`
  );
  return hourBR;
};

export default getDateBr;
