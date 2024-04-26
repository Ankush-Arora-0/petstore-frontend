import React, { useState } from 'react';
import '../style/Account.css';
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux';
import logo from '../images/mypic.jpg';
export const Account = () => {
  const wallet = useSelector((state) => state.rootReducer.userdata);
  const [addmoney, setAddmoney] = useState();
  const completePayment = async (e) => {
    e.stopPropagation();
    setAddmoney('')
    const getkey = await fetch('http://localhost:5000/getrzrkey', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const getKey = await getkey.json();
    const res = await fetch('http://localhost:5000/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ amount: addmoney })
    })
    const data = await res.json();
    const options = {
      key: getKey, // Enter the Key ID generated from the Dashboard
      "amount": data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Ankush's Pet store",
      "description": "Test Transaction",
      "image": logo,
      "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `http://localhost:5000/paymentverification?email=${wallet.email}`,
      "prefill": {
        "name": wallet.name,
        "email": wallet.email,
        "contact": wallet.phone
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#121212"
      }
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }
  const addMoneyappear = (e) => {
    e.stopPropagation();
    document.getElementById('add-money-box').style.top = '100px'
  }
  return (
    <div className='account-page' onClick={() => { document.getElementById('add-money-box').style.top = '-200px' }}>
      <div className="add-money-box" style={{ top: '-200px' }} id='add-money-box'>
        <div className="a-m-input">
          <label htmlFor="addmoney">Please enter the amount you want to add:</label>
          <input type="number" value={addmoney} onChange={(e) => { setAddmoney(e.target.value) }} onClick={(e) => { e.stopPropagation() }} />
        </div>
        <button className='add-m-btn' onClick={completePayment}>Add</button>
      </div>
      <div className="wallet-box">
        <div className="wallet-in-box">
          <i className="wallet-balance"> Balance :- ₹{wallet.wallet}</i>
          <button className='add-money' onClick={addMoneyappear}>Add Money</button>
        </div>
      </div>
      <div className="other-panel">
        <NavLink to='/cart' className='panel-links'>Cart</NavLink>
        <NavLink to='/mypets' className='panel-links'>My Pets</NavLink>
        <NavLink to='/orders' className='panel-links'>My Orders</NavLink>
      </div>
    </div>
  )
}
