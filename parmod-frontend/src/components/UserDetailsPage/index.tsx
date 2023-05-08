import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

import UserService from '../../services/users';
import FeedService from '../../services/feed';
import { User, UserRole, Design, LoggedUser } from '../../types';
import ProfilePhoto from './ProfilePhoto';
import { toDate } from '../../utils';
import FollowButton from './FollowButton';
import DesignTile from '../DesignTile';

interface Props{
    loggedUser: LoggedUser,
    setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUser>>
}

const UserDetailsPage = ( { loggedUser, setLoggedUser } : Props ) => {
  const { id } = useParams();
  const userId = id;
  const [user, setUser] = useState<User>();
  const [publishedDesigns, setPublishedDesigns] = useState<Design[]>([]);
  const [likedDesigns, setLikedDesigns] = useState<Design[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId){
        return;
      }
      const user = await UserService.get(userId);
      setUser(user);
    };
    void fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      if (!userId){
        return;
      }
      const feed = await FeedService.getUser(userId, 'design');
      // @ts-ignore 
      setPublishedDesigns(feed.map(f => f.design).filter(d => d !== null));
    };
    void fetch();
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      if (!userId){
        return;
      }
      const feed = await FeedService.getUser(userId, 'like');
      // @ts-ignore 
      setLikedDesigns(feed.map(f => f.design).filter(d => d !== null));
    };
    void fetch();
  }, [userId]);

  if (!userId || typeof userId !== 'string' || !user){
    return null;
  }

  const handleEditButtonClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!userId){
      return;
    }
    navigate(`/edit-user/${userId}`);
  };

  const addFollow = (followId: string) => {
    if (!userId || !loggedUser){
      return;
    }
    setLoggedUser({
      ...loggedUser,
      following: loggedUser.following.concat(followId)
    });
  };

  const removeFollow = (unfollowId: string) => {
    if (!userId || !loggedUser){
      return;
    }
    setLoggedUser({
      ...loggedUser,
      following: loggedUser.following.filter(u => u !== unfollowId)
    });
  };

  const handleSetRole = async (newRole: UserRole) => {
    try {
      if(!userId || !loggedUser){
        return;
      }
      const newUser = await UserService.setRole(user.id, newRole);
      setUser(newUser);
    } catch (e: unknown) {
      console.error('Unknown error', e);
    }
  };

  const handleSetModerator = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await handleSetRole(UserRole.MODERATOR);
  };

  const handleSetDesigner = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await handleSetRole(UserRole.DESIGNER);
  };

  const handleSetBanned = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await handleSetRole(UserRole.BANNED);
  };

  return (
    <Container>
      <h2 className="m-2">User {user.username}</h2>
      <div className="mb-2" >
        { loggedUser !== null && loggedUser.id === userId ? 
          <Button onClick={handleEditButtonClick}>Edit profile</Button> :
          null }
      </div>
      <div className="mb-2" >
        { loggedUser !== null && loggedUser.id !== userId &&
            user && user.role !== UserRole.BANNED ? 
          <FollowButton user={user} loggedUser={loggedUser}
            isFollowing={loggedUser.following.some(u => u === user.id)}
            addFollow={addFollow} removeFollow={removeFollow}/> :
          null }
      </div>
      { (loggedUser !== null && user !== null)
            && (loggedUser.role === UserRole.MODERATOR ||
                loggedUser.role === UserRole.ADMIN) ? 
        <div className="mb-2" >
          <div><strong>Moderator functions:</strong></div>
          <div className="mb-2" >
            {user.role === UserRole.MODERATOR ?
              <Button variant="warning" onClick={handleSetDesigner}>Set designer</Button> :
              <Button variant="warning" onClick={handleSetModerator}>Set moderator</Button>}
          </div>
          <div className="mb-2" >
            {user.role !== UserRole.BANNED ?
              <Button variant="warning" onClick={handleSetBanned}>Set banned</Button> :
              <Button variant="warning" onClick={handleSetDesigner}>Set unbanned</Button>}
          </div>
        </div> : null}
      {user !== null && user.role !== UserRole.BANNED ?
        <div>
          <div className="m-2" >
            <ProfilePhoto user={user}/>
          </div>
          <div><strong>Registered:</strong> {toDate(user.registeredDate)}</div>
          <div><strong>Email:</strong> {user.email}</div>
          <div><strong>Role:</strong> {user.role}</div>
          {user !== null && (user.role === UserRole.DESIGNER ||
            user.role === UserRole.MODERATOR || 
            user.role === UserRole.ADMIN) ?
            <div>
              <h3 className="m-2">Published designs:</h3>
              <Row xs={1} md={4} className="g-4">
                {publishedDesigns.map(d => (
                  <Col key={d.id}>
                    <DesignTile design={d} />
                  </Col>
                ))}
              </Row>
            </div>
            : null }
          <h3 className="m-2">Liked designs:</h3>
          <Row xs={1} md={4} className="g-4">
            {likedDesigns.map(d => (
              <Col key={'liked'+d.id}>
                <DesignTile design={d} />
              </Col>
            ))}
          </Row>
        </div> : <div>this user is banned</div>}
    </Container>
  );
};

export default UserDetailsPage;
