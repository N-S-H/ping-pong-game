import "./styles.css";
import { getHighScoreItem, setHighScoreItem } from "./LocalStorageHandler";
import {
  manageRodLeftPosition,
  manageRodRightPosition,
  resetRodLocation
} from "./RodMover";
import {
  resetCurrentLeftAndTop,
  setBallLocation,
  moveTheBall
} from "./BallDirectionHandler";
import { getScore, resetScore } from "./scoreManager";

var rod1 = document.getElementById("rod1");
var rod2 = document.getElementById("rod2");
var ball = document.getElementById("ball");
let playStart = false;
let moveTheBallId;
let initialMessage = "Hello, Welcome to ping pong";
let playStartMessage = "Press 'Enter' to start the game";

document.onload = performOnLoadTasks();

document.addEventListener("keydown", actOnKeyPress);

function performOnLoadTasks() {
  setBallLocation(ball);
  resetScore();
  resetCurrentLeftAndTop();
  let highScoreMessage = getHighScoreMessage();

  alert(initialMessage + "\n" + highScoreMessage + "\n" + playStartMessage);
}

function getHighScoreMessage() {
  let { highScorerName, highScoreValue } = getHighScoreItem();
  let message;
  if (!highScorerName) message = "this is your first time!";
  else message = highScorerName + " has the highest score of " + highScoreValue;
  return message;
}

function actOnKeyPress(e) {
  e.preventDefault();
  let keyCode = e.keyCode;

  if (playStart === false) {
    //when 'Enter' Key is pressed
    if (keyCode === 13) {
      playStart = true;
      moveTheBallId = setInterval(moveTheBall, 90, rod1, rod2, ball);
      console.log("The play has started");
    }
  } else {
    let character = String.fromCharCode(keyCode).toLocaleUpperCase();
    if (character === "A") {
      manageRodLeftPosition(rod1, rod2);
    } else if (character === "D") {
      manageRodRightPosition(rod1, rod2);
    }
  }
}

export function isPlayStarted() {
  return playStart;
}

export function gameOver() {
  clearInterval(moveTheBallId);
  let { highScoreValue } = getHighScoreItem();
  let currentScore = getScore();
  console.log("Game over and the score is: " + currentScore);
  playStart = false;
  if (!highScoreValue && currentScore > 0) {
    let winMessage =
      "Congratulations! You set the new milestone for the game with score " +
      currentScore;
    loadHighScorePrompt(winMessage, currentScore);
  } else if (highScoreValue && currentScore > highScoreValue) {
    let winMessage =
      "Congratulations! You are the new ace of the game with top score " +
      currentScore;
    loadHighScorePrompt(winMessage, currentScore);
  } else {
    alert(
      "Game over and your score is: " +
        currentScore +
        "\n" +
        playStartMessage +
        " again!"
    );
  }
  resetScore();
  resetCurrentLeftAndTop();
  resetRodLocation(rod1, rod2);
  setBallLocation(ball);
  ball.style.transition = "none";
}

function loadHighScorePrompt(winMessage, currentScore) {
  let nameMessage = "Please mention your name below";
  let name = prompt(winMessage + "\n" + nameMessage);
  if (name !== undefined && name.trim().length > 0) {
    setHighScoreItem(name, currentScore);
  }
  alert(playStartMessage);
}
