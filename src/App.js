import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home';
import Footer from './Components/Footer/Footer';
import LandPage from './Components/LandPage/LandPage';
import LoginForm from './Components/User/Login/LoginForm';
import RegistrationForm from './Components/User/Registration/RegistrationForm';
import CompanyForm from './Components/Company/Creation/CompanyForm';
import CompanyHome from './Components/Company/CompanyHome/CompanyHome';
import TypeOfVouchers from './Components/Vouchers/TypeOfVouchers';
import UnitForm from './Components/Unit/UnitForm';
import UnitList from './Components/Unit/UnitList';
import CompanyProfile from './Components/Company/CompanyProfile';
import MultipleLedgerCreation from './Components/Ledgers/CreateLedger/MultipleLedgerCreation';
import AddGroupForm from './Components/Groups/SingleGroupCreation/AddGroupForm';
import UpdateGroupForm from './Components/Groups/SingleGroupCreation/UpdateGroupForm';
import GroupsList from './Components/Groups/SingleGroupCreation/GroupList';
import ViewGroup from './Components/Groups/SingleGroupCreation/ViewGroup';
import MultipleGroupCreation from './Components/Groups/MultipleGroupCreation/MultipleGroupCreation';
import SingleLedgerCreation from './Components/Ledgers/CreateLedger/SingleLedgerCreation';
import SalesOrder from './Components/Vouchers/Sales Order/SalesOrder';
import LedgerList from './Components/Ledgers/CreateLedger/LedgerList';
import UpdateLedgerForm from './Components/Ledgers/CreateLedger/UpdateLedgerForm';
import StockGroupList from './Components/Stock/Stock Group/StockGroupList';
import SingleStockGroup from './Components/Stock/Stock Group/SingleStockGroup';
import StockGroupForm from './Components/Stock/Stock Group/StockGroupForm';
import StockItemsList from './Components/Stock/Stock item/StockItemsList';
import StockItemForm from './Components/Stock/Stock item/StockItemForm';
import PurchaseCreation from './Components/Vouchers/Purchase Order/PurchaseCreation';
import PaymentEntryForm from './Components/Vouchers/Payment/PaymentEntryForm';
import PaymentVoucherList from './Components/Vouchers/Payment/PaymentVoucherList';
import PaymentVoucherUpdate from './Components/Vouchers/Payment/PaymentVouchersUpdate';
import PaymentVoucherView from './Components/Vouchers/Payment/PaymentVouchersView';
import ReceiptVoucherList from './Components/Vouchers/Reciept/ReceiptVoucherList';
import ReceiptVouchersUpdate from './Components/Vouchers/Reciept/ReceiptVouchersUpdate';
import ReceiptVoucherView from './Components/Vouchers/Reciept/ReceiptVouchersView';
import ReceiptEntryForm from './Components/Vouchers/Reciept/ReceiptEntryForm';
import JournalVoucherList from './Components/Vouchers/Journal/JournalVoucherList';
import JournalEntryForm from './Components/Vouchers/Journal/JournalEntryForm';
import JournalVoucherUpdate from './Components/Vouchers/Journal/JournalVouchersUpdate';
import JournalVoucherView from './Components/Vouchers/Journal/JournalVouchersView';
import StockItemUpdateForm from './Components/Stock/Stock item/StockItemUpdateForm';
import StockItemMultiple from './Components/Stock/Stock item/StockItemMultiple';
import UnitFormMultiple from './Components/Unit/UnitFormMultiple';
import ViewSalesOrder from './Components/Vouchers/Sales Order/ViewSalesOrder';
import SalesOrderList from './Components/Vouchers/Sales Order/SalesOrderList';
import UpdateSalesOrder from './Components/Vouchers/Sales Order/UpdateSalesOrder';
import SalesVoucher from './Components/Vouchers/Sales/SalesVoucher';
import ViewSales from './Components/Vouchers/Sales/ViewSales';
import UpdateSales from './Components/Vouchers/Sales/UpdateSales';
import SalesList from './Components/Vouchers/Sales/SalesList';
import CompanyPasswordReset from './Components/Reset/CompanyPasswordReset';
import UserResetPassword from './Components/Reset/UserResetPassword';
import CreditNote from './Components/Vouchers/Credit Note/CreditNote';
import ViewCredit from './Components/Vouchers/Credit Note/ViewCredit';
import CreditList from './Components/Vouchers/Credit Note/CreditList';
import UpdateCredit from './Components/Vouchers/Credit Note/UpdateCredit';
import Purchase from './Components/Vouchers/Purchase/Purchase';
import DebitNote from './Components/Vouchers/Debit Note/DebitNote';
import ProtectedRoutes from './ProtectedRoutes';
import ProtectedCompanyRoutes from './protectedCompanyRoutes';
import Daybook from './Components/DayBook/Daybook';

const App = () => {
  return (
    <Router>
      <div>

        <Switch>
          <Route path="/" exact component={LandPage} />
          <Route path="/RegistrationForm" component={RegistrationForm} />
          <Route path="/UserLogin" component={LoginForm} />
          <Route path="/UserResetPassword" component={UserResetPassword} />

          <Route
              path="/"
              render={() => (
                <ProtectedRoutes>
          <Route path="/Home/:userId" exact component={Home} />

          <Route path="/CompanyForm/:userId" component={CompanyForm} />
          <Route path="/CompanyPasswordReset/:userId" component={CompanyPasswordReset} />

          <ProtectedCompanyRoutes>

          <Route path="/CompanyHome/:userId/:companyId" component={CompanyHome} />
          <Route path="/CompanyProfile/:userId/:companyId" component={CompanyProfile} />
          

          <Route path="/SingleLedgerCreation/:userId/:companyId" exact component={SingleLedgerCreation} />
          <Route path="/MultipleLedgerCreation/:userId/:companyId" exact component={MultipleLedgerCreation} />
          <Route path="/LedgerList/:userId/:companyId" component={LedgerList} />
          <Route path="/UpdateLedgerForm/:userId/:companyId/:ledgerId" component={UpdateLedgerForm} />

          <Route path="/SingleStockGroup/:userId/:companyId" exact component={SingleStockGroup} />
          <Route path="/StockGroupForm/:userId/:companyId" exact component={StockGroupForm} />
          <Route path="/StockGroupList/:userId/:companyId" exact component={StockGroupList} />

          <Route path="/StockItemsList/:userId/:companyId" exact component={StockItemsList} />
          <Route path="/StockItemMultiple/:userId/:companyId" exact component={StockItemMultiple} />
          <Route path="/StockItemForm/:userId/:companyId" exact component={StockItemForm} />
          <Route path="/StockItemUpdateForm/:userId/:companyId/:stockItemId" exact component={StockItemUpdateForm} />

          <Route path="/UnitForm/:userId/:companyId" exact component={UnitForm} />
          <Route path="/UnitList/:userId/:companyId" exact component={UnitList} />
          <Route path="/UnitFormMultiple/:userId/:companyId" exact component={UnitFormMultiple} />

          <Route path="/TypeOfVouchers/:userId/:companyId" exact component={TypeOfVouchers} />

          <Route path="/PurchaseCreation/:userId/:companyId" exact component={PurchaseCreation} />

          <Route path="/Purchase/:userId/:companyId" exact component={Purchase} />

          <Route path="/DebitNote/:userId/:companyId" exact component={DebitNote} />

          <Route path="/PaymentEntryForm/:userId/:companyId" exact component={PaymentEntryForm} />
          <Route path="/PaymentVoucherList/:userId/:companyId" exact component={PaymentVoucherList} />
          <Route path="/PaymentVoucherUpdate/:userId/:companyId/:paymentId" exact component={PaymentVoucherUpdate} />
          <Route path="/PaymentVoucherView/:userId/:companyId/:paymentId" exact component={PaymentVoucherView} />

          <Route path="/ReceiptVoucherList/:userId/:companyId" exact component={ReceiptVoucherList} />
          <Route path="/ReceiptVouchersUpdate/:userId/:companyId/:receiptNo" exact component={ReceiptVouchersUpdate} />
          <Route path="/ReceiptVoucherView/:userId/:companyId/:receiptNo" exact component={ReceiptVoucherView} />
          <Route path="/ReceiptEntryForm/:userId/:companyId" exact component={ReceiptEntryForm} />

          <Route path="/JournalVoucherList/:userId/:companyId" exact component={JournalVoucherList} />
          <Route path="/JournalEntryForm/:userId/:companyId" exact component={JournalEntryForm} />
          <Route path="/JournalVoucherUpdate/:userId/:companyId/:journalNo" exact component={JournalVoucherUpdate} />
          <Route path="/JournalVoucherView/:userId/:companyId/:journalNo" exact component={JournalVoucherView} />

          <Route path="/SalesOrder/:userId/:companyId" exact component={SalesOrder} />
          <Route path="/ViewSalesOrder/:userId/:companyId/:salesOrderNo" exact component={ViewSalesOrder} />
          <Route path="/UpdateSalesOrder/:userId/:companyId/:salesOrderNo" exact component={UpdateSalesOrder} />
          <Route path="/SalesOrderList/:userId/:companyId" exact component={SalesOrderList} />

          <Route path="/SalesVoucher/:userId/:companyId" exact component={SalesVoucher} />
          <Route path="/ViewSales/:userId/:companyId/:saleNo" exact component={ViewSales} />
          <Route path="/UpdateSales/:userId/:companyId/:saleNo" exact component={UpdateSales} />
          <Route path="/SalesList/:userId/:companyId" exact component={SalesList} />

          <Route path="/CreditNote/:userId/:companyId" exact component={CreditNote} />
          <Route path="/ViewCredit/:userId/:companyId/:creditNo" exact component={ViewCredit} />
          <Route path="/UpdateCredit/:userId/:companyId/:creditNo" exact component={UpdateCredit} />
          <Route path="/CreditList/:userId/:companyId" exact component={CreditList} />
          <Route path="/createGroup/:userId/:companyId" exact component={AddGroupForm} />
          <Route path="/updateGroup/:userId/:companyId/:groupId" exact component={UpdateGroupForm} />
          <Route path="/listGroup/:userId/:companyId" exact component={GroupsList} />
          <Route path="/viewGroup/:userId/:companyId/:groupId" exact component={ViewGroup} />
          <Route path="/createMultiple/:userId/:companyId" exact component={MultipleGroupCreation} />

           <Route path="/Daybook/:userId/:companyId" exact component={Daybook} /> 
          </ProtectedCompanyRoutes>

          </ProtectedRoutes>
              )}
            />
          </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
