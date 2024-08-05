import './App.css';
import React, {useState, useEffect} from 'react';
import Navbar from './navbar/navbar';
import CustomToggleButton from './toggleButton/toggleButton';
import Clock from './clock/clock';
import Tasks from './tasks/tasks';


function App() {
  const [view, setView] = useState('clock');
  const handleViewChange = () => {
    if (view === 'clock') {
      setView('tasks')
    } else {
      setView('clock')
    }
  };
  return (
    <div className='app'>
      <Navbar/>
      <div className='content'>
        <CustomToggleButton value={view} onChange={handleViewChange}/>
        {view === 'clock' ? <Clock/>  : <Tasks/>}
        
      </div>
      
    </div>

  );
}

export default App;
