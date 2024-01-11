
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MainNavBar from '../NavBar/MainNavBar';
import { BsArrowLeft } from 'react-icons/bs';

const CompanyPasswordReset = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [auth, setAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [whiteSpaceError, setWhiteSpaceError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [user, setUser] = useState([]);
  const { userId } = useParams();

  const isWhiteSpace = (value) => /\s/.test(value);

  const handleInputChange = (event, setterFunction) => {
    const inputValue = event.target.value;
    setterFunction(inputValue);
    setError('');
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/company/user/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching ledger names:', error);
      }
    };

    fetchUsers();
  }, [userId]);

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      if (!email) {
        setError('Email required.');
        setShowModal(true);
        return;
      }

      const response = await axios.post('http://localhost:9091/company/reset', {
        email: email,
      });

      const data = response.data;

      if (data.message === 'E-Mail Entered Not Matched With Data-Base E-mails Plz Try Again ') {
        setError('Email not exists.');
      } else if (data.message === 'OTP Send to E-Mail check it Once') {
        setAuth(true);
        setOtp('');
        toast.success('OTP sent to email. Check it once.');
        setShowModal(true);
      } else {
        setError('E-Mail is Not Exist Plz Try Again');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (isWhiteSpace(otp) || isWhiteSpace(password) || isWhiteSpace(confirmPassword)) {
        setWhiteSpaceError('Input cannot contain white spaces in OTP, Password, or Confirm Password.');
        return;
      }

      if (password !== confirmPassword) {
        setPasswordMatchError('Password and Confirm Password do not match.');
        return;
      }

      const response = await axios.put('http://localhost:9091/company/password', {
        otp: otp,
        password: password,
      });

      const data = response.data;

      if (data.message === 'OTP is Incorrect  ') {
        setError('Incorrect OTP. Please try again.');
      } else if (data.message === 'Password Reset For Company Successfully') {
        setAuth(true);
        toast.success('Password reset successful for Company. Please log in.');
      } else {
        setError('Incorrect OTP. Please check your OTP and try again.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    if (auth) {
      history.push(`/Home/${userId}`);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleTogglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div >
      <MainNavBar />
      <a href={`/Home/${userId}`} className='back-button'>
        <BsArrowLeft style={{ color: 'blue' }} />
      </a>
      <div className='container'>
        <div className='container user-email-h'>
          <h3>Company Reset Password</h3>
          <p className='custom-error'>{error}</p>
          <form className='user-email-val'>

            <div>
              <label>Enter the registered Company Email Id:</label>
              <input
                type='email'
                className='custom-form-control'
                placeholder='Enter the registered company email-Id'
                value={email}
                onChange={(event) => handleInputChange(event, setEmail)}
              />

            </div>
            <button
              type='submit'
              className='btn btn-secondary'
              onClick={handleReset}
            >
              <strong>Submit</strong>
            </button>
            <p className='custom-success'></p>
          </form>
        </div>
      </div>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Company New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-new-password'>
            {/* OTP Input */}
            <div>
              <label className='custom-label'>Confirm OTP </label>
              <input
                type='number'
                className='form-control'
                placeholder='Enter the 6-digit OTP'
                value={otp}
                onChange={(event) => handleInputChange(event, setOtp)}
              />
            </div>

            {/* Password Input */}
            <div className='otp-confirm-user'>
              <label className='custom-label'>New Password</label>
              <div className='password-input-container1'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder='Enter the New Password'
                  value={password}
                  onChange={(event) => handleInputChange(event, setPassword)}
                  pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'
                  title='Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.'
                  required
                />
                <span
                  className='password-toggle-icon'
                  onClick={() => handleTogglePassword('password')}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className='otp-confirm-user'>
              <label className='custom-label'>Confirm Password</label>
              <div className='password-input-container1'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className='form-control'
                  placeholder=' Confirm the Password'
                  value={confirmPassword}
                  onChange={(event) => handleInputChange(event, setConfirmPassword)}
                  pattern='^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$'
                  title='Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long.'
                  required
                />
                <span
                  className='password-toggle-icon'
                  onClick={() => handleTogglePassword('confirmPassword')}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <p className='custom-error'>{whiteSpaceError}</p>
            <p className='custom-error'>{passwordMatchError}</p>
            <p className='custom-error'>{error}</p>

            <div className='Reset-user-submit'>
              <button type='button' className='btn btn-primary' onClick={handleLogin}>
                <strong>Reset Password</strong>
              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='bottom-right' autoClose={5000} />
    </div>
  );
};

export default CompanyPasswordReset;
