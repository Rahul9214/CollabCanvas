/**
 * Determines if a given point is near a target point within a specified offset.
 *
 * @param {number} x - The x-coordinate of the point to check.
 * @param {number} y - The y-coordinate of the point to check.
 * @param {number} x1 - The x-coordinate of the target point.
 * @param {number} y1 - The y-coordinate of the target point.
 * @param {string} name - The name to return if the point is within the offset.
 * @returns {string|null} - The name if the point is near the target point, otherwise null.
 */
const nearPoint = (x, y, x1, y1, name) => {
    const offset = 5; // Offset distance to consider the point "near"
    return Math.abs(x - x1) < offset && Math.abs(y - y1) < offset ? name : null;
  };
  
  export default nearPoint;
  