import React, {
  useState,
  useEffect,
  useContext,
} from 'react';
import './App.css';
import Homepage from '../src/container';

let debounceTimer;

function App() {
  return (
    <div className='app'>
      <Homepage />
    </div>
  );
}

export default App;
