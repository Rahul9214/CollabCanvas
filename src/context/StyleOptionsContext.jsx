import { useState, createContext, useMemo } from "react";
import { useHistory } from "../hooks/useHistory";

export const StyleOptionsContext = createContext();

// eslint-disable-next-line react/prop-types
export const StyleOptionsProvider = ({ children }) => {
  // State management with initial values and useState
  const [toolType, setToolType] = useState("pencil");
  const [trashBinModalOpen, setTrashBinModalOpen] = useState(false);
  const [elements, setElements, undo, redo] = useHistory([]);

  const [pencilSize, setPencilSize] = useState(40);
  const [pencilThinning, setPencilThinning] = useState(20);
  const [pencilStreamline, setPencilStreamline] = useState(50);
  const [pencilSmoothing, setPencilSmoothing] = useState(50);
  const [pencilTaperStart, setPencilTaperStart] = useState(50);
  const [pencilTaperEnd, setPencilTaperEnd] = useState(50);
  const [pencilColor, setPencilColor] = useState("black");

  const [rectangleStrokeWidth, setRectangleStrokeWidth] = useState(16);
  const [rectangleRoughness, setRectangleRoughness] = useState(1);
  const [rectangleBowing, setRectangleBowing] = useState(1);
  const [rectangleHachureGap, setRectangleHachureGap] = useState(8);
  const [rectangleHachureAngle, setRectangleHachureAngle] = useState(1);
  const [rectangleStrokeColor, setRectangleStrokeColor] = useState("black");
  const [rectangleFill, setRectangleFill] = useState("transparent");

  const [lineStrokeWidth, setLineStrokeWidth] = useState(16);
  const [lineRoughness, setLineRoughness] = useState(1);
  const [lineBowing, setLineBowing] = useState(1);
  const [lineStrokeColor, setLineStrokeColor] = useState("black");

  // Memoizing the computed styles to avoid unnecessary recalculations
  const pencilAllStyles = useMemo(() => ({
    size: pencilSize / 2.5,
    thinning: pencilThinning / 50,
    streamline: pencilStreamline / 100,
    smoothing: pencilSmoothing / 100,
    start: {
      cap: true,
      taper: pencilTaperStart,
    },
    end: {
      cap: true,
      taper: pencilTaperEnd,
    },
  }), [pencilSize, pencilThinning, pencilStreamline, pencilSmoothing, pencilTaperStart, pencilTaperEnd]);

  const rectangleStyleOptions = useMemo(() => ({
    strokeWidth: rectangleStrokeWidth / 5,
    roughness: rectangleRoughness / 10,
    bowing: rectangleBowing / 10,
    hachureGap: rectangleHachureGap,
    hachureAngle: rectangleHachureAngle,
    stroke: rectangleStrokeColor,
    fill: rectangleFill,
  }), [rectangleStrokeWidth, rectangleRoughness, rectangleBowing, rectangleHachureGap, rectangleHachureAngle, rectangleStrokeColor, rectangleFill]);

  const lineStyleOptions = useMemo(() => ({
    strokeWidth: lineStrokeWidth / 5,
    roughness: lineRoughness / 10,
    bowing: lineBowing / 10,
    stroke: lineStrokeColor,
  }), [lineStrokeWidth, lineRoughness, lineBowing, lineStrokeColor]);

  // Consolidating context value to improve readability and maintainability
  const contextValue = useMemo(() => ({
    toolType,
    setToolType,
    trashBinModalOpen,
    setTrashBinModalOpen,
    elements,
    setElements,
    undo,
    redo,

    // Pencil States
    pencilSize,
    setPencilSize,
    pencilThinning,
    setPencilThinning,
    pencilStreamline,
    setPencilStreamline,
    pencilSmoothing,
    setPencilSmoothing,
    pencilTaperStart,
    setPencilTaperStart,
    pencilTaperEnd,
    setPencilTaperEnd,
    pencilColor,
    setPencilColor,
    pencilAllStyles,

    // Rectangle States
    rectangleStrokeWidth,
    setRectangleStrokeWidth,
    rectangleRoughness,
    setRectangleRoughness,
    rectangleBowing,
    setRectangleBowing,
    rectangleHachureGap,
    setRectangleHachureGap,
    rectangleHachureAngle,
    setRectangleHachureAngle,
    rectangleStrokeColor,
    setRectangleStrokeColor,
    rectangleFill,
    setRectangleFill,
    rectangleStyleOptions,

    // Line States
    lineStrokeWidth,
    setLineStrokeWidth,
    lineRoughness,
    setLineRoughness,
    lineBowing,
    setLineBowing,
    lineStrokeColor,
    setLineStrokeColor,
    lineStyleOptions,
  }), [
    toolType, setToolType, trashBinModalOpen, setTrashBinModalOpen,
    elements, setElements, undo, redo,
    pencilSize, setPencilSize, pencilThinning, setPencilThinning,
    pencilStreamline, setPencilStreamline, pencilSmoothing, setPencilSmoothing,
    pencilTaperStart, setPencilTaperStart, pencilTaperEnd, setPencilTaperEnd,
    pencilColor, setPencilColor, pencilAllStyles,
    rectangleStrokeWidth, setRectangleStrokeWidth, rectangleRoughness,
    setRectangleRoughness, rectangleBowing, setRectangleBowing,
    rectangleHachureGap, setRectangleHachureGap, rectangleHachureAngle,
    setRectangleHachureAngle, rectangleStrokeColor, setRectangleStrokeColor,
    rectangleFill, setRectangleFill, rectangleStyleOptions,
    lineStrokeWidth, setLineStrokeWidth, lineRoughness, setLineRoughness,
    lineBowing, setLineBowing, lineStrokeColor, setLineStrokeColor, lineStyleOptions
  ]);

  return (
    <StyleOptionsContext.Provider value={contextValue}>
      {children}
    </StyleOptionsContext.Provider>
  );
};

