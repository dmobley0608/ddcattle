import React from 'react'
import { Container, Row, Col, Image } from 'react-bootstrap'
import cowTutu from '../assets/tutu_cow.png'
import cowDanceTutu from '../assets/cow_dance_tutu.png'
import laughingHorses from '../assets/laughing horses.png'
export default function Cattle() {
  return (
    <Container fluid className="justify-content-center align-items-center mt-5">
    <Container className="mt-3 align-items-center justify-content-center">
      <h3>Where are the cows? Funny you ask. Turns out, we’re so wrapped up with our mustangs that we haven’t gotten around to buying any cows yet! Mustangs have stolen our hearts, and for now, that’s where our focus is.</h3>
    </Container>
    <div>
      <div className="justify-content-start m-auto my-5">
        <p>
          Once upon a time at the Double D Cattle Company, the cows and mustangs lived harmoniously. The mustangs galloped around freely, while the cows, well... chewed grass and looked bored. One day, the head cow named Bessie had a brilliant idea. “Why should we let the mustangs have all the fun?”
        </p>
      </div>
      <Row className="justify-content-center align-items-center rounded mb-3">
        <Col md={3} className="col-12">
          <Image className="w-100" src={cowTutu} alt="cow in tutu" />
        </Col>
        <Col md={6} className="col-12 m-auto">
          <p>
            The next morning, Bessie rounded up her cow friends and announced they would form a dance troupe. Each cow tied a makeshift tutu around their waist and started practicing their pirouettes and plies. Bessie even organized a big recital to showcase their talents.
          </p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="col-12 m-auto">
          <p>
            Come recital day, the mustangs gathered around, munching on popcorn. Bessie and her troupe began their performance with an impressive grand jeté. But the cows’ grace was short-lived. One cow tripped over her tutu, causing a domino effect of tumbling cows.
          </p>
        </Col>
        <Col md={3} className="col-12">
          <Image className="w-100" src={cowDanceTutu} alt="cow in tutu" />
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md={3} className="col-12">
          <Image className="w-100 p-1" src={laughingHorses} alt="laughing horses" />
        </Col>
        <Col md={9} className="col-12">
          <p className="pt-5">
            The mustangs couldn't help but laugh at the cow calamity. Mortified, Bessie decided that perhaps cows should stick to what they do best—chewing cud and mooing melodically. Embarrassed by their failed attempt at ballet, the cows decided to pack their bags and move to a ranch where they could blend in with the pasture and not the pirouettes.
          </p>
        </Col>
      </Row>
      <p className="mt-3">
        And that’s why today, the Double D Cattle Company is solely home to the majestic mustangs and a donkey, who still chuckle about the day the cows tried to dance. 🐄💃🐎
      </p>
    </div>
  </Container>
  )
}
