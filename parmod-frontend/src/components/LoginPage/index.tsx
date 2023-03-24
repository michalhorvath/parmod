import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import LoginService from '../../services/login';
import { LoggedUser } from '../../types';

interface Props {
    setUser: React.Dispatch<React.SetStateAction<LoggedUser>>
}

const LoginPage = ({setUser}: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); 
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleLogin = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const user = await LoginService.login(username, password);
      setUsername('');
      setPassword('');
      setUser(user);
      navigate('/');
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error && typeof e?.response?.data?.error === 'string') {
          const message = e.response.data.error as string;
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Container>
      <h2 className="m-2">Login to application</h2>
      <Form onSubmit={handleLogin}>
        <Row className="justify-content-md-center">
          <Col xs="auto">
            {error ? (
              <Alert variant="danger">
                {error}
              </Alert>
            ) : undefined }
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Enter username" 
                value={username} onChange={({ target }) => setUsername(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Enter password" 
                value={password} onChange={({ target }) => setPassword(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
            <Form.Group className="mb-3">
              If you don't have account, you 
              can register <Link to="/register">here</Link>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LoginPage;
