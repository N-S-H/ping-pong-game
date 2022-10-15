/**
 * This function moves both the rods simultaneously to left until they can cannot move further
 * @param {*} rod1
 * @param {*} rod2
 */
export function manageRodLeftPosition(rod1, rod2) {
  let rect = rod1.getBoundingClientRect();
  let leftDist = Math.floor(rect.left);
  let totalWidth = Math.floor(window.innerWidth);
  let currentLeftPercentage = Math.floor((leftDist / totalWidth) * 100.0);
  if (currentLeftPercentage >= 1) {
    currentLeftPercentage--;
    rod1.style.left = currentLeftPercentage.toString() + "%";
    rod2.style.left = currentLeftPercentage.toString() + "%";
  }
}

/**
 * This function moves both the rods simultaneously to right until they can cannot move further
 * @param {*} rod1
 * @param {*} rod2
 */
export function manageRodRightPosition(rod1, rod2) {
  let rect = rod2.getBoundingClientRect();
  let leftDist = Math.ceil(rect.left);
  let totalWidth = Math.ceil(window.innerWidth);
  let currentLeftPercentage = Math.ceil((leftDist / totalWidth) * 100.0);
  if (currentLeftPercentage < 85) {
    currentLeftPercentage++;
    rod1.style.left = currentLeftPercentage.toString() + "%";
    rod2.style.left = currentLeftPercentage.toString() + "%";
  }
}

/**
 * This function resets the two rods location to the middle in order
 * to setup new instance of the game
 * @param {*} rod1
 * @param {*} rod2
 */
export function resetRodLocation(rod1, rod2) {
  rod1.style.left = "40%";
  rod2.style.left = "40%";
}
