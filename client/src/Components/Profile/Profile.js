import { Container, Row, Col } from 'react-grid';
import React, { useState, useEffect } from "react";
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [editView, setEditView] = useState(false);
  const [page, setPage] = useState();
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
    number: "",
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

  function handleSubmit(){
    // SUVMIT DATA TO BACKEND HERE
    // TODO

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
          <input type="submit" value="Submit" />
        </form>
        <Button onClick={toggleProfileEditor}>Edit profile</Button>
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
