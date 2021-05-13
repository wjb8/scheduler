import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode) => {
    setHistory(prev => [...prev, newMode]);
    return setMode(newMode);
  }

  const back = () => {
    if (history.length > 1) {
      console.log('inside if')
      history.pop();
      setMode(history[history.length - 1])
    } 
  }
  console.log(mode)
  return { mode, transition, back };
}