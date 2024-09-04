import { useContext, useMemo, useCallback } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";
import { rectangleColorsTypes } from "../../../utils/rectangleColorsTypes";
import ColorOptions from "../option-types/ColorOptions";
import StylingOption from "../option-types/StylingOption";

const RectangleStyleOptions = () => {
  const {
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
  } = useContext(StyleOptionsContext);

  const handleRectangleStrokeWidthChange = useCallback(
    (event) => setRectangleStrokeWidth(event.target.value),
    [setRectangleStrokeWidth]
  );

  const handleRectangleRoughnessChange = useCallback(
    (event) => setRectangleRoughness(event.target.value),
    [setRectangleRoughness]
  );

  const handleRectangleBowingChange = useCallback(
    (event) => setRectangleBowing(event.target.value),
    [setRectangleBowing]
  );

  const handleRectangleHachureGapChange = useCallback(
    (event) => setRectangleHachureGap(event.target.value),
    [setRectangleHachureGap]
  );

  const handleRectangleHachureAngleChange = useCallback(
    (event) => setRectangleHachureAngle(event.target.value),
    [setRectangleHachureAngle]
  );

  const rectangleStylingTypes = useMemo(
    () => [
      { id: "Stroke Width", value: rectangleStrokeWidth, onChange: handleRectangleStrokeWidthChange },
      { id: "Roughness", value: rectangleRoughness, onChange: handleRectangleRoughnessChange },
      { id: "Bowing", value: rectangleBowing, onChange: handleRectangleBowingChange },
      { id: "Hachure Gap", value: rectangleHachureGap, onChange: handleRectangleHachureGapChange },
      { id: "Hachure Angle", value: rectangleHachureAngle, onChange: handleRectangleHachureAngleChange },
    ],
    [
      rectangleStrokeWidth,
      rectangleRoughness,
      rectangleBowing,
      rectangleHachureGap,
      rectangleHachureAngle,
      handleRectangleStrokeWidthChange,
      handleRectangleRoughnessChange,
      handleRectangleBowingChange,
      handleRectangleHachureGapChange,
      handleRectangleHachureAngleChange,
    ]
  );

  return (
    <div className="styling-panel--container position-fixed">
      {rectangleStylingTypes.map(({ id, value, onChange }) => (
        <StylingOption key={id} id={id} value={value} onChange={onChange} />
      ))}
      <ColorOptions
        state={rectangleStrokeColor}
        setState={setRectangleStrokeColor}
        colorTypes={rectangleColorsTypes}
        label="Stroke Colors"
      />
      <ColorOptions
        state={rectangleFill}
        setState={setRectangleFill}
        colorTypes={rectangleColorsTypes}
        label="Fill Colors"
      />
    </div>
  );
};

export default RectangleStyleOptions;
