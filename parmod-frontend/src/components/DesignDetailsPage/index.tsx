import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import designService from '../../services/designs';
import { Design, Comment, Like, LoggedUser } from '../../types';
import CommentSection from './CommentSection';
import LikeButton from './LikeButton';

interface Props{
    user: LoggedUser
}

const DesignDetailsPage = ({user}: Props) => {
  const { id } = useParams();
  const designId = id;
  const [design, setDesign] = useState<Design>();

  useEffect(() => {
    const fetchDesign = async () => {
      if (!designId){
        return;
      }
      const design = await designService.get(designId);
      setDesign(design);
    };
    void fetchDesign();
  }, [designId]);

  if (!designId || typeof designId !== 'string' || !design){
    return null;
  }

  const addNewComment = (newComment: Comment) => {
    setDesign({
      ...design,
      comments: design.comments.concat(newComment)
    });
  };

  const removeComment = (commentId: string) => {
    setDesign({
      ...design,
      comments: design.comments.filter(c => c.id !== commentId)
    });
  };

  const addLike = (newLike: Like) => {
    setDesign({
      ...design,
      likes: design.likes.concat(newLike)
    });
  };

  const removeLike = (likeId: string) => {
    setDesign({
      ...design,
      likes: design.likes.filter(l => l.id !== likeId)
    });
  };

  const isLiked = user !== null && design.likes.some(l => l.user === user.id);

  return (
    <Container>
      <h2 className="m-2">Design {design.title}</h2>
      <div>Author: {design.author.username}</div>
      <div>Description: {design.description}</div>
      <div>Code: {design.code}</div>
      <div>Likes: {design.likes.length}</div>
      <LikeButton design={design} addLike={addLike} 
        user={user} removeLike={removeLike} isLiked={isLiked}/>
      <CommentSection design={design} addNewComment={addNewComment} 
        user={user} removeComment={removeComment}/>
    </Container>
  );
};

export default DesignDetailsPage;
