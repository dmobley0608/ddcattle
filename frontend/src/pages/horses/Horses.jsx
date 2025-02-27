import { useState, useEffect } from 'react';
import {  Col, Row } from 'react-bootstrap';


import './horses.styles.css';
import HorseCard from './components/HorseCard';


function Horses() {
  const [horses, setHorses] = useState([]);
  const apiUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002/api/horses' : '/api/horses';



  useEffect(() => {
    const fetchHorses = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setHorses(data);
    };
    fetchHorses();
  }, [apiUrl]);



  return (
    <div>
      <h2>Horses</h2>
      <Row>
        {horses.map(horse => (
          <Col sm={12} md={6} lg={4} xl={3} className="p-3 horse-container" key={horse.id}>
            <HorseCard horse={horse}  />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Horses;
