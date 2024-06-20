"use strict";
// Variables
const resetBtn = document.querySelector(".reset");
const rollBtn = document.querySelector(".roll");
const holdBtn = document.querySelector(".hold");
const pauseIcon = document.querySelector(".pause");
const playIcon = document.querySelector(".play");
const left = document.querySelector(".left");
const leftTotal = document.querySelector(".left .total");
const leftCurrent = document.querySelector(".left .current span");
const right = document.querySelector(".right");
const rightTotal = document.querySelector(".right .total");
const rightCurrent = document.querySelector(".right .current span");
const diceBox = document.querySelector(".box");
const diceBoxSpans = document.querySelectorAll(".box span");
const rollSound = document.getElementById("rollSound");

// Change Variables
let currentScore = 0,
  totalScore = 0,
  isPaused = true,
  dice,
  player1,
  player2;

// Change Names
// (function () {
//   player1 = prompt("Change Player 1 name");
//   player2 = prompt("Change Player 2 name");
//   document.querySelector(".left h2").innerHTML = player1;
//   document.querySelector(".right h2").innerHTML = player2;
// })();

// Change Cube
function changeCube() {
  switch (dice) {
    case 2:
      document.querySelector(".one").style.backgroundColor = "red";
      document.querySelector(".six").style.backgroundColor = "red";
      break;
    case 3:
      document.querySelector(".one").style.backgroundColor = "red";
      document.querySelector(".center").style.backgroundColor = "red";
      document.querySelector(".center").style.display = "block";
      document.querySelector(".six").style.backgroundColor = "red";
      break;
    case 4:
      document.querySelector(".one").style.backgroundColor = "red";
      document.querySelector(".three").style.backgroundColor = "red";
      document.querySelector(".four").style.backgroundColor = "red";
      document.querySelector(".six").style.backgroundColor = "red";
      break;
    case 5:
      document.querySelector(".one").style.backgroundColor = "red";
      document.querySelector(".three").style.backgroundColor = "red";
      document.querySelector(".center").style.backgroundColor = "red";
      document.querySelector(".center").style.display = "block";
      document.querySelector(".four").style.backgroundColor = "red";
      document.querySelector(".six").style.backgroundColor = "red";
      break;
    default:
      document.querySelector(".one").style.backgroundColor = "red";
      document.querySelector(".two").style.backgroundColor = "red";
      document.querySelector(".three").style.backgroundColor = "red";
      document.querySelector(".center").style.display = "none";
      document.querySelector(".four").style.backgroundColor = "red";
      document.querySelector(".five").style.backgroundColor = "red";
      document.querySelector(".six").style.backgroundColor = "red";
      break;
  }
}

// Change Icon Hold
function updateIconVisibility() {
  if (isPaused) {
    pauseIcon.style.display = "block";
    playIcon.style.display = "none";
  } else {
    pauseIcon.style.display = "none";
    playIcon.style.display = "block";
  }
}

updateIconVisibility();

// Roll Event
rollBtn.addEventListener("click", function () {
  rollSound.play();
  dice = Math.trunc(Math.random() * 6 + 1);
  diceBox.classList.toggle("rotate");
  isPaused = true;
  updateIconVisibility();
  diceBoxSpans.forEach(function (ele) {
    ele.style.backgroundColor = "#fff";
  });
  left.classList.add("active");
  left.classList.remove("not-active");
  right.classList.add("not-active");
  right.classList.remove("active");
  if (dice !== 1) {
    changeCube();
    currentScore += dice;
    totalScore = parseInt(leftCurrent.textContent) + currentScore;
    leftCurrent.textContent = totalScore - parseInt(leftCurrent.textContent);
  } else {
    document.querySelector(".center").style.backgroundColor = "red";
    document.querySelector(".center").style.display = "block";
    if (parseInt(leftTotal.textContent) !== 0) {
      leftTotal.textContent =
        parseInt(leftTotal.textContent) + dice + currentScore;
    } else {
      leftTotal.textContent = dice + currentScore;
    }
    currentScore = 0;
    leftCurrent.textContent = "0";

    left.classList.remove("active");
    left.classList.add("not-active");
    right.classList.add("active");
    right.classList.remove("not-active");
  }
});

// Hold Event
holdBtn.addEventListener("click", function () {
  if (isPaused) {
    totalScore = parseInt(leftTotal.textContent) + currentScore;
    leftTotal.textContent = totalScore;
    currentScore = 0;
    leftCurrent.textContent = "0";
    isPaused = !isPaused;
    updateIconVisibility();
  }
});

// Reset Game
resetBtn.addEventListener("click", function () {
  leftTotal.textContent = "0";
  leftCurrent.textContent = "0";
  rightTotal.textContent = "0";
  rightCurrent.textContent = "0";
  diceBoxSpans.forEach(function (ele) {
    if (!ele.classList.contains("center")) {
      ele.style.backgroundColor = "red";
    } else {
      ele.style.backgroundColor = "#fff";
    }
  });
  isPaused = true;
  updateIconVisibility();
});
