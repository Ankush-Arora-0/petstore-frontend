import React, { useEffect, useState } from 'react';
import '../style/Home.css';
import { Card } from './Card';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';

export const Home = () => {

  const [products, setProducts] = useState([]);
  const alldata = useSelector((state) => state.rootReducer)
  const [orderPlaced, setOrderPlaced] = useState(false);



  const getProducts = async () => {
    const res = await fetch('http://localhost:5000/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await res.json();
    setProducts(data);
  }
  const getProductsbycategory = async () => {
    const res = await fetch(`http://localhost:5000/petsbycat?category=${alldata.categoryOfPet.value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    const data = await res.json();
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    getProductsbycategory();
  }, [alldata.categoryOfPet.value])
  useEffect(() => {

    if (alldata.orderCart.value === 1) {
      document.getElementById('cart-success').style.display = 'none';
      document.getElementById('order-success').style.display = 'flex';
      document.getElementById('order-success').style.top = '80px';
      setOrderPlaced(true);
      setTimeout(() => {
        document.getElementById('order-success').style.top = '-150px';

      }, 2000);
    }
    else if (alldata.orderCart.value === 2) {
      document.getElementById('order-success').style.display = 'none';
      document.getElementById('cart-success').style.display = 'flex';
      document.getElementById('cart-success').style.top = '80px';
      setOrderPlaced(true);
      setTimeout(() => {
        document.getElementById('cart-success').style.top = '-150px';
        setOrderPlaced(false);

      }, 2000);
    }
    else {
      document.getElementById('order-success').style.display = 'none';
      document.getElementById('cart-success').style.display = 'none';
    }
  }, [alldata.orderCart.value])
  return (
    <div className='home-page'>
      <div className={`oc-box ${orderPlaced ? 'order-success' : ''}`} id='order-success'>
        <CheckCircleIcon className='check-icon-order'></CheckCircleIcon> <em>Order Placed</em>
      </div>
      <div className={`oc-box ${orderPlaced ? 'order-success' : ''}`} id='cart-success'>
        <CheckCircleIcon className='check-icon-order'></CheckCircleIcon> <em>Added to cart</em>
      </div>

      <div className="container-images" id='container-images'></div>
      <div className="card-box">
        {products.length === 0 ? <div style={{ margin: '0px auto', fontSize: '25px' }}>No Pets</div> : products.map((val) => {
          return (<Card name={val.name} img={val.img} desc={val.description} price={val.price} key={val.id} id={val._id} age={val.age} breed={val.breed} avail={val.available} sellerId={val.userId} />);
        })}
      </div>
    </div>
  );
};
