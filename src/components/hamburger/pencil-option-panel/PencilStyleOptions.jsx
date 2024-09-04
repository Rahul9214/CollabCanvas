import { useContext, useMemo, useCallback } from "react";
import { StyleOptionsContext } from "../../../context/StyleOptionsContext";
import { pencilColorsTypes } from "../../../utils/pencilColorsTypes";
import ColorOptions from "../option-types/ColorOptions";
import StylingOption from "../option-types/StylingOption";

const PencilStyleOptions = () => {
  const {
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
  } = useContext(StyleOptionsContext);

  const handlePencilSizeChange = useCallback(
    (event) => setPencilSize(event.target.value),
    [setPencilSize]
  );

  const handlePencilThinningChange = useCallback(
    (event) => setPencilThinning(event.target.value),
    [setPencilThinning]
  );

  const handlePencilStreamlineChange = useCallback(
    (event) => setPencilStreamline(event.target.value),
    [setPencilStreamline]
  );

  const handlePencilSmoothingChange = useCallback(
    (event) => setPencilSmoothing(event.target.value),
    [setPencilSmoothing]
  );

  const handlePencilTaperStartChange = useCallback(
    (event) => setPencilTaperStart(event.target.value),
    [setPencilTaperStart]
  );

  const handlePencilTaperEndChange = useCallback(
    (event) => setPencilTaperEnd(event.target.value),
    [setPencilTaperEnd]
  );

  const pencilStylingTypes = useMemo(
    () => [
      { id: "Size", value: pencilSize, onChange: handlePencilSizeChange },
      { id: "Thinning", value: pencilThinning, onChange: handlePencilThinningChange },
      { id: "Streamline", value: pencilStreamline, onChange: handlePencilStreamlineChange },
      { id: "Smoothing", value: pencilSmoothing, onChange: handlePencilSmoothingChange },
      { id: "Taper Start", value: pencilTaperStart, onChange: handlePencilTaperStartChange },
      { id: "Taper End", value: pencilTaperEnd, onChange: handlePencilTaperEndChange },
    ],
    [
      pencilSize,
      pencilThinning,
      pencilStreamline,
      pencilSmoothing,
      pencilTaperStart,
      pencilTaperEnd,
      handlePencilSizeChange,
      handlePencilThinningChange,
      handlePencilStreamlineChange,
      handlePencilSmoothingChange,
      handlePencilTaperStartChange,
      handlePencilTaperEndChange,
    ]
  );

  return (
    <div className="styling-panel--container position-fixed">
      {pencilStylingTypes.map(({ id, value, onChange }) => (
        <StylingOption key={id} id={id} value={value} onChange={onChange} />
      ))}
      <ColorOptions
        state={pencilColor}
        setState={setPencilColor}
        colorTypes={pencilColorsTypes}
        label={"Colors"}
      />
    </div>
  );
};

export default PencilStyleOptions;
