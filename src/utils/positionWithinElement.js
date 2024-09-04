import nearPoint from "./nearPoint";
import onLine from "./onLine";

/**
 * Determines the position of a point relative to a given element.
 * The element can be of type "line", "rectangle", "pencil", or "text".
 *
 * @param {number} x - The x-coordinate of the point.
 * @param {number} y - The y-coordinate of the point.
 * @param {Object} element - The element to check against.
 * @param {string} element.type - The type of the element ("line", "rectangle", "pencil", or "text").
 * @param {number} element.x1 - The x-coordinate of the first point (or top-left corner) of the element.
 * @param {number} element.y1 - The y-coordinate of the first point (or top-left corner) of the element.
 * @param {number} element.x2 - The x-coordinate of the second point (or bottom-right corner) of the element.
 * @param {number} element.y2 - The y-coordinate of the second point (or bottom-right corner) of the element.
 * @param {Array<Object>} [element.points] - Array of points for "pencil" type elements.
 * @returns {string|null} - The position relative to the element ("start", "end", "topLeft", "topRight", "bottomLeft", "bottomRight", "inside"), or null if not within the element.
 * @throws {Error} - Throws an error if the element type is not recognized.
 */
const positionWithinElement = (x, y, element) => {
  const { type, x1, x2, y1, y2, points } = element;

  switch (type) {
    case "line":
      { const onLinePosition = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
      return start || end || onLinePosition; }

    case "rectangle":
      { const topLeft = nearPoint(x, y, x1, y1, "topLeft");
      const topRight = nearPoint(x, y, x2, y1, "topRight");
      const bottomLeft = nearPoint(x, y, x1, y2, "bottomLeft");
      const bottomRight = nearPoint(x, y, x2, y2, "bottomRight");
      const insideRectangle = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
      return topLeft || topRight || bottomLeft || bottomRight || insideRectangle; }

    case "pencil":
      { const isInsidePencil = points.some((point, index) => {
        const nextPoint = points[index + 1];
        if (!nextPoint) return false;
        return onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 20) !== null;
      });
      return isInsidePencil ? "inside" : null; }

    case "text":
      return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

    default:
      throw new Error(`Type not recognized: ${type}`);
  }
};

export default positionWithinElement;
