// StockItemUpdateForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './StockItemForm.css';
import { useHistory } from 'react-router-dom';


const StockItemUpdateForm = () => {
    const { userId, companyId, stockItemId } = useParams();
    const history = useHistory();

    const [stockItem, setStockItem] = useState({
        stockItemName: '',
        underStockGroup: '',
        unit: '',
        quantity: 0,
        openingBalance: 0.0,
        userId: userId,
        companyId: companyId,
    });

    const [stockGroups, setStockGroups] = useState([]);
    const [units, setUnits] = useState([]);

    useEffect(() => {
        // Fetch stock groups
        fetch(`http://localhost:9098/stockgroup/getByUserAndCompany/${userId}/${companyId}`)
            .then(response => response.json())
            .then(data => setStockGroups(data))
            .catch(error => console.error('Error fetching stock groups:', error));

        // Fetch units
        fetch(`http://localhost:9092/api/units/${userId}/${companyId}`)
            .then(response => response.json())
            .then(data => setUnits(data))
            .catch(error => console.error('Error fetching units:', error));

        // Fetch existing stock item details
        const fetchStockItem = async () => {
            try {
                const response = await axios.get(`http://localhost:9099/stockitem/get/${stockItemId}`);
                setStockItem(response.data);
            } catch (error) {
                console.error('Error fetching stock item details:', error);
            }
        };

        fetchStockItem();
    }, [userId, companyId, stockItemId]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate stockItemName
        if (name === 'stockItemName') {
            const isValid = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(value);
            if (!isValid) {
                toast.error('Invalid stockItemName. It should only contain alphabets and optionally a single space.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                return;
            }
        }
        setStockItem((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        if (!stockItem.stockItemName) {
            toast.error('Please fill the Stock item Name.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }
        if (!stockItem.underStockGroup) {
            toast.error('Please Select the Stock group Name.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }
        if (!stockItem.unit) {
            toast.error('Please Select the unit.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }
        if (!stockItem.quantity) {
            toast.error('Please fill the Quantity.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }
        if (!stockItem.openingBalance) {
            toast.error('Please fill the Opening Balance.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }
        try {
            const response = await fetch(`http://localhost:9099/stockitem/update/${stockItemId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockItem),
            }
            
            );

            if (response.ok) {
                console.log('Stock item updated successfully:', response.data);
                toast.success('Stock item updated successfully!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                history.push(`/StockItemsList/${userId}/${companyId}`);
            } else {
                console.error('Failed to update stock item:', response.statusText);
                toast.error(`Failed to update stock item: ${response.statusText}`, {
                    position: 'top-center',
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error('Error updating stock item:', error.message);
            toast.error(`Error updating stock item: ${error.message}`, {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };


    return (
        <div className='container'>
            <MainNavBar />
            <div className='d-flex justify-content-between mb-3'>
                <Link to={`/CompanyHome/${userId}/${companyId}`} className='btn btn-secondary'>
                    <FaArrowLeft className='mr-2' />
                </Link>
                <h4 style={{ textAlign: 'center' }}>Update Stock Item</h4>
                <Link to={`/StockItemsList/${userId}/${companyId}`} className='btn btn-primary'>
                    Stock Item List
                </Link>
            </div>
            <form className='item-form-stock'>
                <div className='form-group'>
                    <label htmlFor='stockItemName'>Stock Item Name</label><br />
                    <input
                        type='text'
                        minLength={3}
                        maxLength={16}
                        className='stock-item-input-1 '
                        id='stockItemName'
                        name='stockItemName'
                        value={stockItem.stockItemName || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor='underStockGroup'>Stock Group</label><br />
                        <select
                            id='underStockGroup'
                            name='underStockGroup'
                            value={stockItem.underStockGroup}
                            onChange={handleChange}
                        >
                            <option value=''>Select Stock Group</option>
                            {stockGroups.map((group) => (
                                <option key={group.stockGroupId} value={group.stockGroupName}>
                                    {group.stockGroupName}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className='form-group col-md-6'>
                        <label htmlFor='unit'>Unit</label><br />
                        <select
                            id='unit'
                            name='unit'
                            value={stockItem.unit || ''}
                            onChange={handleChange}
                        >
                            <option value=''>Select Unit</option>
                            {units.map((unit) => (
                                <option key={unit.unitId} value={unit.unitSymbol}>
                                    {unit.unitSymbol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='form-row'>
                    <div className='form-group col-md-6'>
                        <label htmlFor='quantity'>Quantity</label><br />
                        <input
                            type='number'
                            className='stock-item-input-2'
                            id='quantity'
                            name='quantity'
                            value={stockItem.quantity || ''}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='form-group col-md-6'>
                        <label htmlFor='openingBalance'>Opening Balance</label><br />
                        <input
                            type='number'
                            className='stock-item-input-2'
                            id='openingBalance'
                            name='openingBalance'
                            value={stockItem.openingBalance || ''}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type='button' className='btn btn-primary stock-item-b' onClick={handleUpdate}>
                    Update
                </button>
            </form>
            <ToastContainer position='top-center' autoClose={2000} />
        </div>
    );
};

export default StockItemUpdateForm;
