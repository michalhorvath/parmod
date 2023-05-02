import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';

import userService from '../../services/users';
import feedService from '../../services/feed';
import { User, Design, LoggedUser } from '../../types';
import ProfilePhoto from './ProfilePhoto';
import { toDate } from '../../utils';
import { toImageSrc } from '../../utils';
import Blank from '../../images/blank.png';

interface Props{
    loggedUser: LoggedUser
}

const UserDetailsPage = ( { loggedUser } : Props ) => {
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
      const user = await userService.get(userId);
      setUser(user);
    };
    void fetchUser();
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      if (!userId){
        return;
      }
      const feed = await feedService.getUser(userId, 'design');
      // @ts-ignore 
      setPublishedDesigns(feed.map(f => f.design));
    };
    void fetch();
  }, [userId]);

  useEffect(() => {
    const fetch = async () => {
      if (!userId){
        return;
      }
      const feed = await feedService.getUser(userId, 'like');
      // @ts-ignore 
      setLikedDesigns(feed.map(f => f.design));
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

  return (
    <Container>
      <h2 className="m-2">User {user.username}</h2>
      <div className="mb-2" >
        { loggedUser !== null && loggedUser.id === userId ? 
          <Button onClick={handleEditButtonClick}>Edit profile</Button> :
          null }
      </div>
      <ProfilePhoto user={user}/>
      <div><strong>Registered:</strong> {toDate(user.registeredDate)}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Role:</strong> {user.role}</div>
      <h3 className="m-2">Published designs:</h3>
      <Row xs={1} md={4} className="g-4">
        {publishedDesigns.map(d => (
          <Col key={d.id}>
            <Card style={{ width: '300px' }}>
              <Link to={`/design/${d.id}`}>
                {d.photo ? 
                  <Card.Img variant="top" 
                    height="200px" width="300px"
                    src={toImageSrc(d.photo)} /> : 
                  <Card.Img variant="top"
                    height="200px" width="300px"
                    // eslint-disable-next-line
                    src={Blank}/>}
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`/design/${d.id}`}>{d.title}</Link>
                </Card.Title>
                <Card.Text>
                  <span>Likes: {d.likes.length}</span><br/>
                  <span>Comments: {d.comments.length}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <h3 className="m-2">Liked designs:</h3>
      <Row xs={1} md={4} className="g-4">
        {likedDesigns.map(d => (
          <Col key={'liked'+d.id}>
            <Card style={{ width: '300px' }}>
              <Link to={`/design/${d.id}`}>
                {d.photo ? 
                  <Card.Img variant="top" 
                    height="200px" width="300px"
                    src={toImageSrc(d.photo)} /> : 
                  <Card.Img variant="top"
                    height="200px" width="300px"
                    // eslint-disable-next-line
                    src={Blank}/>}
              </Link>
              <Card.Body>
                <Card.Title>
                  <Link to={`/design/${d.id}`}>{d.title}</Link>
                </Card.Title>
                <Card.Text>
                  <span>Likes: {d.likes.length}</span><br/>
                  <span>Comments: {d.comments.length}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default UserDetailsPage;
