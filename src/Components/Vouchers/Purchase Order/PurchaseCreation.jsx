import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
import './PurchaseCreation.css';
import MainNavBar from '../../NavBar/MainNavBar';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function PurchaseCreation() {
  const { userId, companyId } = useParams();

  const [orderNo, setOrderNo] = useState('');
  const [date, setDate] = useState('');
  const [day, setDay] = useState('');
  const [partyName, setPartyName] = useState('');
  const [partyOptions, setPartyOptions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState('');
  const [description, setDescription] = useState('');

  const [itemName, setItemName] = useState('');
  const [itemOptions, setItemOptions] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [rate, setRate] = useState('');
  const [unit, setUnit] = useState('');
  const [discount, setDiscount] = useState('');
  const [amount, setAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [companyName, setCompanyName] = useState('');
  const dateInputRef = useRef(null);

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



  useEffect(() => {
    // Fetch stock item options from the given URL
    const fetchStockItemOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:9099/stockitem/getByUserIdAndCompanyId/${userId}/${companyId}`);
        setItemOptions(response.data);
      } catch (error) {
        console.error('Error fetching stock item options:', error.message);
      }
    };

    fetchStockItemOptions();
  }, [userId, companyId]);

  const handleItemNameChange = (selectedItemName) => {
    const selectedItem = itemOptions.find((item) => item.stockItemName === selectedItemName);

    if (selectedItem) {
      setItemName(selectedItemName);
      setUnit(selectedItem.unit);

      if (quantity <= selectedItem.quantity) {
        setQuantity(quantity);
      } else {
        toast.error('Your quantity is above the stock item.', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    }
  };



  const savePurchaseOrder = async () => {
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

    const selectedItem = itemOptions.find((item) => item.stockItemName === itemName);

    if (selectedItem && quantity <= selectedItem.quantity) {
      const isConfirmed = window.confirm('Are you sure you want to save the purchase order?');

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
          userId, // Include userId
          companyId, // Include companyId
        };

        console.log('Data to be sent:', data);

        try {
          const response = await axios.post('http://localhost:9095/api/purchaseOrder/saveorder', data, {
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
    } else {
      toast.error('Your quantity is above the stock item.', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };


  useEffect(() => {
    // Fetch company details using companyId and update companyName
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9091/company/${companyId}`);
        setCompanyName(response.data.companyName);
      } catch (error) {
        console.error('Error fetching company details:', error.message);
        // Handle the error as needed
      }
    };

    fetchCompanyDetails();
  }, [companyId]);


  useEffect(() => {
    // Fetch party options from the given URL
    const fetchPartyOptions = async () => {
      try {
        const response = await axios.get(`http://localhost:2222/ledger/getall/${userId}/${companyId}`);
        setPartyOptions(response.data);
      } catch (error) {
        console.error('Error fetching party options:', error.message);
        // Handle the error as needed
      }
    };

    fetchPartyOptions();
  }, [userId, companyId]);

  const handlePartyNameChange = (selectedPartyName) => {
    const selectedLedger = partyOptions.find((ledger) => ledger.ledgerName === selectedPartyName);

    if (selectedLedger) {
      setPartyName(selectedPartyName);
      setCurrentBalance(selectedLedger.openingBalance); // Fix typo here
    }
  };

  return (
    <div className='container'>
      <ToastContainer />
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
      <div className='front'>

        <div className="divide-2"></div>
        <div className='top com-row'>
          <h5>Purchase Order Creation</h5>
          <h5 className='com-name'>{companyName}</h5>
        </div>
        <form onSubmit={savePurchaseOrder}>
          <div className='buyInput'>
            <label><div className='incre'>Purchase Order</div></label>

          </div>
          <div className='date-div'>
            <label>Date:</label>
            <input type="date"
              ref={dateInputRef}
              value={date} onChange={handleDateChange} required />
            <p>{day}</p>

          </div>
          <div className='order-div'>
            <label>Order No:</label>
            <input type="text" value={orderNo}
              onChange={e => setOrderNo(e.target.value)}
              title='Fill the order number'
              onInput={(e) => {
                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
              }}

              required />
          </div>
          <div className='combin'>
            <label>Party A/C Name:</label>
            <select
              value={partyName}
              onChange={(e) => handlePartyNameChange(e.target.value)}
              required
            >
              <option value="" disabled>---Select Ledger Name---</option>
              {partyOptions.map((ledger) => (
                <option key={ledger.ledgerId} value={ledger.ledgerName}>
                  {ledger.ledgerName}
                </option>
              ))}
            </select>
            <br />
            <div className='cb-po'>
              <label>Current Balance:</label>
              <input type="number" value={currentBalance} readOnly />
            </div>
          </div>

          <div className="divide-1"></div>

          <div className="tableInf">
            <table>
              <thead>
                <tr>
                  <th>Name </th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Unit</th>
                  <th>Discount</th>
                  <th>Amount</th>

                </tr>
              </thead>
              <tbody>

                <tr >
                  <td >
                    <select
                      className='item-select-tag'
                      value={itemName}
                      onChange={(e) => handleItemNameChange(e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Item Name</option>
                      {itemOptions.map((item) => (
                        <option key={item.stockItemId} value={item.stockItemName}>
                          {item.stockItemName}
                        </option>
                      ))}
                    </select>

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
                      placeholder="Unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      readOnly
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
          <div className='total-1'>
            <label>Total Amount:</label>
            <input type="text" value={totalAmount} onChange={e => setTotalAmount(e.target.value)} />
          </div>
          <div className='desc-1'>
            <label >Description :</label>
            <textarea type="text" id="" cols="30" rows="5" className='descInput' value={description} onChange={e => setDescription(e.target.value)}
              pattern="^[a-zA-Z]{3,}[a-zA-Z\s][0-9]*$"
              onInput={(e) => {

                e.target.value = e.target.value.replace(/\s{2,}/g, ' ');

              }}
              required
            />
          </div>
          <button className='click'>Save</button>
        </form>

      </div>

    </div>


  )
}
