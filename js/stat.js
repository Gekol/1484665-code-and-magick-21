'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;
const BAR_HEIGHT = 150;
const BLACK_COLOR = `#000`;

function renderBlock(ctx, fillStyle, coordinateX, coordinateY, width, height) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(coordinateX, coordinateY, width, height);
}

function renderText(ctx, text, textX, textY, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, textX, textY);
}

function getMaxElement(array) {
  let maxElement = array[0];
  for (let i = 1; i < array.length; i++) {
    maxElement = Math.max(maxElement, array[i]);
  }
  return maxElement;
}

function getBlockColor(hue, saturate, lightness) {
  return `hsl(${hue.toString()}, ${saturate.toString()}%, ${lightness.toString()}%)`;
}

window.renderStatistics = (ctx, names, times) => {
  const cloudX = 100;
  const cloudY = 10;

  renderBlock(ctx, `rgba(0, 0, 0, 0.7)`, cloudX + 10, cloudY + 10, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderBlock(ctx, `white`, cloudX, cloudY, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.font = `16px PT Mono black`;
  renderText(ctx, `Ура вы победили!`, cloudX + 30, cloudY + 30, BLACK_COLOR);
  renderText(ctx, `Список результатов: `, cloudX + 30, cloudY + 50, BLACK_COLOR);

  let columnX = cloudX + 50;
  const columnY = cloudY + 80;
  const columnWidth = 40;

  const maxElement = getMaxElement(times);

  for (let i = 0; i < names.length; i++) {
    const color = names[i] === `Вы` ? `rgba(255, 0, 0, 1)` : getBlockColor(240, Math.random() * 99 + 1, 50);
    const columnHeight = (BAR_HEIGHT * times[i]) / maxElement;
    renderText(ctx, Math.round(times[i], 10).toString(), columnX, cloudY + BAR_HEIGHT - columnHeight + 70, BLACK_COLOR);
    renderBlock(ctx, color, columnX, columnY + BAR_HEIGHT - columnHeight, columnWidth, columnHeight);
    renderText(ctx, names[i], columnX, columnY + 170, BLACK_COLOR);
    columnX += 90;
  }
};
