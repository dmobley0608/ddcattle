import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useUpdateHorseMutation } from '../slices/apiSlice';

const HorseForm = ({ horse }) => {
  const [updateHorse] = useUpdateHorseMutation();

  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    color: '',
    sex: '',
    foal_year: '',
    brand: '',
    HMA: '',
    description: '',
    deceased: '',
    off_property_rides: false,
  });

  useEffect(() => {
    if (horse) {
      setFormData({
        name: horse.name || '',
        breed: horse.breed || '',
        color: horse.color || '',
        sex: horse.sex || '',
        foal_year: horse.foal_year || '',
        brand: horse.brand || '',
        HMA: horse.HMA || '',
        description: horse.description || '',
        deceased: horse.deceased || '',
        off_property_rides: horse.off_property_rides || false,
      });
    }
  }, [horse]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateHorse({ id: horse.id, ...formData });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBreed" className="mb-3">
            <Form.Label>Breed</Form.Label>
            <Form.Control
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Breed"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formColor" className="mb-3">
            <Form.Label>Color</Form.Label>
            <Form.Control
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Color"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formSex" className="mb-3">
            <Form.Label>Sex</Form.Label>
            <Form.Control
              type="text"
              name="sex"
              value={formData.sex}
              onChange={handleChange}
              placeholder="Sex"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formFoalYear" className="mb-3">
            <Form.Label>Foal Year</Form.Label>
            <Form.Control
              type="number"
              name="foal_year"
              value={formData.foal_year}
              onChange={handleChange}
              placeholder="Foal Year"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formBrand" className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="formHMA" className="mb-3">
            <Form.Label>HMA</Form.Label>
            <Form.Control
              type="text"
              name="HMA"
              value={formData.HMA}
              onChange={handleChange}
              placeholder="HMA"
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="formDeceased" className="mb-3">
            <Form.Label>Deceased</Form.Label>
            <Form.Control
              type="date"
              name="deceased"
              value={formData.deceased}
              onChange={handleChange}
              placeholder="Deceased"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group controlId="formDescription" className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </Form.Group>
      <Form.Group controlId="formOffPropertyRides" className="mb-3">
        <Form.Check
          type="checkbox"
          label="Off Property Rides"
          name="off_property_rides"
          checked={formData.off_property_rides}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update Horse
      </Button>
    </Form>
  );
};

export default HorseForm;
