import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainNavBar from '../NavBar/MainNavBar';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Home = () => {
  const { userId } = useParams();
  const history = useHistory();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Fetch the list of companies based on userId
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/company/user/${userId}`);
        setCompanies(response.data);
      } catch (error) {
        console.error('Error fetching companies:', error);
        // Handle error if needed
      }
    };

    fetchCompanies();
  }, [userId]);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset the password state when the modal is closed
    setPassword('');
  };

  const handlePasswordSubmit = async () => {
    try {
      // Validate password on the server
      const response = await axios.post(`http://localhost:9091/company/validate-password`, {
        companyId: selectedCompany.companyId,
        password: password,
      });

      if (response.data.success) {
        toast.success('Company login successful!', { position: 'top-center', autoClose: 2000 });
        localStorage.setItem('userId',userId);
        localStorage.setItem('IsCompanyLoggedIn',true);
        setShowModal(false);

        // Redirect to companyHome
        history.push(`/CompanyHome/${userId}/${selectedCompany.companyId}`);
      } else {
        toast.error('Invalid credentials. Please try again.', { position: 'top-center', autoClose: 2000 });
      }
    } catch (error) {
      console.error('Error validating password:', error);
      toast.error('Error validating password. Please try again.', { position: 'top-center', autoClose: 2000 });
    }
  };

  return (
    <div>
      <MainNavBar />
      <div className="container-fluid">
        <div className="row">
          {/* Left Side (30%) */}
          <div className="col-md-3">
            <div className="list-group">
              <a href={`/CompanyForm/${userId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                Create Company
              </a>
              <a href="#" className="list-group-item list-group-item-action custom-sidebar-item">
                Backup
              </a>
              <a href="#" className="list-group-item list-group-item-action custom-sidebar-item">
                Restore
              </a>
            </div>
          </div>

          {/* Right Side (70%) */}
          <div className="col-md-9 d-flex align-items-center justify-content-center">
            <div>
              <h2 className="text-center">List of Companies</h2>
              <ul>
                {companies.map((company) => (
                  <li key={company.companyId}>
                    {/* <button onClick={() => handleCompanyClick(company)} >{company.companyName}</button> */}
                    <span onClick={() => handleCompanyClick(company)} style={{ cursor: 'pointer' }}>{company.companyName}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Password Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the Password for {selectedCompany?.companyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputGroup.Text id="basic-addon2" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <a href={`/CompanyPasswordReset/${userId}`} style={{ textDecoration: 'none', marginRight:'15%' }}>
            Forgot Password?
          </a>

          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePasswordSubmit}>
            Submit Password
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default Home;
