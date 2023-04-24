import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import designService from '../../services/designs';
import modelService from '../../services/models';
import { Design, Model, Comment, Like, LoggedUser } from '../../types';
import ModelSection from './ModelSection';
import CommentSection from './CommentSection';
import GenerateNewModelModal from '../GenerateNewModelModal';
import LikeButton from './LikeButton';
import { toDate } from '../../utils';

interface Props{
    user: LoggedUser
}

const DesignDetailsPage = ({user}: Props) => {
  const { id } = useParams();
  const designId = id;
  const [design, setDesign] = useState<Design>();
  const [showGenerateModel, setShowGenerateModel] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([]);
  const [trigger, setTrigger] = useState<number>(0);

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

  useEffect(() => {
    const fetchModels = async () => {
      if (!user || !design){
        return;
      }
      const models = await modelService.getAll(user.id, design.id);
      setModels(models);
    };
    void fetchModels();
  }, [design, showGenerateModel, trigger]);

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

  const isLiked = user !== null && design.likes.some(l => l.user.id === user.id);

  return (
    <Container>
      <h2 className="m-2">Design {design.title}</h2>
      <div>
        <strong>Author:</strong>&nbsp;
        <Link to={`/user/${design.author.id}`}>{design.author.username}:</Link>
      </div>
      <div><strong>Published:</strong> {toDate(design.publishedDate)}</div>
      <div>
        <span><strong>Description:</strong><br/></span>
        {design.description.split('\n').map((l, i) => (<span key={i}>{l}<br/></span>))}
      </div>
      <div>
        <span><strong>Code:</strong><br/></span>
        <pre>
          {design.code}
        </pre>
      </div>
      <div><strong>Likes:</strong> {design.likes.length}</div>
      <LikeButton design={design} addLike={addLike} 
        user={user} removeLike={removeLike} isLiked={isLiked}/>
      <ModelSection models={models} 
        setShowGenerateModel={setShowGenerateModel}
        reloadModels={() => setTrigger(trigger+1)} />
      <CommentSection design={design} addNewComment={addNewComment} 
        user={user} removeComment={removeComment} />
      <GenerateNewModelModal design={design} show={showGenerateModel}
        onHide={() => setShowGenerateModel(false)}/>
    </Container>
  );
};

export default DesignDetailsPage;
