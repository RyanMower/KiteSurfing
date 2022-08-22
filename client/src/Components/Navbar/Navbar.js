import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {default as BootNavbar} from 'react-bootstrap/Navbar';

function Navbar(props) {

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
          setLoggedInProfile(<Nav.Link href="/profile">Hello, {LoggedInUser["user"]}</Nav.Link>);
        }
        else{
          setLoggedInProfile(<Nav.Link href="/login">Login</Nav.Link>);
        }
      })
      .catch(err => console.log(err));
  }, [props.isLoggedIn]);

  return (
    <div className="MyNavbar pb-4">
      <BootNavbar bg="primary" variant="dark">
        <Container>
          <BootNavbar.Brand href="#">Logo</BootNavbar.Brand>
          <Nav className="nav-links">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/SurfingLessons">Surfing Lessons</Nav.Link>
            <Nav.Link href="/SurfingLocations">Surfing Locations</Nav.Link>
            {loginProfile}
          </Nav>
        </Container>
      </BootNavbar>
    </div>
  );
}

export default Navbar;
