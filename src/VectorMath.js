export const add = (p1, p2) => [p1.x + p2.x, p1.y + p2.y];
export const subtract = (p1, p2) => [p1.x - p2.x, p1.y - p2.y];
export const multiplyScalar = (point, number) => [
  point.x * number,
  point.y * number
];
