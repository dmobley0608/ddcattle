import React, { useState, useEffect } from 'react';
import { Table, Pagination, Form, Button, Modal } from 'react-bootstrap';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';
import moment from 'moment';
import { useAddRidingLogMutation, useDeleteRidingLogMutation, useUpdateRidingLogMutation } from '../slices/apiSlice';

const HorseRiding = ({ horse = { ridingLogs: [] } }) => {
    const [addRidingLog] = useAddRidingLogMutation();
    const [deleteRidingLog] = useDeleteRidingLogMutation();
    const [updateRidingLog] = useUpdateRidingLogMutation();
    const [ridingLogs, setRidingLogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [logsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentLog, setCurrentLog] = useState({ date: '', notes: '' });

    useEffect(() => {
        setRidingLogs([...horse.ridingLogs].sort((a, b) => new Date(b.date) - new Date(a.date)));
    }, [horse]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditMode(false);
        setCurrentLog({ date: '', notes: '' });
    };
    const handleModalShow = () => setShowModal(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCurrentLog({ ...currentLog, [name]: value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formattedDate = moment(currentLog.date).startOf('day').format('YYYY-MM-DD').replace(/-/g, '/');

        if (editMode) {
            await updateRidingLog({ id: currentLog.id, date: new Date(formattedDate), notes: currentLog.notes });
        } else {
            await addRidingLog({ ...currentLog, date: new Date(formattedDate), horseId: horse.id });
        }
        handleModalClose();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this riding log?')) {
            await deleteRidingLog(id);
        }
    };

    const handleEdit = (log) => {
        setCurrentLog({ ...log, date: moment(log.date).format('YYYY-MM-DD') });
        setEditMode(true);
        handleModalShow();
    };

    const filteredLogs = ridingLogs.filter(log =>
        log.notes.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const renderPaginationItems = () => {
        const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
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
                    placeholder="Search by notes"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-75"
                />
                <Button variant="primary" onClick={handleModalShow}>
                    <FaPlus />
                </Button>
            </div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentLogs.map(log => (
                        <tr key={log.id}>
                            <td>{moment(log.date).format('MMM DD YYYY')}</td>
                            <td>{log.notes}</td>
                            <td>
                                <div className='d-flex'>
                                <Button variant="" size={'sm'} onClick={() => handleEdit(log)} className="me-2">
                                    <FaEdit />
                                </Button>

                                <Button variant="" size={'sm'} onClick={() => handleDelete(log.id)}>
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
                    <Modal.Title>{editMode ? 'Edit Riding Log' : 'Add Riding Log'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={currentLog.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="notes"
                                value={currentLog.notes}
                                onChange={handleInputChange}
                                rows={3}
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

export default HorseRiding;
