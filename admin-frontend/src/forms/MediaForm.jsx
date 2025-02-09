import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, ProgressBar } from 'react-bootstrap';
import axios from 'axios'; // Import axios for manual upload
import { useAddHorseMediaMutation, useGetHorseQuery } from '../slices/apiSlice';

const MediaForm = ({horseId,className}) => {

    const [mediaFiles, setMediaFiles] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [addHorseMedia] = useAddHorseMediaMutation();
    const { refetch } = useGetHorseQuery(horseId);

    const handleFileChange = (e) => {
        setMediaFiles(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let i = 0; i < mediaFiles.length; i++) {
            formData.append('media', mediaFiles[i]);
        }
        setShowModal(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`http://localhost:3002/api/horses/${horseId}/media`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setUploadProgress(percentCompleted);
                }
            });
            refetch();
        } catch (error) {
            console.error('Error uploading media:', error);
        }
        setShowModal(false);
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className={className}>
                <Row justify="center" align="center">
                    <Col>
                        <Form.Group controlId="formMedia">
                            <Form.Control type="file" multiple onChange={handleFileChange} />
                        </Form.Group>
                    </Col>
                    <Col sm={2}>
                        <Form.Group>
                            <Button variant="primary" type="submit">
                                Upload
                            </Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Uploading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default MediaForm;
