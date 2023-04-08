import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { Feed } from '../../types';
import feedService from '../../services/feed';

const FeedItem = (props: {item: Feed}) => {
  if (props.item.type === 'design') {
    return (
      <ListGroup.Item key={props.item.id}>
        <Link to={`/user/${props.item.author}`}>{props.item.author}</Link>&nbsp;
        published new design&nbsp;
        <Link to={`/design/${props.item.id}`}>{props.item.title}</Link>
      </ListGroup.Item>
    );
  }
  if (props.item.type === 'model') {
    return (
      <ListGroup.Item key={props.item.id}>
        <Link to={`/user/${props.item.user}`}>{props.item.user}</Link>&nbsp;
        generated new mode&nbsp;
        <Link to={`/design/${props.item.id}`}>{props.item.id}</Link>&nbsp;
        from design&nbsp;
        <Link to={`/design/${props.item.design}`}>{props.item.design}</Link>&nbsp;
      </ListGroup.Item>
    );
  }
  return null;
};

const FeedPage = () => {
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
        {feed.map(f => (<FeedItem item={f} />))}
      </ListGroup>
    </Container>
  );
};

export default FeedPage;

