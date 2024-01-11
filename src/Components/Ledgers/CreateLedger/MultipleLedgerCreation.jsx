import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const MultipleLedgerCreation = () => {
    const { userId, companyId } = useParams();
    const [ledgerData, setLedgerData] = useState([
        { ledgerName: '', underGroup: '', date: '', openningBalance: '', userId, companyId },
    ]);
    const [commonDate, setCommonDate] = useState(new Date().toISOString().split('T')[0]);
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        // Fetch group data for select options
        axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`)
            .then(response => {
                setGroupOptions(response.data);
            })
            .catch(error => console.error('Error fetching group data:', error));
    }, [userId, companyId]);

    // Set today's date for all rows initially
    useEffect(() => {
        const updatedLedgerData = ledgerData.map(item => ({ ...item, date: commonDate }));
        setLedgerData(updatedLedgerData);
    }, [commonDate]);

    const handleLedgerDataChange = (index, event) => {
        const { name, value } = event.target;
        const updatedLedgerData = [...ledgerData];
        updatedLedgerData[index][name] = value;
        setLedgerData(updatedLedgerData);
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNewLedgerRow();
        } else if (event.key === 'Backspace' && index === ledgerData.length - 1 && event.target.value === '') {
            removeLastLedgerRow();
        }
    };

    const removeLastLedgerRow = () => {
        if (ledgerData.length > 1) {
            const updatedLedgerData = [...ledgerData];
            updatedLedgerData.pop();
            setLedgerData(updatedLedgerData);
        }
    };

    const addNewLedgerRow = () => {
        setLedgerData([...ledgerData, { ledgerName: '', underGroup: '', date: commonDate, openningBalance: '', userId, companyId }]);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:2222/ledger/saveall', ledgerData);
            console.log('Response:', response.data);
            toast.success('Ledger data added successfully', { position: 'top-center', autoClose: 2000 });
            setLedgerData([{ ledgerName: '', underGroup: '', date: commonDate, openningBalance: '', userId, companyId }]);
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('Error adding ledger data', { position: 'top-center', autoClose: 2000 });
        }
    };

    return (
        <Container className="mt-5">
            <MainNavBar />

            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Multiple Ledger Creation</h3>
                <Link to={`/LedgerList/${userId}/${companyId}`} className="btn btn-primary">
                    Ledger List
                </Link>
            </div>
            <Row>
                <Col>
                    <Form.Control
                        type="date"
                        value={commonDate}
                        onChange={(e) => setCommonDate(e.target.value)}
                        className="mb-3"
                    />
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Ledger Name</th>
                                <th>Under Group</th>
                                <th>Opening Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ledgerData.map((ledger, index) => (
                                <tr key={index}>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="ledgerName"
                                            value={ledger.ledgerName}
                                            onChange={(e) => handleLedgerDataChange(index, e)}
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            as="select"
                                            name="underGroup"
                                            value={ledger.underGroup}
                                            onChange={(e) => handleLedgerDataChange(index, e)}
                                        >
                                            <option value="">Select Group</option>
                                            {groupOptions.map((group) => (
                                                <option key={group.groupId} value={group.groupName}>
                                                    {group.groupName}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            name="openningBalance"
                                            value={ledger.openningBalance}
                                            onChange={(e) => handleLedgerDataChange(index, e)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button variant="success" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default MultipleLedgerCreation;
