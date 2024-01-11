import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MainNavBar from '../NavBar/MainNavBar';

const UnitSelector = () => {
    const { userId, companyId } = useParams();
    const [selectedunit, setSelectedUnit] = useState(null);

    const units = [
        { id: 1, name: 'Single Unit', options: ['Create', 'Display', 'Alter'] },
        { id: 2, name: 'Multiple Units', options: ['Create', 'Display', 'Alter'] }
    ];

    const handleUnitClick = (unitId) => {
        setSelectedUnit(selectedunit === unitId ? null : unitId);
    };

    return (
        <div>
            <MainNavBar />
            <div className="container mt-4">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="back-button">
                    &#8592; Back
                </Link>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <h1 className="text-center">Units</h1>
                        <ul className="list-group">
                            {units.map((unit) => (
                                <li key={unit.id} className={`list-group-item${selectedunit === unit.id ? ' active' : ''}`}>
                                    <div onClick={() => handleUnitClick(unit.id)}>
                                        {unit.name}
                                    </div>
                                    {selectedunit === unit.id && (
                                        <ul className="list-group mt-2">
                                            {unit.name === 'Single Unit' && (
                                                <React.Fragment>
                                                    <li className="list-group-item"><a href="#" className="custom-link">Create</a></li>
                                                    <li className="list-group-item"><a href="#" className="custom-link">Display</a></li>
                                                    <li className="list-group-item"><a href="#" className="custom-link">Alter</a></li>
                                                </React.Fragment>
                                            )}
                                            {unit.name === 'Multiple Units' && (
                                                <React.Fragment>
                                                    <li className="list-group-item"><a href="#" className="custom-link">Create</a></li>
                                                    <li className="list-group-item"><a href="#" className="custom-link">Display</a></li>
                                                    <li className="list-group-item"><a href="#" className="custom-link">Alter</a></li>
                                                </React.Fragment>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitSelector;
