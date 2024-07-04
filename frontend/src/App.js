import logo from './logo.svg';
import './App.css';
import BlackJackGame from './components/BlackJackGame';

import React, {useState, useEffect} from "react"
import { testAPI } from './services/API';
function App() {
  return (
    <div className="App">
      <BlackJackGame/>
    </div>
  );
}

export default App;
