import React from 'react';
import Button from 'react-bootstrap/Button';

import { Design, Like, LoggedUser } from '../../types';
import designService from '../../services/designs';

interface Props{
    design: Design, 
    addLike: (newLike: Like) => void,
    removeLike: (likeId: string) => void,
    user: LoggedUser,
    isLiked: boolean
}

const LikeButton = ({design, addLike, removeLike, user, isLiked}: Props) => {
  if (!user){
    return (
      <Button variant="outline-primary" size="sm" disabled>like</Button>
    );
  }

  const handleLike = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const newLike = await designService.addLike(design.id);
      addLike(newLike);
    } catch (e: unknown) {
      console.error('Error', e);
    }
  };

  const handleUnlike = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const like = design.likes.find(l => l.user.id === user.id);
      if (like){
        await designService.removeLike(design.id, like.id);
        removeLike(like.id);
      }
    } catch (e: unknown) {
      console.error('Error', e);
    }
  };

  if (!isLiked){
    return (
      <Button variant="outline-primary" size="sm" 
        onClick={handleLike}>like</Button>
    );
  }
  return (
    <Button variant="primary" size="sm" 
      onClick={handleUnlike}>unlike</Button>
  );
};

export default LikeButton;
