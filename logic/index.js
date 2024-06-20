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
const winSound = document.getElementById("winSound");
const winnerMessage = document.querySelector(".winner-message");

// Change Variables
let currentScore = 0,
  totalScore = 0,
  isPaused = true,
  dice,
  player1,
  player2,
  isRightPlayerTurn = false,
  rollTimeout;

// Change Names
 function changePlayerNames() {
  player1 = prompt("Change Player 1 name");
  player2 = prompt("Change Player 2 name");
  document.querySelector(".left h2").innerHTML = player1;
  document.querySelector(".right h2").innerHTML = player2;
};

// Change Cube
function changeCube() {
  diceBoxSpans.forEach(span => span.style.backgroundColor = "#fff");
  document.querySelectorAll(".center").forEach(center => center.style.display = "none");
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

// Function to handle rolling the dice
function rollDice() {
  rollSound.play();
  dice = Math.trunc(Math.random() * 6 + 1);
  diceBox.classList.toggle("rotate");
  return dice;
}
// Function to check for a winner
function checkWinner() {
  if (parseInt(leftTotal.textContent) >= 150) {
    winSound.play();
    winnerMessage.textContent = player1 + " Wins!";
    winnerMessage.style.display = "block";
    showConfetti();
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    return true;
  } else if (parseInt(rightTotal.textContent) >= 150) {
    winSound.play();
    winnerMessage.textContent = player2 + " Wins!";
    winnerMessage.style.display = "block";
    showConfetti();
    rollBtn.disabled = true;
    holdBtn.disabled = true;
    return true;
  }
  return false;
}

// Function to show confetti
function showConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDelay = Math.random() * 3 + "s";
    document.body.appendChild(confetti);
  }
}

// Function to handle left player's turn
function leftPlayerTurn() {
  let dice = rollDice();
  changeCube();

  if (dice !== 1) {
    currentScore += dice;
    totalScore = parseInt(leftCurrent.textContent) + currentScore;
    leftCurrent.textContent = totalScore - parseInt(leftCurrent.textContent);
  } else {
    diceBoxSpans.forEach(function (ele) {
      ele.style.backgroundColor = "#fff";
    });
    document.querySelector(".center").style.backgroundColor = "red";
    document.querySelector(".center").style.display = "block";
    leftTotal.textContent = parseInt(leftTotal.textContent) + currentScore;
    currentScore = 0;
    leftCurrent.textContent = "0";
    if (checkWinner()) return;

    left.classList.remove("active");
    left.classList.add("not-active");
    right.classList.add("active");
    right.classList.remove("not-active");

    rollTimeout = setTimeout(rightPlayerTurn, 1000);  // Delay before right player takes turn
  }
}

// Function to handle right player's turn
function rightPlayerTurn() {
  isRightPlayerTurn = true;
  rollBtn.disabled = true;

  let dice = rollDice();
  changeCube();

  if (dice !== 1) {
    currentScore += dice;
    totalScore = parseInt(rightCurrent.textContent) + currentScore;
    rightCurrent.textContent = totalScore - parseInt(rightCurrent.textContent);
    rollTimeout = setTimeout(rightPlayerTurn, 1000);  // Delay for continuous right player turn
  } else {
    diceBoxSpans.forEach(function (ele) {
      ele.style.backgroundColor = "#fff";
    });
    document.querySelector(".center").style.backgroundColor = "red";
    document.querySelector(".center").style.display = "block";
    rightTotal.textContent = parseInt(rightTotal.textContent) + currentScore;
    currentScore = 0;
    rightCurrent.textContent = "0";
    if (checkWinner()) return;

    right.classList.remove("active");
    right.classList.add("not-active");
    left.classList.add("active");
    left.classList.remove("not-active");

    rollBtn.disabled = false;
    isRightPlayerTurn = false;
  }
}

// Roll Event
rollBtn.addEventListener("click", function () {
  isPaused = true;
  updateIconVisibility();
  if (!isRightPlayerTurn) {
    leftPlayerTurn();
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
  totalScore=0;
  currentScore=0;
  leftTotal.textContent = "0";
  leftCurrent.textContent = "0";
  rightTotal.textContent = "0";
  rightCurrent.textContent = "0";
  right.classList.remove("active");
  left.classList.remove("active");
  right.classList.remove("not-active");
  left.classList.remove("not-active");

  diceBoxSpans.forEach(function (ele) {
    if (!ele.classList.contains("center")) {
      ele.style.backgroundColor = "red";
    } else {
      ele.style.backgroundColor = "#fff";
    }
  });
  isPaused = true;
  updateIconVisibility();
  rollBtn.disabled = false;
  isRightPlayerTurn = false;
  clearTimeout(rollTimeout); // Stop any ongoing dice rolls
  // Reset winner message
  winnerMessage.style.display = "none";

  // Remove confetti
  document.querySelectorAll(".confetti").forEach(confetti => confetti.remove());
  changePlayerNames();
});

// Ensure player names are updated after DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  changePlayerNames();
});