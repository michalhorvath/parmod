import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
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
