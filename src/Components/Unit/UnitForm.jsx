import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from '../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';
import './Unit.css';

const UnitForm = () => {
    const { userId, companyId } = useParams();
    const [unit, setUnit] = useState({
        unitSymbol: '',
        formalName: '',
        userId: userId,
        companyId: companyId,
    });

    const [existingUnits, setExistingUnits] = useState([]);

    useEffect(() => {
        const fetchExistingUnits = async () => {
            try {
                const response = await fetch(`http://localhost:9092/api/units/${userId}/${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setExistingUnits(data);
                } else {
                    console.error('Failed to fetch existing units:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching existing units:', error);
            }
        };

        fetchExistingUnits();
    }, [userId, companyId]);

    const isUnitDuplicate = () => {
        const lowerCaseUnitSymbol = unit.unitSymbol.toLowerCase();
        const lowerCaseFormalName = unit.formalName.toLowerCase();

        return existingUnits.some(
            (existingUnit) =>
                existingUnit.unitSymbol.toLowerCase() === lowerCaseUnitSymbol ||
                existingUnit.formalName.toLowerCase() === lowerCaseFormalName
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isUnitDuplicate()) {
            toast.error('UnitSymbol or FormalName already exists. Please provide unique values.', {
                position: 'top-center',
                autoClose: 2000
            });
            setUnit({
                unitSymbol: '',
                formalName: '',
                userId: userId,
                companyId: companyId,
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:9092/api/units', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(unit),
            });

            if (response.ok) {
                // Display simplified success toast
                toast.success('Unit saved successfully.', {
                    position: 'top-center',
                    autoClose: 2000
                });
            } else {
                // Display error toast
                const errorText = await response.text();
                toast.error(`Failed to save unit. Server response: ${errorText}`, {
                    position: 'top-center',
                    autoClose: 2000
                });
            }

            // Clear the form whether the request was successful or not
            setUnit({
                unitSymbol: '',
                formalName: '',
                userId: userId,
                companyId: companyId,
            });
        } catch (error) {
            console.error('Error during POST request:', error);
        }
    };

    return (
        <div className='unit-form'>
            <MainNavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                        <FaArrowLeft className="mr-2" />
                    </Link>
                    <h3 style={{ textAlign: 'center' }}>Unit Creation</h3>
                    <Link to={`/UnitList/${userId}/${companyId}`} className="btn btn-primary">
                        Unit List
                    </Link>
                </div>
                <ToastContainer />
                <form onSubmit={handleSubmit} className="needs-validation" style={{ width: '50%', marginLeft: '25%' }}>
                    <div className="mb-3">
                        <label htmlFor="unitSymbol" className="form-label">
                            Unit Symbol:
                        </label><br />
                        <input
                            type="text"
                            id="unitSymbol"
                            value={unit.unitSymbol}
                            onChange={(e) => setUnit({ ...unit, unitSymbol: e.target.value })}
                            pattern="[A-Za-z]{2,}"
                            title="Only alphabets with a minimum length of 2 characters are allowed"
                            required
                        />
                        <div className="invalid-feedback">Please provide a unit symbol.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formalName" className="form-label">
                            Formal Name:
                        </label><br />
                        <input
                            type="text"
                            id="formalName"
                            value={unit.formalName}
                            onChange={(e) => setUnit({ ...unit, formalName: e.target.value })}
                            pattern="^[A-Za-z]+(?:\s[A-Za-z]+)*$"
                            title="Alphabets, single spaces, minimum length of 3 characters are allowed"
                            minLength="3"
                            required
                        />
                        <div className="invalid-feedback">Please provide a formal name.</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '50%', marginLeft: '25%' }}>
                        <button type="submit" className="btn btn-primary">
                            Save Unit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UnitForm;
