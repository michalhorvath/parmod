import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

import userService from '../../services/users';
import { User, LoggedUser } from '../../types';
import { toImageSrc } from '../../utils';
import ProfilePhoto from './ProfilePhoto';
import { toDate } from '../../utils';

interface Props{
    loggedUser: LoggedUser
}

const UserDetailsPage = ({loggedUser}: Props) => {
  const { id } = useParams();
  const userId = id;
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchDesign = async () => {
      if (!userId){
        return;
      }
      const user = await userService.get(userId);
      setUser(user);
    };
    void fetchDesign();
  }, [userId]);

  if (!userId || typeof userId !== 'string' || !user){
    return null;
  }

  return (
    <Container>
      <h2 className="m-2">User {user.username}</h2>
      <ProfilePhoto user={user}/>
      <div><strong>Registered:</strong> {toDate(user.registeredDate)}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
    </Container>
  );
};

export default UserDetailsPage;
