import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startButton = document.querySelector('[data-start]');
startButton.disabled = true;

let targetDate;

const options = {
  enableTime: true, time_24hr: true, defaultDate: new Date(), minuteIncrement: 1, onClose(selectedDates) {
    const currentDate = new Date();
    targetDate = selectedDates[0];

    if (!targetDate || targetDate <= currentDate) {
      iziToast.error({
        title: 'Error', message: 'Please select a future date and time',
      });
      return;
    }

    startButton.disabled = false;

    console.log(selectedDates[0]);
  },
};

const dateInput = document.querySelector('#datetime-picker');
flatpickr(dateInput, options);

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

let countdownInterval;

startButton.addEventListener('click', () => {
  const currentDate = new Date();

  if (!targetDate || targetDate <= currentDate) {
    iziToast.error({
      title: 'Error', message: 'Please select a future date and time',
    });

    startButton.disabled = true;

    return;
  }

  updateCountdown(targetDate);

  clearInterval(countdownInterval);

  countdownInterval = setInterval(() => {
    updateCountdown(targetDate);
  }, 1000);

  startButton.disabled = true;
  dateInput.disabled = true;
});

function updateCountdown(targetDate) {
  const now = new Date();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);

    dateInput.disabled = false;

    return;
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  daysSpan.textContent = String(days).padStart(2, '0');
  hoursSpan.textContent = String(hours).padStart(2, '0');
  minutesSpan.textContent = String(minutes).padStart(2, '0');
  secondsSpan.textContent = String(seconds).padStart(2, '0');
}
