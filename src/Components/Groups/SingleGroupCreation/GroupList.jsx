import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';
import MainNavBar from '../../NavBar/MainNavBar';

const GroupsList = () => {
  const history = useHistory();
  const [groups, setGroups] = useState([]);
  const { userId, companyId } = useParams();

  const [showModal, setShowModal] = useState(false);
  const [groupType, setGroupType] = useState('');

  useEffect(() => {
    axios
      .get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`)
      .then((response) => {
        console.log('API Response:', response.data);
        setGroups(response.data);
      })
      .catch((error) => console.error('Error fetching groups:', error));
  }, [userId, companyId]);

  const showToast = (message, type) => {
    toast(message, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
  };

  const handleAddGroup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSelectGroupType = (selectedType) => {
    setGroupType(selectedType);

    if (selectedType === 'single') {
      history.push(`/createGroup/${userId}/${companyId}`);

    } else if (selectedType === 'multiple') {
      history.push(`/createMultiple/${userId}/${companyId}`);

    } else {
      showToast('Invalid choice. Please try again.', 'error');
    }

    handleCloseModal();
  };

  const handleViewGroup = (groupId) => {
    // Ask for confirmation
    const isConfirmed = window.confirm('Are you sure you want to view this group?');

    if (isConfirmed) {
      // Navigate to the "View" page
      history.push(`/viewGroup/${userId}/${companyId}/${groupId}`);
    }
    // If "Cancel" is clicked, do nothing (no redirection)
  };

  const handleUpdateGroup = (groupId) => {
    // Ask for confirmation
    const isConfirmed = window.confirm('Are you sure you want to update this group?');

    if (isConfirmed) {
      // Navigate to the "Update" page
      history.push(`/updateGroup/${userId}/${companyId}/${groupId}`);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    // Ask for confirmation
    const isConfirmed = window.confirm('Are you sure you want to delete this group?');

    if (isConfirmed) {
      try {
        // Send DELETE request to delete the group
        await axios.delete(`http://localhost:8012/api/group/${groupId}`);

        // Update the list of groups after deletion
        const updatedGroups = groups.filter((group) => group.groupId !== groupId);
        setGroups(updatedGroups);

        showToast('Group deleted successfully!', 'success');
      } catch (error) {
        console.error('Error deleting group:', error);
        showToast('Error deleting group. Please try again.', 'error');
      }
    }
  };

  return (
    <div className='container list-group-table'>
      <MainNavBar />
      <div className='groups-list'>
        <div className='d-flex justify-content-between mb-3'>
          <Link to={`/CompanyHome/${userId}/${companyId}`} className='btn btn-secondary'>
            <FaArrowLeft className='mr-2' />
          </Link>
          <h3 style={{ textAlign: 'center' }}>Group List</h3>
          <button onClick={handleAddGroup} className='btn btn-primary'>
            Create Group
          </button>
        </div>
        <table className="table table-info table-borderless text-center">
          <thead>
            <tr className='action-buttons'>
              <th>Sl No</th>
              <th>Group Name</th>
              <th>Under</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr key={group.groupId} className='action-buttons'>
                <td>{index+1}</td>
                <td>{group.groupName}</td>
                <td>{group.under}</td>
                <td className='form-rows'>
                  <button
                    onClick={() => handleViewGroup(group.groupId)}
                    className='btn btn-primary mr-2 group-view'
                  >
                    View
                  </button>
                  <button onClick={() => handleUpdateGroup(group.groupId)} className='btn btn-warning mr-2'>
                    Update
                  </button>
                  <button onClick={() => handleDeleteGroup(group.groupId)} className='btn btn-danger'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      {/* Modal for selecting group type */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Group Type To Create</Modal.Title>
        </Modal.Header>
        <Modal.Body className='list row'>
          <Button variant='primary' onClick={() => handleSelectGroupType('single')}>
            Create Single Group
          </Button>
          <Button variant='secondary' onClick={() => handleSelectGroupType('multiple')}>
            Create Multiple Groups
          </Button>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default GroupsList;
