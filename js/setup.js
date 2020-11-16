'use strict';

(function () {
  const COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
  const EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
  const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
  const CHARACTERS_COUNT = 4;
  window.setup = document.querySelector(`.setup`);

  function showBlock(selector) {
    let block = document.querySelector(selector);
    if (block !== undefined) {
      block.classList.remove(`hidden`);
    }
  }

  function hideBlock(selector) {
    let block = document.querySelector(selector);
    if (block !== undefined) {
      block.classList.add(`hidden`);
    }
  }

  function showSetup() {
    showBlock(`.setup`);
    showBlock(`.setup-similar`);
  }

  function hideSetup() {
    hideBlock(`.setup`);
    hideBlock(`.setup-similar`);
    window.setup.style.left = window.initialCords.left;
    window.setup.style.top = window.initialCords.top;
  }

  function checkElementIsOnFocus(selector) {
    return document.querySelector(selector) === document.activeElement;
  }

  function hideSetupByEscape(evt) {
    if (evt.key === `Escape` && !checkElementIsOnFocus(`.setup-user-name`)) {
      hideSetup();
    }
  }

  function showSetupBlock(evt) {
    if (evt.type === `click` || evt.key === `Enter`) {
      showSetup();
      document.addEventListener(`keydown`, hideSetupByEscape);
    }
  }

  function hideSetupBlock(evt) {
    if (evt.type === `click` || evt.key === `Enter`) {
      hideSetup();
      document.removeEventListener(`keydown`, hideSetupByEscape);
    }
  }

  function generateRandomInt(minNum = 0, maxNum = 1) {
    return Math.round(Math.random() * (maxNum - minNum)) + minNum;
  }

  function getRandomElement(elems) {
    return elems[generateRandomInt(0, elems.length - 1)];
  }

  function generateWizardElem(data) {
    const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
    const newElem = wizardTemplate.cloneNode(true);
    newElem.querySelector(`.setup-similar-label`).textContent = data.name;
    newElem.querySelector(`.wizard-coat`).style.fill = data.colorCoat;
    newElem.querySelector(`.wizard-eyes`).style.fill = data.colorEyes;
    return newElem;
  }

  function successHandler(wizards) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < CHARACTERS_COUNT; i++) {
      fragment.appendChild(generateWizardElem(wizards[i]));
    }
    const wizardsList = document.querySelector(`.setup-similar-list`);
    wizardsList.appendChild(fragment);
  }

  function errorHandler(errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  function generateWizardElems() {
    window.backend.load(successHandler, errorHandler);
  }

  function main() {
    const setupOpen = document.querySelector(`.setup-open`);
    const setupClose = document.querySelector(`.setup-close`);
    const wizardCoat = document.querySelector(`.setup-wizard .wizard-coat`);
    const wizardEyes = document.querySelector(`.setup-wizard .wizard-eyes`);
    const wizardFireBall = document.querySelector(`.setup-fireball-wrap`);
    generateWizardElems();
    wizardCoat.addEventListener(`click`, function () {
      const coatColor = getRandomElement(COAT_COLORS);
      wizardCoat.style.fill = coatColor;
      document.querySelector(`input[name='coat-color']`).value = coatColor;
    });
    wizardEyes.addEventListener(`click`, function () {
      const eyeColor = getRandomElement(EYES_COLORS);
      wizardEyes.style.fill = eyeColor;
      document.querySelector(`input[name='eyes-color']`).value = eyeColor;
    });
    wizardFireBall.addEventListener(`click`, function () {
      const fireBallColor = getRandomElement(FIREBALL_COLORS);
      wizardFireBall.style.background = fireBallColor;
      document.querySelector(`input[name='fireball-color']`).value = fireBallColor;
    });
    setupOpen.addEventListener(`click`, showSetupBlock);
    setupOpen.addEventListener(`keydown`, showSetupBlock);
    setupClose.addEventListener(`click`, hideSetupBlock);
    setupClose.addEventListener(`keydown`, hideSetupBlock);
    const form = window.setup.querySelector(`.setup-wizard-form`);
    form.addEventListener(`submit`, function (evt) {
      window.backend.save(new FormData(form), function () {
        window.setup.classList.add(`hidden`);
      });
      evt.preventDefault();
    });
  }

  main();

})();
