import * as PIXI from 'pixi.js';

export const add = (point1, point2) => [
  point1.x + point2.x,
  point1.y + point2.y
];

export const subtract = (point1, point2) => [
  point1.x - point2.x,
  point1.y - point2.y
];

export const multiplyScalar = (point, number) => [
  point.x * number,
  point.y * number
];

export const length = point =>
  Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));

export const distance = (point1, point2) => {
  const [x, y] = subtract(point1, point2);
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

export const divide = (point1, point2) => ([point1.x / point2.x, point1.y / point2.y]);

export const normalize = (point) => {
  const length = length(point);

  if (length === 0) {
    return [1, 0];
  }

  return divide(point, new PIXI.Point(length, length));
};

export const dot = (point1, point2) => point1.x * point2.x + point1.y * point2.y;
