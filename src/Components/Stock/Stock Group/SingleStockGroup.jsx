import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './StockGroupList.css';

const SingleStockGroup = ({ handleClose }) => {
  const { userId, companyId } = useParams();
  const [stockGroupName, setStockGroupName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:9098/stockgroup/save`, {
        stockGroupName,
        userId,
        companyId,
      });

      if (response) {
        // Display success toast
        toast.success('Stock group saved successfully!', {
          position: 'top-center',
          autoClose: 2000,
        });

        // Clear the form after successful submission
        setStockGroupName('');
      } else {
        // Display error toast
        toast.error('Failed to save stock group. Please try again.', {
          position: 'top-center',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Error saving stock group:', error);
      // Display error toast
      toast.error('An error occurred while saving the stock group.', {
        position: 'top-center',
        autoClose: 2000,
      });
    }
  };

  return (
    <div className='container single-stock-add'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>Single Stock Group Creation</h3>
        <Link to={`/StockGroupList/${userId}/${companyId}`} className="btn btn-primary">
          Stock Group List
        </Link>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group sga">
          <label>Stock Group Name:</label><br />
          <input
            type="text"
            className='single-stock'
            value={stockGroupName}
            onChange={(e) => setStockGroupName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
      {/* Add ToastContainer at the end of the component */}
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default SingleStockGroup;
