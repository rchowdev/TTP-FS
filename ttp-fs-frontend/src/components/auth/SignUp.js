import React, { useState } from 'react';
import { Grid, Form, Header, Segment, Button, Message } from 'semantic-ui-react';
import { postUser } from '../../axios_requests/backendRequests';

const SignUp = ({ handleSuccessfulAuth }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    //Send post request to sign up(create new user)
    postUser(signUpData)
      .then(data => {
        if(data.user){
          setError(false);
          handleSuccessfulAuth(data.user);
        } else {
          setError(true);
          setErrorMessage(data.error);
        }
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  return (
    <Grid style={{ height: "80vh" }} verticalAlign="middle"  textAlign="center">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2">Sign Up</Header>
        <Form error={error} size="large" onSubmit={handleSubmit}>
          <Message error>{errorMessage}</Message>
          <Segment>
            <Form.Input
              fluid
              type="text"
              required
              name="firstName"
              value={firstName}
              placeholder="First name"
              onChange={e => setFirstName(e.target.value)}
            />
            <Form.Input
              fluid
              type="text"
              required
              name="lastName"
              value={lastName}
              placeholder="Last name"
              onChange={e => setLastName(e.target.value)}
            />
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
              Sign Up
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default SignUp;
