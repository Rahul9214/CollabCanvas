import { useContext, useEffect } from "react";
import { StyleOptionsContext } from "../../context/StyleOptionsContext";

import "./RedoUndoButtons.scss";
import Undo from "./undo/Undo";
import Redo from "./redo/Redo";

const RedoUndoButtons = () => {
  const { undo, redo } = useContext(StyleOptionsContext);

  // Setting up ctrl-z / ctrl-y keyboard shortcuts.
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "z") {
        undo();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "y") {
        redo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

  return (
    <div className="container--redo-undo position-fixed flex">
      <Undo undo={undo} />
      <Redo redo={redo} />
    </div>
  );
};

export default RedoUndoButtons;
