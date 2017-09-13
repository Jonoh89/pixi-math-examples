/**
 * Vector addition

 To add vectors together, you just add each component together separately. For example:
 (0,1,4) + (3,-2,5) = (0+3, 1-2, 4+5) = (3,-1,9)
 */
export const add = (p1, p2) => [p1.x + p2.x, p1.y + p2.y];

/**
 * Subtraction works in the same way as addition -- subtracting one component at a time.
 * Vector subtraction is useful for getting a vector that points from one position to another. For example, let's say
 * the player is standing at (1,2) with a laser rifle, and an enemy robot is at (4,3). To get the vector that the laser
 * must travel to hit the robot, you can subtract the player's position from the robot's position. This gives us:

 (4,3)-(1,2) = (4-1, 3-2) = (3,1).
 */
export const subtract = (p1, p2) => [p1.x - p2.x, p1.y - p2.y];
