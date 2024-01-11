import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';
import './StockGroupList.css';

const StockGroupList = () => {
    const [stockGroups, setStockGroups] = useState([]);
    const [selectedStockGroup, setSelectedStockGroup] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [updateStockGroupName, setUpdateStockGroupName] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createType, setCreateType] = useState(null); // 'single' or 'multiple'
    const { userId, companyId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9098/stockgroup/getByUserAndCompany/${userId}/${companyId}`);
                setStockGroups(response.data);
            } catch (error) {
                console.error('Error fetching stock groups:', error);
            }
        };

        fetchData();
    }, [userId, companyId]);

    const handleUpdate = (stockGroup) => {
        setSelectedStockGroup(stockGroup);
        setUpdateStockGroupName(stockGroup.stockGroupName);
        setShowUpdateModal(true);
    };

    const handleConfirmUpdate = async () => {
        try {
            // Implement the logic to update the stock group details
            await axios.put(`http://localhost:9098/stockgroup/update/${selectedStockGroup.stockGroupId}`, {
                stockGroupName: updateStockGroupName,
                userId: selectedStockGroup.userId, // Keep the userId the same
                companyId: selectedStockGroup.companyId, // Keep the companyId the same
                // Include other fields as needed
            });

            setShowUpdateModal(false);
            setStockGroups((prevGroups) =>
                prevGroups.map((group) =>
                    group.stockGroupId === selectedStockGroup.stockGroupId
                        ? { ...group, stockGroupName: updateStockGroupName }
                        : group
                )
            );
        } catch (error) {
            console.error('Error updating stock group:', error);
        }
    };

    const handleDelete = (stockGroup) => {
        setSelectedStockGroup(stockGroup);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:9098/stockgroup/delete/${selectedStockGroup.stockGroupId}`);
            setShowDeleteConfirmation(false);
            setStockGroups((prevGroups) => prevGroups.filter((group) => group.stockGroupId !== selectedStockGroup.stockGroupId));
        } catch (error) {
            console.error('Error deleting stock group:', error);
        }
    };

    const handleCloseModals = () => {
        setShowUpdateModal(false);
        setShowDeleteConfirmation(false);
        setShowCreateModal(false);
        setCreateType(null);
    };

    const handleCreate = () => {
        setShowCreateModal(true);
    };

    const handleSelectCreateType = (type) => {
        setShowCreateModal(false);
        setCreateType(type);

        // Redirect based on the selected create type
        if (type === 'single') {
            history.push(`/SingleStockGroup/${userId}/${companyId}`);
        } else if (type === 'multiple') {
            history.push(`/StockGroupForm/${userId}/${companyId}`);
        } else {
            // Handle invalid choice (optional)
            console.error('Invalid choice. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <MainNavBar />
            <div className='d-flex justify-content-between mb-3'>
                <Link to={`/CompanyHome/${userId}/${companyId}`} className='btn btn-secondary'>
                    <FaArrowLeft className='mr-2' />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Stock Groups</h3>
                <button className='btn btn-primary' onClick={handleCreate}>
                    Create Stock Group
                </button>
            </div>
            <table className="table table-info table-borderless text-center">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Stock Group Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockGroups.map((stockGroup, index) => (
                        <tr key={stockGroup.stockGroupId}>
                            <td>{index + 1}</td>
                            <td>{stockGroup.stockGroupName}</td>
                            <td>
                                <Button variant="warning" onClick={() => handleUpdate(stockGroup)}>
                                    Update
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(stockGroup)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            <Modal show={showUpdateModal} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Stock Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="updateStockGroupName">
                        <Form.Label>Stock Group Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={updateStockGroupName}
                            onChange={(e) => setUpdateStockGroupName(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModals}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmUpdate}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirmation} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Stock Group</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this stock group?</p>
                    <div className='modal-ro'>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Yes, Delete
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModals}>
                            No, Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Create Modal */}
            {showCreateModal && (
                <Modal show={true} onHide={handleCloseModals}>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose Stock Group Creation Type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button variant="primary" onClick={() => handleSelectCreateType('single')} className="mr-2 stock-group-but">
                            Single Stock Group
                        </Button>
                        <Button variant="secondary" className='stock-group-but' onClick={() => handleSelectCreateType('multiple')}>
                            Multiple Stock Group
                        </Button>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default StockGroupList;
