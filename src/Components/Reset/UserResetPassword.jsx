import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserReset.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import MainNavBar from '../NavBar/MainNavBar';
import { BsArrowLeft } from 'react-icons/bs';




const UserResetPassword = () => {
  const history = useHistory();
  const [emailId, setEmailId] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [auth, setAuth] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [whiteSpaceError, setWhiteSpaceError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Add state for confirm password visibility

  const isWhiteSpace = (value) => /\s/.test(value);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const validEmailRegex = /^[a-zA-Z0-9@.]+$/;

    if (!validEmailRegex.test(inputValue)) {
      setError('Invalid characters in the email. Please use only alphabets, numbers, @, and dot (.)');
    } else {
      setEmailId(inputValue);
      setError('');
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    try {
      if (!emailId) {
        setError('Email required.');
        setShowModal(true);
        return;
      }

      const response = await axios.post('http://localhost:9090/erpTally/reset', {
        emailId: emailId,
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

      const response = await axios.put('http://localhost:9090/erpTally/password', {
        otp: otp,
        password: password,
        confirmPassword: confirmPassword,
      });

      const data = response.data;

      if (data.message === 'OTP is Incorrect  ') {
        setError('Incorrect OTP. Please try again.');
      } else if (data.message === 'Password Reset Successfully') {
        setAuth(true);
        toast.success('Password reset successful. Please log in.');
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
      history.push('/UserLogin');
    }
  };

  return (
    <div >
      <MainNavBar />

      <a href="/UserLogin" className='back-button'>
        <BsArrowLeft style={{ color: 'blue' }} />
      </a>

      <div>
        <div className='container user-email-h'>
          <h3>Reset Password</h3>
          <p className="error">{error}</p>
          <form className='user-email-val'>
            <div>
              <label>Enter registered User Email Id:</label><br />
              <input
                type="email"
                id="emailId"
                placeholder="Enter the Registered User Email Id"
                value={emailId}
                onChange={handleInputChange}
                required
                title='Fill the User Email'
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary"
              onClick={handleReset}
            >
              <strong>Submit</strong>
            </button>
            <p className="success"></p>
          </form>
        </div>
      </div>

    
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>New Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-new-password">
            <div>
              <label>Confirm OTP </label>
              <input
                type="number"
                id="otp"
                className="form-control"
                placeholder="Enter the 6-digit OTP"
                value={otp}
                onChange={(event) => {
                  setOtp(event.target.value);
                  setWhiteSpaceError('');
                }}
                required
                title="Please Enter the OTP without white spaces"
              />
            </div>
            <div className='otp-confirm-user'>
              <label>New Password</label>
              <div className='password-input-container1'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-control"
                  placeholder="Enter the new Password"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setWhiteSpaceError('');
                    setPasswordMatchError('');
                  }}
                  required
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                />
                <span
                  className='password-toggle-icon'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>

            </div>
            <div className='otp-confirm-user'>
              <label>Confirm Password</label>
              <div className='password-input-container1'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className="form-control"
                  placeholder="Confirm the Password"
                  value={confirmPassword}
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    setWhiteSpaceError('');
                    setPasswordMatchError('');
                  }}
                  required
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                />
                <span
                  className='password-toggle-icon'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <p className="error">{whiteSpaceError}</p>
            <p className="error">{passwordMatchError}</p>
            <p className='error'>{error}</p>

            <div className='Reset-user-submit'>
              <button type="button" className="btn btn-primary" onClick={handleLogin}>
                <strong>Reset Password</strong>

              </button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Container for displaying notifications */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default UserResetPassword;
