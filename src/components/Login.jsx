import React, { useState } from 'react';
import '../style/Login.css';
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // creating a function to get inputs in a state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // creating a function to get inputs in a state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  //sending a post request to login user
  const loginRequest = async () => {
    try {
      const res = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include",
        body: JSON.stringify({ email: username, password: password })
      });
      if (res.status === 200) {
        setUsername('');
        setPassword('');
        navigate('/');
        window.location.reload();

      }
      else {
        throw Error("credentail incorrect")
      }
    }
    catch (err) {
      alert("Incorrect credentials")
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-group">
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password:</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button className='lgn-btn' onClick={loginRequest}>Login</button>

    </div>
  );
}

export default Login;
