import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
} from 'date-fns';

const timeAgo = (createdAt) => {
  const now = new Date();
  const createdDate = new Date(createdAt);

  const minutesDiff = differenceInMinutes(now, createdDate);
  const hoursDiff = differenceInHours(now, createdDate);
  const daysDiff = differenceInDays(now, createdDate);
  const monthsDiff = differenceInMonths(now, createdDate);
  const yearsDiff = differenceInYears(now, createdDate);

  if (minutesDiff < 1) {
    return 'Just Now';
  } else if (minutesDiff < 60) {
    return `${minutesDiff} ${minutesDiff === 1 ? 'minute' : 'minutes'} ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff === 1 ? 'hour' : 'hours'} ago`;
  } else if (daysDiff <= 30) {
    return `${daysDiff} ${daysDiff === 1 ? 'day' : 'days'} ago`;
  } else if (monthsDiff < 12) {
    return `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${yearsDiff} ${yearsDiff === 1 ? 'year' : 'years'} ago`;
  }
};

export default timeAgo;
