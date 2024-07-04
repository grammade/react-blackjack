import logo from './logo.svg';
import './App.css';
import BlackJackGame from './components/BlackJackGame';
import Wl from './components/WLRatio';

import React, { useState, useEffect } from "react"

function App() {
  return (
    <div className="App">
      <BlackJackGame />
      <Wl ratio={"0/0"} />
    </div>
  );
}

export default App;
