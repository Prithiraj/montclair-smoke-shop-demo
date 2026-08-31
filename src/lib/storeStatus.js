import { dayOrder } from '../data/store.js';

const dayLabels = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export function timeToMinutes(value) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatClock(value) {
  const [hours, minutes] = value.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, '0')} ${period}`;
}

function zonedNow(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts.filter((part) => part.type !== 'literal').map((part) => [part.type, part.value]),
  );

  return {
    day: values.weekday.toLowerCase(),
    minutes: Number(values.hour) * 60 + Number(values.minute),
  };
}

export function getStoreStatus(store, date = new Date()) {
  const current = zonedNow(date, store.timeZone);
  const today = store.hours[current.day];

  if (!today) {
    return {
      isOpen: false,
      label: 'Schedule unavailable',
      detail: 'Call to confirm today’s hours',
      day: current.day,
    };
  }

  const opensAt = timeToMinutes(today.open);
  const closesAt = timeToMinutes(today.close);

  if (current.minutes >= opensAt && current.minutes < closesAt) {
    return {
      isOpen: true,
      label: 'Open now',
      detail: `Closes at ${formatClock(today.close)}`,
      day: current.day,
      remainingMinutes: closesAt - current.minutes,
    };
  }

  if (current.minutes < opensAt) {
    return {
      isOpen: false,
      label: 'Closed',
      detail: `Opens today at ${formatClock(today.open)}`,
      day: current.day,
    };
  }

  const currentIndex = dayOrder.indexOf(current.day);
  for (let offset = 1; offset <= 7; offset += 1) {
    const nextDay = dayOrder[(currentIndex + offset) % dayOrder.length];
    const schedule = store.hours[nextDay];
    if (schedule) {
      const prefix = offset === 1 ? 'tomorrow' : dayLabels[nextDay];
      return {
        isOpen: false,
        label: 'Closed',
        detail: `Opens ${prefix} at ${formatClock(schedule.open)}`,
        day: current.day,
      };
    }
  }

  return {
    isOpen: false,
    label: 'Closed',
    detail: 'Call to confirm hours',
    day: current.day,
  };
}

export function getHoursRows(store) {
  return dayOrder.map((day) => ({
    day,
    label: dayLabels[day],
    open: formatClock(store.hours[day].open),
    close: formatClock(store.hours[day].close),
  }));
}
