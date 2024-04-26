import React, { useEffect, useState } from 'react';
import '../style/Details.css';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

export const Details = () => {
  const alldata = useSelector((state) => state.rootReducer);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [productData, setProductData] = useState({})
  const navigate = useNavigate()
  const buyNow = async () => {
    if (alldata.CheckLogin.value === 401) {
      navigate('/login')
    }
    else {
      if (alldata.userdata.wallet >= productData.price) {
        const dates = new Date();
        const time = dates.toLocaleTimeString();
        const date = dates.toLocaleDateString();
        await fetch('http://localhost:5000/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, productId: query.get('id'), time: time, date: date })
        })



        await fetch('http://localhost:5000/updatepets', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ productId: query.get('id') })
        })
        await fetch('http://localhost:5000/updatewallet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, wallet: (alldata.userdata.wallet - productData.price) })
        })
        await fetch('http://localhost:5000/sellerupdatewallet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ sellerId: productData.userId, wallet: productData.price })
        })
        await fetch('http://localhost:5000/rmitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, productId: productData._id })
        })
        document.getElementById('cart-success').style.display = 'none';
        document.getElementById('order-success').style.display = 'flex';
        document.getElementById('order-success').style.top = '80px';
        setOrderPlaced(true);
        setTimeout(() => {
          document.getElementById('order-success').style.top = '-150px';

        }, 2000);
        setTimeout(() => {
          navigate('/orders')
          window.location.reload()
        }, 5000);
      }
      else {
        alert('Low wallet balance please add money')
        navigate('/account')
      }
    }
  }
  const addProduct = async () => {
    if (alldata.CheckLogin.value === 401) {
      navigate('/login')
    }
    else {
      const res = await fetch('http://localhost:5000/tocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId: alldata.userdata._id, productId: query.get('id') })
      })
      if (res.status === 200) {
        document.getElementById('order-success').style.display = 'none';
        document.getElementById('cart-success').style.display = 'flex';
        document.getElementById('cart-success').style.top = '80px';
        setOrderPlaced(true);
        setTimeout(() => {
          document.getElementById('cart-success').style.top = '-150px';
          setOrderPlaced(false);

        }, 2000);
      }
      else if (res.status === 203) {
        alert('Pet already in cart');
        navigate('/cart');
      }

    }
  }
  const getProducts = async () => {


    const res = await fetch(`http://localhost:5000/getdproduct?id=${query.get('id')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    const data = await res.json();
    setProductData(data);
  }
  useEffect(() => { getProducts() }, [])
  return (
    <div className='detail-page'>
      <div className={`oc-box ${orderPlaced ? 'order-success' : ''}`} id='order-success'>
        <CheckCircleIcon className='check-icon-order'></CheckCircleIcon> <em>Order Placed</em>
      </div>
      <div className={`oc-box ${orderPlaced ? 'order-success' : ''}`} id='cart-success'>
        <CheckCircleIcon className='check-icon-order'></CheckCircleIcon> <em>Added to cart</em>
      </div>
      <div className="main-d-box">
        <div className="lft-d-box">
          <img src={productData.img} alt="sorry" className='d-img' />
        </div>
        <div className="rgt-d-box">
          <p className="product-data">
            {productData.name}
          </p>
          <p className="product-data">
            {productData.description}
          </p>
          <p className="product-data">
            ₹ {productData.price}
          </p>
          <p className="product-data">
            {productData.age}
          </p>
          <p className="product-data">
            {productData.breed}
          </p>
        </div>
        <div className="bottom-d-box">
          {productData.available === false ? <div style={{ fontSize: '25px', marginLeft: '10px' }}>Sold!!</div> :
            <div>
              <button className='card-btn buy-btn' onClick={buyNow}> Buy Now</button>
              <button className='card-btn cart-btn' onClick={addProduct}> Add To Cart</button>
            </div>}
        </div>
      </div>
    </div>
  )
}
