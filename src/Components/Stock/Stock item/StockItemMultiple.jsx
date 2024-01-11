import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './StockItemMultiple.css';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import MainNavBar from '../../NavBar/MainNavBar';

const StockItemMultiple = () => {
  const { userId, companyId } = useParams();

  const [stockItems, setStockItems] = useState([
    {
      stockItemName: '',
      underStockGroup: '',
      unit: '',
      quantity: 0,
      openingBalance: 0.0,
      userId: userId,
      companyId: companyId,
    },
  ]);

  const [stockGroups, setStockGroups] = useState([]);
  const [units, setUnits] = useState([]);

  const [validationErrors, setValidationErrors] = useState([]);

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



  const handleChange = (e, rowIndex) => {
    const { name, value } = e.target;

    if (name === 'stockItemName') {
      // Modified regex pattern to allow a single space after the word
      const isValid = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/.test(value);
      if (!isValid) {
        toast.error('Invalid stockItemName. It should only contain alphabets and optionally a single space after each word.', {
          position: 'top-center',
          autoClose: 2000,
        });
        return;
      }
    }
    

    const updatedStockItems = [...stockItems];
    updatedStockItems[rowIndex] = {
      ...updatedStockItems[rowIndex],
      [name]: value,
    };
    setStockItems(updatedStockItems);
  };

  const handleKeyDown = (e, rowIndex) => {
    const isLastField = e.target.name === 'openingBalance';
    if (isLastField && e.key === 'Enter') {
      setStockItems(prevItems => [
        ...prevItems,
        {
          stockItemName: '',
          underStockGroup: '',
          unit: '',
          quantity: 0,
          openingBalance: 0.0,
          userId: userId,
          companyId: companyId,
        },
      ]);
    }
  };

  const handleDocumentKeyDown = e => {
    if (e.key === 'Backspace' && e.target.tagName !== 'INPUT' && stockItems.length > 1) {
      setStockItems(prevItems => {
        const updatedItems = [...prevItems];
        updatedItems.pop();
        return updatedItems;
      });
    }
  };


  const handleSave = async () => {
    const errors = validateForm();
    if (errors.length > 0) {
      setValidationErrors(errors);
      toast.error('Please fill in all fields for each row.', {
        position: 'top-center',
        autoClose: 3000,
      });
      return;
    }


    try {
      const response = await fetch('http://localhost:9099/stockitem/saveall', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(stockItems),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Stock items saved successfully:', data);
        toast.success('Stock items saved successfully!', {
          position: 'top-center',
          autoClose: 2000,
        });
        setStockItems([
          {
            stockItemName: '',
            underStockGroup: '',
            unit: '',
            quantity: 0,
            openingBalance: 0.0,
            userId: userId,
            companyId: companyId,
          },
        ]);
      } else {
        toast.error('Failed to save stock items. Please try again.', {
          position: 'top-center',
          autoClose: 2000,
        });
        console.error('Failed to save stock items:', response.statusText);
      }
    } catch (error) {
      toast.error('Error saving stock items. Please try again.', {
        position: 'top-center',
        autoClose: 2000,
      });
      console.error('Error saving stock items:', error);
    }
  };

  const validateForm = () => {
    const errors = [];

    stockItems.forEach((item, index) => {
      if (!item.stockItemName || !item.underStockGroup || !item.unit || item.quantity === 0 || item.openingBalance === 0.0) {
        errors.push(`Row ${index + 1}: All fields must be filled.`);
      }
    });

    return errors;
  };

  useEffect(() => {
    document.addEventListener('keydown', handleDocumentKeyDown);
    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [stockItems]);



  return (

    <div className='container sicm'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h4 style={{ textAlign: 'center' }}>Multiple Stock item Creation</h4>
        <Link to={`/StockItemsList/${userId}/${companyId}`} className="btn btn-primary">
          Stock item List
        </Link>
      </div>
      <div className="row">
        <div>
          <br></br>

          {validationErrors.length > 0 && (
            <Alert variant="danger" className="mt-31">
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          {stockItems.map((item, index) => (
            <div className="simi" key={index}>
              <form>
                <div className=" form-row">
                  <div className="sin-1">
                    <label htmlFor={`stockItemName${index}`}>Stock Item Name</label>
                    <input
                      type="text"
                      id={`stockItemName${index}`}
                      name="stockItemName"
                      value={item.stockItemName}
                      onChange={(e) => handleChange(e, index)}
                      required
                    />
                  </div>
                  <div className="sin-2">
                    <label htmlFor={`underStockGroup${index}`}>Stock Group</label>
                    <select style={{ marginLeft: "100%" }}

                      id={`underStockGroup${index}`}
                      name="underStockGroup"
                      value={item.underStockGroup}
                      onChange={(e) => handleChange(e, index)}
                      required >
                      <option value="">Select Stock Group</option>
                      {stockGroups.map((group) => (
                        <option key={group.stockGroupId} value={group.stockGroupName}>
                          {group.stockGroupName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sin-3">
                    <label htmlFor={`unit${index}`}>Unit</label>
                    <select style={{ marginLeft: "100%" }}

                      id={`unit${index}`}
                      name="unit"
                      value={item.unit}
                      onChange={(e) => handleChange(e, index)}
                      required>
                      <option value="">Select Unit</option>
                      {units.map((unit) => (
                        <option key={unit.unitId} value={unit.unitSymbol}>
                          {unit.unitSymbol}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sin-4">
                    <label htmlFor={`quantity${index}`}>Quantity</label>
                    <input
                      type="number"

                      id={`quantity${index}`}
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleChange(e, index)}
                      required
                    />
                  </div>

                  <div className="sin-5">
                    <label htmlFor={`openingBalance${index}`}>Opening Balance</label>
                    <input
                      type="number"

                      id={`openingBalance${index}`}
                      name="openingBalance"
                      value={item.openingBalance}
                      onChange={(e) => handleChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      required
                    />
                  </div>


                </div>

              </form>
            </div>
          ))}
          <button type="button" className="btn btn-primary simi-submit" onClick={handleSave}>
            Save
          </button>
          <ToastContainer position="top-center" autoClose={2000} />
        </div>
      </div>
    </div>
  );
};

export default StockItemMultiple;