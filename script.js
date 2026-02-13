let workInput = document.getElementById("workTime");

let startBtn = document.getElementById("start");
let resetBtn = document.getElementById("reset");
let alarmSound = document.getElementById("alarmSound");

let time = 0;
let interval = null;
let isRunning = false;

function playSound() {
    alarmSound.currentTime = 0;
    alarmSound.play().catch(err => console.log(err));
}

function updateDisplay() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("session").textContent = `${minutes}:${seconds}`;
}

startBtn.addEventListener("click", function () {

    if (!isRunning) {

        playSound();

        if (time === 0) {
            time = workInput.value * 60;
        }

        updateDisplay();
        isRunning = true;
        startBtn.textContent = "⏸";

        interval = setInterval(() => {

            if (time > 0) {
                time--;
                updateDisplay();
            } else {
                clearInterval(interval);
                playSound();
                isRunning = false;
                startBtn.textContent = "▶︎";
                time = 0;
            }

        }, 1000);

    } else {
        clearInterval(interval);
        isRunning = false;
        startBtn.textContent = "▶︎";
    }
});

resetBtn.addEventListener("click", function () {

    clearInterval(interval);
    isRunning = false;

    time = workInput.value * 60;
    updateDisplay();

    startBtn.textContent = "▶︎";
});

// Initialize on load
time = workInput.value * 60;
updateDisplay();
