import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import './LedgerList.css';
import MainNavBar from '../../NavBar/MainNavBar';

const LedgerList = () => {
    const history = useHistory();
    const { userId, companyId } = useParams();
    const [ledgerList, setLedgerList] = useState([]);
    const [selectedLedger, setSelectedLedger] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [showUpdateConfirmation, setShowUpdateConfirmation] = useState(false);

    useEffect(() => {
        const fetchLedgers = async () => {
            try {
                const response = await axios.get(`http://localhost:2222/ledger/getall/${userId}/${companyId}`);
                setLedgerList(response.data);
            } catch (error) {
                console.error('Error fetching ledger data:', error);
            }
        };

        fetchLedgers();
    }, [userId, companyId]);

    const handleView = (ledger) => {
        setSelectedLedger(ledger);
        setShowViewModal(true);
    };

    const handleUpdate = (ledger) => {
        setSelectedLedger(ledger);
        setShowUpdateConfirmation(true);
    };

    const handleConfirmUpdate = () => {
        // Navigate to the update form only if the user confirms
        history.push(`/UpdateLedgerForm/${userId}/${companyId}/${selectedLedger.ledgerId}`);
        setShowUpdateConfirmation(false);
    };

    const handleDelete = (ledger) => {
        setSelectedLedger(ledger);
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:2222/ledger/delete/${selectedLedger.ledgerId}`);
            setShowDeleteConfirmation(false);
            setLedgerList((prevList) => prevList.filter((l) => l.ledgerId !== selectedLedger.ledgerId));
        } catch (error) {
            console.error('Error deleting ledger:', error);
        }
    };

    const handleCloseModals = () => {
        setShowViewModal(false);
        setShowDeleteConfirmation(false);
        setShowUpdateConfirmation(false);
    };

    const handleCreateSingleLedger = () => {
        history.push(`/SingleLedgerCreation/${userId}/${companyId}`);
    };

    const handleCreateMultipleLedgers = () => {
        history.push(`/MultipleLedgerCreation/${userId}/${companyId}`);
    };

    return (
        <div className='container'>
            <MainNavBar />
            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Ledger List</h3>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="createLedgerDropdown">
                        Create Ledger
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleCreateSingleLedger}>Create Single Ledger</Dropdown.Item>
                        <Dropdown.Item onClick={handleCreateMultipleLedgers}>Create Multiple Ledgers</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div>
            <table className="table table-info table-borderless text-center">
                    <thead>
                        <tr>
                            <th>Sl No</th>
                            <th>Ledger Name</th>
                            <th>Group Name</th>
                            <th>Date</th>
                            <th>Mobile Number</th>
                            <th>Opening Balance</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledgerList.map((ledger, index) => (
                            <tr key={ledger.ledgerId}>
                                <td>{index + 1}</td>
                                <td>{ledger.ledgerName}</td>
                                <td>{ledger.underGroup}</td>
                                <td>{ledger.date}</td>
                                <td>{ledger.mobileNo}</td>
                                <td>{ledger.openningBalance}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleView(ledger)}>
                                        View
                                    </Button>
                                    <Button variant="warning" onClick={() => handleUpdate(ledger)}>
                                        Update
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(ledger)}>
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
                        <Modal.Title>View Ledger</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <strong>Ledger Name:</strong> {selectedLedger?.ledgerName}<br />
                        <strong>Group Name:</strong> {selectedLedger?.underGroup}<br />
                        <strong>Date:</strong> {selectedLedger?.date}<br />
                        <strong>Mobile Number:</strong> {selectedLedger?.mobileNo}<br />
                        <strong>Email:</strong> {selectedLedger?.email}<br />
                        <strong>Address:</strong> {selectedLedger?.address}<br />
                        <strong>Bank Account Holder Name:</strong> {selectedLedger?.bankAccountHolderName}<br />
                        <strong>Bank A/C Number:</strong> {selectedLedger?.bankAccountNo}<br />
                        <strong>Name of Bank:</strong> {selectedLedger?.nameOfBank}<br />
                        <strong>IFSC Code:</strong> {selectedLedger?.ifscCode}<br />
                        <strong>Gst Number:</strong> {selectedLedger?.gstNo}<br />
                        <strong>Pan Number:</strong> {selectedLedger?.panNo}<br />
                        <strong>Tan Number:</strong> {selectedLedger?.tanNo}<br />
                        <strong>Aadhar No:</strong> {selectedLedger?.aadharNo}<br />
                        <strong>Effect Stock Ledger:</strong> {selectedLedger?.effectStockLedger}<br />
                        <strong>Currency of Ledger:</strong> {selectedLedger?.currencyOfLedger}<br />
                        <strong>Opening Balance:</strong> {selectedLedger?.openningBalance}<br />
                    </Modal.Body>
                </Modal>

                {/* Update Confirmation Modal */}
                <Modal show={showUpdateConfirmation} onHide={handleCloseModals}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Ledger</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to update this ledger?</p>
                        <div className='modal-ro'>
                            <Button variant="warning" onClick={handleConfirmUpdate}>
                                Yes, Update
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModals}>
                                No, Cancel
                            </Button>
                        </div>
                    </Modal.Body>
                </Modal>



                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteConfirmation} onHide={handleCloseModals}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Ledger</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this ledger?</p>
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
            </div>
        </div>
    );
};

export default LedgerList;
