import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, Link, useHistory } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateLedgerForm = () => {
    const { userId, companyId, ledgerId } = useParams();
    const history = useHistory();
    const { register, handleSubmit, setValue } = useForm();
    const [groupOptions, setGroupOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:2222/ledger/get/${ledgerId}`);
                const ledgerData = response.data;

                // Set initial values using setValue
                Object.entries(ledgerData).forEach(([key, value]) => {
                    setValue(key, value);
                });
            } catch (error) {
                console.error('Error fetching ledger details:', error);
            }
        };

        const fetchGroupOptions = async () => {
            try {
                const response = await axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`);
                setGroupOptions(response.data);
            } catch (error) {
                console.error('Error fetching group options:', error);
            }
        };

        fetchData();
        fetchGroupOptions();
    }, [userId, companyId, ledgerId, setValue]);

    const onSubmit = async (updatedData) => {
        // Display confirmation dialog
        const isConfirmed = window.confirm('Are you sure you want to update the ledger?');

        if (isConfirmed) {
            try {
                await axios.put(`http://localhost:2222/ledger/update/${ledgerId}`, updatedData);
                history.push(`/LedgerList/${userId}/${companyId}`);
            } catch (error) {
                console.error('Error updating ledger:', error);
            }
        }
    };

    return (
        <div className=" ledger-cre container">
            <MainNavBar />

            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Update Ledger</h3>
                <Link to={`/LedgerList/${userId}/${companyId}`} className="btn btn-primary">
                    Ledger List
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='led-rows'>
                    <div className="col-md-4 ">
                        <div className="mb-3">
                            <label>Ledger Name:</label>
                            <br />
                            <input {...register('ledgerName')} />
                        </div>

                        <div className="mb-3">
                            <label>Under Group:</label>
                            <br />
                            <select {...register('underGroup')} className='led-select'>
                                <option value="">Select Group</option>
                                {groupOptions.map((group) => (
                                    <option key={group.groupId} value={group.groupName}>
                                        {group.groupName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Date:</label>
                            <br />
                            <input type="date" {...register('date')} disabled />
                        </div>

                        <div className="mb-3">
                            <label>Mobile Number:</label>
                            <br />
                            <input type="tel" {...register('mobileNo')} />
                        </div>

                        <div className="mb-3">
                            <label>Email:</label>
                            <br />
                            <input {...register('email')} />
                        </div>

                        <div className="mb-3">
                            <label>Address:</label>
                            <br />
                            <input {...register('address')} />
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="mb-3">
                            <label>Bank Account Holder Name:</label>
                            <br />
                            <input {...register('bankAccountHolderName')} />
                        </div>

                        <div className="mb-3">
                            <label>Bank Account No:</label>
                            <br />
                            <input {...register('bankAccountNo')} />
                        </div>

                        <div className="mb-3">
                            <label>Name of Bank:</label>
                            <br />
                            <input {...register('nameOfBank')} />
                        </div>

                        <div className="mb-3">
                            <label>IFSC Code:</label>
                            <br />
                            <input {...register('ifscCode')} />
                        </div>

                        <div className="mb-3">
                            <label>GST No:</label>
                            <br />
                            <input {...register('gstNo')} />
                        </div>

                        <div className="mb-3">
                            <label>PAN No:</label>
                            <br />
                            <input {...register('panNo')} />
                        </div>
                    </div>
                    <div className="col-md-4 ">
                        <div className="mb-3">
                            <label>TAN No:</label>
                            <br />
                            <input {...register('tanNo')} />
                        </div>

                        <div className="mb-3">
                            <label>Aadhar No:</label>
                            <br />
                            <input {...register('aadharNo')} />
                        </div>

                        <div className="mb-3">
                            <label>Effect Stock Ledger:</label>
                            <br />
                            <select {...register('effectStockLedger')} className='led-select'>
                                <option value="">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label>Currency of Ledger:</label>
                            <br />
                            <input {...register('currencyOfLedger')} />
                        </div>

                        <div className="mb-3">
                            <label>Opening Balance:</label>
                            <br />
                            <input {...register('openningBalance')} />
                        </div>

                        <button type="submit" className="btn btn-primary leg-btn">Update Ledger</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UpdateLedgerForm;
