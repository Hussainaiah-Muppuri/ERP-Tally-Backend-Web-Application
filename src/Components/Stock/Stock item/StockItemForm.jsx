import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './StockItemForm.css';

const StockItemForm = () => {
    const { userId, companyId } = useParams();

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
    }, [userId, companyId]);

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
        setStockItem(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = async () => {
        // Validation checks before submitting the form
        if (!stockItem.stockItemName) {
            toast.error('Please fill the Stock item Name.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
        if (!stockItem.underStockGroup) {
            toast.error('Please Select the Stock group Name.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
        if (!stockItem.unit) {
            toast.error('Please Select the unit.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
        if (!stockItem.quantity) {
            toast.error('Please fill the Quantity.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
        if (!stockItem.openingBalance) {
            toast.error('Please fill the Opening Balance.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
        if (!stockItem.stockItemName || !stockItem.underStockGroup || !stockItem.unit || !stockItem.quantity || !stockItem.openingBalance) {
            toast.error('Please fill all the credentials.', {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }

        // Perform the save operation with the validated stockItem
        try {
            const response = await fetch('http://localhost:9099/stockitem/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockItem),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Stock item saved successfully:', data);
                toast.success('Stock item saved successfully!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setStockItem({
                    stockItemName: '',
                    underStockGroup: '',
                    unit: '',
                    quantity: 0,
                    openingBalance: 0.0,
                    userId: userId,
                    companyId: companyId,
                });
            } else {
                toast.error('Failed to save stock item. Please try again.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                console.error('Failed to save stock item:', response.statusText);
            }
        } catch (error) {
            toast.error('Error saving stock item. Please try again.', {
                position: 'top-center',
                autoClose: 2000,
            });
            console.error('Error saving stock item:', error);
        }
    };

    return (
        <div className='container'>
            <MainNavBar />
            <div className="d-flex justify-content-between mb-3 ">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h4 style={{ textAlign: 'center' }}>Single Stock item Creation</h4>
                <Link to={`/StockItemsList/${userId}/${companyId}`} className="btn btn-primary">
                    Stock item List
                </Link>
            </div>
            <form className='item-form-stock'>
                <div className="form-group">
                    <label htmlFor="stockItemName">Stock Item Name</label><br />
                    <input
                        type="text"
                        minLength={3}
                        maxLength={16}
                        className='stock-item-input-1 '
                        id="stockItemName"
                        name="stockItemName"
                        value={stockItem.stockItemName}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-row'>
                    <div className="form-group col-md-6">
                        <label htmlFor="underStockGroup">Stock Group</label><br />
                        <select

                            id="underStockGroup"
                            name="underStockGroup"
                            value={stockItem.underStockGroup}
                            onChange={handleChange}
                        >
                            <option value="">Select Stock Group</option>
                            {stockGroups.map(group => (
                                <option key={group.stockGroupId} value={group.stockGroupName}>
                                    {group.stockGroupName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="unit">Unit</label><br />
                        <select

                            id="unit"
                            name="unit"
                            value={stockItem.unit}
                            onChange={handleChange}
                        >
                            <option value="">Select Unit</option>
                            {units.map(unit => (
                                <option key={unit.unitId} value={unit.unitSymbol}>
                                    {unit.unitSymbol}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='form-row'>
                    <div className="form-group col-md-6">
                        <label htmlFor="quantity">Quantity</label><br />
                        <input
                            type="number"
                            className='stock-item-input-2'
                            id="quantity"
                            name="quantity"
                            value={stockItem.quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="openingBalance">Opening Balance</label><br />
                        <input
                            type="number"
                            className='stock-item-input-2'
                            id="openingBalance"
                            name="openingBalance"
                            value={stockItem.openingBalance}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <button type="button" className="btn btn-primary stock-item-b" onClick={handleSave}>
                    Save
                </button>
            </form>
            <ToastContainer position="top-center" autoClose={2000} />
        </div>
    );
};

export default StockItemForm;