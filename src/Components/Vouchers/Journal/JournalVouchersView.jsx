// JournalVoucherView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Typography, Grid, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './JournalVoucherView.css'; // Add your custom styles
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const JournalVoucherView = () => {
  const { journalNo, userId, companyId } = useParams();
  const[journals,setJournals]=useState({});


  const [journal, setJournal] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8092/api/journal/${journalNo}`)
      .then(response => {
        console.log('API Response:', response.data);
        setJournal(response.data);
      })
      .catch(error => console.error('Error fetching journal voucher details:', error));
  }, [journalNo]);
  useEffect(() => {
    axios.get(`http://localhost:8092/api/group/user/${userId}/company/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setJournals(response.data);
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
      <h3 style={{ textAlign: 'center' }}> View Journal Voucher</h3>
      <Link to={`/JournalVoucherList/${userId}/${companyId}`} className="btn btn-primary">
        Journal Voucher List
      </Link>
    </div>
    <div className="view-journal-container">
      <Container maxWidth="md" className="view-journal-card-container">
        <Card elevation={8} className="view-journal-card">
         

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" className="journal-info">
                <strong>Journal No:</strong> {journal.journalNo}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Date:</strong> {journal.date}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Day:</strong> {journal.day}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Type of Payment:</strong> {journal.selectTypeOfPayment}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Particulars:</strong> {journal.particulars}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Debit:</strong> {journal.debit}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Credit:</strong> {journal.credit}
              </Typography>

              <Typography variant="body1" className="journal-info">
                <strong>Description:</strong> {journal.description}
              </Typography>

             
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="body1" className="journal-info">
            <strong>Debit1:</strong> {journal.debit1}
          </Typography>

          <Typography variant="body1" className="journal-info">
            <strong>Credit1:</strong> {journal.credit1}
          </Typography>

          <Typography variant="body1" className="journal-info">
            <strong>Type of Payment1:</strong> {journal.selectTypeOfPayment1}
          </Typography>

          <Typography variant="body1" className="journal-info">
          <strong>Particulars1:</strong> {journal.particulars1}
        </Typography>

          <Typography variant="body1" className="journal-info">
            <strong>Total Credit:</strong> {journal.totalCredit}
          </Typography>

          <Typography variant="body1" className="journal-info">
            <strong>Total Debit:</strong> {journal.totalDebit}
          </Typography>
            </Grid>
          </Grid>

          <div className="view-journal-button-container">
            <Link to={`/JournalVoucherList/${userId}/${companyId}`} className="back-button">
              <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />}>
                Back to Journal Voucher List
              </Button>
            </Link>
          </div>
        </Card>
      </Container>
    </div>
    </div>
  );
};

export default JournalVoucherView;
