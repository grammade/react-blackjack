import logo from './logo.svg';
import './App.css';

import React, {useState, useEffect} from "react"
import { testAPI } from './API';

function App() {
  const [data, setData] = useState("")
  
  useEffect(() =>{
    const fetch = async () =>{
      const data = await testAPI()
      console.log(`fe received:${JSON.stringify(data, null, 2)}`)
      setData(data.msg)
    }
    
    fetch()
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>{data}</h1>
      </header>
    </div>
  );
}

export default App;
