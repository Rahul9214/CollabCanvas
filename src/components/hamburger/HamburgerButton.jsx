import { useContext, useState, useCallback, useMemo } from "react";
import { StyleOptionsContext } from "../../context/StyleOptionsContext";

import PencilStyleOptions from "./pencil-option-panel/PencilStyleOptions";
import RectangleStyleOptions from "./rectangle-option-panel/RectangleStyleOptions";
import LineStyleOptions from "./line-option-panel/LineStyleOptions";

import "../hamburger/HamburgerButton.scss";

const HamburgerButton = () => {
  const [isToggled, setIsToggled] = useState(false);
  const { toolType } = useContext(StyleOptionsContext);

  const toggleHandler = useCallback(() => {
    setIsToggled((prevState) => !prevState);
  }, []);

  const renderToolOptions = useMemo(() => {
    switch (toolType) {
      case "pencil":
        return <PencilStyleOptions />;
      case "rectangle":
        return <RectangleStyleOptions />;
      case "line":
        return <LineStyleOptions />;
      default:
        return null;
    }
  }, [toolType]);

  return (
    <>
      <div className="container--burger-button position-fixed">
        <button
          className={`flex flex-jcenter flex-acenter burger ${
            isToggled ? "active" : ""
          }`}
          onClick={toggleHandler}
        >
          <img src="/assets/burger-icon.svg" alt="burger" />
        </button>
      </div>
      {isToggled && renderToolOptions}
    </>
  );
};

export default HamburgerButton;
