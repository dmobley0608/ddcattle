import { useParams, useLocation, useNavigate } from 'react-router';
import { useState, useEffect, lazy, Suspense } from 'react';
import { Card, Container, Nav, Tab, Modal, Button, Row, Col, Image } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './HorseDetails.css';
import { format } from 'date-fns';
import LoadingImage from '../../components/LoadingImage.jsx';

const HorseBrand = lazy(() => import('./components/HorseBrand.jsx'));
const GalleryImage = lazy(() => import('./components/GalleryImage.jsx'));
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
    <Container className='m-0 p-0'>
      <div className="mt-1 p-1">
        <div>
          <h2>{horse.name}</h2>
        </div>
        <div className='w-100 d-flex  justify-content-center justify-content-md-start' style={{maxWidth:'600px'}}>
          <LoadingImage variant="top" src={`${imageUrlPrefix}${horse.profileImage}`} alt={horse.name} className=" horse-image" />
        </div>

        {horse.brand && (
          <div className='my-2  d-flex justify-content-center' style={{maxWidth:'300px'}} >
            <Suspense fallback={<div>Loading...</div>}>
              <HorseBrand horse={horse} />
            </Suspense>
          </div>


        )}
        <div>
        {horse.brand && <p><b>Brand</b>: {horse.brand}</p>}
          <p><b>Breed</b>: {horse.breed}</p>
          {horse.HMA && <p><b>HMA</b>: {horse.HMA}</p>}
          <p><b>Age</b>: {horse.age}</p>
          <p><b>Hands</b>: {horse.height}</p>
          <p><b>Weight</b>: {horse.weight}</p>
          <p><b>Sex</b>: {horse.sex}</p>
          {horse.description && <p><b>Description</b>: <br/>{horse.description}</p>}
        </div>
      </div>
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
                <Suspense fallback={<div>Loading...</div>}>
                  <GalleryImage mediaItem={mediaItem} index={index} key={index} imageUrlPrefix={imageUrlPrefix} handleImageClick={handleImageClick} />
                </Suspense>
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
