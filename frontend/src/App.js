import BlackJackGame from './components/BlackJackGame';
import Register from './components/modal/Register';
import arrow_down from './assets/arrow_down.png'
import "./index.css"

import React, { useState } from "react"
import { AuthProvider } from './context/authContext';

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [animationClass, setAnimationClass] = useState("fadeIn")

  const closeModal = () => {
    setAnimationClass("fadeOut")
    const timer = setTimeout(() => {
      setIsModalOpen(false)
    }, 250);
    return () => clearTimeout(timer);
  }

  const openModal = () => {
    setAnimationClass("fadeIn")
    setIsModalOpen(true)
  }

  return (
    <div className="App">
      <AuthProvider>
        <Register show={isModalOpen} closeModal={closeModal} animationClass={animationClass} />
      <BlackJackGame openModal={openModal} />
      </AuthProvider>
    </div>
  );
}

export default App;
