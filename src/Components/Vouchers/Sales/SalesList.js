
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

export default function SalesList() {

  const history = useHistory();
  const [salesOrderVouchers, setSalesOrderVouchers] = useState([]);
  const { userId, companyId } = useParams();


  useEffect(() => {
    axios.get(`http://localhost:9093/api/sales/getAllBy/${userId}/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setSalesOrderVouchers(response.data);

      })
      .catch(error => console.error('Error fetching Sales Order vouchers:', error));
  }, [userId, companyId]);

  const showToast = (message, type) => {
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleViewSalesOrderVoucher = (saleNo) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to view this sales Order voucher?");

    if (isConfirmed) {
      // Navigate to the "View" page
      history.push(`/viewSales/${userId}/${companyId}/${saleNo}`);
    }
    // If "Cancel" is clicked, do nothing (no redirection)
  };

  const handleUpdateSalesOrderVoucher = (saleNo) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to update this sales Order voucher?");


    if (isConfirmed) {
      // Navigate to the "Update" page
      history.push(`/UpdateSales/${userId}/${companyId}/${saleNo}`);
    }
  };

  const handleDeleteSalesOrderVoucher = async (saleNo) => {
    // Ask for confirmation
    const isConfirmed = window.confirm("Are you sure you want to delete this sales Order voucher?");
    if (isConfirmed) {
      try {
        // Send DELETE request to delete the journal voucher
        await axios.delete(`http://localhost:9093/api/sales/delete/${saleNo}`);

        // Update the list of journal vouchers after deletion
        const updatedSalesOrderVouchers = salesOrderVouchers.filter(voucher => voucher.saleNo !== saleNo);
        setSalesOrderVouchers(updatedSalesOrderVouchers);

        showToast("Sales Order Voucher deleted successfully!", "success");
      } catch (error) {
        console.error('Error deleting sales Order voucher:', error);
        showToast("Error deleting sales Order voucher. Please try again.", "error");
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
        <h4 style={{ textAlign: 'center' }}>Sales Voucher List</h4>
        <Link to={`/SalesVoucher/${userId}/${companyId}`} className="btn btn-primary">
          Create Sales Voucher
        </Link>
      </div>
      <div className='journal-voucher-list'>

        <table className="table table-info table-borderless text-center" style={{ fontSize: "medium" }}>
          <thead>
            <tr className='action-buttons'>
              <th>sl no</th>
              <th>orderNo</th>
              <th>Date</th>
              {/* <th>Day</th> */}
              <th>Name</th>
              <th>Current Balance</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Unit</th>
              {/* <th>Discount</th> */}
              {/* <th>Amount</th> */}
              <th>Amount</th>
              {/* <th>Description</th> */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salesOrderVouchers.map((voucher, index) => (
              <tr key={voucher.saleNo} className='action-buttons'>

                <td>{index + 1}</td>
                <td>{voucher.orderNo}</td>
                <td>{voucher.date}</td>
                {/* <td>{voucher.day}</td> */}
                <td>{voucher.partyName}</td>
                <td>{voucher.currentBalance}</td>
                <td>{voucher.itemName}</td>
                <td>{voucher.quantity}</td>
                <td>{voucher.rate}</td>
                <td>{voucher.unit}</td>
                {/* <td>{voucher.discount}</td> */}
                {/* <td>{voucher.amount}</td> */}
                <td>{voucher.totalAmount}</td>
                {/* <td>{voucher.description}</td> */}

                <td className='form-rows'>
                  <button
                    onClick={() => handleViewSalesOrderVoucher(voucher.saleNo)}
                    className="btn btn-primary mr-2"
                  >
                    View
                  </button>
                  <button onClick={() => handleUpdateSalesOrderVoucher(voucher.saleNo)} className="btn btn-warning mr-2">
                    Update
                  </button>
                  <button onClick={() => handleDeleteSalesOrderVoucher(voucher.saleNo)} className="btn btn-danger">
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


