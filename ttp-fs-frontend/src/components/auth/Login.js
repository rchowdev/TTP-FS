import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ handleSuccessfulAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const logInData = {
      user: {
        email,
        password
      }
    };

    axios.post("http://localhost:3001/api/v1/login", logInData, { withCredentials: true }) // Tells API it's ok to set cookie in our client
      .then(res => {
        if(res.data.user){
          handleSuccessfulAuth(res.data.user);
        }
      })
      .catch(err => console.log(err));

    setEmail('');
    setPassword('');
    console.log("Login Submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        required
        name="email"
        value={email}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        required
        name="password"
        value={password}
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default SignUp;