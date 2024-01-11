import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams, Link, Route, Switch ,withRouter} from 'react-router-dom/cjs/react-router-dom.min';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaBuilding } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';





const CompanyHome = () => {

    const { userId, companyId } = useParams();
    const [companyName, setCompanyName] = useState('');
    const history = useHistory();


    useEffect(() => {
        fetch(`http://localhost:9091/company/${companyId}`)
            .then(response => response.json())
            .then(data => setCompanyName(data.companyName))
            .catch(error => console.error('Error fetching company name:', error));
    }, [companyId]);

    const handleLogout = () => {
        localStorage.setItem('IsCompanyLoggedIn', false);
        history.push('/Home/${userId}');
    };
 

    return (
        <div>
            <MainNavBar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2">
                        <div className="list-group">
                            <Link to={`/listGroup/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Groups
                            </Link>
                            <Link to={`/LedgerList/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Ledgers
                            </Link>
                            <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Vouchers
                            </Link>
                            <Link to={`/StockGroupList/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Stock Group
                            </Link>
                            <Link to={`/StockItemsList/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Stock Item
                            </Link>
                            <Link to={`/UnitList/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Unit
                            </Link>
                            <Link to={`/CompanyHome/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Pay Roll
                            </Link>
                             {/* <Link to={`/Home/${userId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Company Logout
                            </Link>  */}
                            <button onClick={handleLogout} className="list-group-item list-group-item-action custom-sidebar-item">Company Logout</button>
                        </div>
                    </div>

                    {/* <div className="col-md-8 d-flex align-items-center justify-content-center"> */}
                    <div className="col-md-8">
                        <h4 style={{ fontFamily: 'inherit' }}>Welcome, {companyName}</h4>
                    </div>

                    <div className="col-md-2">
                        <div className="list-group">
                            <Link to={`/CompanyProfile/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                <FaBuilding /> Company Profile
                            </Link>
                            Reports
                            <Link to={`/CompanyHome/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Balance Sheet
                            </Link>
                            <Link to={`/CompanyHome/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Profit and Loss
                            </Link>
                            <Link to={`/CompanyHome/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Stock Summary
                            </Link>
                            <Link to={`/Daybook/${userId}/${companyId}`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Ratio Analysis
                            </Link>
                           {/* <Link to={`/Daybook`} className="list-group-item list-group-item-action custom-sidebar-item">
                                Ratio Analysis
                            </Link> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};


export default withRouter(CompanyHome);
// export default CompanyHome;
