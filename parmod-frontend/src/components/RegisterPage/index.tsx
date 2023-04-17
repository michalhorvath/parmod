import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import UserService from '../../services/users';
import LoginService from '../../services/login';
import ImageService from '../../services/images';
import { User, UserRole, LoggedUser } from '../../types';

interface Props {
    setUser: React.Dispatch<React.SetStateAction<LoggedUser>>
}

const RegisterPage = ({setUser}: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>(''); 
  const [name, setName] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [role, setRole] = useState<UserRole>(UserRole.USER); 
  const [error, setError] = useState<string>();
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const handleRegister = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      
      let profilePhoto = null;
      if (profilePhotoFile){
        profilePhoto = await ImageService.upload(profilePhotoFile);
      }

      const user = await UserService.create({
        username, password, name, email, role, 
        profilePhoto: profilePhoto ? profilePhoto.id : undefined
      });
      console.log(user);

      const loggeduser = await LoginService.login(username, password);
      setUser(loggeduser);

      setUsername('');
      setPassword('');
      setName('');
      setEmail('');
      setRole(UserRole.USER);
      setProfilePhotoFile(null);

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

  const onRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if ( event.target?.value && typeof event.target.value === 'string') {
      const value = event.target.value;
      const newRole =
        Object.values(UserRole).find(r => r.toString() === value);
      if (newRole) {
        setRole(newRole);
      }
    }
  };

  const handleProfilePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 1){
      const file = e.target.files[0];
      setProfilePhotoFile(file);
    }
  };

  return (
    <Container>
      <h2 className="m-2">Resigter to application</h2>
      <Form onSubmit={handleRegister}>
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
              <Form.Label>Name:</Form.Label>
              <Form.Control type="text" placeholder="Enter name" 
                value={name} onChange={({ target }) => setName(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="text" placeholder="Enter email" 
                value={email} onChange={({ target }) => setEmail(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role:</Form.Label>
              <Form.Check
                label="user"
                value="user"
                name="role"
                type='radio'
                id='role_user'
                onChange={e => onRoleChange(e)}
                checked={role === 'user'}
              />
              <Form.Check
                label="designer"
                value="designer"
                name="role"
                type='radio'
                id='role_designer'
                onChange={e => onRoleChange(e)}
                checked={role === 'designer'}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Profile photo:</Form.Label>
              <Form.Control type="file"
                accept=".jpg,.png"  multiple={false}
                onChange={handleProfilePhotoFileChange} />
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

export default RegisterPage;
