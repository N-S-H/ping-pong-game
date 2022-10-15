let nameProperty = "highScorerName";
let valueProperty = "highScoreValue";

export function getHighScoreItem() {
  let highScorerName = localStorage.getItem(nameProperty);
  let highScoreValue = localStorage.getItem(valueProperty);
  return {
    highScorerName,
    highScoreValue
  };
}

export function setHighScoreItem(name, score) {
  localStorage.setItem(nameProperty, name);
  localStorage.setItem(valueProperty, score);
}
