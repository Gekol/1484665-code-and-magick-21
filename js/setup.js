'use strict';

const NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const SURNAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const CHARACTERS_COUNT = 4;
const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
const wizardsList = document.querySelector(`.setup-similar-list`);

function showBlock(block) {
  block.classList.remove(`hidden`);
}

function generateRandomInt(maxNum = 1, minNum = 0) {
  return Math.round(Math.random() * (maxNum - minNum)) + minNum;
}

function generateWizardsData() {
  let characters = [];

  for (let i = 0; i < CHARACTERS_COUNT; i++) {
    let newCharacter = {
      coatColor: COAT_COLORS[generateRandomInt(COAT_COLORS.length)],
      eyesColor: EYES_COLORS[generateRandomInt(EYES_COLORS.length)]
    };
    const nameFirstPositionProbability = generateRandomInt(100, 1);
    const name = NAMES[generateRandomInt(NAMES.length)];
    const surname = SURNAMES[generateRandomInt(SURNAMES.length)];
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
  const setupBlock = document.querySelector(`.setup`);
  showBlock(setupBlock);
  generateWizardElems();
  const setupSimilarBlock = document.querySelector(`.setup-similar`);
  showBlock(setupSimilarBlock);
}

main();
