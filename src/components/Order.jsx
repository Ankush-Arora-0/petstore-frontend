import React, { useState, useEffect } from 'react'
import { OrderCard } from './Card';
import '../style/Order.css'
import { useNavigate } from 'react-router-dom';

export const Order = () => {
  const [products, setProducts] = useState([]);
  const [dati, setDati] = useState([{}]);
  const [status, setStatus] = useState([]);
  const navigate = useNavigate();
  const getcartData = async (id) => {
    const res = await fetch('http://localhost:5000/getorderdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id: id })
    })
    const data = await res.json();
    setProducts(prevData => [...prevData, ...data])
  }
  const getData = async () => {
    const res = await fetch('http://localhost:5000/getorderids', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json();
    const dateTime = data.map((val) => ({
      date: val.date, // Format the date
      time: val.time,
    }));
    data.map((val) => {
      setStatus((prev) => {
        return [...prev, val.status]
      })
    })
    setDati(dateTime);
    data.forEach(element => {
      getcartData(element.productId);
    });

  }
  useEffect(() => {
    getData();
  }, [])
  return (
    <div className='order-page'>
      <h2>My Orders</h2>
      <div className="orders">

        {products.length === 0 ? <div className='cart-empty-box'>
          <div>No Orders Yet</div>
          <button className='b-pet-btn' onClick={() => { navigate('/') }}>Buy A Pet</button>
        </div> : products.map((val, index) => {
          return (<OrderCard name={val.name} img={val.img} desc={val.description} price={val.price} key={val.id} date={dati[index].date} time={dati[index].time} status={status[index]} />);
        })}
      </div>
    </div>
  )
}
