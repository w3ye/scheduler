import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  /**
   * Set the mode and update the history. Optional replacing - replace the last element of history with the newMode
   * @param {String} newMode
   * @param {boolean} flag - replace true=yes, false=no
   */
  function transition(newMode, flag = false) {
    setMode(newMode);
    if (!flag) {
      setHistory((prev) => [...prev, newMode]);
    } else {
      // remove the last element from the array and update history
      const tempHistoy = [...history];
      tempHistoy.pop();
      // setHistory([...tempHistoy, newMode]);
      setHistory((prev) => [...prev, newMode]);
    }
  }

  /**
   * Move back by one value in history, updating the mode
   */
  function back() {
    if (history.length > 1) {
      const tempHistory = [...history];
      tempHistory.pop();
      setMode(tempHistory[tempHistory.length - 1]);
    } else if (history.length === 1) {
      setMode(history[0]);
    }
  }

  return { mode, transition, back };
}
