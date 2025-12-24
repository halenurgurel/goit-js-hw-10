//flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

//iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

//1. picking DOM elements
const startBtn = document.querySelector("button[data-start]");
const datetimePicker = document.querySelector("#datetime-picker");

const daysVal = document.querySelector("[data-days]");
const hoursVal = document.querySelector("[data-hours]");
const minutesVal = document.querySelector("[data-minutes]");
const secondsVal = document.querySelector("[data-seconds]");

//2. defining variables
let userSelectedDate = null; //there will be a variable here but it is not decided yet.
let timerId = null;

//disabling start button
startBtn.disabled = true;

//3. Flatpickr settings
const options = {
  enableTime: true, //enables time picker
  time_24hr: true, //displays time picker iin 24 hour mode
  defaultDate: new Date(), //sets the initial selected date
  minuteIncrement: 1, //adjusts the step for the minute input
  onClose(selectedDates) {
    //functions to trigger on every time the calendar is closed
    const selectedDate = selectedDates[0]; //array of the dates that selected
    //picking the current datetime
    const now = new Date();

    if (selectedDate <= now) {
      startBtn.disabled = true;
      userSelectedDate = null; //resetting the selectedDate variable
      //selecting past datetime error

      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
      });
      return;
    }
    //selecting valid datetime
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
  },
};

flatpickr(datetimePicker, options);

//clicking Start button -> Event Listener
startBtn.addEventListener("click", () => {
  //disabling buttons at the beginning
  startBtn.disabled = true;
  datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const now = new Date();
    const msLeft = userSelectedDate - now;

    //Timer stops when reached 0
    if (msLeft <= 0) {
      clearInterval(timerId);
      updateInterface({ days: 0, hours: 0, minutes: 0, seconds: 0 });

      return;
    }

    //calculating remaining time
    const timeData = convertMs(msLeft);
    updateInterface(timeData);
  }, 1000);
});

//updating interface function
function updateInterface({ days, hours, minutes, seconds }) {
  daysVal.textContent = addLeadingZero(days);
  hoursVal.textContent = addLeadingZero(hours);
  minutesVal.textContent = addLeadingZero(minutes);
  secondsVal.textContent = addLeadingZero(seconds);
}

//adding 0 to the beginning of a number
function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
