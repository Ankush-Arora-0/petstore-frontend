import React, { useEffect, useState } from 'react';
import '../style/Navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { chkLogin } from '../redux/slices/CheckLogin';
import { userData } from '../redux/slices/userData';
import { petcategory } from '../redux/slices/categoryPet';

export const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [category, setcategory] = useState("")
  const [navset, setNavSet] = useState(true);
  const chkLog = useSelector((state) => { return state.rootReducer })

  const checkLogin = async () => {
    const res = await fetch('http://localhost:5000/chklogin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })
    dispatch(chkLogin(res.status));
    if (res.status !== 401) {
      const data = await res.json();
      dispatch(userData(data));
    }
  }
  useEffect(() => {
    checkLogin();
  }, [])
  useEffect(() => {
    if (chkLog.CheckLogin.value === 401) {
      setNavSet(false)
    }
  }, [chkLog.CheckLogin.value])
  const changeNav = () => {
    if (document.getElementById('nav-box').style.right === '-120px') {
      document.getElementById('nav-box').style.right = '0px';
    }
    else {
      document.getElementById('nav-box').style.right = '-120px';
    }
  }
  const logOut = async () => {
    document.getElementById('nav-box').style.right = '-120px';
    try {
      const res = await fetch('http://localhost:5000/logout', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      window.location.reload();

    }
    catch (err) {
      console.log(err);
    }
  }
  const searchCategory = () => {
    setcategory('');
    navigate('/');
    dispatch(petcategory(category))
  }
  const toHome = () => {
    navigate('/');
    window.location.reload();
  }
  return (
    <div className='navbar'>
      <img src={logo} alt="logo" className='logo' onClick={toHome} />
      <input type="text" placeholder='Search by category' className='navbar-input' id='search-bar' onChange={(e) => { setcategory(e.target.value) }} value={category} />
      <button className='navbar-button' onClick={searchCategory}>Go</button>
      <div className="acc-box" id='acc-box'>
        <AccountCircleIcon style={{ backgroundColor: 'white', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', marginLeft: '10px' }} onClick={changeNav}></AccountCircleIcon>

      </div>


      <div className="nav-box" style={{ right: '-120px' }} id='nav-box'>
        {navset === false ? <div className='notlogin'>

          <NavLink to='/' className='navlinks' onClick={changeNav} >Home</NavLink>
          <NavLink to='/about' className='navlinks' onClick={changeNav} >About us</NavLink>
          <NavLink to='/login' className='navlinks' onClick={changeNav} >Login</NavLink>
          <NavLink to='/register' className='navlinks' onClick={changeNav} >Register</NavLink>
        </div> : <div className='loggedin'>
          <NavLink to='/about' className='navlinks' onClick={changeNav} >About us</NavLink>
          <NavLink to='/account' className='navlinks' onClick={changeNav} >Account</NavLink>
          <NavLink to='/' className='navlinks' onClick={logOut} >Log Out</NavLink>
        </div>}


      </div>
    </div>
  )
}
