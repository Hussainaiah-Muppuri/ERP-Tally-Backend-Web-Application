import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import './JournalVoucherList.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const JournalVoucherList = () => {
  const history = useHistory();
  const [journalVouchers, setJournalVouchers] = useState([]);
  const { userId, companyId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8092/api/journal/user/${userId}/company/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setJournalVouchers(response.data);
      })
      .catch(error => console.error('Error fetching journal vouchers:', error));
  }, [userId, companyId]);

  const showToast = (message, type) => {
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleViewJournalVoucher = (journalNo) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to view this journal voucher?");

    if (isConfirmed) {
      // Navigate to the "View" page
      history.push(`/JournalVoucherView/${userId}/${companyId}/${journalNo}`);
    }
    // If "Cancel" is clicked, do nothing (no redirection)
  };

  const handleUpdateJournalVoucher = (journalNo) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to update this journal voucher?");

    if (isConfirmed) {
      // Navigate to the "Update" page
      history.push(`/JournalVoucherUpdate/${userId}/${companyId}/${journalNo}`);
    }
  };

  const handleDeleteJournalVoucher = async (journalNo) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this journal voucher?");

    if (isConfirmed) {
      try {
        // Send DELETE request to delete the journal voucher
        await axios.delete(`http://localhost:8092/api/journal/${journalNo}`);

        // Update the list of journal vouchers after deletion
        const updatedJournalVouchers = journalVouchers.filter(voucher => voucher.journalNo !== journalNo);
        setJournalVouchers(updatedJournalVouchers);

        showToast("Journal Voucher deleted successfully!", "success");
      } catch (error) {
        console.error('Error deleting journal voucher:', error);
        showToast("Error deleting journal voucher. Please try again.", "error");
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
        <h4 style={{ textAlign: 'center' }}>Journal Voucher List</h4>
        <Link to={`/JournalEntryForm/${userId}/${companyId}`} className="btn btn-primary">
          Create Journal Voucher
        </Link>
      </div>
      <div className='journal-voucher-list'>

        <table className="table table-info table-borderless text-center" style={{ fontSize: "medium" }}>
          <thead>
            <tr className='action-buttons'>
              <th>Sl No</th>
              <th>Date</th>
              <th>Particulars</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Particulars</th>
              <th>Debit</th>
              <th>Credit</th>
              <th>Total Credit</th>
              <th>Total Debit</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {journalVouchers.map((voucher, index) => (
              <tr key={voucher.journalNo} className='action-buttons'>
                <td>{index + 1}</td>
                <td>{voucher.date}</td>
                <td>{voucher.particulars}</td>
                <td>{voucher.debit}</td>
                <td>{voucher.credit}</td>
                <td>{voucher.particulars1}</td>
                <td>{voucher.debit1}</td>
                <td>{voucher.credit1}</td>
                <td>{voucher.totalCredit}</td>
                <td>{voucher.totalDebit}</td>
                <td className='form-rows'>
                  <button
                    onClick={() => handleViewJournalVoucher(voucher.journalNo)}
                    className="btn btn-primary mr-2"
                  >
                    View
                  </button>
                  <button onClick={() => handleUpdateJournalVoucher(voucher.journalNo)} className="btn btn-warning mr-2">
                    Update
                  </button>
                  <button onClick={() => handleDeleteJournalVoucher(voucher.journalNo)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default JournalVoucherList;