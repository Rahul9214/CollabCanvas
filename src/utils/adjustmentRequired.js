/**
 * Determines if coordinate adjustment is required based on the element type.
 *
 * @param {string} type - The type of the drawing element (e.g., "line", "rectangle").
 * @returns {boolean} - True if adjustment is required, false otherwise.
 */
const adjustmentRequired = (type) => {
    const typesRequiringAdjustment = ["line", "rectangle"];
    return typesRequiringAdjustment.includes(type);
  };
  
  export default adjustmentRequired;
  