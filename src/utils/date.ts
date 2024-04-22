import { Day, Weeks } from "../types/types";

// function getCurrentDate(date: string): CurrentDate {
//   const currentDate = new Date();
//   const result: CurrentDate = {
//     numDate: currentDate.getDate(),
//     year: currentDate.getFullYear(),
//     month: new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(),
//     numberMonth: currentDate.getMonth(),
//     choiceDate: (year, month, day) => new Intl.DateTimeFormat("ru").format(new Date(year, month, day)),
//     nameMonth: (year, month) => new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(new Date(year, month))
//   };

//   if (date) {
//     const splitDate = date.split('.');
//     const dateForMonth = new Date(Number(splitDate[2]), Number(splitDate[1]) - 1, Number(splitDate[0]));
//     result.numDate = +splitDate[0];
//     result.year = +splitDate[2];
//     result.month = new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(new Date(dateForMonth));
//     result.numberMonth = Number(splitDate[1]) - 1;
//   };

//   return result;
// };

type CurrentDate = {
  numDate: number;
  year: number;
  month: string;
  numberMonth: number;
  choiceDate: (year: number, month: number, day: number) => string;
  nameMonth: (year: number, month: number) => string;
};

function getCurrentDate(date: string): CurrentDate {
  const currentDate = new Date();

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('ru-RU', { month: 'long' }).format(date);
  };

  const result: CurrentDate = {
    numDate: currentDate.getDate(),
    year: currentDate.getFullYear(),
    month: formatDate(currentDate),
    numberMonth: currentDate.getMonth(),
    choiceDate: (year, month, day) => new Intl.DateTimeFormat("ru").format(new Date(year, month, day)),
    nameMonth: (year, month) => formatDate(new Date(year, month))
  };

  if (date) {
    const splitDate = date.split('.');
    const dateForMonth = new Date(Number(splitDate[2]), Number(splitDate[1]) - 1, Number(splitDate[0]));
    result.numDate = +splitDate[0];
    result.year = +splitDate[2];
    result.month = formatDate(dateForMonth);
    result.numberMonth = Number(splitDate[1]) - 1;
  }

  return result;
}


function dayOfMonth(year: number, month: number): number[] {
  const date = new Date(year, month, 0);
  const numDate = date.getDate();
  const arrDay = [];

  for (let i = 1; i <= numDate; i++) {
    arrDay.push(i);
  };

  return arrDay;
};

function monthInWeeks(numberMonth: number): Weeks {
  let numMonth = null;

  if (numberMonth === undefined) {
    numMonth = new Date().getMonth();
  } else {
    numMonth = numberMonth + 1;
  };

  const year = new Date().getFullYear();
  const arrCurDays = dayOfMonth(year, numMonth);
  const arrPrevDays = new Date(year, numMonth - 1, 0).getDate();
  const weekDay = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const weeks: Weeks = {
    first: [],
    second: [],
    third: [],
    fourth: [],
    fifth: [],
    sixth: []
  };

  for (let i = 0; i < arrCurDays.length; i++) {
    const firstDayMonth = new Date(year, numberMonth, arrCurDays[i]);
    const firstDayMonthOfWeek = new Intl.DateTimeFormat("ru-RU", {
      weekday: "short"
    }).format(firstDayMonth);

    const day: Day = {
      numDay: arrCurDays[i],
      curDay: 'this'
    };

    if (weeks.first.length < 7) {
      weekDay.forEach((e, index) => {
        if (firstDayMonthOfWeek === e) {
          weeks.first[index] = day;
        }
      });
    } else if (weeks.second.length < 7) {
      weekDay.forEach((e, index) => {
        if (firstDayMonthOfWeek === e) {
          weeks.second[index] = day;
        }
      });
    } else if (weeks.third.length < 7) {
      weekDay.forEach((e, index) => {
        if (firstDayMonthOfWeek === e) {
          weeks.third[index] = day;
        }
      });
    } else if (weeks.fourth.length < 7) {
      weekDay.forEach((e, index) => {
        if (firstDayMonthOfWeek === e) {
          weeks.fourth[index] = day;
        }
      });
    } else if (weeks.fifth.length < 7) {
      weekDay.forEach((e, index) => {
        if (firstDayMonthOfWeek === e) {
          weeks.fifth[index] = day;
        }
      });
    } else if (weeks.sixth.length < 7) {
      weekDay.forEach((e, index) => {
        if (firstDayMonthOfWeek === e) {
          weeks.sixth[index] = day;
        }
      });
    };
  };

  let prevDay = arrPrevDays;
  for (let i = 6; i >= 0; i -= 1) {
    if (!weeks.first[i]) {
      const day = {
        numDay: prevDay,
        curDay: 'prev'
      };
      weeks.first[i] = day;
      prevDay -= 1;
    };
  }

  let count = 0;
  for (let i = 0; i < 7; i++) {
    if (!weeks.fifth[i]) {
      count += 1;
      const day = {
        numDay: count,
        curDay: 'next'
      };
      weeks.fifth[i] = day;
    };
  };

  for (let i = 0; i < 7; i++) {
    if (!weeks.sixth[i]) {
      count += 1;
      const day = {
        numDay: count,
        curDay: 'next'
      };
      weeks.sixth[i] = day;
    };
  };

  return weeks;
};

function convertDate(date: string) {
  const newDate = date.split('.').reverse().join('-')
  return newDate
}

export { getCurrentDate, monthInWeeks, convertDate };
