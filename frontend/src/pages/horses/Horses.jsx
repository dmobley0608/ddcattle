import { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { LiaHorseHeadSolid } from "react-icons/lia";
import './horses.styles.css';
import barnDoor from '../../assets/barn_door.png';

function Horses() {
  const [horses, setHorses] = useState([]);
  const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002/api/horses' : '/api/horses';
  const imageUrlPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHorses = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setHorses(data);
    };
    fetchHorses();
  }, [apiUrl]);

  const handleCardClick = (name) => {
    navigate(`/horses/${name}`);
  };

  return (
    <div>
      <h2>Horses</h2>
      <Row>
        {horses.map(horse => (
          <Col sm={12} md={6} lg={4} xl={3} className="p-3" key={horse.id}>
            <Card className="h-100 p-3" >
              <Card.Title>
                <h2>{horse.name}</h2>
              </Card.Title>
              <div className="image-container">
                <Card.Img variant="top" src={`${imageUrlPrefix}${horse.profileImage}`} alt={horse.name} className="card-image" />
              </div>
              <Card.Body>
                <p>Breed: {horse.breed}</p>
                <p>Age: {horse.age}</p>
                <p>Hands: {horse.height}</p>
                <p>Weight: {horse.weight}</p>
                <p>Sex: {horse.sex}</p>
                <Button className='w-100 d-flex justify-content-between'  onClick={() => handleCardClick(horse.name)}>
                  <LiaHorseHeadSolid/>
                  View Details
                  <LiaHorseHeadSolid/>
                </Button>
                <div className="stall-doors">
                  <div className="door">
                    <img src={barnDoor} alt="" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Horses;
