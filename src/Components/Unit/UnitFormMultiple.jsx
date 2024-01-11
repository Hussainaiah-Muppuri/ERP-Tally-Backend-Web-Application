import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import MainNavBar from '../NavBar/MainNavBar';
import './Unit.css';

const UnitFormMultiple = () => {
    const { userId, companyId } = useParams();

    const [units, setUnits] = useState([
        {
            unitSymbol: '',
            formalName: '',
            userId: userId,
            companyId: companyId,
        },
    ]);

    const handleChange = (e, rowIndex) => {
        const { name, value } = e.target;
        const updatedUnits = [...units];
        updatedUnits[rowIndex] = {
            ...updatedUnits[rowIndex],
            [name]: value,
        };
        setUnits(updatedUnits);
    };

    const handleKeyDown = (e, rowIndex) => {
        const isLastField = e.target.name === 'formalName';
        if (isLastField && e.key === 'Enter') {
            setUnits(prevUnits => [
                ...prevUnits,
                {
                    unitSymbol: '',
                    formalName: '',
                    userId: userId,
                    companyId: companyId,
                },
            ]);
        }
    };

    const handleDocumentKeyDown = e => {
        if (e.key === 'Backspace' && e.target.tagName !== 'INPUT' && units.length > 1) {
            setUnits(prevUnits => {
                const updatedUnits = [...prevUnits];
                updatedUnits.pop();
                return updatedUnits;
            });
        }
    };

    const handleSave = async () => {
        try {
            // Fetch existing units
            const existingUnitsResponse = await fetch(`http://localhost:9092/api/units/${userId}/${companyId}`);
            if (!existingUnitsResponse.ok) {
                console.error('Failed to fetch existing units');
                return;
            }

            const existingUnits = await existingUnitsResponse.json();

            // Convert new units' data to lowercase for case-insensitive comparison
            const lowercaseUnits = units.map(unit => ({
                unitSymbol: unit.unitSymbol.toLowerCase(),
                formalName: unit.formalName.toLowerCase(),
            }));

            // Check for duplicate entries
            const duplicateUnits = lowercaseUnits.filter(newUnit =>
                existingUnits.some(existingUnit =>
                    newUnit.unitSymbol === existingUnit.unitSymbol.toLowerCase() &&
                    newUnit.formalName === existingUnit.formalName.toLowerCase()
                )
            );

            if (duplicateUnits.length > 0) {
                toast.error('Units with the same Unit Symbol and Formal Name already exist.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                return;
            }

            // If no duplicates, proceed to save
            const response = await fetch('http://localhost:9092/api/units/saveAll', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(units),
            });

            if (response.ok) {
                const data = await response.json();
                console.error('Error saving units:');
                toast.error('Error saving units. Please try again.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setUnits([
                    {
                        unitSymbol: '',
                        formalName: '',
                        userId: userId,
                        companyId: companyId,
                    },
                ]);
            } else {
                // Handle save failure
                console.error('Failed to save units:', response.statusText);
                toast.error('Error saving units. Please try again.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
                setUnits([
                    {
                        unitSymbol: '',
                        formalName: '',
                        userId: userId,
                        companyId: companyId,
                    },
                ]);
            }
        } catch (error) {
            
            console.log('Units saved successfully:');
            toast.success('Units saved successfully!', {
                position: 'top-center',
                autoClose: 2000,
            });
            setUnits([
                {
                    unitSymbol: '',
                    formalName: '',
                    userId: userId,
                    companyId: companyId,
                },
            ]);
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleDocumentKeyDown);
        return () => {
            document.removeEventListener('keydown', handleDocumentKeyDown);
        };
    }, [units]);

    return (
        <div className='container'>
            <MainNavBar />
            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h3 style={{ textAlign: 'center' }}>Multiple Unit Creation</h3>
                <Link to={`/UnitList/${userId}/${companyId}`} className="btn btn-primary">
                    Unit List
                </Link>
            </div>
            <div className="row">
                <div>
                    <br />
                    <form>
                        {units.map((unit, index) => (
                            <div key={index} className="form-row">
                                <div className="col">
                                    {index === 0 && (
                                        <label htmlFor={`unitSymbol${index}`}>Unit Symbol</label>
                                    )}
                                    <br />
                                    <input
                                        type="text"
                                        className='ufm-input'
                                        id={`unitSymbol${index}`}
                                        name="unitSymbol"
                                        value={unit.unitSymbol}
                                        onChange={e => handleChange(e, index)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    {index === 0 && (
                                        <label htmlFor={`formalName${index}`}>Formal Name</label>
                                    )}
                                    <br />
                                    <input
                                        type="text"
                                        className='ufm-input'
                                        id={`formalName${index}`}
                                        name="formalName"
                                        value={unit.formalName}
                                        onChange={e => handleChange(e, index)}
                                        onKeyDown={e => handleKeyDown(e, index)}
                                        required
                                    />
                                </div>
                            </div>
                        ))}
                    </form>
                    <button type="button" className="btn btn-primary ufm-b" onClick={handleSave}>
                        Save
                    </button>
                    <ToastContainer position="top-center" autoClose={2000} />
                </div>
            </div>
        </div>
    );
};

export default UnitFormMultiple;
