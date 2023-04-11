import React from 'react';
import Container from 'react-bootstrap/Container';

import { Design, Comment, LoggedUser } from '../../types';
import AddCommentForm from './AddCommentForm';
import CommentBlock from './CommentBlock';

interface Props{
    design: Design, 
    addNewComment: (comment: Comment) => void,
    removeComment: (commentId: string) => void,
    user: LoggedUser
}

const CommentSection = ({design, addNewComment, removeComment, user}: Props) => {
  return (
    <Container fluid>
      <h3 className="m-2">Comments:</h3>
      <ul>
        {design.comments.map((c, i) => (<CommentBlock key={i} 
          comment={c} user={user} designId={design.id}
          removeComment={()=>{removeComment(c.id);}}/>))}
      </ul>
      <AddCommentForm designId={design.id} onSubmit={addNewComment}/>
    </Container>
  );
};

export default CommentSection;
