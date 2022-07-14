import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const navStyle = {
    color: 'black'
  };

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
      </ul>
    </div>
  );
}

export default Navbar;
