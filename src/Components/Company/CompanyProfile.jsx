import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainNavBar from '../NavBar/MainNavBar';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CompanyProfile.css';





const PasswordField = ({ label, value, onChange }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prev) => !prev);
    };

    return (
        <p>
            {' '}
            {onChange ? (
                <div className="password-input-container">
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        value={value}
                        onChange={onChange}
                    />
                    <span onClick={togglePasswordVisibility}>
                        {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                    </span>
                </div>
            ) : (
                'No password set'
            )}
        </p>
    );
};




const CompanyProfile = () => {
    const { userId, companyId } = useParams();
    const [company, setCompany] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableCompany, setEditableCompany] = useState(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:9091/company/${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCompany(data);
                    setEditableCompany(data); // Initialize editableCompany with company data
                } else {
                    console.error('Failed to fetch company data');
                }
            } catch (error) {
                console.error('Error during company data fetching:', error);
            }
        };

        fetchCompanyData();
    }, [companyId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        // Reset editableCompany to the original company data on cancel
        setEditableCompany(company);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:9091/company/${companyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editableCompany),
            });

            if (response.ok) {
                setCompany(editableCompany); // Update the displayed company data
                setIsEditing(false); // Exit edit mode
                console.log('Company updated successfully.');
            } else {
                console.error('Failed to update company');
            }
        } catch (error) {
            console.error('Error during update request:', error);
        }
    };

    const handleChange = (e) => {
        // Update the corresponding field in editableCompany
        setEditableCompany({ ...editableCompany, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <MainNavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                        <FaArrowLeft className="mr-2" /> Back
                    </Link>
                    <h3 style={{ textAlign: 'center' }}>Company Profile</h3>
                    {isEditing ? (
                        <>
                            <button className="btn btn-success" onClick={handleSave}>
                                Save
                            </button>
                            <button className="btn btn-secondary" onClick={handleCancelEdit}>
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={handleEdit}>
                            Edit
                        </button>
                    )}
                </div>
                <div className="container">
                    {company ? (
                        <div>
                            <div className="row profile-input">
                                <div className="col-md-6" >
                                    <p>
                                        <strong>Company Name:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="companyName"
                                                value={editableCompany.companyName}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.companyName
                                        )}
                                    </p>
                                    <p>
                                        <strong>Address:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={editableCompany.address}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.address
                                        )}

                                    </p>
                                    <p><strong>Country:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="Country"
                                                value={editableCompany.country}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.country
                                        )}
                                    </p>
                                    <p><strong>State:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="state"
                                                value={editableCompany.state}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.state
                                        )}
                                    </p>
                                    <p><strong>Pincode:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={editableCompany.pincode}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.pincode
                                        )}
                                    </p>
                                    <p><strong>Mobile No:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="mobileNo"
                                                value={editableCompany.mobileNo}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.mobileNo
                                        )}
                                    </p>
                                    <p><strong>Email:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="email"
                                                className='profile-email'
                                                value={editableCompany.email}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.email
                                        )}
                                    </p>
                                    <p><strong>Currency Symbol:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="currencySymbol"
                                                value={editableCompany.currencySymbol}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.currencySymbol
                                        )}
                                    </p>

                                </div>
                                <div className="col-md-6">
                                    <p><strong>Maintain:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="maintain"
                                                value={editableCompany.maintain}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.maintain
                                        )}
                                    </p>
                                    <p><strong>Financial Year From:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                name="financialYearFrom"
                                                value={editableCompany.financialYearFrom}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.financialYearFrom
                                        )}
                                    </p>
                                    <p><strong>Books Beginning From:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="date"
                                                name="booksBeginningFrom"
                                                value={editableCompany.booksBeginningFrom}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.booksBeginningFrom
                                        )}
                                    </p>
                                    <p><strong>Base Currency Symbol:</strong> {' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="baseCurrencySymbol"
                                                value={editableCompany.baseCurrencySymbol}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.baseCurrencySymbol
                                        )}
                                    </p>
                                    <p><strong>Formal Name:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="formalName"
                                                value={editableCompany.formalName}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.formalName
                                        )}
                                    </p>
                                    <p><strong>Number Of Decimal Places:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="numberOfDecimalPlaces"
                                                value={editableCompany.numberOfDecimalPlaces}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.numberOfDecimalPlaces
                                        )}
                                    </p>
                                    <p><strong>is Symbol Suffixed To Amounts:</strong>{' '}
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                name="isSymbolSuffixedToAmounts"
                                                value={editableCompany.isSymbolSuffixedToAmounts}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.isSymbolSuffixedToAmounts
                                        )}
                                    </p>
                                    <p>
                                        <strong>Password:</strong>{' '}
                                        {isEditing ? (
                                            <PasswordField
                                                label="Password"
                                                value={editableCompany.password}
                                                onChange={handleChange}
                                            />
                                        ) : (
                                            company.password.length > 0 ? '*'.repeat(company.password.length) : 'No password set'
                                        )}
                                    </p>


                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
