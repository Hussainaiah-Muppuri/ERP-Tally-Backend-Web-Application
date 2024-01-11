// ViewGroup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Card, Grid, Button, Container } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './ViewGroup.css';
import MainNavBar from '../../NavBar/MainNavBar';

const ViewGroup = () => {
    const { groupId, userId, companyId } = useParams();

    console.log('groupId:', groupId);
    console.log('userId:', userId);
    console.log('companyId:', companyId);

    const [group, setGroup] = useState({});
    const [groups1, setGroups1] = useState({});

    useEffect(() => {
        console.log('groupId:', groupId);

        axios
            .get(`http://localhost:8012/api/groups/${groupId}`)
            .then((response) => {
                console.log('API Response:', response.data);
                setGroup(response.data);
            })
            .catch((error) => console.error('Error fetching group details:', error));
    }, [groupId]);

    useEffect(() => {
        axios
            .get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`)
            .then((response) => {
                console.log('API Response:', response.data);
                setGroups1(response.data);
            })
            .catch((error) => console.error('Error fetching groups:', error));
    }, [userId, companyId]);

    return (
        <div className="view-group container">
            <MainNavBar />
            <Container maxWidth="md" className="view-group-card-container">
                <Card elevation={8} className="view-group-card">
                    <div>
                        <h3 className="group-title" style={{ textAlign: 'center' }}>View Group</h3>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={8}>
                                <div className="group-info">
                                    <strong>Group ID:</strong> {group.groupId}
                                </div>

                                <div className="group-info">
                                    <strong>Group Name:</strong> {group.groupName}
                                </div>

                                <div className="group-info">
                                    <strong>Under:</strong> {group.under}
                                </div>
                            </Grid>
                            {/* Add more grid items for additional group details */}
                        </Grid>

                        <div className="view-group-button-container">
                            <Link to={`/listGroup/${userId}/${companyId}`} className="back-button">
                                <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} >
                                    Back to Group List
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Card>
            </Container>
        </div>
    );
};

export default ViewGroup;
