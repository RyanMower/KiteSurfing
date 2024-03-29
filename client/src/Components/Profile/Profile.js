import { Container, Row, Col } from 'react-grid';
import React, { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

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

function Profile(props) {
  const navigate = useNavigate();
  const [editView, setEditView] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [deleteError, setDeleteError] = useState(false);
  const [deleteErrorMsg, setDeleteErrorMsg] = useState("");
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
    number: "",
    pass1: "",
    pass2: "",
    deleteAccount: false,
    password: "",
  });

  function logout(props){
   return function() {
    fetch("/logout", {
      method: "GET",
    })
      .then(() => {
        props.setIsLoggedIn(false);
        window.location.href="/";
      })
      .catch(err => {
        console.log(err);
        props.setIsLoggedIn(false);
        window.location.href="/";
      });

   };
}

  function deleteAccount(){
    setData({
     ...data,
     deleteAccount: true,
   });
  }
  function deleteAccountSubmit(props){
   return function() {
    fetch("/deleteAccount",{
      method: "POST",
      body: JSON.stringify({
        email: data["email"],
        password: data["password"],
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        if (data["status"] == "success"){
          console.log("Account Deleted");
          props.setIsLoggedIn(false);
          window.location.href="/";
          return;
        }
        else{
          setDeleteError(true);
          setDeleteErrorMsg(<div className="error pb-2">{data["reason"]}</div>);
        }
      })
      .catch(err => console.log(err));
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    setError(false);

    let updatePasswords = false;
    
    // Checking Passwords
    if ((data["pass1"] != null) && (data["pass2"] != null) && (data["pass1"] != "") && (data["pass2"] != "")){
      if(data["pass1"] != data["pass2"]){
        setError(true);
        setErrorMsg(<div className="error pb-2">Passwords Must Match</div>);
        return;
      }
      if(!(isValidPassword(data["pass1"]))){
        setError(true);
        setErrorMsg(
          <>
            <div className="pb-2 error">Passwords don't meet criterion</div>
            <ListGroup className="pb-3" as="ol" numbered>
              <ListGroup.Item style={{textAlign: "left"}} variant="info">At least 10 characters</ListGroup.Item>
              <ListGroup.Item style={{textAlign: "left"}} variant="info">One number</ListGroup.Item>
              <ListGroup.Item style={{textAlign: "left"}} variant="info">One symbol from {`~\`!@#$%^&*()_-+={[}]|:;<,>.?`}</ListGroup.Item>
              <ListGroup.Item style={{textAlign: "left"}} variant="info">Passwords must match</ListGroup.Item>
            </ListGroup>
          </>
        );
        return;
      }
      // Okay to update passwords
      updatePasswords = true;
    }
    
    let tmpPass1 = "";
    let tmpPass2 = "";
    if (updatePasswords){
      tmpPass1 = data["pass1"];
      tmpPass2 = data["pass2"];
    }
    fetch("/updateAccount",{
      method: "POST",
      body: JSON.stringify({
        email: data["email"],
        "first-name": data["fname"],
        "last-name": data["lname"],
        "phone-number": data["number"],
        "pass1": tmpPass1,
        "pass2": tmpPass2,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        console.log("Profile Updated");
        console.log(data); 
        if (data["status"] === "success"){
          window.location.href = "/";
        } 
      })
      .catch(err => console.log(err));

  }

  function toggleProfileEditor(){
    setEditView(!editView);
  }
  function handleChangeFname(event) {
     setData({
     ...data,
     fname: event.target.value
   });
  }
  function handleChangeLname(event) {
    setData({
     ...data,
     lname: event.target.value
   });
  }
  function handleChangeNumber(event) {
    setData({
     ...data,
     number: event.target.value
   });
  }
  function handleChangePass1(event) {
    setData({
     ...data,
     pass1: event.target.value
   });
  }
  function handleChangePass2(event) {
    setData({
     ...data,
     pass2: event.target.value
   });
  }

  function handleChangePasswordDeleteConfirm(event) {
    setData({
     ...data,
     password: event.target.value
   });
  }

  useEffect(() => {
    fetch("/getLoggedInUserInfo", {
      method: "GET",
      headers: {'Content-Type': 'application/json'},
    })
      .then(resp => resp.json())
      .then(data => {
        if(data.status === "success"){
          let ret_data  = {
              email: data["user_email"],
              fname: data["user_fname"],
              lname: data["user_lname"],
              number: data["user_phone"],
          };
          setData(ret_data);
        }
        else{
          navigate("/");
        }
        })
      .catch(err => console.log(err));

  }, [editView]);


  if(editView){
    return (
      <div 
        className="Profile"
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
                    <Form.Label>Email</Form.Label>
                  </Col>
                  <Col>
                    <Form.Label>{data["email"]}</Form.Label>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="fname">
                <Row>
                  <Col>
                    <Form.Label>First Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control onChange={handleChangeFname} type="text" placeholder="John" value={data["fname"]}/>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="lname">
                <Row>
                  <Col>
                    <Form.Label>Last Name</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control onChange={handleChangeLname} type="text" placeholder="Doe" value={data["lname"]}/>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="number">
                <Row>
                  <Col>
                    <Form.Label>Phone Number</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control onChange={handleChangeNumber} type="tel" placeholder="123-456-7890" value={data["number"]} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="pass1">
                <Row>
                  <Col>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control onChange={handleChangePass1} placeholder="Leave blank to keep original password" type="password"/>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mb-3" controlId="pass2">
                <Row>
                  <Col>
                    <Form.Label>Re-Enter Password</Form.Label>
                  </Col>
                  <Col>
                    <Form.Control onChange={handleChangePass2} placeholder="Leave blank to keep original password" type="password"/>
                  </Col>
                </Row>
              </Form.Group>
              {error && errorMsg}
              <Row>
                <Col>
                  <Button size="sm" variant="primary" type="Submit">
                    Update Account 
                  </Button>
                </Col>
              </Row>
              <Row className="pt-2">
                <Col>
                  <Button onClick={toggleProfileEditor} size="sm" variant="secondary" type="Submit">
                    Cancel 
                  </Button>{' '}
                  {data["deleteAccount"] ? 
                    <Row>
                      <Col>
                      <Form.Group className="mb-3 pt-3" controlId="pass1">
                        <Row>
                          <Col>
                            <Form.Label>Re-type Password</Form.Label>
                          </Col>
                          <Col>
                            <Form.Control type="password" defaultValue="" onChange={handleChangePasswordDeleteConfirm}/>
                          </Col>
                        </Row>
                      </Form.Group>
                      {deleteError && deleteErrorMsg}
                      <Button variant="danger" onClick={deleteAccountSubmit(props)}>Confirm Delete Account</Button>
                      </Col>
                    </Row>
                    :
                    <Button onClick={deleteAccount} size="sm" variant="danger">
                      Delete Account 
                    </Button>}
                </Col>
              </Row>
            </Form> 
          </Container>
        </div>
      </div>

    );
  }
  else{
    return (
      <div 
        className="Profile"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: "50%" }} className="p-3 bg-light border">
          <Container>
          <Row>
            <Col>
             Email 
            </Col>
            <Col>
             {data["email"]}
            </Col>
          </Row>
          <Row>
            <Col>
              First Name 
            </Col>
            <Col>
             {data["fname"]} 
            </Col>
          </Row>
          <Row>
            <Col>
              Last Name 
            </Col>
            <Col>
             {data["lname"]} 
            </Col>
          </Row>
          <Row>
            <Col>
             Phone Number 
            </Col>
            <Col>
             {data["number"]} 
            </Col>
          </Row>
        </Container>
        <Button onClick={logout(props)}>Logout</Button> {' '}
        <Button onClick={toggleProfileEditor}>Edit profile</Button> {' '}
        <Button onClick={() => navigate("/my-lessons")}>My Lessons</Button>
      </div>
  </div> 
    );
  }
  
}

export default Profile;
