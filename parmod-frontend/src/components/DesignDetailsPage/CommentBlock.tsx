import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { Comment, LoggedUser, UserRole } from '../../types';
import designService from '../../services/designs';

interface Props{
    comment: Comment,
    user: LoggedUser,
    removeComment: () => void,
    designId: string
}

const CommentBlock = ({comment, user, removeComment, designId}: Props) => {
  const handleRemove= async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      await designService.removeComment(designId, comment.id);
      removeComment();
    } catch (e: unknown) {
      console.error('Error', e);
    }
  };

  return (
    <li>
      <Link to={`/user/${comment.user}`}>{comment.user}:</Link>&nbsp;
      {comment.text}&nbsp;
      {user && (user.role === UserRole.MODERATOR || user.role === UserRole.ADMIN
            || user.id === comment.user) ? 
        <Button variant="outline-danger" size="sm" onClick={handleRemove}>remove</Button> :
        null}
    </li>
  );
};

export default CommentBlock;