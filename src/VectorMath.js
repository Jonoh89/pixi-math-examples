/**
 * Vector addition

 To add vectors together, you just add each component together separately. For example:
 (0,1,4) + (3,-2,5) = (0+3, 1-2, 4+5) = (3,-1,9)
 */
export const add = (p1, p2) => [p1.x + p2.x, p1.y + p2.y];
