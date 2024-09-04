/**
 * Calculates the Euclidean distance between two points.
 *
 * @param {Object} a - The first point with x and y coordinates.
 * @param {number} a.x - The x-coordinate of the first point.
 * @param {number} a.y - The y-coordinate of the first point.
 * @param {Object} b - The second point with x and y coordinates.
 * @param {number} b.x - The x-coordinate of the second point.
 * @param {number} b.y - The y-coordinate of the second point.
 * @returns {number} - The distance between the two points.
 */
const distance = (a, b) =>
    Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
  
  export default distance;
  