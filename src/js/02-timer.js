import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const refs = {
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
const input = document.querySelector('input');
const startBtn = document.querySelector('button');
// };

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(input, options);
let timerId;

startBtn.addEventListener('click', () => {
  timerId = setInterval(timer, 1000);
  startBtn.disabled = true;
});

startBtn.addEventListener('mouseover', () => {
  veryfyDate();
});

input.addEventListener('input', () => {
  veryfyDate();
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  console.log(ms - 1000 <= 0);

  if (ms - 1000 <= 0) {
    clearInterval(timerId);
    startBtn.disabled = false;
  }
}

function timer() {
  const today = Date.now();
  const deadLine = new Date(fp.selectedDates);
  const ms = deadLine - today;
  convertMs(ms);
}

function veryfyDate() {
  if (new Date(fp.selectedDates) <= Date.now()) {
    Notify.failure('Please choose a date in the futur');
    startBtn.disabled = true;
  } else {
    Notify.success('Good choice');
    startBtn.disabled = false;
  }
}
