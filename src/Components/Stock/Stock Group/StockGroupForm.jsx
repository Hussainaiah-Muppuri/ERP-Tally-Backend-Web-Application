import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, Link } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';
import './StockGroupList.css';

const StockGroupForm = () => {
    const { userId, companyId } = useParams();
    const [stocks, setStocks] = useState([{ stockGroupName: '', userId: userId, companyId: companyId }]);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                handleAddStock();
            } else if (event.key === 'Backspace') {
                handleRemoveLastStock();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [stocks]);

    const handleSaveAll = async () => {
        try {
            const response = await fetch('http://localhost:9098/stockgroup/saveall', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stocks),
            });

            if (response.ok) {
                const data = await response.json();
                toast.success('Stocks saved successfully', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                console.log('Stocks saved successfully:', data);
                clearForm();
            } else {
                console.error('Failed to save stocks:', response.statusText);
                toast.error('Failed to save stocks', {
                    position: 'top-center',
                    autoClose: 2000,
                });
            }
        } catch (error) {
            console.error('Error saving stocks:', error);
            toast.error('Error saving stocks', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };

    const handleAddStock = () => {
        setStocks([...stocks, { stockGroupName: '', userId: userId, companyId: companyId }]);
    };

    const handleRemoveLastStock = () => {
        if (stocks.length > 1) {
            setStocks(stocks.slice(0, -1));
        }
    };

    const handleStockChange = (index, field, value) => {
        const updatedStocks = [...stocks];
        updatedStocks[index][field] = value;
        setStocks(updatedStocks);
    };

    const clearForm = () => {
        setStocks([{ stockGroupName: '', userId: userId, companyId: companyId }]);
    };

    return (
        <div className='container'>
            <MainNavBar />
            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Stock Group Form</h3>
                <Link to={`/StockGroupList/${userId}/${companyId}`} className="btn btn-primary">
                    Group List
                </Link>
            </div>
            <div className='sgmadd'>
                <label htmlFor="">Stock Group Name</label>
                {stocks.map((stock, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder="Stock Group Name"
                            value={stock.stockGroupName}
                            onChange={(e) => handleStockChange(index, 'stockGroupName', e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button onClick={handleSaveAll} className='btn btn-primary sgmadd-btn'>Save All</button>

            <ToastContainer />
        </div>
    );
};

export default StockGroupForm;
