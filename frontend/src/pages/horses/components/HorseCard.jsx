import React, { Suspense, lazy } from 'react'
import { Button, Card } from 'react-bootstrap';
import barnDoor from '../../../assets/barn_door.png';
import { LiaHorseHeadSolid } from "react-icons/lia";
import { useNavigate } from 'react-router';
import LoadingImage from '../../../components/LoadingImage';

const CardImage = lazy(() => import('./HorseCardImage'));
const HorseCard = ({ horse }) => {
    const navigate = useNavigate();
    const imageUrlPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';
    return (
        <Card className="h-100  p-3" >
            <div className='d-flex justify-content-center align-items-center'>
                <LoadingImage
                    src={`${imageUrlPrefix}${horse.profileImage}`}
                    alt={horse.name}
                    className="card-image-top border  "
                />
            </div>

            <Card.Body  >
                <p className='m-1 p-0'>Breed: {horse.breed}</p>
                <p className='m-1 p-0'>Age: {horse.age}</p>
                <p className='m-1 p-0'>Hands: {horse.height}</p>
                <p className='m-1 p-0'>Weight: {horse.weight}</p>
                <p className='m-1 p-0'>Sex: {horse.sex}</p>
                <Button className='w-100 d-flex justify-content-between' onClick={() => navigate(`/horses/${horse.name}`)}>
                    <LiaHorseHeadSolid />
                    View Details
                    <LiaHorseHeadSolid />
                </Button>
                <div className="stall-doors">
                    <div className="door">
                        <h6 className='horse-name'>{horse.name}</h6>
                        <img src={barnDoor} alt="" />
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default HorseCard
