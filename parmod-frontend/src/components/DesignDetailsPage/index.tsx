import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import designService from '../../services/designs';
import modelService from '../../services/models';
import { Design, Model, Comment, Like, LoggedUser, UserRole } from '../../types';
import ModelSection from './ModelSection';
import CommentSection from './CommentSection';
import GenerateNewModelModal from '../GenerateNewModelModal';
import STLViewerModal from '../STLViewerModal';
import LikeButton from './LikeButton';
import Photo from './Photo';
import { toDate } from '../../utils';
import UserLink from '../Links/UserLink';
import DesignService from '../../services/designs';

interface Props{
    loggedUser: LoggedUser
}

const DesignDetailsPage = ({loggedUser}: Props) => {
  const { id } = useParams();
  const designId = id;
  const [design, setDesign] = useState<Design>();
  const [showGenerateModel, setShowGenerateModel] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([]);
  const [showSTLViewerModal, setShowSTLVieverModal] = useState<boolean>(false);
  const [STLViewerModel, setSTLViewerModel] = useState<Model | null>(null);
  const [trigger, setTrigger] = useState<number>(0);

  const navigate = useNavigate();

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
      if (!loggedUser || !design){
        return;
      }
      const models = await modelService.getAll(loggedUser.id, design.id);
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
      comments: design.comments.concat({
        ...newComment,
        user: {
          id: loggedUser ? loggedUser.id : '',
          username: loggedUser ? loggedUser.username : ''
        }
      })
    });
  };

  const removeComment = (commentId: string) => {
    setDesign({ ...design,
      comments: design.comments.filter(c => c.id !== commentId)
    });
  };

  const addLike = (newLike: Like) => {
    setDesign({
      ...design,
      likes: design.likes.concat({
        ...newLike,
        user: {
          id: loggedUser ? loggedUser.id : '',
          username: loggedUser ? loggedUser.username : ''
        }
      })
    });
  };

  const removeLike = (likeId: string) => {
    setDesign({
      ...design,
      likes: design.likes.filter(l => l.id !== likeId)
    });
  };

  const handleEditDesignClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    navigate(`/edit-design/${design.id}`);
  };

  const handleDelete = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      if(!loggedUser){
        return;
      }
      await DesignService.remove(design.id);
      navigate('/');
    } catch (e: unknown) {
      console.error('Unknown error', e);
    }
  };

  const viewModel = (model: Model) => {
    setSTLViewerModel(model);
    setShowSTLVieverModal(true);
  };

  const isLiked = loggedUser !== null && design.likes.some(l => l.user && l.user.id === loggedUser.id);

  return (
    <Container>
      <h2 className="m-2">Design {design.title}</h2>
      <div className="mb-2">
        { loggedUser !== null && design.author !== null 
            && loggedUser.id === design.author.id ? 
          <Button onClick={handleEditDesignClick}>Edit design</Button> :
          null }
        { (loggedUser !== null && design.author !== null)
            && (loggedUser.id === design.author.id ||
                loggedUser.role === UserRole.MODERATOR ||
                loggedUser.role === UserRole.ADMIN) ? 
          <Button variant="outline-danger" onClick={handleDelete}>Remove design</Button> :
          null }
      </div>
      <Photo design={design}/>
      <div>
        <strong>Author:</strong>&nbsp;
        <UserLink user={design.author} />
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
        user={loggedUser} removeLike={removeLike} isLiked={isLiked}/>
      <ModelSection models={models} 
        setShowGenerateModel={setShowGenerateModel}
        loggedUser={loggedUser}
        viewModel={viewModel}
        reloadModels={() => setTrigger(trigger+1)} />
      <CommentSection design={design} addNewComment={addNewComment} 
        user={loggedUser} removeComment={removeComment} />
      <GenerateNewModelModal design={design} show={showGenerateModel}
        onHide={() => setShowGenerateModel(false)}/>
      <STLViewerModal model={STLViewerModel} show={showSTLViewerModal}
        onHide={() => setShowSTLVieverModal(false)}/>
    </Container>
  );
};

export default DesignDetailsPage;
