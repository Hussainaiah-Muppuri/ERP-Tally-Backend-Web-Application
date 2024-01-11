// ReceiptVoucherView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Grid, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ReceiptVoucherView.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const ReceiptVoucherView = () => {
  const { receiptNo, userId, companyId } = useParams();
  const [receipt, setReceipt] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8082/api/receipt/${receiptNo}`)
      .then(response => {
        console.log('API Response:', response.data);
        setReceipt(response.data);
      })
      .catch(error => console.error('Error fetching receipt voucher details:', error));
  }, [receiptNo]);
  useEffect(() => {
    axios.get(`http://localhost:8082/api/receipt/user/${userId}/company/${companyId}}`)
      .then(response => {
        console.log('API Response:', response.data);
        setReceipt(response.data);
      })
      .catch(error => console.error('Error fetching groups:', error));
  }, [userId, companyId]);

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
      <div className="view-receipt-container">
        <Container maxWidth="md" className="view-receipt-card-container">
          <Card elevation={8} className="view-receipt-card">
            <Typography variant="h4" align="center" gutterBottom className="receipt-title">
              View Receipt Voucher
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" className="receipt-info">
                  <strong>Receipt No:</strong> {receipt.receiptNo}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Date:</strong> {receipt.date}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Day:</strong> {receipt.day}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Type of Payment:</strong> {receipt.selectTypeOfPayment}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Particulars:</strong> {receipt.particulars}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Debit:</strong> {receipt.debit}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Credit:</strong> {receipt.credit}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Description:</strong> {receipt.description}
                </Typography>


              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="body1" className="receipt-info">
                  <strong>Debit1:</strong> {receipt.debit1}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Credit1:</strong> {receipt.credit1}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Type of Payment1:</strong> {receipt.selectTypeOfPayment1}
                </Typography>
                <Typography variant="body1" className="receipt-info">
                  <strong>Particulars1:</strong> {receipt.particulars1}
                </Typography>


                <Typography variant="body1" className="receipt-info">
                  <strong>Total Credit:</strong> {receipt.totalCredit}
                </Typography>

                <Typography variant="body1" className="receipt-info">
                  <strong>Total Debit:</strong> {receipt.totalDebit}
                </Typography>
              </Grid>
            </Grid>

            <div className="view-receipt-button-container">
              <Link to={`/ReceiptVoucherList/${userId}/${companyId}`} className="back-button">
                <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                  Back to Receipt Voucher List
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
};

export default ReceiptVoucherView;
