import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router';
import { Tabs, Tab, Row, Col, Card } from 'react-bootstrap';
import { useGetHorseQuery, useDeleteHorseMutation } from '../slices/apiSlice';
import HorseForm from '../forms/HorseForm';
import MediaForm from '../forms/MediaForm';
import MediaCard from '../components/MediaCard';
import HorseMedia from './HorseMedia';
import HorseMedical from './HorseMedical';
import HorseRiding from './HorseRiding';

const HorseDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const activeTab = query.get('tab') || 'general';
  const { data: horse, isLoading, isError } = useGetHorseQuery(id);

  const handleSelect = (key) => {
    navigate(`?tab=${key}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading horse details.</div>;

  const baseUrl = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';
  const profileImageUrl = horse.profileImage ? `${baseUrl}${horse.profileImage}` : '';

  return (
    <div>
      <Card className='border-0 p-2' style={{ width: '18rem', height: '15rem', overflow: 'hidden' }}>
        <img src={profileImageUrl} alt={horse.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </Card>

      <Tabs activeKey={activeTab} onSelect={handleSelect}>
        <Tab eventKey="general" title="General Info">
          <HorseForm horse={horse} />
        </Tab>
        <Tab eventKey="media" title="Media">
          <HorseMedia horse={horse} />
        </Tab>
        <Tab eventKey="medical" title="Medical Records">
         <HorseMedical horse={horse} />
        </Tab>
        <Tab eventKey="riding" title="Riding Logs">
          <HorseRiding horse={horse} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default HorseDetails;
