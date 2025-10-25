"use strict";

let guess;
let min = 1;
let max = 100;
let iterations = 0;
let gameActive = false;

window.addEventListener("DOMContentLoaded", main);

function main() {
  document.querySelector("#btn_guess").addEventListener("click", startOrGuess);
  document.querySelector("#btn_high").addEventListener("click", tooHigh);
  document.querySelector("#btn_low").addEventListener("click", tooLow);
  document.querySelector("#btn_correct").addEventListener("click", correct);
  setControlsEnabled(false);
}

function setControlsEnabled(enabled) {
  document.querySelector("#btn_high").disabled = !enabled;
  document.querySelector("#btn_low").disabled = !enabled;
  document.querySelector("#btn_correct").disabled = !enabled;
}

function startOrGuess() {
  const btnStart = document.querySelector("#btn_guess");

  if (!gameActive) {
    min = 1;
    max = 100;
    iterations = 0;
    gameActive = true;

    document.querySelector("#guesses").innerHTML = "";
    document
      .querySelector("#guesses")
      .insertAdjacentHTML(
        "beforeend",
        `<li>Start! Think of a number between 1 and 100.</li>`
      );
    setControlsEnabled(true);
    btnStart.style.display = "none";
  }

  makeGuess();
}

function makeGuess() {
  if (min > max) {
    document
      .querySelector("#guesses")
      .insertAdjacentHTML(
        "beforeend",
        `<li> The range is invalid due to conflicting answers. Please restart.</li>`
      );
    endGame(false);
    return;
  }

  if (min === max) {
    guess = min;
    iterations++;
    document
      .querySelector("#guesses")
      .insertAdjacentHTML(
        "beforeend",
        `<li>Only one possible number left: ${guess}. I won't guess further.</li>`
      );
    document.querySelector("#btn_high").disabled = true;
    document.querySelector("#btn_low").disabled = true;
    return;
  }

  guess = Math.floor((min + max) / 2);
  iterations++;
  document
    .querySelector("#guesses")
    .insertAdjacentHTML("beforeend", `<li>My guess is ${guess}</li>`);
}

function tooHigh() {
  if (!gameActive) return;
  document
    .querySelector("#guesses")
    .insertAdjacentHTML("beforeend", `<li>${guess} was too high.</li>`);
  max = guess - 1;
  makeGuess();
}

function tooLow() {
  if (!gameActive) return;
  document
    .querySelector("#guesses")
    .insertAdjacentHTML("beforeend", `<li>${guess} was too low.</li>`);
  min = guess + 1;
  makeGuess();
}

function correct() {
  if (!gameActive) return;
  document
    .querySelector("#guesses")
    .insertAdjacentHTML("beforeend", `<li>${guess} was correct!</li>`);
  document
    .querySelector("#guesses")
    .insertAdjacentHTML(
      "beforeend",
      `<li>It took me ${iterations} guesses – ${ratingText(iterations)}</li>`
    );
  endGame(true);
}

function ratingText(number) {
  if (number <= 3) return "Fantastic!";
  if (number <= 5) return "Good!";
  if (number <= 7) return "Not bad!";
  return "Meh...";
}

function endGame() {
  gameActive = false;
  setControlsEnabled(false);
  const btnStart = document.querySelector("#btn_guess");
  btnStart.textContent = "Play again";
  btnStart.style.display = "inline-block";
}
