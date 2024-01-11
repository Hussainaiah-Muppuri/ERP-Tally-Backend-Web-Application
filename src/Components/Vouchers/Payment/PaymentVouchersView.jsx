// PaymentVoucherView.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Grid, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PaymentVoucherView.css'; // Import your custom CSS file
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const PaymentVoucherView = () => {
  const { paymentId, userId, companyId } = useParams();
  const [payment, setPayment] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8022/api/payment/${paymentId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setPayment(response.data);
      })
      .catch(error => console.error('Error fetching payment voucher details:', error));
  }, [paymentId]);

  useEffect(() => {
    axios.get(`http://localhost:8092/api/group/user/${userId}/company/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setPayment(response.data);
      })
      .catch(error => console.error('Error fetching groups:', error));
  }, [userId, companyId]); // Add userId and companyId as dependencies

  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}> View Payment Voucher</h3>
        <Link to={`/PaymentVoucherList/${userId}/${companyId}`} className="btn btn-primary">
          Payment List
        </Link>
      </div>

      <div className="view-payment-container">

        <Container maxWidth="md" className="view-payment-card-container">
          <Card elevation={8} className="view-payment-card">

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" className="payment-info">
                  <strong>Payment No:</strong> {payment.paymentNo}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Date:</strong> {payment.date}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Day:</strong> {payment.day}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Type of Payment:</strong> {payment.selectTypeOfPayment}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Particulars:</strong> {payment.particulars}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Debit:</strong> {payment.debit}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Credit:</strong> {payment.credit}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Description:</strong> {payment.description}
                </Typography>



                <Typography variant="body1" className="payment-info">
                  <strong>Total Credit:</strong> {payment.totalCredit}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Total Debit:</strong> {payment.totalDebit}
                </Typography>
              </Grid>

              {/* Add another Grid item for the right side */}
              <Grid item xs={12} md={6}>
                {/* Add right-side details here */}
                <Typography variant="body1" className="payment-info">
                  <strong>Debit1:</strong> {payment.debit1}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Credit1:</strong> {payment.credit1}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Type of Payment1:</strong> {payment.selectTypeOfPayment1}
                </Typography>
                <Typography variant="body1" className="payment-info">
                  <strong>Particulars1:</strong> {payment.particulars1}
                </Typography>
                <Typography variant="body1" className="payment-info">
                  <strong>Total Credit:</strong> {payment.totalCredit}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Total Debit:</strong> {payment.totalDebit}
                </Typography>
              </Grid>
            </Grid>

            <div className="view-payment-button-container">
              <Link to={`/PaymentVoucherList/${userId}/${companyId}`} className="back-button">
                <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                  Back to Payment Voucher List
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default PaymentVoucherView;
