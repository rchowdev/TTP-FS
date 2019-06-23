import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ handleSuccessfulAuth }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const signUpData = {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password
      }
    };

    axios.post("http://localhost:3001/api/v1/users", signUpData, { withCredentials: true }) // Tells API it's ok to set cookie in our client
      .then(res => {
        if(res.data.user){
          handleSuccessfulAuth(res.data.user);
        }
      })
      .catch(err => console.log(err));

    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    console.log("Form Submitted");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        required
        name="firstName"
        value={firstName}
        placeholder="First Name"
        onChange={e => setFirstName(e.target.value)}
      />
      <input
        type="text"
        required
        name="lastName"
        value={lastName}
        placeholder="Last Name"
        onChange={e => setLastName(e.target.value)}
      />
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

      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
