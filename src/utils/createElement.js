import rough from "roughjs/bundled/rough.esm";

const elementGenerator = rough.generator();

/**
 * Creates a drawing element based on the specified type and options.
 *
 * @param {string} id - The unique identifier for the element.
 * @param {number} x1 - The starting x-coordinate.
 * @param {number} y1 - The starting y-coordinate.
 * @param {number} x2 - The ending x-coordinate.
 * @param {number} y2 - The ending y-coordinate.
 * @param {string} type - The type of the element ("line", "rectangle", "pencil", "text").
 * @param {Object} lineStyleOptions - The style options for lines (used for "line" type).
 * @param {Object} rectangleStyleOptions - The style options for rectangles (used for "rectangle" type).
 * @param {string} pencilColor - The color of the pencil (used for "pencil" type).
 * @param {Object} pencilStyles - Additional styles for the pencil (used for "pencil" type).
 * @returns {Object} - The created element object.
 * @throws {Error} - If the type is not recognized.
 */
const createElement = (
  id,
  x1,
  y1,
  x2,
  y2,
  type,
  lineStyleOptions,
  rectangleStyleOptions,
  pencilColor,
  pencilStyles
) => {
  switch (type) {
    case "line": {
      const roughElement = elementGenerator.line(x1, y1, x2, y2, lineStyleOptions);
      return { id, x1, y1, x2, y2, type, roughElement };
    }
    case "rectangle": {
      const roughElement = elementGenerator.rectangle(
        x1,
        y1,
        x2 - x1,
        y2 - y1,
        rectangleStyleOptions
      );
      return { id, x1, y1, x2, y2, type, roughElement };
    }
    case "pencil":
      return {
        id,
        type,
        points: [{ x: x1, y: y1 }],
        color: pencilColor,
        pencilStyles,
      };
    case "text":
      return { id, type, x1, y1, x2, y2, text: "" };
    default:
      throw new Error(`Type not recognized: ${type}`);
  }
};

export default createElement;
