
import React, { useState } from 'react';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (username && password) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(user => user.username === username)) {
        alert('Username already exists');
      } else {
        users.push({ username, password });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful');
        onRegister();
      }
    }
  };

  return (
    // Register.js
<div className="container">
  <h2>Register</h2>
  <input
    type="text"
    placeholder="Enter Username"
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
  <input
    type="password"
    placeholder="Enter Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <button onClick={handleRegister}>Register</button>
</div>

  );
}

export default Register;
