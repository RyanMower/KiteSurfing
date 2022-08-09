import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Navbar(props) {
  const navigate = useNavigate();
  const navStyle = {
    color: 'black'
  };

  let LoggedInUser = {
    user: "",
    email: ""
  };


  const [loginProfile, setLoggedInProfile] = useState();
 
  useEffect(() => {
    fetch("/getLoggedInUser")
      .then(resp => resp.json())
      .then(data => {
        if (data["email"] !== ""){
          LoggedInUser = data;
          setLoggedInProfile(<Link style={navStyle} to="/profile"><li> Hello, {LoggedInUser["user"]}</li></Link>);
        }
        else{
          setLoggedInProfile(<Link style={navStyle} to="/login"><li> Login </li></Link>);
        }
      })
      .catch(err => console.log(err));
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
