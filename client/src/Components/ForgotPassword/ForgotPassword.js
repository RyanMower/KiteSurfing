import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button} from 'react-bootstrap';

function ForgotPassword() {
  const navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    var { email } = document.forms[0];
    // SUBMIT DATA TO BACKEND HERE
    fetch("/resetPassword",{
      method: "POST",
      body: JSON.stringify({
        email: email.value,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        navigate("/login");
      })
      .catch(err => console.log(err));

  }


  return (
    <>
      <h1>Reset Password</h1>
      <div 
        className="ForgotPassword"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: "50%" }} className="p-3 bg-light border">
          <Container fluid>
            <Form className="text-center" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Row>
                  <Col>
                    <Form.Label>Recovery Email</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="email" placeholder="john@gmail.com" required />
                  </Col>
                </Row>
              </Form.Group>
              <Button size="sm" variant="primary" type="Submit">
                Send Password Reset Link 
              </Button>
            </Form> 
          </Container>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
