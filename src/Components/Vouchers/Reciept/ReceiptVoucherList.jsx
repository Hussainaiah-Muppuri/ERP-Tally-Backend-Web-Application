// ReceiptVoucherList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReceiptList.css'; // You can uncomment this line if you have a separate CSS file
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const ReceiptVoucherList = () => {
  const history = useHistory();
  const [receipts, setReceipts] = useState([]);
  const { userId, companyId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8082/api/receipt/user/${userId}/company/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setReceipts(response.data);
      })
      .catch(error => console.error('Error fetching receipts:', error));
  }, [userId, companyId]);

  const showToast = (message, type) => {
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleViewReceipt = (receiptNo) => {
    const isConfirmed = window.confirm("Are you sure you want to view this receipt?");

    if (isConfirmed) {
      history.push(`/ReceiptVoucherView/${userId}/${companyId}/${receiptNo}`);
    }
  };

  const handleUpdateReceipt = (receiptId) => {
    const isConfirmed = window.confirm("Are you sure you want to update this receipt?");

    if (isConfirmed) {
      history.push(`/ReceiptVouchersUpdate/${userId}/${companyId}/${receiptId}`);
    }
  };

  const handleDeleteReceipt = async (receiptNo) => {
    console.log("receipt", receiptNo);

    const isConfirmed = window.confirm("Are you sure you want to delete this receipt?");

    if (isConfirmed) {
      try {
        // Send DELETE request to delete the receipt
        await axios.delete(`http://localhost:8082/api/receipt/${receiptNo}`);

        // Update the list of receipts after deletion
        const updatedReceipts = receipts.filter(receipt => receipt.receiptNo !== receiptNo);
        setReceipts(updatedReceipts);

        showToast("Receipt deleted successfully!", "success");
      } catch (error) {
        console.error('Error deleting receipt:', error);
        console.log('Error response:', error.response); // Log the response details

        showToast("Error deleting receipt. Please try again.", "error");
      }
    }
  };

  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>Receipt Voucher List</h3>
        <Link to={`/ReceiptEntryForm/${userId}/${companyId}`} className="btn btn-primary">
          Create Reciept
        </Link>
      </div>
      <div className='receipt-list-container'>

        <table className="table table-info table-borderless text-center">
          <thead>
            <tr className='action-buttons'>
              <th>Sl No</th>
              <th>Date</th>
              <th>Particular</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Particular</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Total Credit</th>
              <th>Total Debit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(receipts) && receipts.length > 0 ? (
              receipts.map((receipt, index) => (
                <tr key={receipt.receiptNo} className='action-buttons'>
                  <td>{index + 1}</td>
                  <td>{receipt.date}</td>

                  <td>{receipt.particulars}</td>
                  <td>{receipt.debit}</td>
                  <td>{receipt.credit}</td>
                  <td>{receipt.particulars1}</td>
                  <td>{receipt.debit1}</td>
                  <td>{receipt.credit1}</td>
                  <td>{receipt.totalCredit}</td>
                  <td>{receipt.totalDebit}</td>
                  <td className='form-rows'>
                    <button
                      onClick={() => handleViewReceipt(receipt.receiptNo)}
                      className="btn btn-primary mr-2 receipt-view-btn"
                    >
                      View
                    </button>
                    <button onClick={() => handleUpdateReceipt(receipt.receiptNo)} className="btn btn-warning mr-2">
                      Update
                    </button>
                    <button onClick={() => handleDeleteReceipt(receipt.receiptNo)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14">No receipts available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReceiptVoucherList;
