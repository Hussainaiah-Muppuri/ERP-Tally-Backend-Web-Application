import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import './LoginForm.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsArrowLeft } from 'react-icons/bs';
import Daybooks from '../../DayBook/Daybook';

const LoginForm = () => {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!identifier.trim() || !password.trim()) {
            toast.error('Please fill in both User ID and Password', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/erpTally/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ identifier, password }), // Updated identifier
            });

            if (response.ok) {
                function isAuthenticated() {
                    localStorage.setItem('isLoggedIn', true);
                       return true;
                        }  
                const result = await response.json(); // Assuming the response is in JSON format
                if (result.success) {
                    toast.success('Login successful!', {
                     
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                        
                    });

                    // to check that id is getting or not if you want to check then uncomment the below line
                    // console.log(result.userId);
                    
                    isAuthenticated();

                    history.push(`/Home/${result.userId}`);
                } else {
                    toast.error(result.message, {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                    });
                    setIdentifier('');
                    setPassword('');
                }
            } else {
                const errorMessage = await response.text();
                console.error(errorMessage);

                toast.error('Invalid credentials. Please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });

                setIdentifier('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error during login:', error);

            toast.error('An error occurred during login. Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });

            setIdentifier('');
            setPassword('');
        }
    };

return (
    <div className='user-login'>
       <nav className="navbar navbar-light bg-light">
                 <a href="/" className='back-button'>
                    <BsArrowLeft style={{ color: 'blue' }} />
                 </a>
       </nav>
       <h3>Login Form</h3>
             <form onSubmit={handleSubmit}>
                 <div className='login'>
                     <label className="form-label">Enter the Mobile number or Email ID:</label>
                     <br /> <input
                         type="text"
                         id="identifier"
                        name="identifier"
                         placeholder='Enter the Mobile Number or Email'
                       value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        // pattern="[6-9][0-9]{9}|[a-z]{3,}[a-z0-9]*@gmail\.com"
                         title="Invalid input. Please enter a valid mobile number or a valid Gmail address."
                     />
              </div>

              <div className='login'>
                    <label className="form-label">Enter the Password:</label>
                    <div className="password-input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="Enter the Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                            title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                        />
                        {showPassword ? (
                            <FaEye className="eye-icon" onClick={handleTogglePassword} />
                        ) : (
                            <FaEyeSlash className="eye-icon" onClick={handleTogglePassword} />
                        )}
                    </div>
                </div>
           <div>
               <button type="submit">Login</button>
           </div>
       </form>
       <div className="additional-links">
           <div className='fo-pwd'>
               <a href="/UserResetPassword">Forgot Password?</a>
           </div>
           <div className='cre-acc'>
               Don't have an account? <a href="/RegistrationForm">Create Account</a>
           </div>
       </div>
       <ToastContainer />
   </div>
);
};

export default LoginForm;