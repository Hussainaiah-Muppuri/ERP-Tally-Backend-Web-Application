import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import './AddGroup.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const AddGroupForm = () => {
  const { userId, companyId } = useParams();
  const [groupData, setGroupData] = useState({
    groupName: '',
    under: '',
  });

  const [groupOptions, setGroupOptions] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`)
      .then((response) => {
        setGroupOptions(response.data);
      })
      .catch((error) => console.error('Error fetching groups:', error));
  }, [userId, companyId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGroupData({
      ...groupData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8012/api/group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include userId and companyId in the request body
        body: JSON.stringify({
          ...groupData,
          userId,
          companyId,
        }),
      });

      if (response.ok) {
        toast.success('Group added successfully!', { position: 'top-center' });
        // You can perform additional actions here, e.g., redirect or update state
      } else {
        console.error('Failed to add group');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h3 style={{ textAlign: 'center' }}>Add Group</h3>
        <Link to={`/listGroup/${userId}/${companyId}`} className="btn btn-primary">
          Group List
        </Link>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3" style={{ width: '50%', marginLeft: '25%' }}>
          <label htmlFor="groupName" className="form-label">Name:</label>
          <input
            type="text"
            id="groupName"
            name="groupName"
            value={groupData.groupName}
            onChange={handleInputChange}
            className="form-control group-tagss"
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
            id="under"
            name="under"
            value={groupData.under}
            onChange={handleInputChange}
            className="form-select group-tagss-select"
            required
          >
            <option value="" disabled>Select Under</option>
            <option value="balancesheet">Balance Sheet</option>
            <option value="profit-loss">Profit & Loss</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '20%', marginLeft: '40%' }}>Submit</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddGroupForm;