function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

let interval;

const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

stopButton.disabled = true;

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;

  interval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(interval);

  startButton.disabled = false;
  stopButton.disabled = true;
});
