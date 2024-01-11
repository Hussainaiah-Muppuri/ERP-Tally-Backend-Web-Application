// MultipleGroupCreation.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import './MultipleGroup.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';
import MainNavBar from '../../NavBar/MainNavBar';

const MultipleGroupCreation = () => {
  const [groupData, setGroupData] = useState([
    { groupName: '', under: '', userId: '', companyId: '' },
  ]);
  const { userId, companyId } = useParams();

  const handleGroupDataChange = (index, event) => {
    const { name, value } = event.target;
    const updatedGroupData = [...groupData];
    updatedGroupData[index][name] = value;
    setGroupData(updatedGroupData);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewGroupRow();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Delete' && groupData.length > 1) {
      // Prevent the browser's default behavior for the Delete key
      event.preventDefault();
      deleteGroupRow(index);
    } else if (event.key === 'Backspace') {
      // Check if the active element is an input or textarea
      const activeElement = document.activeElement;
      const isInputOrTextarea = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

      // If not an input or textarea, and there is more than one group row, remove the last group row
      if (!isInputOrTextarea && groupData.length > 1) {
        event.preventDefault();
        deleteGroupRow();
      }
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener('keydown', handleKeyDown);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const deleteGroupRow = (index) => {
    const updatedGroupData = [...groupData];
    updatedGroupData.splice(index, 1);
    setGroupData(updatedGroupData);
  };

  const addNewGroupRow = () => {
    setGroupData([
      ...groupData,
      { groupName: '', under: '', userId: userId, companyId: companyId },
    ]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`);

        if (response.data && response.data.length > 0) {
          const { userId, companyId } = response.data[0];
          console.log('user', userId);
          console.log('company', companyId);
          setGroupData([{ groupName: '', under: '', userId, companyId }]);
        } else {
          console.error('Invalid response data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user and company data:', error.message);
      }
    };

    fetchData();
  }, [userId, companyId]);

  const handleSubmit = async () => {
    try {
      const validGroups = groupData.filter((group) => group.groupName.trim() !== '');

      if (validGroups.length === 0) {
        toast.warning('Please enter at least one group name.', { position: 'top-center', autoClose: 2000 });
        return;
      }

      const response = await axios.post('http://localhost:8012/api/group/multiple', validGroups);

      if (response.status === 200) {
        toast.success('Group data added successfully', { position: 'top-center', autoClose: 2000 });
        setGroupData([{ groupName: '', under: '', userId: userId, companyId: companyId }]);
      } else {
        console.error('Failed to add group data. Unexpected status:', response.status);
        toast.error('Error adding group data. Please try again.', { position: 'top-center', autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error:', error.message);
      toast.error('Error adding group data. Please try again.', { position: 'top-center', autoClose: 2000 });
    }
  };

  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>Multiple Group Creation</h3>
        <Link to={`/listGroup/${userId}/${companyId}`} className="btn btn-primary">
          Group List
        </Link>
      </div>

      <Container className="mt-5">
        <Row>
          <Col>
            <Table striped bordered hover style={{ width: '100%', minWidth: '400px' }}>
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>Name</th>
                  <th>Under</th>
                </tr>
              </thead>
              <tbody>
                {groupData.map((group, index) => (
                  <tr key={index}>
                    <td>
                      <Form.Control
                        style={{ borderRadius: '10px' }}
                        type="text"
                        name="groupName"
                        value={group.groupName}
                        onChange={(e) => handleGroupDataChange(index, e)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^a-zA-Z\s.,#&+-]/g, '');
                          e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                        }}
                      />
                    </td>
                    <td>
                      <select
                        style={{ borderRadius: '10px' }}
                        type="text"
                        name="under"
                        className='group-tagss-select'
                        value={group.under}
                        onChange={(e) => handleGroupDataChange(index, e)}
                        required
                      >
                        <option value=" ">Under</option>
                        <option value="BalanceSheet">Balance Sheet</option>
                        <option value="Profit & Loss">Profit & Loss</option>
                      </select>
                    </td>
                  </tr>
                ))}
                <tr></tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" className="text-center">
                    <Button variant="success" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </td>
                </tr>
              </tfoot>
            </Table>
            <ToastContainer />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MultipleGroupCreation;
