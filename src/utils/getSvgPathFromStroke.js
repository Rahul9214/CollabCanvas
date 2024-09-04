/**
 * Converts a stroke path into an SVG path data string.
 *
 * @param {Array<Array<number>>} stroke - An array of points representing the stroke.
 * @returns {string} - The SVG path data string.
 */
const getSvgPathFromStroke = (stroke) => {
    if (stroke.length === 0) {
      return "";
    }
  
    // Reduce the stroke array to create the SVG path commands
    const pathCommands = stroke.reduce((acc, [x0, y0], i, arr) => {
      const [x1, y1] = arr[(i + 1) % arr.length];
      acc.push(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
      return acc;
    }, ["M", ...stroke[0], "Q"]);
  
    pathCommands.push("Z");
    return pathCommands.join(" ");
  };
  
  export default getSvgPathFromStroke;
  