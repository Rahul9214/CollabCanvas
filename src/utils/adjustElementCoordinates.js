/**
 * Adjusts the coordinates of a drawing element to ensure that the top-left
 * corner is always (x1, y1) and the bottom-right corner is (x2, y2).
 *
 * @param {Object} element - The drawing element object.
 * @param {string} element.type - The type of the drawing element (e.g., "rectangle").
 * @param {number} element.x1 - The starting x-coordinate.
 * @param {number} element.y1 - The starting y-coordinate.
 * @param {number} element.x2 - The ending x-coordinate.
 * @param {number} element.y2 - The ending y-coordinate.
 * @returns {Object} - The adjusted coordinates.
 */
const adjustElementCoordinates = (element) => {
    const { type, x1, y1, x2, y2 } = element;
  
    // For rectangles, ensure the coordinates always form a top-left to bottom-right box
    if (type === "rectangle") {
      return {
        x1: Math.min(x1, x2),
        y1: Math.min(y1, y2),
        x2: Math.max(x1, x2),
        y2: Math.max(y1, y2),
      };
    }
  
    // For other elements, ensure x1, y1 is the top-left and x2, y2 is the bottom-right
    const isLeftToRight = x1 < x2 || (x1 === x2 && y1 < y2);
    
    return isLeftToRight
      ? { x1, y1, x2, y2 }
      : { x1: x2, y1: y2, x2: x1, y2: y1 };
  };
  
  export default adjustElementCoordinates;
  