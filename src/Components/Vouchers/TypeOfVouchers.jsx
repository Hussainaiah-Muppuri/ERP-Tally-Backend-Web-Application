import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import MainNavBar from '../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const TypeOfVouchers = () => {
    const { userId, companyId } = useParams();

    return (
        <div className='container'>
            <MainNavBar />
            <div className="d-flex justify-content-between mb-3">
                <Link to={`/CompanyHome/${userId}/${companyId}`} className="btn btn-secondary">
                    <FaArrowLeft className="mr-2" />
                </Link>
                <h4 style={{ textAlign: 'center' }}>Choose Voucher Type</h4>
               
            </div>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                          
                        </div>
                        <div className="card-body">
                            <div className="list-group">
                                <Link to={`/PurchaseCreation/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Purchase Order
                                </Link>
                                <Link to={`/Purchase/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Purchase
                                </Link>
                                <Link to={`/DebitNote/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Debit Note
                                </Link>
                                <Link to={`/PaymentVoucherList/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Payment
                                </Link>
                                <Link to={`/SalesOrderList/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Sales Order
                                </Link>
                                <Link to={`/SalesList/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Sales
                                </Link>
                                <Link to={`/CreditList/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Credit Note
                                </Link>
                                <Link to={`/ReceiptVoucherList/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Reciept
                                </Link>
                                <Link to={`/JournalVoucherList/${userId}/${companyId}`} className="list-group-item list-group-item-action">
                                    Journal Voucher
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
};

export default TypeOfVouchers;
