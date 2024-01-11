
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Grid, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './ViewCredit.css'
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';
export default function ViewCredit() {


  //import './JournalVoucherView.css'; // Add your custom styles


  const { creditNo, userId, companyId } = useParams();
  const [salesOrders, setSalesOrders] = useState({});


  const [sales, setSales] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:9094/api/creditNote/get/${creditNo}`)
      .then(response => {
        console.log('API Response:', response.data);
        setSales(response.data);
      })
      .catch(error => console.error('Error fetching sales Order voucher details:', error));
  }, [creditNo]);

  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>Credit Note Details</h3>
        <Link to={`/CreditList/${userId}/${companyId}`} className="btn btn-primary">
          Credit note Entries
        </Link>
      </div>
      <div className="view-journal-container">
        <Container maxWidth="md" className="view-journal-card-container">
          <Card elevation={8} className="view-journal-card">

            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <Typography variant="body1" className="journal-info">
                  <strong>CreditNote No:</strong> {sales.creditNo}
                </Typography>
                <Typography variant="body1" className="journal-info">
                  <strong>Order No:</strong> {sales.orderNo}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Date:</strong> {sales.date}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Day :</strong> {sales.day}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Party A/c Name:</strong> {sales.partyName}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Current Balance:</strong> {sales.currentBalance}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Item Name:</strong> {sales.itemName}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Quantity:</strong> {sales.quantity}
                </Typography>
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="body1" className="journal-info">
                  <strong>Rate:</strong> {sales.rate}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Unit:</strong> {sales.unit}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Discount:</strong> {sales.discount}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Amount:</strong> {sales.amount}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Total Amount</strong> {sales.totalAmount}
                </Typography>

                <Typography variant="body1" className="journal-info">
                  <strong>Description:</strong> {sales.description}
                </Typography>
              </Grid>
            </Grid>

            <div className="view-journal-button-container">
              <Link to={`/CreditList/${userId}/${companyId}`} className="back-button">
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
