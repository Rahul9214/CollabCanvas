import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs/bundled/rough.esm";
import Tools from "./tools/Tools";
import TextArea from "./tools/text/textArea/TextArea";
import { StyleOptionsContext } from "../context/StyleOptionsContext";
import RedoUndoButtons from './redo-undo/RedoUndoButton';
import createElement from "../utils/createElement";
import getElementAtPosition from "../utils/getElementAtPosition";
import drawElement from "../utils/drawElement";
import adjustmentRequired from "../utils/adjustmentRequired";
import cursorChangerForPositions from "../utils/cursorChangerForPositions";
import adjustElementCoordinates from "../utils/adjustElementCoordinates";
import resizedCoordinates from "../utils/resizedCoordinates";

import HamburgerButton from "./hamburger/HamburgerButton";

const Canvas = () => {
  const {
    pencilColor,
    pencilAllStyles,
    rectangleStyleOptions,
    lineStyleOptions,
    toolType,
    elements,
    setElements,
  } = useContext(StyleOptionsContext);

  const [action, setAction] = useState("none");
  const [selectedElement, setSelectedElement] = useState(null);
  const textAreaRef = useRef();

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);
    elements.forEach((element) => {
      if (action !== "writing" || selectedElement?.id !== element.id) {
        drawElement(roughCanvas, context, element);
      }
    });
  }, [elements, action, selectedElement]);

  useEffect(() => {
    if (action === "writing" && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.value = selectedElement?.text || "";
    }
  }, [action, selectedElement]);

  const updateElement = (id, x1, y1, x2, y2, type, options, styles) => {
    setElements((prevElements) =>
      prevElements.map((el, idx) =>
        idx === id
          ? {
              ...el,
              ...createElement(id, x1, y1, x2, y2, type, styles),
              ...(type === "text" && { text: options.text }),
              ...(type === "pencil" && {
                points: [...el.points, { x: x2, y: y2 }],
                color: pencilColor,
                pencilStyles: pencilAllStyles,
              }),
            }
          : el
      )
    );
  };

  const handleMouseDown = (event) => {
    if (action === "writing") return;

    const { clientX, clientY } = event;
    const element = getElementAtPosition(clientX, clientY, elements);

    if (toolType === "selection" && element) {
      setSelectedElement({
        ...element,
        ...(element.type === "pencil"
          ? {
              xOffsets: element.points.map((point) => clientX - point.x),
              yOffsets: element.points.map((point) => clientY - point.y),
            }
          : {
              offsetX: clientX - element.x1,
              offsetY: clientY - element.y1,
            }),
      });
      setAction(element.position === "inside" ? "moving" : "resizing");
    } else if (toolType === "eraser" && element) {
      setElements((prevElements) =>
        prevElements.map((el, idx) =>
          idx === element.id
            ? {
                ...el,
                ...(element.type === "line" || element.type === "rectangle"
                  ? {
                      x1: null,
                      y1: null,
                      x2: null,
                      y2: null,
                      roughElement: {
                        ...el.roughElement,
                        sets: el.roughElement.sets.map((set) => ({
                          ...set,
                          ops: [{ data: [], op: "" }],
                        })),
                      },
                    }
                  : element.type === "pencil"
                  ? {
                      points: [{ x: null, y: null }],
                    }
                  : {
                      text: "",
                      x1: null,
                      y1: null,
                      x2: null,
                      y2: null,
                    }),
              }
            : el
        )
      );
    } else {
      const id = elements.length;
      const newElement = createElement(
        id,
        clientX,
        clientY,
        clientX,
        clientY,
        toolType,
        lineStyleOptions,
        rectangleStyleOptions,
        pencilColor,
        pencilAllStyles
      );
      setElements((prevElements) => [...prevElements, newElement]);
      setSelectedElement(newElement);
      setAction(toolType === "text" ? "writing" : "drawing");
    }
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    if (toolType === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? cursorChangerForPositions(element.position)
        : "default";
    } else if (toolType === "eraser") {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element ? "crosshair" : "default";
    }

    if (action === "drawing") {
      const index = elements.length - 1;
      const { x1, y1, type } = elements[index];
      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        type,
        null,
        type === "line" ? lineStyleOptions : rectangleStyleOptions
      );
    } else if (action === "moving") {
      if (selectedElement?.type === "pencil") {
        const newPoints = selectedElement.points.map((_, idx) => ({
          x: clientX - selectedElement.xOffsets[idx],
          y: clientY - selectedElement.yOffsets[idx],
        }));
        setElements((prevElements) =>
          prevElements.map((el, idx) =>
            idx === selectedElement.id
              ? { ...el, points: newPoints }
              : el
          )
        );
      } else {
        const { id, x1, x2, y1, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;
        const newX1 = clientX - offsetX;
        const newY1 = clientY - offsetY;
        updateElement(
          id,
          newX1,
          newY1,
          newX1 + width,
          newY1 + height,
          type,
          { text: selectedElement?.text },
          type === "line" ? lineStyleOptions : rectangleStyleOptions
        );
      }
    } else if (action === "resizing") {
      const { id, type, position, roughElement } = selectedElement;
      const { x1, y1, x2, y2 } = resizedCoordinates(
        clientX,
        clientY,
        position,
        selectedElement
      );
      updateElement(
        id,
        x1,
        y1,
        x2,
        y2,
        type,
        null,
        type === "line"
          ? roughElement.options
          : rectangleStyleOptions
      );
    }
  };

  const handleMouseUp = () => {
    if (selectedElement) {
      const { id, type } = selectedElement;
      if (action === "drawing" || action === "resizing") {
        if (adjustmentRequired(type)) {
          const adjustedCoords = adjustElementCoordinates(
            elements[selectedElement.id]
          );
          updateElement(
            id,
            adjustedCoords.x1,
            adjustedCoords.y1,
            adjustedCoords.x2,
            adjustedCoords.y2,
            type,
            null,
            type === "line"
              ? selectedElement.roughElement.options
              : rectangleStyleOptions
          );
        }
      }
      setAction("none");
      setSelectedElement(null);
    }
  };

  const handleTextAreaClick = (event) => {
    const { id, x1, y1, type } = selectedElement;
    updateElement(id, x1, y1, null, null, type, {
      text: event.target.value,
    });
    setAction("none");
    setSelectedElement(null);
  };

  return (
    <div>
      <canvas
        id="canvas"
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
      <RedoUndoButtons />
      <HamburgerButton />
      <TextArea ref={textAreaRef} onBlur={handleTextAreaClick} />
      <Tools />
    </div>
  );
};

export default Canvas;
