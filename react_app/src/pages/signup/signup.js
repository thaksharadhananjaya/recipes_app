import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from '../../components/input';
import LoginLayout from '../../components/layouts/login_layout';
import { signup } from '../../actions/auth_actions'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [firstName, setFName] = useState('');
  const [lastName, setLName] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const userSignup = (e) => {
    e.preventDefault();

    if (firstName && lastName && email && password) {
      if (password === cPassword) {
        const user = {
          firstName,
          lastName,
          email,
          password
        }
        dispatch(signup(user));
      }
    }
  }

  if (auth.authenticate)
    return <Navigate replace to="/" />;

  return (
    <LoginLayout signup onSubmit={userSignup}>
      <Row>
        <Col>
          <Input
            controlId="formFName"
            label="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFName(e.target.value)}
            placeholder="Enter First Name"
          />
        </Col>
        <Col>
          <Input
            controlId="formLName"
            label="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Enter Last Name"
          />
        </Col>
      </Row>
      <Input
        controlId="formEmail"
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter Email"
      />
      <Input
        controlId="formPassword"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter Password"
      />

      <Input
        controlId="formComPassword"
        label="Confirm Password"
        type="password"
        value={cPassword}
        onChange={(e) => setCPassword(e.target.value)}
        placeholder="Enter Confirm Password"
      />


    </LoginLayout>
  )
}
