import './App.css';
import React, {useState, useEffect} from 'react';
import Navbar from './navbar/navbar';
import Clock from './clock/clock';




function App() {


  return (
    <div className='App'>
      <Navbar/>
      <div className='Content'>
        <Clock/>
      </div>
      
    </div>

  );
}

export default App;
