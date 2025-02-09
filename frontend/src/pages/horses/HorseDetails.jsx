import { useParams, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { Card, Container, Nav, Tab, Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './HorseDetails.css';
import { format } from 'date-fns';

// Import images
import inmgU from '../../assets/brand-symbols/U.png';
import img0 from '../../assets/brand-symbols/0.png';
import img1 from '../../assets/brand-symbols/1.png';
import img2 from '../../assets/brand-symbols/2.png';
import img3 from '../../assets/brand-symbols/3.png';
import img4 from '../../assets/brand-symbols/4.png';
import img5 from '../../assets/brand-symbols/5.png';
import img6 from '../../assets/brand-symbols/6.png';
import img7 from '../../assets/brand-symbols/7.png';
import img8 from '../../assets/brand-symbols/8.png';
import img9 from '../../assets/brand-symbols/9.png';

function HorseDetails() {
  const { name } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [horse, setHorse] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [ridingLogs, setRidingLogs] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const apiUrl = process.env.NODE_ENV === 'development' ? `http://localhost:3002/api/horses/name/${name}` : `/api/horses/name/${name}`;
  const imageUrlPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';

  const brandImages = [
    img0, img1, img2, img3, img4, img5, img6, img7, img8, img9
  ];

  useEffect(() => {
    const fetchHorse = async () => {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setHorse(data);
      setImages(data.media.filter(mediaItem => mediaItem.type === 'image'));
      setVideos(data.media.filter(mediaItem => mediaItem.type === 'video'));
      setRidingLogs(data.ridingLogs || []);
    };
    fetchHorse();
  }, [apiUrl]);

  const handleSelect = (key) => {
    navigate(`${location.pathname}?tab=${key}`);
  };

  const query = new URLSearchParams(location.search);
  const activeTab = query.get('tab') || 'images';

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageIndex(null);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNextLog = () => {
    setCurrentLogIndex((prevIndex) => (prevIndex + 1) % ridingLogs.length);
  };

  const handlePrevLog = () => {
    setCurrentLogIndex((prevIndex) => (prevIndex - 1 + ridingLogs.length) % ridingLogs.length);
  };

  if (!horse) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Card className="mt-3 p-5">
        <Card.Title>
          <h2>{horse.name}</h2>
        </Card.Title>
        <Card.Img variant="top" src={`${imageUrlPrefix}${horse.profileImage}`} alt={horse.name} className="mb-2 horse-image" />
        {horse.brand && (
          <div className='d-flex w-100 '>
            <Image className='me-2' src={inmgU} alt={`Brand digit U`} style={{ width: '30px' }} />
            <div className='d-flex flex-column me-2'>
              <Image src={brandImages[horse.brand[0]]} alt={`Brand digit ${horse.brand[0]}`} style={{ width: '15px' }} />
              <Image src={brandImages[horse.brand[1]]} alt={`Brand digit ${horse.brand[0]}`} style={{ width: '15px' }} />
            </div>
            <Row className=' border-bottom border-2 border-dark mx-2 p-0 justify-content-between'>
              {horse.brand.split('').map((digit, index) => {
                if (index > 1) {
                  return (
                    <Col key={index} xs={1} className="text-center ">
                      <Image src={brandImages[digit]} alt={`Brand digit ${digit}`} style={{ width: '25px' }} />
                    </Col>
                  )
                }
              })}
            </Row>
          </div>
        )}
        <Card.Body>
          <p>Breed: {horse.breed}</p>
          {horse.brand && <p>Brand: {horse.brand}</p>}
          {horse.HMA && <p>HMA: {horse.HMA}</p>}
          <p>Age: {horse.age}</p>
          <p>Hands: {horse.height}</p>
          <p>Weight: {horse.weight}</p>
          <p>Sex: {horse.sex}</p>
          {horse.description && <p>Description: {horse.description}</p>}
        </Card.Body>
      </Card>
      <Tab.Container activeKey={activeTab} onSelect={handleSelect}>
        <Nav variant="tabs" className="mt-3 sticky-tabs">
          <Nav.Item>
            <Nav.Link eventKey="images">Images</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="videos">Videos</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="riding-logs">Riding Logs</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-3">
          <Tab.Pane eventKey="images">
            <div className="image-gallery">
              {images.map((mediaItem, index) => (
                <img
                  key={index}
                  src={`${imageUrlPrefix}${mediaItem.url}`}
                  alt={`Horse media ${index}`}
                  className="thumbnail"
                  onClick={() => handleImageClick(index)}
                />
              ))}
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="videos">
            {videos.length > 0 ? (
              <div className="video-gallery">
                {videos.map((mediaItem, index) => (
                  <video key={index} controls className="video-thumbnail">
                    <source src={`${imageUrlPrefix}${mediaItem.url}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ))}
              </div>
            ) : (
              <p>No videos available for this horse.</p>
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="riding-logs">
            {ridingLogs.length > 0 ? (
              <div className="riding-log">
                <Button variant="secondary" onClick={handlePrevLog} className="me-2">
                  <FaArrowLeft />
                </Button>
                <div className="log-content">
                  <h3>{format(new Date(ridingLogs[currentLogIndex].date), 'MMM dd yyyy')}</h3>
                  <p>{ridingLogs[currentLogIndex].notes}</p>
                </div>
                <Button variant="secondary" onClick={handleNextLog} className="ms-2">
                  <FaArrowRight />
                </Button>
              </div>
            ) : (
              <p>No riding logs available for this horse.</p>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Body className="modal-body">
          <Button variant="secondary" onClick={handlePrevImage} className="me-2">
            <FaArrowLeft />
          </Button>
          <img src={`${imageUrlPrefix}${images[selectedImageIndex]?.url}`} alt="Selected" className="modal-image" />
          <Button variant="secondary" onClick={handleNextImage} className="ms-2">
            <FaArrowRight />
          </Button>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default HorseDetails;
