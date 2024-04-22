export default   function secondsToTime(sec: number): string {
  let min: number | string = Math.floor(sec / 60);
  let hour: number | string = Math.floor(min / 60);
  min -= (hour * 60);
  if (hour < 9) {
    hour = '0' + hour;
  };
  if (min < 9) {
    min = '0' + min;
  };
  
  return `${hour}:${min}`;
};