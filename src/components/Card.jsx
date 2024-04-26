import React, { useEffect, useState } from 'react';
import '../style/Card.css';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { orderCartfunction } from '../redux/slices/Order-Cart';

export const Card = (props) => {

  const [clog, setClog] = useState(false);
  const alldata = useSelector((state) => state.rootReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (alldata.CheckLogin.value !== 401) {
      setClog(true)
    }
  }, [alldata.CheckLogin.value]);
  const buyNow = async () => {
    if (!clog) {
      navigate('/login')
    }
    else {
      if (alldata.userdata.wallet >= props.price) {
        const dates = new Date();
        const time = dates.toLocaleTimeString();
        const date = dates.toLocaleDateString();
        const res = await fetch('http://localhost:5000/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, productId: props.id, time: time, date: date })
        })
        const data = await res.text();


        await fetch('http://localhost:5000/updatepets', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ productId: props.id })
        })

        await fetch('http://localhost:5000/updatewallet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, wallet: (alldata.userdata.wallet - props.price) })
        })
        await fetch('http://localhost:5000/sellerupdatewallet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ sellerId: props.sellerId, wallet: props.price })
        })
        await fetch('http://localhost:5000/rmitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, productId: props.id })
        })
        dispatch(orderCartfunction(1))
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
    if (clog) {
      const res = await fetch('http://localhost:5000/tocart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ userId: alldata.userdata._id, productId: props.id })
      })
      const data = await res.text();
      if (res.status === 200) {
        dispatch(orderCartfunction(2))
      }
      else if (res.status === 203) {
        alert('Pet already in cart');
        navigate('/cart');
      }
    }
    else {
      navigate('/login');
    }
  }

  return (
    <div className='card' >
      <div className="updata-box" onClick={() => { navigate(`/details?id=${props.id}`) }}>


        <h4>{props.name}</h4>
        <img src={[props.img]} alt="card-image" className='card-image' />
        <div className="ab-box">

          <i className="age"><strong>Age:-</strong> {props.age}</i> <i className='breed'><strong>Breed:-</strong> {props.breed}</i>
        </div>
        <div className="price">₹ {props.price}</div>
      </div>
      {props.avail === false ? <div style={{ fontSize: '25px', }}>Sold!!</div> :
        <div>
          <button className='card-btn buy-btn' onClick={buyNow}> Buy Now</button>
          <button className='card-btn cart-btn' onClick={addProduct}> Add To Cart</button>
        </div>}

    </div>
  )
}

export const CartCard = (props) => {
  const [userData, setUserData] = useState({});
  const [clog, setClog] = useState(false);
  const alldata = useSelector((state) => state.rootReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (alldata.CheckLogin.value !== 401) {
      setClog(true)
    }
    setUserData(alldata.userdata)
  }, [alldata.CheckLogin.value]);
  const buyNow = async () => {
    if (!clog) {
      navigate('/login')
    }
    else {
      if (alldata.userdata.wallet >= props.price) {
        const dates = new Date();
        const time = dates.toLocaleTimeString();
        const date = dates.toLocaleDateString();
        const res = await fetch('http://localhost:5000/order', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, productId: props.id, time: time, date: date })
        })
        const data = await res.text();


        const res1 = await fetch('http://localhost:5000/updatepets', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ productId: props.id })
        })
        const res2 = await fetch('http://localhost:5000/updatewallet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: alldata.userdata._id, wallet: (alldata.userdata.wallet - props.price) })
        })
        await fetch('http://localhost:5000/sellerupdatewallet', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ sellerId: props.sellerId, wallet: props.price })
        })
        await fetch('http://localhost:5000/rmitem', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ userId: userData._id, productId: props.id })
        })
        dispatch(orderCartfunction(1))
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
  const rmvProduct = async () => {


    const res = await fetch('http://localhost:5000/rmitem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ userId: userData._id, productId: props.id })
    })

    dispatch(orderCartfunction(3))
    setTimeout(() => {
      window.location.reload();

    }, 4000);

  }
  return (
    <div className='cart-card'>
      <h4>{props.name}</h4>
      <img src={[props.img]} alt="card-image" className='card-image' />
      <p>{props.desc}</p>
      <div className="price">₹ {props.price}</div>
      {props.avail === false ? <div style={{ fontSize: '25px', }}>Sold!!</div> :
        <div>
          <button className='card-btn buy-btn' onClick={buyNow}> Buy Now</button>
        </div>}
      <button className='card-btn cart-btn rmv-btn' onClick={rmvProduct}> Remove from Cart</button>

    </div>
  )
}
export const OrderCard = (props) => {


  return (
    <div className='order-card'>
      <h4>{props.name}</h4>
      <img src={[props.img]} alt="card-image" className='card-image' />
      <p>{props.desc}</p>
      <div className="price">₹ {props.price}</div>
      <div className="price">{props.status}</div>
      <p className="date">{props.date}</p>
      <p className="time">{props.time}</p>
    </div>
  )
}
export const PetCard = (props) => {


  return (
    <div className='order-card1'>
      <h4>{props.name}</h4>
      <img src={[props.img]} alt="card-image" className='card-image' />
      <p>{props.desc}</p>
      <div className="price">₹ {props.price}</div>

    </div>
  )
}
