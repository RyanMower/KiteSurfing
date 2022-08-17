import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button} from 'react-bootstrap';
import IntlTelInput from 'react-bootstrap-intl-tel-input'


function CreateAccount(props) {
  const navigate = useNavigate();

  const [validPassError, setValidPassError] = useState(false);
  const [passMatchError, setPassMatchError] = useState(false);

  const errors = {
    invalidPass: "<div>Passwords don't meet criterion.\n\tAt least 10 Characters\n\tOne symbol from ~`!@#$%^&*()_-+={[}]|:;<,>.?\n\tOne Number\n\tMust Match",
    pass_dont_match: "Passwords don't match",
  };

  const renderErrorMessage = () => {
    let validPassErrorJSX = (
      <>
        <div>Passwords don't meet criterion</div>
        <ul>
          <li>At least 10 Characters</li>
          <li>One Number</li>
          <li>One symbol from {`~\`!@#$%^&*()_-+={[}]|:;<,>.?`}</li>
          <li>Password Must Match</li>
        </ul>
      </>
    );

    let matchPassErrorJSX = (
      <>Passwords Must Match</>
    );

    let errMsg; 
    if (passMatchError){
      console.log("setting Match error");
      errMsg = (<div className="error">{matchPassErrorJSX}</div>);
    }
    else if (validPassError){
      console.log("setting Valid error");
      errMsg = (<div className="error">{validPassErrorJSX}</div>);
    }
    else{
      errMsg = (<></>);
    }
    return errMsg
  }


  function isValidPassword(password){
    let symbol_used = false;
    let number_used = false;
    let numbers = "0123456789";
    let symbols = "~`!@#$%^&*()_-+={[}]|:;<,>.?"
    // Check if password length less than 10
    if (password.length < 10){
        return false;
    }
   
    // Loops over every letter in password
    for (let i = 0; i < password.length; i++){
        if (numbers.includes(password[i])){ // Checks if current letter is a number
            number_used = true;
        }
        if (symbols.includes(password[i])){
            symbol_used = true;
        }
    }
    return (number_used && symbol_used);
}


  function handleSubmit(event){
    event.preventDefault();
    setPassMatchError(false);
    setValidPassError(false);
    var { email, fname, lname, number, pass1, pass2} = document.forms[0];
    console.log(email.value);
    console.log(fname.value);
    console.log(lname.value);
    console.log(number.value);
    console.log(pass1.value);
    console.log(pass2.value);
     
    if (pass1.value !== pass2.value){
      console.log("HERE");
      setPassMatchError(true);
      return;
    }

    if(!(isValidPassword(pass1.value))){
      setValidPassError(true);
      return;
    }
    // SUBMIT DATA TO BACKEND HERE
    fetch("/createAccount",{
      method: "POST",
      body: JSON.stringify({
        email: email,
        "first-name": fname.value,
        "last-name": lname.value,
        "phone-number": number.value,
        "password1": pass1.value,
        "password2": pass2.value,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        //navigate("/login");
        if (data.status === 'success') { 
          navigate("/login");
        }
        else { 
          if (data.reason === "email-exists"){
            //navigate("/reset-password");
            navigate("/");
            return;
          }
          console.log(data.reason);
        } 
      })
      .catch(err => console.log(err));

  }

    return (
      <div className="CreateAccount">
        <div style={{ width: "50%" }} className="p-2 bg-light border">
          <Container fluid>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="email">
                <Row>
                  <Col>
                    <Form.Label>Email</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="email" placeholder="john@gmail.com" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="fname">
                <Row>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="text" placeholder="John" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="lname">
                <Row>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="text" placeholder="Doe" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="number">
                <Row>
                  <Col>
                    <Form.Label>Phone Number</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="tel" placeholder="123-456-7890" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <IntlTelInput
                  preferredCountries={['US']}
                  defaultCountry={'US'}
                  defaultValue={'+1 555-555-5555'}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="pass1">
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="password" required />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="pass2">
                <Row>
                  <Col>
                    <Form.Label>Re-Enter Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control type="password" required />
                  </Col>
                </Row>
              </Form.Group>
              <div>{renderErrorMessage()}</div>
              <Button size="sm" variant="primary" type="Submit">
                Create Account 
              </Button>
            </Form> 
          </Container>
        </div>
      </div>

    );
  
}

export default CreateAccount;
