export function validateName(string: string): boolean {
  return !/[\d\s]/.test(string);
};

export function validateDate(string: string): boolean {
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(string)) {
    const arrDate = string.split('.');
    const dateNow = new Date().getTime();
    const dateString = new Date(`${arrDate[2]}/${arrDate[1]}/${arrDate[0]}`).getTime();
    return dateNow > dateString;
  };
  return false;
};

export function validatePassportSeries(string: string): boolean {
  return /^\d{4}$/.test(string);
};

export function validatePassportNumber(string: string): boolean {
  return /^\d{6}$/.test(string);
};

export function validateBirthNumber(string: string): boolean {
  return /^[v,i,x,m]{1,4}[а-я]{1,2}\d{6}$/.test(string);
};

export function validatePhoneNumber(number: string): string {
  const numberWithoutSpace = number.replace(/\s/g, "");
  const joinNum = (splitNum: string[]): string => {
    splitNum[1] = splitNum[1] + " ";
    splitNum[4] = splitNum[4] + " ";
    splitNum[7] = splitNum[7] + " ";
    splitNum[9] = splitNum[9] + " ";
    return splitNum.join("");
  };
  
  if (numberWithoutSpace.length === 11 && /\d/g.test(numberWithoutSpace) && /^(8|7)/.test(numberWithoutSpace)) {
    const num = numberWithoutSpace.replace(/^(8|7)/, "+7");
    return joinNum(num.split(""));
  };

  if (numberWithoutSpace.length === 12 && /^\+\d{11}/.test(numberWithoutSpace)) {
    return joinNum(numberWithoutSpace.split(""));
  };

  return '';
};

export function validateEmail(string: string): boolean {
  return /@/.test(string) && /\.[a-z]{2,3}$/.test(string);
};

export function upperCaseBirthNumber(string: string): string {
  const upperString = string.toUpperCase();
  const splitString = upperString.split('');
  for (let i = 0; i < splitString.length; i += 1) {
    if (/[А-Я]/.test(splitString[i])) {
      splitString[i - 1] += ' ';
      break;
    };
  };

  for (let i = 0; i < splitString.length; i += 1) {
    if (/\d/.test(splitString[i])) {
      splitString[i - 1] += ' ';
      break;
    };
  };

  return splitString.join('');
};

export function validateCalendarDate(string: string): boolean {
  return /^\d{2}\.\d{2}\.\d{4}$/.test(string);
};