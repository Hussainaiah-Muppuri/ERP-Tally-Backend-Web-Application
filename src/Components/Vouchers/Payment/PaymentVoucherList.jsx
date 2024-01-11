import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './PaymentList.css'; // Make sure to import your custom CSS file
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const PaymentVoucherList = () => {
  const history = useHistory();
  const [payments, setPayments] = useState([]);
  const { userId, companyId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8022/api/payment/user/${userId}/company/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setPayments(response.data);
      })
      .catch(error => console.error('Error fetching payments:', error));
  }, [userId, companyId]);

  const showToast = (message, type) => {
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleViewPayment = (paymentNo) => {
    const isConfirmed = window.confirm("Are you sure you want to view this payment?");

    if (isConfirmed) {
      history.push(`/PaymentVoucherView/${userId}/${companyId}/${paymentNo}`);
    }
  };

  const handleUpdatePayment = (paymentId) => {
    const isConfirmed = window.confirm("Are you sure you want to update this payment?");

    if (isConfirmed) {
      history.push(`/PaymentVoucherUpdate/${userId}/${companyId}/${paymentId}`);
    }
  };

  const handleDeletePayment = async (paymentNo) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this payment?");

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8022/api/payment/${paymentNo}`);
        const updatedPayments = payments.filter(payment => payment.paymentNo !== paymentNo);
        setPayments(updatedPayments);
        showToast("Payment deleted successfully!", "success");
      } catch (error) {
        console.error('Error deleting payment:', error);
        showToast("Error deleting payment. Please try again.", "error");
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
        <h4 style={{ textAlign: 'center' }}>Payment List</h4>
        <Link to={`/PaymentEntryForm/${userId}/${companyId}`} className="btn btn-primary">
          Create Payment
        </Link>
      </div>
      <div className='payment-list'>
        <div >
          <table className="table table-info table-borderless text-center" style={{ fontSize: "medium" }}>
            <thead>
              <tr className='action-buttons'>
                <th >Sl No</th>
                <th >Date</th>
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
              {payments.map((payment, index) => (
                <tr key={payment.paymentNo} className='action-buttons'>
                  <td className="text-center">{index + 1}</td>
                  <td>{payment.date}</td>
                  <td>{payment.particulars}</td>
                  <td>{payment.debit}</td>
                  <td>{payment.credit}</td>
                  <td>{payment.particulars1}</td>
                  <td>{payment.debit1}</td>
                  <td>{payment.credit1}</td>
                  <td>{payment.totalCredit}</td>
                  <td>{payment.totalDebit}</td>
                  <td className='form-rows'>
                    <button
                      onClick={() => handleViewPayment(payment.paymentNo)}
                      className="btn btn-primary btn-sm mr-2 payment-view"
                    >
                      View
                    </button>
                    <button onClick={() => handleUpdatePayment(payment.paymentNo)} className="btn btn-warning btn-sm mr-2 ">
                      Update
                    </button>
                    <button onClick={() => handleDeletePayment(payment.paymentNo)} className="btn btn-danger btn-sm">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PaymentVoucherList;
