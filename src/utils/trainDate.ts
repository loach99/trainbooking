export function duration(time: number | undefined): string {
  if (time) {
    const mins = Math.floor(time / 60);
    const hours = Math.floor(mins / 60);
    const min = mins - (hours * 60);
    return `${hours}:${min < 10 ? '0' + min : min}`;
  };
  return '';
};

export function dateFromAndTo(time: number | undefined): string {
  if (time) {
    return new Date(time * 1000).toLocaleTimeString('ru', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  return '';
};

export function timeForSort(time: number): number {
  const date = new Date(time * 1000);
  return (date.getMinutes() + date.getHours() * 60) * 60;
};

export function toDate(time: number | undefined): string {
  if (time) {
    return new Date(time * 1000).toLocaleDateString();
  }
  return '';
};

export function dateForComparison(date: string): number {
  const splitDate = date.split(".");
  const resultDate = new Date(Number(splitDate[2]), Number(splitDate[1]) - 1, Number(splitDate[0])).setDate(Number(splitDate[0]));
  return resultDate / 1000;
};
