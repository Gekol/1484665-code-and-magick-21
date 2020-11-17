'use strict';

(function () {

  const CHARACTERS_COUNT = 4;

  function generateWizardElem(data) {
    const wizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);
    const newElem = wizardTemplate.cloneNode(true);
    newElem.querySelector(`.setup-similar-label`).textContent = data.name;
    newElem.querySelector(`.wizard-coat`).style.fill = data.colorCoat;
    newElem.querySelector(`.wizard-eyes`).style.fill = data.colorEyes;
    return newElem;
  }

  window.render = function (wizards) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < CHARACTERS_COUNT; i++) {
      fragment.appendChild(generateWizardElem(wizards[i]));
    }
    const wizardsList = document.querySelector(`.setup-similar-list`);
    wizardsList.innerHTML = ``;
    wizardsList.appendChild(fragment);
  };
})();
