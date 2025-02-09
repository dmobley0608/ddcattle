import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Row, Col, Button, Modal } from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import moment from 'moment';
import { useAddMedicalRecordMutation, useUpdateMedicalRecordMutation, useDeleteMedicalRecordMutation } from '../slices/apiSlice';

const HorseMedical = ({ horse }) => {

    const [medicalRecords, setMedicalRecords] = useState(horse?.medicalRecords || []);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [wormed, setWormed] = useState('');
    const [coggins, setCoggins] = useState('');
    const [yearlyVaccines, setYearlyVaccines] = useState('');
    const [trimmed, setTrimmed] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentRecord, setCurrentRecord] = useState({
        date: '',
        description: '',
        vet: '',
        notes: '',
        weight: '',
        height: '',
        wormed: false,
        coggins: false,
        yearly_vaccines: false,
        trimmed: false,
        horseId: horse.id,
    });
    const [addMedicalRecord] = useAddMedicalRecordMutation();
    const [updateMedicalRecord] = useUpdateMedicalRecordMutation();
    const [deleteMedicalRecord] = useDeleteMedicalRecordMutation();

    useEffect(() => {setMedicalRecords(horse?.medicalRecords || [])}, [horse]);
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditMode(false);
        setCurrentRecord({
            date: '',
            description: '',
            vet: '',
            notes: '',
            weight: '',
            height: '',
            wormed: false,
            coggins: false,
            yearly_vaccines: false,
            trimmed: false,
            horseId: horse.id,
        });
    };
    const handleModalShow = () => setShowModal(true);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setCurrentRecord({
            ...currentRecord,
            [name]: type === 'checkbox' ? checked : value || '',
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formattedDate = moment(currentRecord.date).startOf('day').toDate();
        const recordToSubmit = {
            ...currentRecord,
            date: formattedDate,
            weight: currentRecord.weight || null,
            height: currentRecord.height || null,
        };
        if (editMode) {
            await updateMedicalRecord({ id: currentRecord.id, ...recordToSubmit });
        } else {
            await addMedicalRecord(recordToSubmit);
        }
        handleModalClose();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this medical record?')) {
            await deleteMedicalRecord(id);
        }
    };

    const handleEdit = (record) => {
        setCurrentRecord({ ...record, date: moment(record.date).format('YYYY-MM-DD') });
        setEditMode(true);
        handleModalShow();
    };

    const filteredRecords = medicalRecords.filter(record => {
        const matchesDescription = record.description?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDateRange = (!startDate || moment(record.date).isSameOrAfter(startDate)) &&
            (!endDate || moment(record.date).isSameOrBefore(endDate));
        const matchesWormed = wormed === '' || record.wormed === (wormed === 'true');
        const matchesCoggins = coggins === '' || record.coggins === (coggins === 'true');
        const matchesYearlyVaccines = yearlyVaccines === '' || record.yearly_vaccines === (yearlyVaccines === 'true');
        const matchesTrimmed = trimmed === '' || record.trimmed === (trimmed === 'true');
        return matchesDescription && matchesDateRange && matchesWormed && matchesCoggins && matchesYearlyVaccines && matchesTrimmed;
    });

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);


    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationItems = () => {
        const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);
        const paginationItems = [];

        paginationItems.push(
            <Pagination.First
                key="first"
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
            />
        );

        paginationItems.push(
            <Pagination.Prev
                key="prev"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
            />
        );

        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
            paginationItems.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => paginate(i)}
                >
                    {i}
                </Pagination.Item>
            );
        }

        paginationItems.push(
            <Pagination.Next
                key="next"
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
        );

        paginationItems.push(
            <Pagination.Last
                key="last"
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
            />
        );

        return paginationItems;
    };

    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search by description"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-75"
                />
                <Button variant="primary" onClick={handleModalShow}>
                    <FaPlus />
                </Button>
            </div>
            <Row className="mb-3">
                <Col>
                    <Form.Control
                        type="date"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={handleFilterChange(setStartDate)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={handleFilterChange(setEndDate)}
                    />
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        value={wormed}
                        onChange={handleFilterChange(setWormed)}
                    >
                        <option value="">Wormed</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        value={coggins}
                        onChange={handleFilterChange(setCoggins)}
                    >
                        <option value="">Coggins</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        value={yearlyVaccines}
                        onChange={handleFilterChange(setYearlyVaccines)}
                    >
                        <option value="">Yearly Vaccines</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Control
                        as="select"
                        value={trimmed}
                        onChange={handleFilterChange(setTrimmed)}
                    >
                        <option value="">Trimmed</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </Form.Control>
                </Col>
            </Row>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Vet</th>
                        <th>Notes</th>
                        <th>Weight</th>
                        <th>Height</th>
                        <th>Wormed</th>
                        <th>Coggins</th>
                        <th>Yearly Vaccines</th>
                        <th>Trimmed</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRecords.map(record => (
                        <tr key={record.id}>
                            <td>{moment(record.date).format('MMM DD YYYY')}</td>
                            <td>{record.description}</td>
                            <td>{record.vet}</td>
                            <td>{record.notes}</td>
                            <td>{record.weight}</td>
                            <td>{record.height}</td>
                            <td>{record.wormed ? 'Yes' : 'No'}</td>
                            <td>{record.coggins ? 'Yes' : 'No'}</td>
                            <td>{record.yearly_vaccines ? 'Yes' : 'No'}</td>
                            <td>{record.trimmed ? 'Yes' : 'No'}</td>
                            <td>
                                <div className="d-flex">
                                    <Button variant="" onClick={() => handleEdit(record)} className="me-2">
                                        <FaEdit />
                                    </Button>
                                    <Button variant="" onClick={() => handleDelete(record.id)}>
                                        <FaTrash />
                                    </Button>
                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Pagination>
                {renderPaginationItems()}
            </Pagination>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? 'Edit Medical Record' : 'Add Medical Record'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={currentRecord.date || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                name="description"
                                value={currentRecord.description || ''}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formVet">
                            <Form.Label>Vet</Form.Label>
                            <Form.Control
                                type="text"
                                name="vet"
                                value={currentRecord.vet || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notes"
                                value={currentRecord.notes || ''}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWeight">
                            <Form.Label>Weight</Form.Label>
                            <Form.Control
                                type="number"
                                name="weight"
                                value={currentRecord.weight || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formHeight">
                            <Form.Label>Height</Form.Label>
                            <Form.Control
                                type="number"
                                name="height"
                                value={currentRecord.height || ''}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formWormed">
                            <Form.Check
                                type="checkbox"
                                name="wormed"
                                label="Wormed"
                                checked={currentRecord.wormed}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCoggins">
                            <Form.Check
                                type="checkbox"
                                name="coggins"
                                label="Coggins"
                                checked={currentRecord.coggins}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formYearlyVaccines">
                            <Form.Check
                                type="checkbox"
                                name="yearly_vaccines"
                                label="Yearly Vaccines"
                                checked={currentRecord.yearly_vaccines}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTrimmed">
                            <Form.Check
                                type="checkbox"
                                name="trimmed"
                                label="Trimmed"
                                checked={currentRecord.trimmed}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default HorseMedical;
