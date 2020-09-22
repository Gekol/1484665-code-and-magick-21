'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const BAR_HEIGHT = 150;

function renderBlock(ctx, fillStyle, coordinateX, coordinateY, width, height) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(coordinateX, coordinateY, width, height);
}

function getMaxElement(array) {
  let maxElement = array[0];
  for (let i = 1; i < array.length; i++) {
    maxElement = Math.max(maxElement, array[i]);
  }
  return maxElement;
}

window.renderStatistics = (ctx, names, times) => {
  let cloudX = 100;
  let cloudY = 10;

  renderBlock(ctx, `rgba(0, 0, 0, 0.7)`, cloudX + 10, cloudY + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderBlock(ctx, `white`, cloudX, cloudY, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = `black`;
  ctx.font = `16px PT Mono black`;
  ctx.fillText(`Ура вы победили!`, cloudX + 30, cloudY + 30);
  ctx.fillText(`Список результатов: `, cloudX + 30, cloudY + 50);

  let columnX = cloudX + 50;
  let columnY = cloudY + 80;
  let columnWidth = 40;

  let maxElement = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    let color = `rgba(0, 0, 255, ` + (Math.random() + 0.1) + `)`;
    if (names[i] === `Вы`) {
      color = `rgba(255, 0, 0, 1)`;
    }
    ctx.fillStyle = `#000`;
    let columnHeight = (BAR_HEIGHT * times[i]) / maxElement;
    ctx.fillText(parseInt(times[i], 10), columnX, cloudY + BAR_HEIGHT - columnHeight + 70);
    renderBlock(ctx, color, columnX, columnY + BAR_HEIGHT - columnHeight, columnWidth, columnHeight);
    ctx.fillStyle = `#000`;
    ctx.fillText(names[i], columnX, columnY + 170);
    columnX += 90;
  }
};
