import React from 'react';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  /*
    <Router> 
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
    */
  return (
    <Router> 
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
