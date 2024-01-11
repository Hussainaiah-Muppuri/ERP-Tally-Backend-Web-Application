import React, { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNavBar from '../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa'; // Import the arrow-left icon
import './Unit.css';
import { Dropdown } from 'react-bootstrap';

const UnitList = () => {
    const history = useHistory();
    const { userId, companyId } = useParams();
    const [units, setUnits] = useState([]);
    const [selectedUnitId, setSelectedUnitId] = useState(null);
    const [updatedUnit, setUpdatedUnit] = useState({
        unitId: null,
        unitSymbol: '',
        formalName: '',
        userId: userId,
        companyId: companyId,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:9092/api/units/${userId}/${companyId}`);
                if (response.ok) {
                    const data = await response.json();
                    setUnits(data);
                } else {
                    console.error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error during data fetching:', error);
            }
        };

        fetchData();
    }, [userId, companyId]);

    const handleUpdate = (unitId) => {
        const confirmed = window.confirm('Are you sure you want to update this unit?');

        if (confirmed) {
            setSelectedUnitId(unitId);

            const unitToUpdate = units.find((unit) => unit.unitId === unitId);
            setUpdatedUnit({
                unitId: unitToUpdate.unitId,
                unitSymbol: unitToUpdate.unitSymbol,
                formalName: unitToUpdate.formalName,
                userId: userId,
                companyId: companyId,
            });
        }
    };

    const handleDelete = async (unitId) => {
        const confirmed = window.confirm('Are you sure you want to delete this unit?');

        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:9092/api/units/${unitId}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove the deleted unit from the list
                    setUnits((prevUnits) => prevUnits.filter((unit) => unit.unitId !== unitId));
                    toast.success('Unit deleted successfully.', {
                        position: 'top-center',
                        autoClose: 2000
                    });
                } else {
                    console.error('Failed to delete unit');
                    toast.error('Failed to delete unit.', {
                        position: 'top-center',
                        autoClose: 2000
                    });
                }
            } catch (error) {
                console.error('Error during delete request:', error);
                toast.error('Error during delete request.', {
                    position: 'top-center',
                    autoClose: 2000
                });
            }
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const confirmed = window.confirm('Are you sure you want to save the changes?');

        if (confirmed) {
            try {
                const response = await fetch(`http://localhost:9092/api/units/${updatedUnit.unitId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedUnit),
                });

                if (response.ok) {
                    // Update the unit in the list
                    setUnits((prevUnits) =>
                        prevUnits.map((unit) =>
                            unit.unitId === updatedUnit.unitId ? { ...unit, ...updatedUnit } : unit
                        )
                    );
                    toast.success('Unit updated successfully.', {
                        position: 'top-center',
                        autoClose: 2000
                    });

                    // Reset the selected unitId
                    setSelectedUnitId(null);
                } else {
                    console.error('Failed to update unit');
                    toast.error('Failed to update unit.', {
                        position: 'top-center',
                        autoClose: 2000
                    });
                }
            } catch (error) {
                console.error('Error during update request:', error);
                toast.error('Error during update request.', {
                    position: 'top-center',
                    autoClose: 2000
                });
            }
        }
    };

    const handleCreateSingleUnit = () => {
        history.push(`/UnitForm/${userId}/${companyId}`);
    };

    const handleCreateMultipleUnits = () => {
        history.push(`/UnitFormMultiple/${userId}/${companyId}`);
    };

    return (
        <div>
            <MainNavBar />
            <div className="container mt-5">
                <div className="d-flex justify-content-between mb-3">
                    <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                        <FaArrowLeft className="mr-2" />
                    </Link>
                    <h3 style={{ textAlign: 'center' }}>Unit List</h3>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="createLedgerDropdown">
                            Create Unit
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleCreateSingleUnit}>Create Single Unit</Dropdown.Item>
                            <Dropdown.Item onClick={handleCreateMultipleUnits}>Create Multiple Units</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <table className="table table-info table-borderless text-center">
                    <thead>
                        <tr>
                            <th>Sl no</th>
                            <th>Unit Symbol</th>
                            <th>Formal Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {units.map((unit, index) => (
                            <tr key={unit.unitId}>
                                <td>{index + 1}</td>
                                <td>
                                    {selectedUnitId === unit.unitId ? (
                                        <input
                                            type="text"
                                            value={updatedUnit.unitSymbol}
                                            onChange={(e) => setUpdatedUnit({ ...updatedUnit, unitSymbol: e.target.value })}
                                            pattern="[A-Za-z]{2,}"
                                            title="Only alphabets with a minimum length of 2 characters are allowed"
                                            required
                                            className='u-l-input'
                                        />

                                    ) : unit.unitSymbol}
                                </td>
                                <td>
                                    {selectedUnitId === unit.unitId ? (
                                        <input
                                            type="text"
                                            value={updatedUnit.formalName}
                                            onChange={(e) => setUpdatedUnit({ ...updatedUnit, formalName: e.target.value })}
                                            pattern="^[A-Za-z]+(?:\s[A-Za-z]+)*$"
                                            title="Alphabets, single spaces are allowed (minimum length: 3)"
                                            minLength="3"
                                            required
                                            className='u-l-input'
                                        />

                                    ) : unit.formalName}
                                </td>
                                <td>
                                    {selectedUnitId === unit.unitId ? (
                                        <>
                                            <button
                                                className="btn btn-success"
                                                onClick={handleUpdateSubmit}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-secondary"
                                                onClick={() => setSelectedUnitId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-info"
                                                onClick={() => handleUpdate(unit.unitId)}
                                            >
                                                Update
                                            </button>{' '}
                                            <button
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(unit.unitId)}
                                                disabled={selectedUnitId === unit.unitId}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ToastContainer />
            </div>
        </div>
    );
};

export default UnitList;
