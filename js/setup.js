'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const CHARACTERS_COUNT = 4;
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
let wizardsList = document.querySelector(`.setup-similar-list`);

function showBlock(block) {
  block.classList.remove(`hidden`);
}

function generateRandomNum(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

function generateWizardsData() {
  let characters = [];

  for (let i = 0; i < CHARACTERS_COUNT; i++) {
    let newCharacter = {
      coatColor: COAT_COLORS[generateRandomNum(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[generateRandomNum(EYES_COLORS.length)]
    };
    const nameFirstPositionProbability = generateRandomNum(99) + 1;
    const name = NAMES[generateRandomNum(NAMES.length)];
    const surname = SURNAMES[generateRandomNum(SURNAMES.length)];
    if (nameFirstPositionProbability > 50) {
      newCharacter.name = `${name} ${surname}`;
    } else {
      newCharacter.name = `${surname} ${name}`;
    }
    characters[i] = newCharacter;
  }
  return characters;
}

function generateWizardElem(data) {
  const newElem = wizardTemplate.cloneNode(true);
  newElem.querySelector(`.setup-similar-label`).textContent = data.name;
  newElem.querySelector(`.wizard-coat`).style.fill = data.coatColor;
  newElem.querySelector(`.wizard-eyes`).style.fill = data.eyesColor;
  return newElem;
}

function generateWizardElems() {
  const fragment = document.createDocumentFragment();
  for (let data of generateWizardsData()) {
    fragment.appendChild(generateWizardElem(data));
  }
  wizardsList.appendChild(fragment);
}

function main() {
  let setupBlock = document.querySelector(`.setup`);
  showBlock(setupBlock);
  generateWizardElems();
  let setupSimilarBlock = document.querySelector(`.setup-similar`);
  showBlock(setupSimilarBlock);
}

main();
