import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
  const navStyle = {
    color: 'black'
  };

  let LoggedInUser = {
    user: "",
    email: ""
  };


  const [loginProfile, setLoggedInProfile] = useState();
 
  useEffect(() => {
    if (props.isLoggedIn){
      fetch("/getLoggedInUser")
        .then(resp => resp.json())
        .then(data => {
          LoggedInUser = data;
          setLoggedInProfile(<Link style={navStyle} to="/profile"><li> Hello, {LoggedInUser["user"]}</li></Link>);
        })
        .catch(err => console.log(err));

    }
    else{
      setLoggedInProfile(<Link style={navStyle} to="/login"><li> Login </li></Link>);
    }
  
  }, [props.isLoggedIn]);

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
