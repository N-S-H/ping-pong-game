let INITIAL_SCORE = -1;
let score = INITIAL_SCORE;

export function incrementScore() {
  score++;
}

export function resetScore() {
  score = INITIAL_SCORE;
}

export function getScore() {
  return score;
}
