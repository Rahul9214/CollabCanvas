/**
 * Calculates the new coordinates of a rectangle based on the mouse position and resize handle position.
 *
 * @param {number} clientX - The current x-coordinate of the mouse.
 * @param {number} clientY - The current y-coordinate of the mouse.
 * @param {string} position - The position of the resize handle ("topLeft", "topRight", "bottomLeft", "bottomRight", "start", "end").
 * @param {Object} coordinates - The current coordinates of the rectangle.
 * @param {number} coordinates.x1 - The x-coordinate of the top-left corner of the rectangle.
 * @param {number} coordinates.y1 - The y-coordinate of the top-left corner of the rectangle.
 * @param {number} coordinates.x2 - The x-coordinate of the bottom-right corner of the rectangle.
 * @param {number} coordinates.y2 - The y-coordinate of the bottom-right corner of the rectangle.
 * @returns {Object|null} - The new coordinates of the rectangle or null if the position is not recognized.
 */
const resizedCoordinates = (clientX, clientY, position, coordinates) => {
    const { x1, y1, x2, y2 } = coordinates;
  
    switch (position) {
      case "topLeft":
      case "start":
        return { x1: clientX, y1: clientY, x2, y2 };
  
      case "topRight":
        return { x1, y1: clientY, x2: clientX, y2 };
  
      case "bottomLeft":
        return { x1: clientX, y1, x2, y2: clientY };
  
      case "bottomRight":
      case "end":
        return { x1, y1, x2: clientX, y2: clientY };
  
      default:
        return null;
    }
  };
  
  export default resizedCoordinates;
  