import React, { useEffect, useState } from 'react';
import '../style/Cart.css';
import { CartCard } from './Card';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';

export const Cart = () => {
  const [products, setProducts] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [cartRemoved, setCartRemoved] = useState(false);
  const alldata = useSelector((state) => state.rootReducer)
  const navigate = useNavigate();
  const getcartData = async (id) => {
    const res = await fetch('http://localhost:5000/getcartdata', {
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
    const res = await fetch('http://localhost:5000/getids', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json();

    data.forEach(element => {
      getcartData(element.productId);
    });

  }
  useEffect(() => {

    getData();
  }, [])
  useEffect(() => {

    if (alldata.orderCart.value === 1) {
      setOrderPlaced(true);
      setTimeout(() => {
        setOrderPlaced(false);
      }, 2000);
    } else if (alldata.orderCart.value === 3) {
      setCartRemoved(true);
      setTimeout(() => {
        setCartRemoved(false);
      }, 2000);
    }
  }, [alldata.orderCart.value]);


  return (
    <div className='cart-page'> {orderPlaced ? <div className={`oc-box1 ${orderPlaced ? 'order-success' : ''}`} style={{ top: '80px' }} id='order-success'>
      <CheckCircleIcon className='check-icon-order'></CheckCircleIcon> <em>Order Placed</em>
    </div> : <div className={`oc-box1 ${orderPlaced ? 'order-success' : ''}`} style={{ top: '-150px' }} id='order-success'>
      <CheckCircleIcon className='check-icon-order'></CheckCircleIcon> <em>Order Placed</em>
    </div>}
      {cartRemoved ? <div className={`oc-box1 ${orderPlaced ? 'order-success' : ''}`} style={{ top: '80px' }} id='rmcart-success'>
        <CheckCircleIcon className='check-icon-rmcart'></CheckCircleIcon> <em>Removed from cart</em>
      </div> : <div className={`oc-box1 ${orderPlaced ? 'order-success' : ''}`} style={{ top: '-300px' }} id='rmcart-success'>
        <CheckCircleIcon className='check-icon-rmcart'></CheckCircleIcon> <em>Removed from cart</em>
      </div>}

      {products.length === 0 ? <div className='cart-empty-box'>


        <div style={{ textAlign: 'center' }}>Empty Cart</div>
        <button className='b-pet-btn' onClick={() => { navigate('/') }}>Buy A Pet</button>
      </div> : products.map((val) => {
        return (<CartCard name={val.name} img={val.img} desc={val.description} price={val.price} key={val.id} id={val._id} avail={val.available} />);
      })}</div>
  )
}
