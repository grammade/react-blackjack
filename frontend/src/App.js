import BlackJackGame from './components/BlackJackGame';
import Register from './components/modal/Register';
import arrow_down from './assets/arrow_down.png'
import "./index.css"

import React, {useState} from "react"

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen = false
  }
  
  const openModal = () => {
    setIsModalOpen = true
  }

  return (
    <div className="App">
      {/* <img className='arrow' src={arrow_down} width={40}/> */}
      <Register show={isModalOpen} onClose={closeModal}/>
      <BlackJackGame />
    </div>
  );
}

export default App;
