import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsArrowLeft, BsHouseDoor } from 'react-icons/bs';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './RegistrationForm.css';
import { BsEye, BsEyeSlash } from 'react-icons/bs';

const RegistrationForm = () => {
    const history = useHistory();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: '',
        state: '',
        country: '',
        address: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setShowPassword(!showPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        let error = '';

        // Validation
        if (name === 'firstName' || name === 'lastName' || name === 'state' || name === 'country') {
            // Accept only alphabets and single spaces, min length 2, max length 16
            const regex = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
            if (!regex.test(value)) {
                error = 'Invalid format. Use only alphabets with optional single space.';
            } else if (value.length <= 3 || value.length > 16) {
                error = 'First name should be between 3 and 16 characters.';
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: error,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!Object.values(formData).every(value => value.trim())) {
            // Show a toast if any field is empty
            toast.error('Please fill in all the fields.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            return;
        }

        let validationErrors = {};
        if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:9090/erpTally/signup', formData);
            if (response.status === 201) {
                // Redirect to UserLogin upon successful signup
                history.push('/UserLogin');
                toast.success('Signup successful!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
                // Clear the form fields
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobileNumber: '',
                    password: '',
                    confirmPassword: '',
                    state: '',
                    country: '',
                    address: '',
                });
            } else {
                toast.error('Signup Unsuccessful!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobileNumber: '',
                    password: '',
                    confirmPassword: '',
                    state: '',
                    country: '',
                    address: '',
                });

            }
        } catch (error) {
            // Handle error response
            console.error('Error during signup:', error);
            toast.error('Signup failed. Please try again.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
        }
    };


    return (
        <div className='add-user'>
            <nav className="navbar navbar-light bg-light">
                <a href="/UserLogin" className='back-button'>
                    <BsArrowLeft />
                </a>
                <Link to="/" className='home-button'>
                    <BsHouseDoor />
                </Link>
            </nav>
            <div>
                <h3>Sign Up Form</h3>
                <form onSubmit={handleSubmit} className='reg-form'>

                    <div className='form-row'>
                        <div className='form-in'>
                            <label>First Name:</label><br />
                            <input
                                type="text"
                                name="firstName"
                                placeholder='Enter the First Name'
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                            {errors.firstName && <p className="error">{errors.firstName}</p>}
                        </div>
                        <div className='form-in'>
                            <label>Last Name:</label><br />
                            <input
                                type="text"
                                name="lastName"
                                placeholder='Enter the Last Name'
                                value={formData.lastName}
                                onChange={handleChange}
                                 required
                            />
                            {errors.lastName && <p className="error">{errors.lastName}</p>}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-in'>
                            <label>Email:</label><br />
                            <input
                                type="email"
                                name="email"
                                placeholder='Enter the Email'
                                value={formData.email}
                                onChange={handleChange}
                                pattern="[a-z]{3,}[a-z0-9]*@gmail\.com"
                                required
                            />
                            {errors.email && <p className="error">{errors.email}</p>}
                        </div>

                        <div className='form-in'>
                            <label>Mobile Number:</label><br />
                            <input
                                type="text"
                                name="mobileNumber"
                                placeholder='Enter your 10-digit Mobile Number'
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                pattern="[6-9][0-9]{9}"
                                required
                            />
                            {errors.mobileNumber && <p className="error">{errors.mobileNumber}</p>}
                        </div>
                    </div>
                    <div className='form-row'>
                        <div className='form-in'>
                            <label>Country:</label><br />
                            <input
                                type="text"
                                name="country"
                                placeholder='Enter your Country'
                                value={formData.country}
                                onChange={handleChange}
                                required
                            />
                            {errors.country && <p className="error">{errors.country}</p>}
                        </div>
                        <div className='form-in'>
                            <label>State:</label><br />
                            <input
                                type="text"
                                name="state"
                                placeholder='Enter your State'
                                value={formData.state}
                                onChange={handleChange}
                                required
                            />
                            {errors.state && <p className="error">{errors.state}</p>}
                        </div>
                    </div>
                    <div className='form-add'>
                        <label>Address:</label><br />
                        <input
                            type="text"
                            name="address"
                            placeholder='Enter your Address'
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                        {errors.address && <p className="error">{errors.address}</p>}
                    </div>
                    <div className='form-row'>
                        <div className='form-pass'>
                            <label>Password:</label><br />
                            <div className="password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder='Enter your Password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                                    title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                                    required
                                />
                                <span className="password-toggle" onClick={() => togglePasswordVisibility('password')}>
                                    {showPassword ? <BsEye /> : <BsEyeSlash />}
                                </span>
                            </div>
                            {errors.password && <p className="error">{errors.password}</p>}
                        </div>

                        <div className='form-pass'>
                            <label>Confirm Password:</label><br />
                            <div className="password-input">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder='Confirm your Password'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                                    title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                                    required
                                />
                                <span className="password-toggle" onClick={() => togglePasswordVisibility('confirmPassword')}>
                                    {showConfirmPassword ? <BsEye /> : <BsEyeSlash />}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                    <div>
                        <button className='reg-but' type="submit">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegistrationForm;
