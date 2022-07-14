import '../../Assets/Styles/App.css';
import React from 'react';
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
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
