import '../../Assets/Styles/App.css';
import React, { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar';
import Home from '../Home/Home';
import SurfingLocations from '../SurfingLocations/SurfingLocations';
import SurfingLessons from '../SurfingLessons/SurfingLessons';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import CreateAccount from '../CreateAccount/CreateAccount';
import BecomeInstructor from '../BecomeInstructor/BecomeInstructor';
import MyLessons from '../MyLessons/MyLessons';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ForgotPasswordUpdate from '../ForgotPassword/ForgotPasswordUpdate';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router> 
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> 
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/home" element={<Home/>} /> 
          <Route path="/SurfingLocations" exact element={<SurfingLocations/>} />
          <Route path="/SurfingLessons" exact element={<SurfingLessons/>} />
          <Route path="/login" exact element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/create-account" exact element={<CreateAccount/>} />
          <Route path="/become-instructor" exact element={<BecomeInstructor/>} />
          <Route path="/forgot-password" exact element={<ForgotPassword/>} />
          <Route path="/my-lessons" exact element={<MyLessons/>} />
          <Route exact path="/reset-password/:token" element={<ForgotPasswordUpdate/>} />
          <Route path="/profile" exact element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
