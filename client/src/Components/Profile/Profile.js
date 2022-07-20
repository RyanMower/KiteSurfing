import { Container, Row, Col } from 'react-grid';
import React, { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [editView, setEditView] = useState(false);
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
    number: "",
    deleteAccount: false,
    password: "",
  });

  function logout(){
    fetch("/logout", {
      method: "GET",
    })
      .then(
        navigate("/")
      )
      .catch(err => {
        console.log(err);
        navigate("/");
      });

  }
  function deleteAccount(){
    setData({
     ...data,
     deleteAccount: true,
   });
  }
  function deleteAccountSubmit(){
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
        console.log("Account Deleted");
        console.log(data); 
      })
      .catch(err => console.log(err));

  }

  function handleSubmit(event){
    event.preventDefault();
    // SUVMIT DATA TO BACKEND HERE
    fetch("/updateAccount",{
      method: "POST",
      body: JSON.stringify({
        email: data["email"],
        "first-name": data["fname"],
        "last-name": data["lname"],
        "phone-number": data["number"],
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        console.log("Profile Updated");
        console.log(data); 
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
        })
      .catch(err => console.log(err));

  }, [editView]);


  if(editView){
    return (
      <div className="Profile">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
            Email:
            </label>
            <label>
              {data["email"]}
            </label>
          </div>
          <div>
            <label>
            First Name:
            <input type="text" value={data["fname"]} onChange={handleChangeFname}/>
            </label>
          </div>
          <div>
            <label>
            Last Name:
            <input type="text" value={data["lname"]} onChange={handleChangeLname}/>
            </label>
          </div>
          <div>
            <label>
            Phone Number:
            <input type="text" value={data["number"]} onChange={handleChangeNumber}/>
            </label>
          </div>
          <input type="submit" value="Update Account" />
        </form>
        <Button onClick={toggleProfileEditor}>Cancel</Button>
        {data["deleteAccount"] ? 
          <>
          <Button onClick={deleteAccountSubmit}>Delete Account</Button>
          <div>
            <label>
            Re-Enter Password:
            <input type="text" defaultValue="" onChange={handleChangePasswordDeleteConfirm}/>
            </label>
          </div>
          </>
          :
        <Button onClick={deleteAccount}>Delete Account</Button> }
      </div>

    );
  }
  else{
    return (
      <div className="Profile">
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
      <Button onClick={logout}>Logout</Button>
      <Button onClick={toggleProfileEditor}>Edit profile</Button>
      </div> 
    );
  }
  
}

export default Profile;
