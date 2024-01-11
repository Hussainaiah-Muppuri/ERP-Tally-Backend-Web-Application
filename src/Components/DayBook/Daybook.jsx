// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { ToastContainer } from 'react-toastify';
// import { useHistory } from 'react-router-dom/cjs/react-router-dom';

// const VoucherList = ({ userId, companyId }) => {
//   const [vouchers, setVouchers] = useState([]);
//   const [date, setDate] = useState('');
//   const [day, setDay] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const dateInputRef = useRef(null);
//   const history = useHistory();
//   // const { userId, companyId } = useParams();
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchVoucherDetails = async () => {
//       try {
//         const responseSales = await axios.get(`http://localhost:9093/api/sales/getAllBy/1/1`);
//         const responsePayment = await axios.get(`http://localhost:8022/api/payment/user/1/company/1`);
//         const responseDebit = await axios.get(`http://localhost:9097/debitNote/getAllBy/1/1`);
//         const responseCredit = await axios.get(`http://localhost:9094/api/creditNote/getAllBy/1/1`);


        // const responseSales = await axios.get(`http://localhost:9093/api/sales/getAllBy/${userId}/${companyId}`);
        // const responsePayment = await axios.get(`http://localhost:8022/api/payment/user/${userId}/company/${companyId}`);
        // const responseDebit = await axios.get(`http://localhost:9097/debitNote/getAllBy/${userId}/${companyId}`);
        // const responseCredit = await axios.get(`http://localhost:9094/api/creditNote/getAllBy/${userId}/${companyId}`);


//         const salesVouchers = responseSales.data.map((sale, index) => ({
//           date: sale.date,
//           partyName: sale.partyName,
//           vchType: 'Sales Voucher',
//           vchNo: sale.saleNo,
//           debitAmount: sale.amount,
//           creditAmount: 0.0,
//           id: index + 1,
//         }));
      
//         const paymentVouchers = responsePayment.data.map((payment , index) => ({
//           date: payment.date,
//           partyName: payment.particulars,
//           vchType: 'Payment Voucher',
//           vchNo: payment.paymentNo,
//           debitAmount: payment.debit,
//           creditAmount: payment.credit,
//           id: index + 1,
//         }));

//         const debitNote = responseDebit.data.map((debit , index) => ({
//           date: debit.date,
//           partyName: debit.partyName,
//           vchType: 'Debit Note',
//           vchNo: debit.debitNoteNumber,
//           debitAmount: debit.debitAmount,
//           creditAmount: 0.0,
//           id: index + 1, 
//         }));

//         const creditNote = responseCredit.data.map((credit , index) => ({
//           date: credit.date,
//           partyName: credit.partyName,
//           vchType: 'Credit Note',
//           vchNo: credit.creditNo,
//           debitAmount: 0.0, 
//           creditAmount: credit.creditAmount,
//           id: index + 1,
//         }));




//         setVouchers(salesVouchers , paymentVouchers , creditNote , debitNote);
//         setLoading(false);
//       } 
//       catch (error) {
//         console.error('Error fetching Voucher Details:', error.response || error);
//         setError(`Error fetching voucher details. ${error.message}`);
//         setLoading(false);
//       }
//     };

//     fetchVoucherDetails();
//   }, [userId, companyId]);

//   const handleDateChange = (event) => {
//     const inputDate = event.target.value;
//     setDate(inputDate);

//     const inputDay = new Date(inputDate).toLocaleDateString('en-IN', { weekday: 'long' });
//     setDay(inputDay);
//   };

//   //console.log(vouchers);

//   return (
//     <div className="container">
//       <ToastContainer />
//       <div className="front-1">
//         <div className="divide-3"></div>
//         <div className="top-1">
//           <h4> Day Book Of </h4>
//           <h5>{companyName}</h5>
//         </div>
//         <div className="buyInput-1">
//           <label>
//             <div className="incre-1">Day Book</div>
//           </label>
//         </div>
//         <div className="date-div-1">
//           <label>Date:</label>
//           <input type="date" ref={dateInputRef} value={date} onChange={handleDateChange} required />
//           <p>{day}</p>
//         </div>
//       </div>

//       <div className="tableInf-1">
//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               <th>Date</th>
//               <th>Particulars</th>
//               <th>Voucher Type</th>
//               <th>Voucher No</th>
//               <th>Debit Amount</th>
//               <th>Credit Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {vouchers.map((voucher) => (
//               <tr key={voucher.id}>
//                 <td>{voucher.id}</td>
//                 <td>{voucher.date}</td>
//                 <td>{voucher.partyName}</td>
//                 <td>{voucher.vchType}</td>
//                 <td>{voucher.vchNo}</td>
//                 <td>{voucher.debitAmount}</td>
//                 <td>{voucher.creditAmount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default VoucherList;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

const VoucherList = () => {
  
  const [vouchers, setVouchers] = useState([]);
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [companyName, setCompanyName] = useState('');
  const dateInputRef = useRef(null);
  const history = useHistory();
 const { userId, companyId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/company/${companyId}`);
        setCompanyName(response.data.companyName);
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    };

    fetchCompanyNames();
  }, [companyId]);


  useEffect(() => {
    const fetchVoucherDetails = async () => {
      try {
        setDay(getFormattedDay());

        function getFormattedDate() {
          const today = new Date();
          const year = today.getFullYear();
          const month = (today.getMonth() + 1).toString().padStart(2, '0');
          const day = today.getDate().toString().padStart(2, '0');
          return `${year}-${month}-${day}`;
        }

        function getFormattedDay() {
          return new Date().toLocaleDateString('en-IN', { weekday: 'long' });
        }      


      const responseSales = await axios.get(`http://localhost:9093/api/sales/getAllBy/${userId}/${companyId}`);
      const responsePayment = await axios.get(`http://localhost:8022/api/payment/user/${userId}/company/${companyId}`);
     // const responseDebit = await axios.get(`http://localhost:9097/debitNote/getAllBy/${userId}/${companyId}`);
      const responseCredit = await axios.get(`http://localhost:9094/api/creditNote/getAllBy/${userId}/${companyId}`);


        const salesVouchers = responseSales.data.map((sale) => ({
          date: sale.date,
          partyName: sale.partyName,
          vchType: 'Sales Voucher',
          vchNo: sale.saleNo,
          debitAmount: sale.amount,
          creditAmount: 0.0,
        }));

        const paymentVouchers = responsePayment.data.map((payment) => ({
          date: payment.date,
          partyName: payment.particulars,
          vchType: 'Payment Voucher',
          vchNo: payment.paymentNo,
          debitAmount: payment.debit,
          creditAmount: payment.credit,
        }));

        // const debitNote = responseDebit.data.map((debit) => ({
        //   date: debit.date,
        //   partyName: debit.partyName,
        //   vchType: 'Debit Note',
        //   vchNo: debit.debitNoteNumber,
        //   debitAmount: debit.debitAmount,
        //   creditAmount: 0.0,
        // }));

        const creditNote = responseCredit.data.map((credit) => ({
          date: credit.date,
          partyName: credit.partyName,
          vchType: 'Credit Note',
          vchNo: credit.creditNo,
          debitAmount: 0.0,
          creditAmount: credit.creditAmount,
        }));

        setVouchers([
          ...salesVouchers,
          ...paymentVouchers,
        //  ...debitNote,
          ...creditNote,
        ]);
        setLoading(false);
      } 
      catch (error) {
        console.error('Error fetching Voucher Details:', error.response || error);
        setError(`Error fetching voucher details. ${error.message}`);
        setLoading(false);
      }
    };

    // console.log('userId:', userId);
    // console.log('companyId:', companyId);    

    fetchVoucherDetails();
  }, [userId, companyId]);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setDate(inputDate);

    const inputDay = new Date(inputDate).toLocaleDateString('en-IN', { weekday: 'long' });
    setDay(inputDay);
  };

  
  return (
    <div className="container">
      <ToastContainer />
      <div className="front-1">
        <div className="divide-3"></div>
        <div className="top-1">
          <h4> Day Book Of </h4>
          <h5>{companyName}</h5>
        </div>
        <div className="buyInput-1">
          <label>
            <div className="incre-1">Day Book</div>
          </label>
        </div>
      <div className="date-div-1">
      <label>Date:</label>
      <input type="date" ref={dateInputRef} value={date} onChange={handleDateChange}/>
      <p>{day}</p>
      </div>
      </div>
      <div className="tableInf-1">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Date</th>
              <th>Particulars</th>
              <th>Voucher Type</th>
              <th>Voucher No</th>
              <th>Debit Amount</th>
              <th>Credit Amount</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((voucher , index) => (
              <tr key={voucher.id}>
                <td>{index + 1}</td>
                <td>{voucher.date}</td>
                <td>{voucher.partyName}</td>
                <td>{voucher.vchType}</td>
                <td>{voucher.vchNo}</td>
                <td>{voucher.debitAmount}</td>
                <td>{voucher.creditAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoucherList;
