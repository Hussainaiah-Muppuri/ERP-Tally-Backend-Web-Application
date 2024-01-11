import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './DebitNote.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import MainNavBar from '../../NavBar/MainNavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { FaArrowLeft } from 'react-icons/fa';

export default function DebitNote() {

  const [orderNo, setOrderNo] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [partyName, setPartyName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('');
  const [description, setDescription] = useState('');

  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [unit, setUnit] = useState('');
  const [discount, setDiscount] = useState('');
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const dateInputRef = useRef(null);

  const [ledgerName, setLedgerName] = useState([]);
  const { companyId } = useParams();
  const { userId } = useParams();
  const [companyName, setCompanyName] = useState([]);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    setDate(inputDate);

    const inputDay = new Date(inputDate).toLocaleDateString('en-IN', { weekday: 'long' });
    setDay(inputDay);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'D' && !['INPUT', 'TEXTAREA'].includes(event.target.tagName)) {
        if (dateInputRef.current && dateInputRef.current.focus) {
          dateInputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const addNewItemRow = () => {

    const newRow = document.createElement('tr');


    const cells = ['itemName', 'quantity', 'rate', 'unit', 'discount', 'amount'].map((field) => {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = field === 'quantity' || field === 'rate' || field === 'discount' ? 'number' : 'text';
      input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
      input.value = '';
      input.addEventListener('input', (event) => handleItemInputChange(event, field));
      cell.appendChild(input);
      return cell;
    });

    cells.forEach((cell) => {
      newRow.appendChild(cell);
    });


    const tableBody = document.querySelector('.tablesData table tbody');
    tableBody.appendChild(newRow);
  };

  const handleItemInputChange = (event, field) => {

    const value = event.target.value;

    switch (field) {
      case 'itemName':
        setItemName(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      case 'rate':
        setRate(value);
        break;
      case 'unit':
        setUnit(value);
        break;
      case 'discount':
        setDiscount(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      default:
        break;
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      addNewItemRow();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
  useEffect(() => {
    const calculatedAmount = quantity * rate - discount;
    setAmount(calculatedAmount);
  }, [quantity, rate, discount]);
  useEffect(() => {

    setTotalAmount(amount);
  }, [amount]);


  const saveDebitOrder = async () => {
    if (

      !orderNo ||
      !date ||
      !day ||
      !partyName ||
      !currentBalance ||
      !description ||
      !itemName ||
      !quantity ||
      !rate ||
      !unit ||
      !discount ||
      !amount
    ) {
      alert('Please fill in all the required fields before saving.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to save the debit note?');

    if (isConfirmed) {
      const data = {

        orderNo,
        date,
        day,
        partyName,
        currentBalance,
        description,
        itemName,
        quantity,
        rate,
        unit,
        discount,
        amount,
        totalAmount,
      };

      console.log('Data to be sent:', data);

      try {
        const response = await axios.post('http://localhost:9097/saveorder', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Server response:', response.data);

        toast.success('Voucher added successfully.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } catch (error) {
        console.error('Error adding Voucher:', error.message);

        toast.error(`Error adding Voucher: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    }
  };
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
 

  return (
    <div className='container'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h4 style={{ textAlign: 'center' }}>Purchase Order Creation</h4>
        <Link to={`/PurchaseOrderList/${userId}/${companyId}`} className="btn btn-primary">
          Purchase Order Entries
        </Link>
      </div>
      <ToastContainer />
      <div className='front-2'>

        <div className="divide-4"></div>
        <div className='top-2'>
          <h4>Debit Note Creation</h4>
          <h5>{companyName}</h5>

        </div>
        <form onSubmit={saveDebitOrder}>
          <div className='buyInput-2'>
            <label><div className='incre-2'>Debit Note</div></label>

          </div>
          <div className='date-div-2'>
            <label>Date:</label>
            <input type="date"
              ref={dateInputRef}
              value={date} onChange={handleDateChange} required />
            <p>{day}</p>

          </div>
          <div className='order-div-2'>
            <label>Order No:</label>
            <input type="text" value={orderNo}
              onChange={e => setOrderNo(e.target.value)}
              title='Fill the order number'
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
              }}
              required />

          </div>
          <div className='combin-2'>
            <label>Party A/C Name:</label>
            <input type="text" value={partyName} onChange={e => setPartyName(e.target.value)}
              title='Fill the party A/c Name'
              onInput={(e) => {
                e.target.value = e.target.value.replace(/[^a-zA-Z\s.,_$]/g, '');
                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');

              }}
              required
            /><br />
            <label>Current Balance:</label>
            <input type="number" value={currentBalance} onChange={e => setCurrentBalance(e.target.value)} required />
          </div>

          <div className="divide-3"></div>

          <div className="tableInf-2">
            <table>
              <thead>
                <tr>

                  <th>Name Of Item</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Unit</th>
                  <th>Discount</th>
                  <th>Amount</th>

                </tr>
              </thead>
              <tbody className='table-in-2'>

                <tr >
                  <td >
                    <input
                      type="text"
                      placeholder="Item"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      pattern="^[a-zA-Z]{3,}[a-zA-Z\s][0-9]*$"
                      title='Fill the item Name'
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z\s.,_$]/g, '');
                        e.target.value = e.target.value.replace(/\s{2,}/g, ' ');

                      }} required
                    />

                  </td>

                  <td >
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Rate"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      pattern="^[a-zA-Z]{2,}[a-zA-Z\s]*$"
                      title='Fill the unit'
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/[^a-zA-Z\s.,_$]/g, '');
                        e.target.value = e.target.value.replace(/\s{2,}/g, ' ');

                      }}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Discount"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}

                    />
                  </td>

                </tr>
              </tbody>
            </table>

          </div>
          <div className='total-3'>
            <label>Total Amount:</label>
            <input type="text" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
          </div>
          <div className='desc-3'>
            <label >Description :</label>
            <textarea type="text" id="" cols="40" rows="5" className='descInput' value={description} onChange={e => setDescription(e.target.value)}
              pattern="^[a-zA-Z]{3,}[a-zA-Z\s][0-9]*$"
              onInput={(e) => {

                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');

              }}
              required
            />
          </div>
          <button className='click-2'>Save</button>
        </form>

      </div>

    </div>


  )
}
