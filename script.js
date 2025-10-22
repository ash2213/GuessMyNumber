"use strict";

let guess;

window.addEventListener("DOMContentLoaded", main);

function main() {
  document.querySelector("#btn_guess").addEventListener("click", makeGuess);
  document.querySelector("#btn_high").addEventListener("click", tooHigh);
  document.querySelector("#btn_low").addEventListener("click", tooLow);
  document.querySelector("#btn_correct").addEventListener("click", correct);
}

function makeGuess() {
  guess = Math.floor(Math.random() * 100 + 1);
  document.querySelector("#guesses").insertAdjacentHTML("beforeend", `<li>My guess is ${guess}</li>`);
  document.querySelector("#btn_guess").style.display = "none";
}

function tooHigh() {
  document.querySelector("#guesses").insertAdjacentHTML("beforeend", `<li>${guess} was too high</li>`);
  makeGuess();
}

function tooLow() {
  document.querySelector("#guesses").insertAdjacentHTML("beforeend", `<li>${guess} was too low</li>`);
  makeGuess();
}

function correct() {
  document
    .querySelector("#guesses")
    .insertAdjacentHTML("beforeend", `<li>${guess} was correct!</li>`);
}