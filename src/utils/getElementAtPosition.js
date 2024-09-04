import positionWithinElement from "./positionWithinElement";

/**
 * Finds the element at the specified (x, y) position from a list of elements.
 *
 * @param {number} x - The x-coordinate of the position.
 * @param {number} y - The y-coordinate of the position.
 * @param {Array<Object>} elements - The list of elements to check.
 * @param {Object} elements[].position - The position of the element.
 * @returns {Object|null} - The element at the position, or null if none is found.
 */
const getElementAtPosition = (x, y, elements) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null) || null;
};

export default getElementAtPosition;
