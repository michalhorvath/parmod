import React from 'react';
import Button from 'react-bootstrap/Button';

import { User, LoggedUser } from '../../types';
import userService from '../../services/users';

interface Props{
    addFollow: (followId: string) => void,
    removeFollow: (unfollowId: string) => void,
    user: User,
    loggedUser: LoggedUser
    isFollowing: boolean
}

const FollowButton = ({user, loggedUser, addFollow, removeFollow, isFollowing}: Props) => {
  if (!loggedUser){
    return (
      <Button variant="outline-primary" size="sm" disabled>Follow</Button>
    );
  }

  const handleFollow = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      await userService.follow(user.id);
      addFollow(user.id);
    } catch (e: unknown) {
      console.error('Error', e);
    }
  };

  const handleUnfollow = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      await userService.unfollow(user.id);
      removeFollow(user.id);
    } catch (e: unknown) {
      console.error('Error', e);
    }
  };

  if (!isFollowing){
    return (
      <Button variant="primary" size="sm" 
        onClick={handleFollow}>Follow</Button>
    );
  }
  return (
    <Button variant="outline-primary" size="sm" 
      onClick={handleUnfollow}>Unfollow</Button>
  );
};

export default FollowButton;
