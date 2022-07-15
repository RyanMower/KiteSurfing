import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  //console.log(props.isLoggedIn);
  const navStyle = {
    color: 'black'
  };

  const [LoggedInUser, setLoggedInUser] = useState({
    user: "",
    email: "",
  });

  var loginProfile;
  if (props.isLoggedIn){
    fetch("/getLoggedInUser")
      .then(resp => resp.json())
      .then(data => {
        setLoggedInUser(data);
      })
      .catch(err => console.log(err));

    loginProfile = <Link style={navStyle} to="/profile"><li> Hello, {LoggedInUser["user"]}</li></Link>
  }
  else{
    loginProfile = <Link style={navStyle} to="/login"><li> Login </li></Link>
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
