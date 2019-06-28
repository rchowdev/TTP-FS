import React, { useState } from 'react';
import { Grid, Header, Form, Button, Segment, Message } from 'semantic-ui-react';
import { postLogin } from '../../axios_requests/backendRequests';

const Login = ({ handleSuccessfulAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
      .then(data => {
        if(data.user){
          setError(false);
          handleSuccessfulAuth(data.user);
        } else {
          setError(true);
          setErrorMessage(data.error);
        }
      });

    //Reset input fields
    setEmail("");
    setPassword("");
  };

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle"  textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2">Log In</Header>
        <Form error={error} size="large" onSubmit={handleSubmit}>
          <Message error>{errorMessage}</Message>
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
