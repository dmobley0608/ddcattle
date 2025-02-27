import React from 'react'
import { Card } from 'react-bootstrap'

const imageUrlPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:3002' : '';
const HorseCardImage = ({horse}) => {

  return (
    <Card.Img
    variant="top"
    src={`${imageUrlPrefix}${horse.profileImage}`}
    alt={horse.name}
    className="card-image-top"
    loading="lazy"
/>
  )
}

export default HorseCardImage
