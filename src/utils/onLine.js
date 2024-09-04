import distanceCalculator from "./distanceCalculator";

/**
 * Determines if a point is close to a line segment within a specified maximum distance.
 *
 * @param {number} x1 - The x-coordinate of the first point of the line segment.
 * @param {number} y1 - The y-coordinate of the first point of the line segment.
 * @param {number} x2 - The x-coordinate of the second point of the line segment.
 * @param {number} y2 - The y-coordinate of the second point of the line segment.
 * @param {number} x - The x-coordinate of the point to check.
 * @param {number} y - The y-coordinate of the point to check.
 * @param {number} [maxDistance=1] - The maximum distance from the line segment to consider the point "inside".
 * @returns {string|null} - "inside" if the point is within the maximum distance from the line segment, otherwise null.
 */
const onLine = (x1, y1, x2, y2, x, y, maxDistance = 1) => {
  const pointA = { x: x1, y: y1 };
  const pointB = { x: x2, y: y2 };
  const pointC = { x, y };

  // Calculate distances between points
  const lineLength = distanceCalculator(pointA, pointB);
  const distanceToEnds = distanceCalculator(pointA, pointC) + distanceCalculator(pointB, pointC);

  // Calculate the offset to determine if the point is "inside"
  const offset = lineLength - distanceToEnds;

  return Math.abs(offset) < maxDistance ? "inside" : null;
};

export default onLine;
