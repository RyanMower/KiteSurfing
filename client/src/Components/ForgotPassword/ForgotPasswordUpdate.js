import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button} from 'react-bootstrap';

function ForgotPasswordUpdate(props) {
  const navigate = useNavigate();
  const { token } = useParams();

  function handleSubmit(event){
    event.preventDefault();
    var { pass1, pass2 } = document.forms[0];
    // SUBMIT DATA TO BACKEND HERE
    fetch("/update-password",{
      method: "POST",
      body: JSON.stringify({
        "new-password1": pass1.value,
        "new-password2": pass2.value,
        "token": token,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        // Add feedback status message here
        if (data.status == "success"){
          navigate("/login");
        }
        else{
          navigate("/login");
        }
      })
      .catch(err => console.log(err));

  }
  return (
    <>
      <h1>Reset Password</h1>
      <div 
        className="ForgotPasswordUpdate"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: "50%" }} className="p-3 bg-light border">
          <Container fluid>
            <Form className="text-center" onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="pass1">
                <Row>
                  <Col>
                    <Form.Label>New Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="password" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="pass2">
                <Row>
                  <Col>
                    <Form.Label>Re-type New Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="password" required />
                  </Col>
                </Row>
              </Form.Group>
              <Button size="sm" variant="primary" type="Submit">
                Update Password 
              </Button>
            </Form> 
          </Container>
        </div>
      </div>


    </>
  );
}

export default ForgotPasswordUpdate;
