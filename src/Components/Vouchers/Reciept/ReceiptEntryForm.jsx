import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ReceiptVoucher.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';

const ReceiptEntryForm = () => {
  const [receiptNo, setReceiptNo] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const { userId, companyId } = useParams();
  const [successMessage, setSuccessMessage] = useState('');

  const [isSuccessVisible, setIsSuccessVisible] = useState(false);


  const [selectTypeOfPayment, setSelectTypeOfPayment] = useState('');
  const [particulars, setParticulars] = useState('');
  const [credit, setCredit] = useState('');
  const [debit, setDebit] = useState('');
  const [selectTypeOfPayment1, setSelectTypeOfPayment1] = useState('');
  const [particulars1, setParticulars1] = useState('');
  const [credit1, setCredit1] = useState('');
  const [debit1, setDebit1] = useState('');

  const [formStatus, setFormStatus] = useState({
    message: '',
    type: '', // success or error
  });

  const [description, setDescription] = useState('');

  const [totalDebit, setTotalDebit] = useState(0);
  const [totalCredit, setTotalCredit] = useState(0);

  const dateInputRef = useRef(null);
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    const updatedTotalDebit = parseFloat(debit || 0) + parseFloat(debit1 || 0);
    const updatedTotalCredit = parseFloat(credit || 0) + parseFloat(credit1 || 0);

    setTotalDebit(updatedTotalDebit.toFixed(2));
    setTotalCredit(updatedTotalCredit.toFixed(2));
  }, [debit, debit1, credit, credit1]);

  const handleTypeChange = (index, selectedType) => {
    if (index === 0) {
      setSelectTypeOfPayment(selectedType);
      setCredit('');
    } else if (index === 1) {
      setSelectTypeOfPayment1(selectedType);
      setCredit1('');
    }
  };
  useEffect(() => {
    axios.get(`http://localhost:8012/api/group/user/${userId}/company/${companyId}`)
      .then((response) => {
        setReceipts(response.data);
        // Extract company name and set it in the state
        //setCompanyName(response.data.companyName);
      })
      .catch((error) => console.error('Error fetching groups:', error));
  }, [userId, companyId]);

  const handleItemChange = (index, field, value) => {
    if (field === 'selectTypeOfPayment') {
      handleTypeChange(index, value);
    } else {
      if (field === 'particulars') {
        setParticulars(value);
      } else if (field === 'debit') {
        setDebit(value);
      } else if (field === 'credit') {
        setCredit(value);
      }
    }
  };

  const saveJournal = () => {
    const data = {
      receiptNo,
      date,
      day,
      description,
      selectTypeOfPayment,
      particulars,
      credit,
      debit,
      selectTypeOfPayment1,
      particulars1,
      credit1,
      debit1,
      totalCredit,
      totalDebit,
      companyId,
      userId,

    };

    axios
      .post('http://localhost:8082/api/receipt', data)
      .then((response) => {
        console.log(response.data);
        console.log('Request Data:', data);

        // You can handle success here if needed
        setSuccessMessage('Journal saved successfully.');
        // Clear any previous toast messages
        toast.dismiss();
        // Show success toast
        toast.success('Journal saved successfully.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });

        setIsSuccessVisible(true);

        setTimeout(() => {
          setIsSuccessVisible(false);
        }, 5000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [ledgerNames, setLedgerNames] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  useEffect(() => {
    const fetchLedgerNames = async () => {
      try {
        const response = await axios.get(`http://localhost:2222/ledger/getall/${userId}/${companyId}`);
        setLedgerNames(response.data);
      } catch (error) {
        console.error('Error fetching ledger names:', error);
      }
    };

    fetchLedgerNames();
  }, [userId, companyId]);
  useEffect(() => {
    const fetchCompanyNames = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/company/${companyId}`);
        setCompanyName(response.data.companyName); // Assuming 'companyName' is the correct property
      } catch (error) {
        console.error('Error fetching company names:', error);
      }
    };

    fetchCompanyNames();
  }, [companyId]);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setDate(inputDate);

    const inputDay = new Date(inputDate).toLocaleDateString('en-IN', { weekday: 'long' });
    setDay(inputDay);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Total Debit:', totalDebit);
    console.log('Total Credit:', totalCredit);

    // Check if totalDebit is equal to totalCredit
    if (totalDebit === totalCredit) {
      saveJournal();
    } else {
      // Display an error message
      setFormStatus({
        message: 'Total Debit must be equal to Total Credit.',
        type: 'error',
      });

      // Clear any previous success toast messages
      toast.dismiss();

      // Show an error toast message
      toast.error('Total Debit must be equal to Total Credit.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000,
      });
    }
  };
  const handleKeyPress = (event) => {
    const activeElement = document.activeElement;
    if (event.key === 'D' || event.key === 'd') {
      if (
        !(
          activeElement.tagName === 'INPUT' ||
          activeElement.tagName === 'TEXTAREA' ||
          activeElement.isContentEditable
        )
      ) {
        event.preventDefault();
        dateInputRef.current.focus();
      }
    }
  };


  const handlePaymentNoKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dateInputRef.current.focus();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h4 style={{ textAlign: 'center' }}>Receipt Voucher Creation</h4>
        <Link to={`/ReceiptVoucherList/${userId}/${companyId}`} className="btn btn-primary">
          Reciept Voucher List
        </Link>
      </div>
      <div className='receiptVoucher'>
        <ToastContainer position='bottom-right' autoClose={5000} hideProgressBar={false} />

        <div className='spy1'>
          {formStatus.type === 'error' && (
            <div className={`form-status-error`}>
              {formStatus.message}
            </div>
          )}
          {isSuccessVisible && <div className={`form-status-success`}>{successMessage}</div>}
        </div>

        <div className='head31'>
          <h4>
            <h5 className='ns1'>{companyName} </h5>
          </h4>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='receiptInput'>
            <label>
              <div className='highlow'>Receipt</div>
            </label>
          </div>

          <div className='Datas1'>
            <label>Date:</label>
            <input
              type='date'
              ref={dateInputRef}
              value={date}
              onChange={handleDateChange}
              required
            />
            <p>{day}</p>
          </div>

          <div className='Combination11'></div>

          <div className='separas'></div>

          <div className='tabless'>
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Particulars</th>
                  <th>Debit</th>
                  <th>Credit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td className='leftAtSide'>
                    <select
                      className='abc21'
                      name='selectTypeOfPayment'
                      placeholder='Select'
                      value={selectTypeOfPayment}
                      onChange={(e) => setSelectTypeOfPayment(e.target.value)}
                      required
                    >
                      <option value='' disabled>Select</option>
                      <option value='Dr.'>Dr.</option>
                      <option value='Cr.'>Cr.</option>
                    </select>
                  </td>

                  <td >

                    <select className='abcc'

                      name="particulars"
                      value={particulars}
                      onChange={(e) => setParticulars(e.target.value)}
                    >
                      <option value="">Select</option>
                      {ledgerNames.map((ledger) => (
                        <option key={ledger.ledgerId} value={ledger.ledgerName}>
                          {ledger.ledgerName}
                        </option>
                      ))}

                    </select>
                  </td>
                  <td>
                    <input
                      className='pvinput'
                      type='number'
                      placeholder='Debit'
                      value={debit}
                      onChange={(e) => handleItemChange(0, 'debit', e.target.value)}
                      disabled={selectTypeOfPayment === 'Cr.'}
                    />
                  </td>
                  <td>
                    <input
                      className='pvinput'
                      type='number'
                      placeholder='Credit'
                      value={credit}
                      onChange={(e) => handleItemChange(0, 'credit', e.target.value)}
                      disabled={selectTypeOfPayment === 'Dr.'}
                    />
                  </td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                <td className='leftAtSide'>
                    <select
                      className='abc21'
                      name='selectTypeOfPayment1'
                      placeholder='Select1'
                      value={selectTypeOfPayment1}
                      onChange={(e) => setSelectTypeOfPayment1(e.target.value)}
                      required
                    >
                      <option value='' disabled>Select</option>
                      <option value='Dr.'>Dr.</option>
                      <option value='Cr.'>Cr.</option>
                    </select>
                  </td>
                  <td >
                    <select className='abcc'

                      name="particulars1"
                      value={particulars1}
                      onChange={(e) => setParticulars1(e.target.value)}
                    >
                      <option value="">Select</option>
                      {ledgerNames.map((ledger) => (
                        <option key={ledger.ledgerId} value={ledger.ledgerName}>
                          {ledger.ledgerName}
                        </option>
                      ))}

                    </select>
                  </td>
                  <td >
                    <input
                      type='number'
                      className='pvinput'
                      placeholder='Debit'
                      value={debit1}
                      onChange={(e) => {
                        if (selectTypeOfPayment1 === 'Dr.') {
                          setDebit1(e.target.value);
                          handleItemChange(1, 'debit1', 'debit', e);
                        }
                      }}
                      disabled={selectTypeOfPayment1 === 'Cr.'}
                    />
                  </td>
                  <td>
                    <input
                      type='number'
                      className='pvinput'
                      placeholder='Credit'
                      value={credit1}
                      onChange={(e) => {
                        if (selectTypeOfPayment1 === 'Cr.') {
                          setCredit1(e.target.value);
                          handleItemChange(1, 'credit1', 'credit', e);
                        }
                      }}
                      disabled={selectTypeOfPayment1 === 'Dr.'}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className='Des'>
            <label className='dsc4'>Description :</label>
            <textarea
              type='text'
              className='descInputs'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              pattern='^[a-zA-Z]{3,}[a-zA-Z\s][0-9]*$'
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
              }}
              required
            />
          </div>

          <div className='total41'>
            <div>Total Debit: {totalDebit}</div>
            <div>Total Credit: {totalCredit}</div>
          </div>

          <button type='submit' className='btn'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReceiptEntryForm;
