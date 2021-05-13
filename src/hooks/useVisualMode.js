import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // const state = {
  //   elements: [initial],
  //   currentElement: initial
  // };

  // const push = (newEl, replace) => {
    
  //   state.currentElement = newEl;

  //   if (replace) {
  //     state.elements = state.elements.slice(0,-1);
  //   }

  //   state.elements = [...state.elements, newEl];

  // };

  // const pop = () => {

  //   state.elements = state.elements.slice(0,-1);
  //   state.currentElement = state.elements[state.elements.length - 1];

  // };

  // const replace = (el) => {

  //   state.elements = state.elements.slice(0,-1);
  //   state.elements = [...state.elements, el];
  //   state.currentElement = el;

  // }

  const transition = (newMode, replace = false) => {
    
    if (replace) {
      history.pop();
    }
    
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

  return { mode, transition, back };
}