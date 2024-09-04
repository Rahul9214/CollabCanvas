/**
 * Determines the appropriate cursor style based on the position of the pointer.
 *
 * @param {string} position - The position relative to the drawing (e.g., "topLeft", "bottomRight").
 * @returns {string} - The name of the cursor style to apply.
 */
const cursorChangerForPositions = (position) => {
    switch (position) {
      case "topLeft":
      case "bottomRight":
      case "start":
      case "end":
        return "nwse-resize"; // North-west to south-east resize handle
      case "topRight":
      case "bottomLeft":
        return "nesw-resize"; // North-east to south-west resize handle
      default:
        return "move"; // Default cursor style for other positions
    }
  };
  
  export default cursorChangerForPositions;
  