import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    color: 'black'
  };

  const [LoggedInUser, setLoggedInUser] = useState({
    user: "",
    email: "",
  });

  useEffect(() => {      
    fetch("/getLoggedInUser")
      .then(resp => resp.json())
      .then(data => {
        setLoggedInUser(data);
      })
      .catch(err => console.log(err));

  }, []);

  var loginProfile;

  if (LoggedInUser["email"] == ""){
    loginProfile = <Link style={navStyle} to="/login"><li> Login </li></Link>
  }
  else{
    loginProfile = <Link style={navStyle} to="/profile"><li> Hello, {LoggedInUser["user"]}</li></Link>
  }

  return (
    <div className="Navbar">
      <h3> LOGO </h3>
      <ul className="nav-links" >
        <Link style={navStyle} to="/">
          <li> Home </li>
        </Link>
        <Link style={navStyle} to="/SurfingLessons">
          <li> Surfing Lessons</li>
        </Link>
        <Link style={navStyle} to="/SurfingLocations">
          <li> Surfing Locations</li>
        </Link>
        {loginProfile}

      </ul>
    </div>
  );
}

export default Navbar;
