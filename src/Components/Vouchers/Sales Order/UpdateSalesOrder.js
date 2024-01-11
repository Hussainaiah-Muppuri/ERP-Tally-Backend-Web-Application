import React, { useEffect, useRef, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import './SalesOrder.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaArrowLeft } from 'react-icons/fa';
import MainNavBar from '../../NavBar/MainNavBar';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

export default function UpdateSalesOrder() {
  // const [salesOrderNo, setSalesOrderNo] = useState('');
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
  const dateInputRef = useRef(null);

  const [ledgerName, setLedgerName] = useState([]);
  const { companyId, userId, salesOrderNo } = useParams();
  const [companyName, setCompanyName] = useState([]);

  const history = useHistory();

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

  const removeLastItemRow = () => {
    const tableBody = document.querySelector('.tablesData table tbody');
    const rows = tableBody.querySelectorAll('tr');
    if (rows.length > 1) {
      tableBody.removeChild(rows[rows.length - 1]);
    }
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
    if (event.key === 'Shift') {

      event.preventDefault();
      const amountInput = document.activeElement;
      if (amountInput && amountInput.name === 'amount') {
        addNewItemRow();
      }

    } else if (event.key === 'Backspace') {
      if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        event.preventDefault();
        removeLastItemRow();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    const calculatedAmount = quantity * rate - discount / 100;
    setAmount(calculatedAmount);
  }, [quantity, rate, discount]);
  useEffect(() => {

    setTotalAmount(amount);
  }, [amount]);

  const fetchSalesOrderDetails = async () => {


    try {
      // setLoading(true); // Set loading to true when fetching data
      const response = await axios.get(`http://localhost:1111/api/sales/${salesOrderNo}`);
      const data = response.data;
      console.log('data is ', data);
      // Update state with fetched data
      // setSalesOrderNo(data.salesOrderNo);
      setOrderNo(data.orderNo);
      setDate(data.date);
      setDay(data.day);
      setPartyName(data.partyName);
      setCurrentBalance(data.currentBalance);
      setDescription(data.description);
      setItemName(data.itemName);
      setQuantity(data.quantity);
      setRate(data.rate);
      setUnit(data.unit);
      setDiscount(data.discount);
      setAmount(data.amount);
      setTotalAmount(data.totalAmount);
    } catch (error) {
      console.error('Error fetching sales order details:', error);
    }


  };
  useEffect(() => {
    if (salesOrderNo) {
      fetchSalesOrderDetails();
    }

  }, [salesOrderNo]);


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



  const updateSalesOrder = async () => {
    if (
      // !salesOrderNo ||
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
      alert('Please fill in all the required fields before updating.');
      return;
    }

    const isConfirmed = window.confirm('Are you sure you want to update the sales order?');

    if (isConfirmed) {
      const data = {
        // salesOrderNo,
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
        userId,
        companyId,
      };

      console.log('Data to be sent:', data);

      try {
        if (salesOrderNo) {
          const response = await axios.put(`http://localhost:1111/api/update/${salesOrderNo}`, data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });

          console.log('Server response:', response.data);
          history.push(`/SalesOrderList/${userId}/${companyId}`);
          toast.success('Voucher updated successfully.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.error('Error updating Voucher:', error.message);

        toast.error(`Error updating Voucher: ${error.message}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    }
  };


  const saveSalesOrder = async () => {
    if (
      // !salesOrderNo ||
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

    const isConfirmed = window.confirm('Are you sure you want to save the sales order?');

    if (isConfirmed) {
      const data = {
        // salesOrderNo,
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
        userId: userId,
        companyId: companyId,
      };

      console.log('Data to be sent:', data);

      try {
        const response = await axios.post('http://localhost:1111/api/save', data, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Server response:', response.data);
        history.push(`/SalesOrderList/${userId}/${companyId}`);
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
      setCurrentBalance(selectedLedger.openningBalance);
    }
  };
  return (
    <div className='container soform'>
      <MainNavBar />
      <div className="d-flex justify-content-between mb-3">
        <Link to={`/TypeOfVouchers/${userId}/${companyId}`} className="btn btn-secondary">
          <FaArrowLeft className="mr-2" />
        </Link>
        <h4 style={{ textAlign: 'center' }}>Sales Order Voucher Update</h4>
        <Link to={`/SalesOrderList/${userId}/${companyId}`} className="btn btn-primary">
          Sales order Entries
        </Link>
      </div>
      <div className="Sales-Order-Div">
        <ToastContainer />
        <div className="mainSale">
          <div className="separator2"></div>
          <div className="head">

            <h5 className="CN">{companyName}</h5>
          </div>
          <form onSubmit={salesOrderNo ? updateSalesOrder : saveSalesOrder}>
            <div className="SalesInput">
              <label>
                <div className="high">Sales Order</div>
              </label>

            </div>
            <div className="DateDiv">
              <label>Date:</label>
              <input
                type="date"
                ref={dateInputRef}
                value={date}
                onChange={handleDateChange}
                required
              />
              <p>{day}</p>
            </div>
            <div className="OrderDiv">
              <label>Order No:</label>
              <input
                type="text"
                value={orderNo}
                onChange={(e) => setOrderNo(e.target.value)}

                title="Fill the order number"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                }}
                required
              />
            </div>
            <div className="Combo">
              <label>Party A/C Name:</label>
              <select
                className='sov-select'
                value={partyName}
                onChange={(e) => handlePartyNameChange(e.target.value)}
                required
              >
                <option value="" disabled>---Select Ledger---</option>
                {partyOptions.map((ledger) => (
                  <option key={ledger.ledgerId} value={ledger.ledgerName}>
                    {ledger.ledgerName}
                  </option>
                ))}
              </select>
              <br />
              <div className='cb-div'>
                <label>Current Balance:</label>
                <input
                  className="cb"
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="separator1"></div>
            <div className="tablesData">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Rate</th>
                    <th>Unit</th>
                    <th>Discount</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="leftAlign">
                      <select
                        className='item-select-tag'
                        value={itemName}
                        onChange={(e) => handleItemNameChange(e.target.value)}
                        required
                      >
                        <option value="" disabled>---Select Item Name---</option>
                        {itemOptions.map((item) => (
                          <option key={item.stockItemId} value={item.stockItemName}>
                            {item.stockItemName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
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
                        title="Fill the unit"
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/[^a-zA-Z\s.,_$]/g, '');
                          e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                        }}
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
                        name="amount"
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="total">
              <label>Total Amount:</label>
              <input type="text" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} />
            </div>
            <div className="Desc">
              <label className="DescName">Description :</label>
              <textarea
                type="text"
                className="descInput"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                pattern="^[a-zA-Z]{3,}[a-zA-Z\s][0-9]*$"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\s{2,}/g, ' ');
                }}
                required
              />
            </div>
            <button className="btn" type="submit">
              {salesOrderNo ? 'Update' : 'Save'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
