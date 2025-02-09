import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'

export default function About() {
  return (
    <Container className="mb-3">
    <Row className="mb-4">
      <Col>
        <h1>About Double D Cattle Company</h1>
        <p>
          Welcome to Double D Cattle Company, a sanctuary where the spirit of wild mustangs runs free. Founded by two best friends, David and Dwight, who have been inseparable for 19 years, our company is built on a foundation of friendship, passion, and a deep love for animals.
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Our Founders</h2>
        <p>
          David and Dwight have over 20 years of experience in training animals. Their journey together began with a shared dream of inspiring future riders to the joys of mustangs, and today, Double D Cattle Company stands as a testament to their dedication and hard work.
        </p>
      </Col>
    </Row>

    <Row className="mb-4">
      <Col>
        <h2>Why People Love Mustangs</h2>
        <p>
          Mustangs are a symbol of freedom and wild beauty. Their untamed spirit and resilience are truly inspiring. People love mustangs for their intelligence, loyalty, and the deep connection they form with their handlers. Their history as free-roaming horses of the American West adds to their allure, making them a beloved breed among horse enthusiasts.
        </p>
        <ul>
          <li>Symbol of Freedom: Mustangs represent the untamed beauty of nature.</li>
          <li>Resilience: They have adapted and thrived in the wild, showcasing incredible strength.</li>
          <li>Intelligence: Mustangs are known for their sharp minds and quick learning abilities.</li>
          <li>Loyalty: Once trained, they form deep bonds with their handlers.</li>
          <li>Rich History: Their legacy as the wild horses of the American West adds to their mystique.</li>
        </ul>
      </Col>
    </Row>

    <Row>
      <Col>
        <Card>
          <Card.Body>
            <h3>Meet Our Horses</h3>
            <p>
              At Double D Cattle Company, our mustangs are more than just animals—they are family. We invite you to meet our beloved mustangs and learn more about their unique personalities.
            </p>
            <Button  href="/horses" variant="primary">View Our Horses</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  )
}
