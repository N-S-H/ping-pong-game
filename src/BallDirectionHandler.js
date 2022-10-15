import { isPlayStarted, gameOver } from "./index";
import { incrementScore } from "./scoreManager";
let currentLeft = 0;
let currentTop = 0;
let currentContactRod = "rod1";

/**
 * Sets the initial location of the ball after document load and game reset.
 * The location will be opposite to the last contacted rod incase of game reset
 * @param {*} ball
 */
export function setBallLocation(ball) {
  if (currentContactRod === "rod1") {
    ball.style.top = "95%";
    ball.style.left = "46%";
    currentTop = 100;
  } else {
    ball.style.top = "2%";
    ball.style.left = "46%";
    currentTop = 0;
  }
}

export function resetCurrentLeftAndTop() {
  currentLeft = 0;
  currentTop = 0;
}

/**
 * If the play has been started,
 * It will check if the ball is in contact with any of the edges or rods
 * Incase of contact, it recomputes the target direction of the ball
 * and adjust the pace at which ball should move towards target direction
 * @param {*} rod1
 * @param {*} rod2
 * @param {*} ball
 */
export function moveTheBall(rod1, rod2, ball) {
  if (isPlayStarted()) {
    let contactValue = ballInContact(rod1, rod2, ball);
    if (contactValue) {
      let { top, left } = computeDirection();

      adjustBallTransferPace(top, left, ball);
      currentLeft = left;
      currentTop = top;

      ball.style.top = top.toString() + "%";
      ball.style.left = left.toString() + "%";
    }
  }
}

/**
 * The ball transfer pace is computed based on distance between current and target (left,top) co-ordinates
 * @param {*} top
 * @param {*} left
 * @param {*} ball
 */
function adjustBallTransferPace(top, left, ball) {
  let targetDistance =
    Math.abs(top - currentTop) + Math.abs(left - currentLeft);

  if (targetDistance < 50) ball.style.transition = "all 2s linear";
  else if (targetDistance < 100) ball.style.transition = "all 2.5s linear";
  else if (targetDistance < 150) ball.style.transition = "all 3s linear";
  else ball.style.transition = "all 3.5s linear";
}

/**
 * If the ball is in contact with left edge or right edge it returns true
 * If the ball is in contact with rod1 or rod2 it changes the last contacted rod value, increases game score and returns true
 * If the ball is in contact with top edge or bottom edge, then it calls game over to reset the new game instance
 * @param {*} rod1
 * @param {*} rod2
 * @param {*} ball
 */
function ballInContact(rod1, rod2, ball) {
  let rect1 = rod1.getBoundingClientRect();
  let rect2 = rod2.getBoundingClientRect();
  let ballRect = ball.getBoundingClientRect();

  if (ballRect.left <= 0 || ballRect.right >= window.innerWidth) {
    return true;
  }

  if (
    currentContactRod === "rod1" &&
    ballRect.bottom >= rect2.top &&
    ballRect.right > rect2.left &&
    ballRect.left < rect2.right
  ) {
    currentContactRod = "rod2";
    incrementScore();
    return true;
  }

  if (
    currentContactRod === "rod2" &&
    ballRect.top <= rect1.bottom &&
    ballRect.right > rect1.left &&
    ballRect.left < rect1.right
  ) {
    currentContactRod = "rod1";
    incrementScore();
    return true;
  }

  if (
    (currentContactRod === "rod2" && ballRect.top <= 0) ||
    (currentContactRod === "rod1" && ballRect.bottom >= window.innerHeight)
  ) {
    gameOver();
  }
  return false;
}

/**
 * The target direction (x,y) is computed as follows
 *
 * For y co-ordinate (top in this case):
 * 1. If the last contact made by ball is neither top nor bottom, then the target y co-ordinate should be either top or bottom based on last contacted rod
 * 2. If the last contact made by ball is either top or bottom, the we can randomly select between two choices:
 *    2.1 -> Make the ball go to opposite end through intermediate route i.e., hit left edge or right edge in between
 *    2.2 -> Make the ball go to opposite end through  direct route based on last contacted rod
 *
 *
 * For x co-ordinate (left in this case):
 * 1. If the target y co-ordinate caculated is neither top nor bottom, then the ball should hit left edge or right edge based on last contacted rod
 * 2. If the last contact made by ball is neither top nor bottom,
 * then the x-co-ordinate of the ball should be computed in such a way that ball should not drastically shift to extreme left or right from intermediate path
 * 3. If the target y co-rodinate is either top or bottom and the last contact made by ball is either top or bottom then the x co-ordinate can be anything in the oppsoite end
 */
function computeDirection() {
  let top, left;
  //computing target direction top co-ordinate
  if (currentTop > 0 && currentTop < 100) {
    if (currentContactRod === "rod1") {
      top = 100;
    } else {
      top = 0;
    }
  } else {
    let topOffsetDecision = getRandomNumber(0, 2);
    if (topOffsetDecision === 1) {
      top = getRandomNumber(20, 80);
    } else {
      if (currentContactRod === "rod1") {
        top = 100;
      } else {
        top = 0;
      }
    }
  }

  //computing target direction left co-ordinate
  if (top > 0 && top < 100) {
    if (currentContactRod === "rod1") {
      left = 100;
    } else {
      left = 0;
    }
  } else if (currentTop > 0 && currentTop < 100) {
    if (currentTop > 60) {
      if (currentContactRod === "rod1") {
        left = getRandomNumber(70, 90);
      } else {
        left = getRandomNumber(5, 30);
      }
    } else {
      if (currentContactRod === "rod1") {
        left = getRandomNumber(60, 90);
      } else {
        left = getRandomNumber(5, 40);
      }
    }
  } else {
    left = getRandomNumber(5, 95);
  }

  return {
    top,
    left
  };
}

function getRandomNumber(min, max) {
  let number = Math.random() * (max - min) + min;
  return Math.floor(number);
}
