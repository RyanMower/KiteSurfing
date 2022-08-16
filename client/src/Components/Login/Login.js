import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import "../../Assets/Styles/Login.css";
import { useNavigate } from "react-router-dom";
import { Button} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Login(props) {
  const navigate = useNavigate();

  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);

  const errors = {
    credentials: "Invalid Credentials",
  };

  const renderErrorMessage = (type) => {
    return (<div className="error">{errors[type]}</div>);
  }



  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();
    console.log("HERE")

    var { email, password} = document.forms[0];

    let data = JSON.stringify({email: email.value, password: password.value});

    fetch("/login", {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: data,
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.status === "success"){
          props.setIsLoggedIn(true);
        }else{
          setIsSubmitted(true);
        }})
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetch("/getLoggedInUser")
      .then(resp => resp.json())
      .then(data => {
        if (data["email"] !== ""){
          navigate("/");
        }
      })
      .catch(err => console.log(err));
  }, [props.isLoggedIn]);
  

  // JSX code for login form
  const renderForm = (
    <div className="login">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="email">
          <Row>
            <Col>
              <Form.Label>Email</Form.Label>
            </Col>
            <Col>
              <Form.Control type="text" placeholder="john@gmail.com" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Row>
            <Col>
              <Form.Label>Password</Form.Label>
            </Col>
            <Col>
              <Form.Control type="password" />
            </Col>
          </Row>
        </Form.Group>
        <div>{isSubmitted && renderErrorMessage("credentials")}</div>
        <Button  style={{ width: "50%" }}size="sm" variant="primary" type="Submit">
            Submit 
          </Button>
        <Row className="pt-2">
          <Col >
            <Button size="sm" variant="secondary" onClick={() => navigate("/create-account")}>Create Account </Button>
          </Col>
          <Col>
            <Button size="sm" variant="secondary" onClick={() => navigate("/forgot-password")}>Forgot Password?</Button>
          </Col>
        </Row>
      </Form> 
    </div>
  );
  


  let display;

  if(props.isLoggedIn){
    display = <Navigate to="/" /> 
  }
  else{
    display = 
      <div className="Login">
        <div className="login-form">
          <div className="title">Sign In</div>
            {renderForm}
        </div>
      </div>
  }

  return (
    display
  );
}

export default Login;
