import { Container, Row, Col } from 'react-grid';
import React, { useState, useEffect } from "react";

function Profile() {
  const [data, setData] = useState({
    email: "",
    fname: "",
    lname: "",
    number: "",
  });

      /*
    useEffect(() => {
      fetch("/getLoggedInUserInfo", {
        method: "GET",
        headers: {'Content-Type': 'application/json'},
      })
        .then(resp => resp.json())
        .then(data => {
          if(data.status === "success"){
            let data  = {
                email: data["user_email"],
                fname: data["user_fname"],
                lname: data["user_lname"],
                number: data["user_phone"],
            };
            setData(data);
          }
          })
        .catch(err => console.log(err));

    }, []);
    */


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
    </div>
  );
}

export default Profile;
