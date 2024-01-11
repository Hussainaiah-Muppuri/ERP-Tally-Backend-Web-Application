import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { ToastContainer, toast } from 'react-toastify';
import './SingleLedger.css';
import { FaArrowLeft } from 'react-icons/fa';

const SingleLedgerCreation = () => {
    const { userId, companyId } = useParams();

    const [ledger, setLedger] = useState({
        ledgerName: '',
        underGroup: '',
        date: new Date().toISOString().split('T')[0], // Initialize with today's date
        mobileNo: '',
        email: '',
        address: '',
        bankAccountHolderName: '',
        bankAccountNo: '',
        nameOfBank: '',
        ifscCode: '',
        gstNo: '',
        panNo: '',
        tanNo: '',
        aadharNo: '',
        effectStockLedger: '',
        currencyOfLedger: '',
        openningBalance: '',
        userId: userId,
        companyId: companyId,
    });

    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        const fetchGroupOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`);
                setGroupOptions(response.data);
            } catch (error) {
                console.error('Error fetching group options:', error);
            }
        };

        fetchGroupOptions();
    }, [userId, companyId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLedger({ ...ledger, [name]: value });
    };

    const saveLedger = async () => {
        try {
            const response = await axios.post(`http://localhost:2222/ledger/save`, ledger);
            console.log(response.data);
            setLedger({
                ledgerName: '',
                underGroup: '',
                date: new Date().toISOString().split('T')[0], // Reset to today's date after save
                mobileNo: '',
                email: '',
                address: '',
                bankAccountHolderName: '',
                bankAccountNo: '',
                nameOfBank: '',
                ifscCode: '',
                gstNo: '',
                panNo: '',
                tanNo: '',
                aadharNo: '',
                effectStockLedger: '',
                currencyOfLedger: '',
                openningBalance: '',
                userId: userId,
                companyId: companyId,
            });
            toast.success('Ledger data added successfully', { position: 'top-center', autoClose: 2000 });
        } catch (error) {
            console.error('Error saving ledger:', error);
            console.error('Error:', error.message);
            setLedger({
                ledgerName: '',
                underGroup: '',
                date: new Date().toISOString().split('T')[0], // Reset to today's date after save
                mobileNo: '',
                email: '',
                address: '',
                bankAccountHolderName: '',
                bankAccountNo: '',
                nameOfBank: '',
                ifscCode: '',
                gstNo: '',
                panNo: '',
                tanNo: '',
                aadharNo: '',
                effectStockLedger: '',
                currencyOfLedger: '',
                openningBalance: '',
                userId: userId,
                companyId: companyId,
            });
            toast.error('Error adding ledger data', { position: 'top-center', autoClose: 2000 });
        }
    };

    return (
        <div className=" ledger-cre container">
            <MainNavBar />

            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Single Ledger Creation</h3>
                <Link to={`/LedgerList/${userId}/${companyId}`} className="btn btn-primary">
                    Ledger List
                </Link>
            </div>
            <form >
                <div className='led-rows'>
                    <div className="col-md-4 ">
                        <div className="mb-3">
                            <label >Ledger Name:</label><br />
                            <input
                                type="text"
                                name="ledgerName"
                                value={ledger.ledgerName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label >Under Group:</label><br />
                            <select
                                className='led-select'
                                name="underGroup"
                                value={ledger.underGroup}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Group</option>
                                {groupOptions.map((group) => (
                                    <option key={group.groupId} value={group.groupName}>
                                        {group.groupName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label >Date:</label><br />
                            <div className='led-date'>
                                {ledger.date}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label >Mobile Number:</label><br />
                            <input
                                type="text"
                                name="mobileNo"
                                value={ledger.mobileNo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Email:</label><br />
                            <input
                                type="text"
                                name="email"
                                value={ledger.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Address:</label><br />
                            <input
                                type="text"
                                name="address"
                                value={ledger.address}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="mb-3">
                            <label >Bank Account Holder Name:</label><br />
                            <input
                                type="text"
                                name="bankAccountHolderName"
                                value={ledger.bankAccountHolderName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Bank Account No:</label><br />
                            <input
                                type="text"
                                name="bankAccountNo"
                                value={ledger.bankAccountNo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Name of Bank:</label><br />
                            <input
                                type="text"
                                name="nameOfBank"
                                value={ledger.nameOfBank}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >IFSC Code:</label><br />
                            <input
                                type="text"
                                name="ifscCode"
                                value={ledger.ifscCode}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >GST No:</label><br />
                            <input
                                type="text"
                                name="gstNo"
                                value={ledger.gstNo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >PAN No:</label><br />
                            <input
                                type="text"
                                name="panNo"
                                value={ledger.panNo}
                                onChange={handleInputChange}
                            />
                        </div>

                    </div>
                    <div className="col-md-4 ">
                        <div className="mb-3">
                            <label >TAN No:</label><br />
                            <input
                                type="text"
                                name="tanNo"
                                value={ledger.tanNo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Aadhar No:</label><br />
                            <input
                                type="text"
                                name="aadharNo"
                                value={ledger.aadharNo}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Effect Stock Ledger:</label><br />
                            <select
                                type="text"
                                className='led-select'
                                name="effectStockLedger"
                                value={ledger.effectStockLedger}
                                onChange={handleInputChange}
                            >
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label >Currency of Ledger:</label><br />
                            <input
                                type="text"
                                name="currencyOfLedger"
                                value={ledger.currencyOfLedger}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label >Opening Balance:</label><br />
                            <input
                                type="text"
                                name="openningBalance"
                                value={ledger.openningBalance}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="button" className="btn btn-primary leg-btn" onClick={saveLedger}>
                                Save Ledger
                            </button>
                        </div>
                    </div>
                </div>
            </form >
            <ToastContainer />
        </div >
    );
};

export default SingleLedgerCreation;
