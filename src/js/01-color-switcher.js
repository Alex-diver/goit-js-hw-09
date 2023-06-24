const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let intervalid;

function startColorSwitching() {
  startBtn.disabled = true;
  stopBtn.disabled = false;

  intervalid = setInterval(function () {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function stopColorSwitchihg() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalid);
}

startBtn.addEventListener('click', startColorSwitching);
stopBtn.addEventListener('click', stopColorSwitchihg);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
