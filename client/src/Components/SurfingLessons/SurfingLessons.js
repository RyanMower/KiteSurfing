import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Button} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function SurfingLessons() {
  const navigate = useNavigate();

  const [lessons, setLessons] = useState([]);

  function handleSubmit(event){
    event.preventDefault();
    // Requery data from server here
    //var { name, location, price, distance } = document.forms[0];
    var { name } = document.forms[0];
    let location = "";
    let price = "";
    let distance = "";
    let contact_info = ""
    fetch("/getLessons",{
      method: "POST",
      body: JSON.stringify({
        "name": name.value,
        "location": location.value,
        "price": price.value,
        "distance": distance.value,
        "contact-info": contact_info.value,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        setLessons(data["data"]);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    fetch("/getLessons",{
      method: "POST",
      body: JSON.stringify({
        "name": "",
        "location": "",
        "distance": "",
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        setLessons(data["data"]);
      })
      .catch(err => console.log(err));
  }, []);


  return (
    <div className="SurfingLessons">
      <Container fluid>
        <Row>
          <Col className="pt-3" xs={3}>
            <div className="form p-2 bg-light border">
              <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="name">
                    <Row>
                      <Col>
                        <Form.Label>Name</Form.Label>
                      </Col>
                      <Col>
                        <Form.Control type="text" placeholder="John Doe" />
                      </Col>
                    </Row>
                  </Form.Group>
                <Row>
                  <Col>
                    <Button style={{ width:"100%" }} size="sm" variant="primary" type="submit">
                      Filter 
                    </Button>
                  </Col>
                  <Col>
                    <Button style={{ width:"100%" }} variant="secondary" size="sm" onClick={() => navigate("/become-instructor")}>Become an Instructor</Button>
                  </Col>
                </Row>
              </Form> 
            </div>
          </Col>
          <Col>
            {lessons.map((lesson, index) => (
            <div className="pt-3" key={index}>
              <Card className="mx-auto">
                <Card.Header className="bg-dark text-white">{lesson["fname"]} {lesson["lname"]}</Card.Header>
                <Card.Body>
                  <Card.Title>{lesson["contact_info"]}</Card.Title>
                  <Card.Text>
                    {lesson["location"]}
                  </Card.Text>
                  <Card.Text>
                    {lesson["pricing"]}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SurfingLessons;
