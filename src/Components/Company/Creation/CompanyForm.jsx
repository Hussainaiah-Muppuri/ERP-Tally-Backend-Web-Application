import React, { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from '../../NavBar/MainNavBar';
import './CompanyForm.css';
import { useParams, useHistory } from 'react-router-dom';

const CompanyForm = () => {
    const { userId } = useParams();
    const history = useHistory();

    const [company, setCompany] = useState({
        companyName: '',
        address: '',
        country: '',
        state: '',
        pincode: '',
        mobileNo: '',
        email: '',
        currencySymbol: '',
        maintain: '',
        financialYearFrom: '',
        booksBeginningFrom: '',
        password: '',
        baseCurrencySymbol: '',
        formalName: '',
        numberOfDecimalPlaces: '',
        isSymbolSuffixedToAmounts: '',
        userId: userId, // Set userId obtained from URL params
        showPassword: false
    });

    const togglePasswordVisibility = () => {
        setCompany({ ...company, showPassword: !company.showPassword });
    };

    const [isValid, setIsValid] = useState(false);

    const validatePincode = (name, value) => {
        if (name === 'pincode') {
            const pincodeRegex = /^[1-9][0-9]{5}$/;
            return pincodeRegex.test(value);
        }
    };

    const inputHandleSubmit = (e) => {
        const { name, value } = e.target;
        setCompany({ ...company, [name]: value });
        if (name === 'pincode') {
            setIsValid(validatePincode(name, value));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:9091/company', company);
            console.log(response.data); // Response from the server
            toast.success('Company created successfully!', { position: 'top-center', autoClose: 1000 });
            // Optionally, you can handle success, show a message, or redirect the user
            setCompany({
                companyName: '',
                address: '',
                country: '',
                state: '',
                pincode: '',
                mobileNo: '',
                email: '',
                currencySymbol: '',
                maintain: '',
                financialYearFrom: '',
                booksBeginningFrom: '',
                password: '',
                baseCurrencySymbol: '',
                formalName: '',
                numberOfDecimalPlaces: '',
                isSymbolSuffixedToAmounts: '',
                userId: userId // Set userId again for the next entry
            });
            history.push(`/Home/${userId}`);
        } catch (error) {
            console.error('Error creating company:', error);
            toast.error('Error creating company. Please try again.', { position: 'top-center', autoClose: 1000 });
            // Optionally, you can handle errors and show an error message to the user
        }
    };

    return (
        <div className='com-reg'>
            <MainNavBar />
            <ToastContainer />
            <h3>Company Form</h3>
            <form onSubmit={handleSubmit} className='com-form'>
                <div className='form-row'>
                    <div className='com-field'>
                        <label>Company Name:</label><br />
                        <input
                            type="text"
                            name="companyName"
                            placeholder='Enter the Company Name'
                            value={company.companyName}
                            onChange={inputHandleSubmit}
                            required
                            pattern="^[a-zA-Z]{3,}[a-zA-Z\s]*$"
                            title='Fill the Company Name'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^a-zA-Z\s.,#&+-]/g, '');
                                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                            }}
                        />
                    </div>
                    <div className='com-field'>
                        <label>Mobile Number:</label><br />
                        <input
                            type="tel"
                            name="mobileNo"
                            placeholder="Enter the 10-digit Mobile Number"
                            value={company.mobileNo}
                            onChange={inputHandleSubmit}
                            pattern="[6-9][0-9]{9}"
                            title='Please Fill 10-digit Mobile Number'
                            required
                        />
                    </div>

                    <div className='com-field'>
                        <label>Email:</label><br />
                        <input
                            type='email'
                            name='email'
                            placeholder='Enter the Company Email'
                            value={company.email}
                            onChange={inputHandleSubmit}
                            required
                            pattern='^[a-zA-Z0-9]{4,}@gmail\.com$'
                            title='Please enter a valid Gmail address with a minimum of four letters before @gmail.com'
                        />
                    </div>
                    <div className='com-field'>
                        <label>Currency Symbol:</label><br />
                        <input
                            type='text'
                            name='currencySymbol'
                            placeholder='Enter the Currency Symbol'
                            value={company.currencySymbol}
                            onChange={inputHandleSubmit}
                            required
                            pattern="^[a-zA-Z\s.,#&+-]{1,}"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                            }}
                        />
                    </div>
                </div>
                <div className='form-row'>
                    <div className='com-field'>
                        <label>Country:</label><br />
                        <input
                            type='text'
                            name='country'
                            placeholder='Enter the Country'
                            value={company.country}
                            onChange={inputHandleSubmit}
                            required
                            pattern="^[a-zA-Z\s]{2,}"
                            title='Fill the Country, only letters'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^a-zA-Z\s.,#&+-]/g, '');
                                e.target.value = e.target.value.replace(/\s{1,}/g, ' ');
                            }}
                        />
                    </div>

                    <div className='com-field'>
                        <label>State:</label><br />
                        <input
                            type='text'
                            name='state'
                            placeholder='Enter the State'
                            value={company.state}
                            onChange={inputHandleSubmit}
                            required
                            pattern="^[a-zA-Z\s]{2,}"
                            title='Fill the State, only letters'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^a-zA-Z\s.,#&+-]/g, '');
                                e.target.value = e.target.value.replace(/\s{1,}/g, ' ');
                            }}
                        />
                    </div>
                    <div className='com-field'>
                        <label>Address:</label><br />
                        <input
                            type='text'
                            name='address'
                            placeholder='Enter the Company Address'
                            value={company.address}
                            onChange={inputHandleSubmit}
                            required
                            title='Fill the Company Address'
                            pattern="^[a-zA-Z0-9\s.,#&+-]{3,}"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                            }}
                        />
                    </div>

                    <div className='com-field'>
                        <label>Pincode:</label><br />
                        <input
                            type="number"
                            name="pincode"
                            placeholder="Enter the 6-digit Pin Code"
                            value={company.pincode}
                            onChange={inputHandleSubmit}
                            pattern="^[1-9][0-9]{5}$"
                            title='Please enter a valid 6-digit Pin Code'
                            required
                        />
                        {company.pincode && !isValid && (
                            <p style={{ color: 'red', display: 'contents', position: 'absolute', left: '50%' }}>
                                Pin Code is invalid</p>
                        )}
                    </div>
                </div>
                <div className='form-row'>


                    <div className='com-main'>
                        <label>Maintain:</label><br />
                        <input
                            type='text'
                            name='maintain'
                            placeholder='Enter the Maintain'
                            value={company.maintain}
                            onChange={inputHandleSubmit}
                            required
                            // pattern="^[a-zA-Z]{3,}[a-zA-Z\s]*$"
                            title='Fill the Maintain Name'
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^a-zA-Z\s.,#&+-]/g, '');
                                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                            }}
                        />
                    </div>

                    <div className='com-field'>
                        <label>Financial Year From:</label><br />
                        <input
                            type='date'
                            name='financialYearFrom'
                            placeholder='Enter the Financial Year From'
                            value={company.financialYearFrom}
                            onChange={inputHandleSubmit}
                            required
                        />
                    </div>
                    <div className='com-field'>
                        <label>Books beginning from:</label><br />
                        <input
                            type='date'
                            name='booksBeginningFrom'
                            placeholder='Enter the Books beginning from'
                            value={company.booksBeginningFrom}
                            onChange={inputHandleSubmit}
                            required
                        />
                    </div>

                    <div className='com-pass'>
                        <label>Password:</label><br />
                        <input
                            type={company.showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Enter the Password"
                            value={company.password}
                            onChange={inputHandleSubmit}
                            required
                            pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                            title="Password must contain at least one digit, one lowercase letter, one uppercase letter, one special character, and be at least 8 characters long."
                        />
                        {company.showPassword ? (
                            <FaEye onClick={togglePasswordVisibility} />
                        ) : (
                            <FaEyeSlash onClick={togglePasswordVisibility} />
                        )}
                    </div>
                </div>
                <hr />
                <div className='form-row'>
                    <div className='com-base'>
                        <div>
                            <label>Base Currency Symbol:</label><br />
                            <input
                                type='text'
                                name='baseCurrencySymbol'
                                placeholder='Enter the Base Currency Symbol'
                                value={company.baseCurrencySymbol}
                                onChange={inputHandleSubmit}
                                required
                                pattern="^[a-zA-Z\s.,#&+-]{1,}"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                                }}
                            />
                        </div>

                        <div>
                            <label>Formal Name:</label><br />
                            <input
                                type='text'
                                name='formalName'
                                placeholder='Enter the Formal Name'
                                value={company.formalName}
                                onChange={inputHandleSubmit}
                                required
                                pattern="^[a-zA-Z\s.,#&+-]{1,}"
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                                }}
                            />
                        </div>
                    </div>
                    <div className='com-base1'>
                        <div className='com-field'>
                            <label>Number of Decimal Places:</label><br />
                            <input
                                type='number'
                                name='numberOfDecimalPlaces'
                                placeholder='Enter the Number of Decimal Places'
                                value={company.numberOfDecimalPlaces}
                                onChange={inputHandleSubmit}
                                required
                            />
                        </div>

                        <div className='com-field'>
                            <label>Is Symbol Suffix to Amounts:</label><br />
                            <select
                                name='isSymbolSuffixedToAmounts'
                                value={company.isSymbolSuffixedToAmounts}
                                onChange={(e) => setCompany({ ...company, isSymbolSuffixedToAmounts: e.target.value })}
                                required
                            >
                                <option value="" disabled>Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>



                    </div>
                </div>
                <button type='submit' className='com-submit'>Create Company</button>
            </form>

        </div>
    );
};

export default CompanyForm;
