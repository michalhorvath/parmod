import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import { resetToken } from '../../services/token';
import { LoggedUser } from '../../types';

interface Props {
    setUser: React.Dispatch<React.SetStateAction<LoggedUser>>
}

const LogoutPage = ({setUser}: Props) => {

  const navigate = useNavigate();

  setUser(null);
  navigate('/');
  window.localStorage.removeItem('tokenParmod');
  window.localStorage.removeItem('loggedUserParmod');

  return (
    <Container>
        Loggin out
    </Container>
  );
};

export default LogoutPage;
