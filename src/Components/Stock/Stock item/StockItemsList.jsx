import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';
import './StockItemForm.css';

const StockItemsList = () => {
    const [stockItems, setStockItems] = useState([]);
    const [selectedStockItem, setSelectedStockItem] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createType, setCreateType] = useState(null);
    const { userId, companyId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:9099/stockitem/getByUserIdAndCompanyId/${userId}/${companyId}`);
                setStockItems(response.data);
            } catch (error) {
                console.error('Error fetching stock items:', error);
            }
        };

        fetchData();
    }, [userId, companyId]);

    const handleView = (stockItem) => {
        setSelectedStockItem(stockItem);
        setShowViewModal(true);
    };

    const handleDelete = (stockItem) => {
        setSelectedStockItem(stockItem);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:9099/stockitem/delete/${selectedStockItem.stockItemId}`);
            setShowDeleteConfirmation(false);
            setStockItems((prevItems) => prevItems.filter((item) => item.stockItemId !== selectedStockItem.stockItemId));
        } catch (error) {
            console.error('Error deleting stock item:', error);
        }
    };

    const handleCloseModals = () => {
        setShowViewModal(false);
        setShowDeleteConfirmation(false);
        setShowCreateModal(false);
        setCreateType(null);
        setSelectedStockItem(null);
    };

    const handleCreate = () => {
        setShowCreateModal(true);
    };
    const handleUpdate = (stockItem) => {
        setSelectedStockItem(stockItem);
        setShowUpdateConfirmation(true);
    };

    const handleConfirmUpdate = () => {
        setShowUpdateConfirmation(false);
        history.push(`/StockItemUpdateForm/${userId}/${companyId}/${selectedStockItem.stockItemId}`);
    };

    const handleSelectCreateType = (type) => {
        setShowCreateModal(false);
        setCreateType(type);

        if (type === 'single') {
            history.push(`/StockItemForm/${userId}/${companyId}`);
        } else if (type === 'multiple') {
            history.push(`/StockItemMultiple/${userId}/${companyId}`);
        } else {
            console.error('Invalid choice. Please try again.');
        }
    };

    return (
        <div className='container'>
            <MainNavBar />
            <div className='d-flex justify-content-between mb-3'>
                <Link to={`/CompanyHome/${userId}/${companyId}`} className='btn btn-secondary'>
                    <FaArrowLeft className='mr-2' />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Stock Items List</h3>
                <button className='btn btn-primary' onClick={handleCreate}>
                    Create Stock item
                </button>
            </div>

            <table className="table table-info table-borderless text-center">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Stock Item Name</th>
                        <th>Stock Group</th>
                        <th>Unit</th>
                        <th>Quantity</th>
                        <th>Opening Balance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {stockItems.map((item, index) => (
                        <tr key={item.stockItemId}>
                            <td>{index + 1}</td>
                            <td>{item.stockItemName}</td>
                            <td>{item.underStockGroup}</td>
                            <td>{item.unit}</td>
                            <td>{item.quantity}</td>
                            <td>{item.openingBalance}</td>
                            <td>
                                <Button variant="info" onClick={() => handleView(item)}>
                                    View
                                </Button>
                                <Button variant="primary" onClick={() => handleUpdate(item)}>
                                    Update
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(item)}>
                                    Delete
                                </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* View Modal */}
            <Modal show={showViewModal} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Stock Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedStockItem && (
                        <div>
                            <p> <strong>ID:</strong>  {selectedStockItem.stockItemId}</p>
                            <p> <strong>Stock Item Name: </strong>{selectedStockItem.stockItemName}</p>
                            <p> <strong>Stock Group:</strong> {selectedStockItem.underStockGroup}</p>
                            <p> <strong>Unit:</strong> {selectedStockItem.unit}</p>
                            <p> <strong>Quantity:</strong> {selectedStockItem.quantity}</p>
                            <p> <strong>Opening Balance:</strong> {selectedStockItem.openingBalance}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModals}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteConfirmation} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this stock item?</p>
                    <div className="modal-row">
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Yes, Delete
                        </Button>
                        <Button variant="secondary" onClick={handleCloseModals}>
                            No, Cancel
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Update Confirmation Modal */}
            <Modal show={showUpdateConfirmation} onHide={handleCloseModals}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to update this stock item?</p>
                    <div className="modal-row">
                        <Button variant="primary" onClick={handleConfirmUpdate}>
                            Yes, Update
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
                        <Modal.Title>Choose Stock Item Creation Type</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Button
                            variant="primary"
                            onClick={() => handleSelectCreateType('single')}
                            className="mr-2 stock-group-but"
                        >
                            Single Stock Item
                        </Button>
                        <Button
                            variant="secondary"
                            className="stock-group-but"
                            onClick={() => handleSelectCreateType('multiple')}
                        >
                            Multiple Stock Items
                        </Button>
                    </Modal.Body>
                </Modal>
            )}
        </div>
    );
};

export default StockItemsList;