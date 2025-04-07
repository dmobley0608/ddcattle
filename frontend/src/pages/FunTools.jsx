import React, { useState } from 'react';
import { Container, Row, Col, Button, Image, Card, Alert, Badge } from 'react-bootstrap';

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
  const [showInstructions, setShowInstructions] = useState(true);

  const handleImageClick = (number) => {
    if (brand.length < 8) {
      setBrand([...brand, number]);
    }
  };

  const handleReset = () => {
    setBrand([]);
  };

  const decodeBrand = () => {
    if (brand.length !== 8) return null;

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
      <Card className="bg-light">
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="mb-2">
                <Badge bg="secondary">Foal Year</Badge>
                <h4 className="mt-1">{year}</h4>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2">
                <Badge bg="secondary">State</Badge>
                <h4 className="mt-1">{state}</h4>
              </div>
            </Col>
            <Col md={4}>
              <div className="mb-2">
                <Badge bg="secondary">Registration Number</Badge>
                <h4 className="mt-1">{number}</h4>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
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
    <Container className="py-4">
      <Card className="shadow-sm mb-4">
        <Card.Header className="bg-primary text-white">
          <h2 className="mb-0">Horse Brand Decoder</h2>
        </Card.Header>
        <Card.Body>
          {showInstructions && (
            <Alert variant="info" dismissible onClose={() => setShowInstructions(false)}>
              <Alert.Heading>How to Use the Brand Decoder</Alert.Heading>
              <p>Click on the brand symbols below in the sequence they appear on your horse. The tool requires all 8 digits to properly decode. The first two digits represent the year, and the remaining six digits contain registration information.</p>
            </Alert>
          )}

          <h4 className="mb-3">Select Brand Symbols</h4>
          <Row className="mb-4">
            {images.map(({ number, src }) => (
              <Col key={number} xs={4} sm={3} md={2} lg={1} className="text-center mb-3">
                <Card
                  className="brand-symbol-card h-100"
                  onClick={() => handleImageClick(number)}
                  style={{ cursor: 'pointer' }}
                >
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center p-2">
                    <Image
                      src={src}
                      alt={`Symbol ${number}`}
                      style={{ maxWidth: '45px', maxHeight: '45px' }}
                      className="mb-2"
                    />
                    <div className="text-center">{number}</div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Current Brand Sequence</h5>
              <Button variant="outline-danger" size="sm" onClick={handleReset}>
                Reset
              </Button>
            </Card.Header>
            <Card.Body>
              <Row className="align-items-center">
                <Col>
                  <div className="d-flex justify-content-center align-items-center">
                    {brand.length > 0 ? (
                      brand.map((digit, index) => (
                        <div
                          key={index}
                          className="mx-1 border rounded text-center"
                          style={{ width: '40px', height: '40px', lineHeight: '40px', backgroundColor: '#f8f9fa' }}
                        >
                          {digit}
                        </div>
                      ))
                    ) : (
                      <p className="text-muted">No brand selected. Click symbols above to begin.</p>
                    )}

                    {brand.length < 8 && brand.length > 0 && Array(8 - brand.length).fill(0).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="mx-1 border rounded text-center"
                        style={{ width: '40px', height: '40px', lineHeight: '40px', backgroundColor: '#f8f9fa', opacity: 0.3 }}
                      >
                        -
                      </div>
                    ))}
                  </div>

                  <div className="progress mt-3" style={{ height: '5px' }}>
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${(brand.length / 8) * 100}%` }}
                      aria-valuenow={(brand.length / 8) * 100}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="text-end mt-1">
                    <small className="text-muted">{brand.length}/8 digits</small>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          <h4 className="mb-3">Decoded Information</h4>
          {brand.length === 8 ? (
            decodeBrand()
          ) : (
            <Alert variant="warning">
              Please enter all 8 digits of the brand to decode the information.
              {brand.length > 0 && <div className="mt-2"><strong>{8 - brand.length}</strong> more digits needed.</div>}
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default FunTools;
