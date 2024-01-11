
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Grid, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ViewSalesOrder.css'
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

export default function ViewSalesOrder() {


  //import './JournalVoucherView.css'; // Add your custom styles


  const { salesOrderNo, userId, companyId } = useParams();
  const [salesOrders, setSalesOrders] = useState({});


  const [sales, setSales] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:1111/api/sales/${salesOrderNo}`)
      .then(response => {
        console.log('API Response:', response.data);
        setSales(response.data);
      })
      .catch(error => console.error('Error fetching sales Order voucher details:', error));
  }, [salesOrderNo]);
 
  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>sales Order Voucher Details</h3>
        <Link to={`/SalesOrderList/${userId}/${companyId}`} className="btn btn-primary">
          Sales Order Entries
        </Link>
      </div>
      <div className="view-journal-container">
        <Container maxWidth="md" className="view-journal-card-container">
          <Card elevation={8} className="view-journal-card" >


            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Typography variant="body1" className="payment-info">
                  <strong>Sales Order No:</strong> {sales.salesOrderNo}
                </Typography>
                <Typography variant="body1" className="payment-info">
                  <strong>Order No:</strong> {sales.orderNo}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Date:</strong> {sales.date}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Day :</strong> {sales.day}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Party A/c Name:</strong> {sales.partyName}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Current Balance:</strong> {sales.currentBalance}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Item Name:</strong> {sales.itemName}
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="body1" className="payment-info">
                  <strong>Quantity:</strong> {sales.quantity}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Rate:</strong> {sales.rate}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Unit:</strong> {sales.unit}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Discount:</strong> {sales.discount}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Amount:</strong> {sales.amount}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Total Amount</strong> {sales.totalAmount}
                </Typography>

                <Typography variant="body1" className="payment-info">
                  <strong>Description:</strong> {sales.description}
                </Typography>
              </Grid>
            </Grid>

            <div className="view-journal-button-container">
              <Link to={`/SalesOrderList/${userId}/${companyId}`} className="back-button">
                <Button  variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                  Back
                </Button>
              </Link>
            </div>
          </Card>
        </Container>
      </div>
    </div>
  )
}
