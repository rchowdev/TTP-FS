import React, { useState } from 'react';
import { Grid, Header, Form, Button, Segment } from 'semantic-ui-react';
import { postLogin } from '../../axios_requests/backendRequests';

const Login = ({ handleSuccessfulAuth }) => {
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

    //Send post request to login
    postLogin(logInData)
      .then(res => {
        if(res.data.user){
          handleSuccessfulAuth(res.data.user);
        }
      })
      .catch(err => console.log(err));

    //Reset input fields
    setEmail("");
    setPassword("");
  };

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle"  textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2">Log In</Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              required
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              required
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            <Button positive fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default Login;
