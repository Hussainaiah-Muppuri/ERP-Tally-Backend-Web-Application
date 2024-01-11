import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import MainNavBar from '../../NavBar/MainNavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';

const UpdateGroupForm = ({ onUpdate }) => {
  const { groupId, userId, companyId } = useParams();
  const [groups, setGroups] = useState();
  const [groupData, setGroupData] = useState({
    groupName: '',
    under: '',
    // Add other fields as needed
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showNoChangesModal, setShowNoChangesModal] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`)
      .then(response => {
        console.log('API Response:', response.data);
        setGroups(response.data);
        // Find the group with the matching groupId
        const selectedGroup = response.data.find(group => group.groupId === Number(groupId));
        // If a group is found, set the initial state of groupData
        if (selectedGroup) {
          setGroupData({
            groupName: selectedGroup.groupName,
            under: selectedGroup.under,
          });
        }
      })
      .catch(error => console.error('Error fetching groups:', error));
  }, [userId, companyId, groupId]);

  const handleInputChange = (e) => {
    setGroupData({
      ...groupData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    // Optionally, redirect to another page
    window.location.href = `/listGroup/${userId}/${companyId}`;
  };

  const handleCloseNoChangesModal = () => {
    setShowNoChangesModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with all the fields, including userId and companyId
    const updateData = {
      ...groupData,
      userId: userId,
      companyId: companyId,
    };

    const hasChanges = Object.keys(updateData).some(
      (key) => updateData[key] !== groups[0][key]
    );

    if (!hasChanges) {
      // Show a modal indicating no modifications have been made
      setShowNoChangesModal(true);
      return;
    }
    try {
      const response = await axios.put(`http://localhost:8012/api/group/${groupId}`, updateData);

      console.log('Group updated successfully:', response.data);

      // Show a modal indicating success
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Error updating group:', error);
      // Show an error modal
      setShowNoChangesModal(true);
    }
  };

  return (
    <div className="container">
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>Update Group</h3>
        <Link to={`/listGroup/${userId}/${companyId}`} className="btn btn-primary">
          Group List
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-3" style={{ width: '50%', marginLeft: '25%' }}>
          <label htmlFor="groupName" className="form-label">Group Name:</label>
          <input
            type="text"
            className="form-control group-tagss"
            id="groupName"
            name="groupName"
            value={groupData.groupName}
            onChange={handleInputChange}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^a-zA-Z\s.,#&+-]/g, '');
              e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
            }}
            required

          />
        </div>
        <div className="mb-3" style={{ width: '50%', marginLeft: '25%' }}>
          <label htmlFor="under" className="form-label">Under:</label>
          <select
            className="form-select group-tagss-select"
            id="under"
            name="under"
            value={groupData.under}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Under</option>
            <option value="balancesheet">BalanceSheet</option>
            <option value="profitloss">Profit & Loss</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '20%', marginLeft: '40%' }}>Update Group</button>
      </form>

      {/* Modal for showing success message */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Group Updated</Modal.Title>
        </Modal.Header>
        <Modal.Body>Group has been updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal for showing no changes message */}
      <Modal show={showNoChangesModal} onHide={handleCloseNoChangesModal}>
        <Modal.Header closeButton>
          <Modal.Title>No Changes Made</Modal.Title>
        </Modal.Header>
        <Modal.Body>No changes have been made.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseNoChangesModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateGroupForm;
