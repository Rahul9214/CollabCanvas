import { useState, useCallback } from "react";

// Custom hook to manage history state for implementing undo-redo functionality
export const useHistory = (initialState) => {
  const [index, setIndex] = useState(0);
  const [history, setHistory] = useState([initialState]);

  const setState = useCallback((action, overwrite = false) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;

    if (overwrite) {
      setHistory((prevHistory) => {
        const updatedHistory = [...prevHistory];
        updatedHistory[index] = newState;
        return updatedHistory;
      });
    } else {
      setHistory((prevHistory) => {
        const updatedHistory = prevHistory.slice(0, index + 1);
        return [...updatedHistory, newState];
      });
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, [history, index]);

  const undo = useCallback(() => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
    }
  }, [index]);

  const redo = useCallback(() => {
    if (index < history.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, [index, history.length]);

  return [history[index], setState, undo, redo];
};
