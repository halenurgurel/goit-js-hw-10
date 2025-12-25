import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector("button[data-start]");
const datetimePicker = document.querySelector("#datetime-picker");

const daysVal = document.querySelector("[data-days]");
const hoursVal = document.querySelector("[data-hours]");
const minutesVal = document.querySelector("[data-minutes]");
const secondsVal = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const now = new Date();

    if (selectedDate <= now) {
      startBtn.disabled = true;
      userSelectedDate = null;

      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      return;
    }

    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(datetimePicker, options);

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const msLeft = userSelectedDate - now;

    if (msLeft <= 0) {
      clearInterval(timerId);
      updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timeData = convertMs(msLeft);
    updateInterface(timeData);
  }, 1000);
});

function updateInterface({ days, hours, minutes, seconds }) {
  daysVal.textContent = addLeadingZero(days);
  hoursVal.textContent = addLeadingZero(hours);
  minutesVal.textContent = addLeadingZero(minutes);
  secondsVal.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
