import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import { Feed, LoggedUser } from '../../types';
import feedService from '../../services/feed';
import FeedItem from './FeedItem';

interface Props{
    loggedUser: LoggedUser
}

const FeedPage = ({loggedUser}: Props) => {
  const [feed, setFeed] = useState<Feed[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const feed = await feedService.getAll();
      setFeed(feed);
    };
    void fetchFeed();
  }, []);

  return (
    <Container>
      <ListGroup>
        {feed.map(f => (<FeedItem key={f.id} item={f} loggedUser={loggedUser}/>))}
      </ListGroup>
    </Container>
  );
};

export default FeedPage;

