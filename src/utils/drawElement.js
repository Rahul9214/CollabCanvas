import getStroke from "perfect-freehand";
import getSvgPathFromStroke from "./getSvgPathFromStroke";

/**
 * Draws an element on the provided canvas context using the specified roughCanvas.
 *
 * @param {Object} roughCanvas - The rough canvas object for drawing rough elements.
 * @param {CanvasRenderingContext2D} context - The 2D rendering context of the canvas.
 * @param {Object} element - The drawing element to be rendered.
 * @param {string} element.type - The type of the element ("line", "rectangle", "pencil", "text").
 * @param {Object} [element.roughElement] - The rough.js element for "line" and "rectangle" types.
 * @param {Array} [element.points] - The points for the pencil stroke (used for "pencil" type).
 * @param {Object} [element.pencilStyles] - The styles for the pencil stroke (used for "pencil" type).
 * @param {string} [element.color] - The color for the pencil stroke (used for "pencil" type).
 * @param {string} [element.text] - The text to be drawn (used for "text" type).
 * @param {number} [element.x1] - The x-coordinate for the text position.
 * @param {number} [element.y1] - The y-coordinate for the text position.
 * @returns {void}
 * @throws {Error} - If the element type is not recognized.
 */
const drawElement = (roughCanvas, context, element) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      // Draw pencil strokes using the Perfect Freehand library
      { const stroke = getSvgPathFromStroke(
        getStroke(element.points, element.pencilStyles)
      );
      context.fillStyle = element.color;
      context.fill(new Path2D(stroke));
      break; }
    case "text":
      context.textBaseline = "top";
      context.fillStyle = "black";
      context.font = "24px sans-serif";
      context.fillText(element.text, element.x1, element.y1);
      break;
    default:
      throw new Error(`Unrecognized element type: ${element.type}`);
  }
};

export default drawElement;
