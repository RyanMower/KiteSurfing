import '../../Assets/Styles/App.css';
import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import SurfingLocations from '../SurfingLocations/SurfingLocations';
import SurfingLessons from '../SurfingLessons/SurfingLessons';
import Login from '../Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);


  return (
    <Router> 
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/home" exact element={<Home/>} />
          <Route path="/SurfingLocations" exact element={<SurfingLocations/>} />
          <Route path="/SurfingLessons" exact element={<SurfingLessons/>} />
          <Route path="/login" exact element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
