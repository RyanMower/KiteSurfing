import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function MyLessons() {
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [hasLessons, setHasLessons] = useState(false);

  function deleteLesson(id){
    fetch("/deleteLesson",{
      method: "POST",
      body: JSON.stringify({
        "id": id,
      }),
      headers: {"Content-Type": "application/json"},
    }) 
      .then(resp => resp.json())
      .then(data => {
        setHasLessons(false);
        if (data["status"] == "success"){
          fetch("/getMyLessons") 
            .then(resp => resp.json())
            .then(data => {
              if (data["data"].length > 0){
                setHasLessons(true);
              }
              setLessons(data["data"]);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
    return;
  }

  useEffect(() => {
    fetch("/getMyLessons") 
      .then(resp => resp.json())
      .then(data => {
        if (data["data"].length > 0){
          setHasLessons(true);
        }
        setLessons(data["data"]);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="MyLessons">
      <Container>
        {hasLessons ? lessons.map((lesson, index) => (
        <div className="pt-3" key={index}>
          <Card className="mx-auto" >
            <Card.Header className="bg-dark text-white">{lesson["fname"]} {lesson["lname"]}</Card.Header>
            <Card.Body>
              <Card.Title>{lesson["contact_info"]}</Card.Title>
              <Card.Text>
                {lesson["location"]}
              </Card.Text>
              <Card.Text>
                {lesson["pricing"]}
              </Card.Text>
              <Button 
                style={{
                  display: 'flex',
                  alignItems: 'left',
                  justifyContent: 'left',
                }} 
                onClick={() => deleteLesson(lesson["id"])} variant="danger"
              >
                  Delete Lesson      
              </Button>
            </Card.Body>
          </Card>
        </div>
        ))
        :
          <h3>Sorry, you don't have any lessons at the moment.</h3>
        }
      </Container>
    </div>
  );
}

export default MyLessons;



