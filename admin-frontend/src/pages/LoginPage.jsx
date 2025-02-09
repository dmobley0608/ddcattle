import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useGetProfileQuery, useLazyGetProfileQuery, useLoginMutation } from '../slices/apiSlice';
import { Form, Button, Spinner, FloatingLabel, Col, Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';

const LoginPage = ({ token, setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState('');
  const [fetchUser] = useLazyGetProfileQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await login({ email, password })
      localStorage.setItem('token', data.token);
      dispatch(setCredentials({token: data.token}));
      await fetchUser();

    } catch (err) {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className='container  position-absolute top-50 start-50 translate-middle'>
      <Col xs={12} md={6} className="card p-5 mx-auto text-center ">
        <h4>Login</h4>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <FloatingLabel controlId="email" label="email" className="my-3">
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </FloatingLabel>
        <FloatingLabel controlId="password" label="Password" className="mb-3">
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
        </FloatingLabel>
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Spinner animation="border" size="sm" /> : 'Login'}
        </Button>
      </Col>
    </Form>
  );
};

export default LoginPage;
