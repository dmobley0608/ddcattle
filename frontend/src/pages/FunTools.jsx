import React, { useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';

// Import images
import img0 from '../assets/brand-symbols/0.png';
import img1 from '../assets/brand-symbols/1.png';
import img2 from '../assets/brand-symbols/2.png';
import img3 from '../assets/brand-symbols/3.png';
import img4 from '../assets/brand-symbols/4.png';
import img5 from '../assets/brand-symbols/5.png';
import img6 from '../assets/brand-symbols/6.png';
import img7 from '../assets/brand-symbols/7.png';
import img8 from '../assets/brand-symbols/8.png';
import img9 from '../assets/brand-symbols/9.png';

function FunTools() {
  const [brand, setBrand] = useState([]);

  const handleImageClick = (number) => {
    if (brand.length < 8) {
      setBrand([...brand, number]);
    }
  };

  const handleReset = () => {
    setBrand([]);
  };

  const decodeBrand = () => {
    if (brand.length !== 8) return "";


    const yearPrefix = brand[0] > 5 ? '19' : '20';
    const year = `${yearPrefix}${brand[0]}${brand[1]}`;
    const number = parseInt(brand.slice(2).join(''), 10);

    let state = "Unknown";
    if (number >= 80001 && number <= 160000) state = "Arizona";
    else if (number >= 240001 && number <= 320000) state = "Colorado";
    else if (number >= 160001 && number <= 240000) state = "California";
    else if (number >= 400001 && number <= 480000) state = "Montana";
    else if (number >= 480001 && number <= 640000) state = "Nevada";
    else if (number >= 640001 && number <= 720000) state = "New Mexico";
    else if (number >= 0 && number <= 80000) state = "Oregon";
    else if (number >= 720001 && number <= 800000) state = "Utah";
    else if (number >= 800001 && number <= 880000) state = "Wyoming";
    else if (number >= 880001 && number <= 880100) state = "Eastern States";

    return (
      <>
        <div>Estimated Foal Year: {year}</div>
        <div>State: {state}</div>
        <div>Registration Number: {number}</div>
      </>
    );
  };

  const images = [
    { number: 0, src: img0 },
    { number: 1, src: img1 },
    { number: 2, src: img2 },
    { number: 3, src: img3 },
    { number: 4, src: img4 },
    { number: 5, src: img5 },
    { number: 6, src: img6 },
    { number: 7, src: img7 },
    { number: 8, src: img8 },
    { number: 9, src: img9 },
  ];

  return (
    <Container>
      <h2>Decode Your Brand</h2>
      <small>Click Brand Image To Build Brand</small>
      <Row className="my-5">
        {images.map(({ number, src }) => (
          <Col key={number} xs={3} md={2} className="text-center mb-3">
            <Image
              src={src}
              alt={`Number ${number}`}
              onClick={() => handleImageClick(number)}
              style={{ cursor: 'pointer', maxWidth: '50px' }}
              rounded
            />
            <div>{number}</div>
          </Col>
        ))}
      </Row>
      <div className='mb-5'>
        <smal>Brand:</smal>
        <h3>{brand.join(' ')}</h3>
        <Button variant="warning" size="sm" onClick={handleReset}>Reset Brand</Button>
      </div>
      <div>
        <small>Decoded Information:</small>
        <h3>{decodeBrand()}</h3>
      </div>
    </Container>
  );
}

export default FunTools;
