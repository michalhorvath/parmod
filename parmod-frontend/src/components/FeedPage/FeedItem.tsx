import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { Feed, LoggedUser } from '../../types';
import feedService from '../../services/feed';

interface Props{
    item: Feed,
    loggedUser: LoggedUser
}

const FeedItem = ({item, loggedUser}: Props) => {
  const isFollowing = loggedUser !== null 
        && loggedUser.following.some(u => u === item.user.id);
  const style = isFollowing ?
    {
      backgroundColor: 'yellow'
    } :
    {};
  if (item.type === 'design') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <Link to={`/user/${item.user.id}`}>
          {item.user.username}
        </Link>&nbsp;
        published new design&nbsp;
        <Link to={`/design/${item.design.id}`}>
          {item.design.title}
        </Link>
      </ListGroup.Item>
    );
  }
  if (item.type === 'model') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <Link to={`/user/${item.user.id}`}>
          {item.user.username}
        </Link>&nbsp;
        generated model from design&nbsp;
        <Link to={`/design/${item.design.id}`}>
          {item.design.title}
        </Link>&nbsp;
      </ListGroup.Item>
    );
  }
  if (item.type === 'comment') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <Link to={`/user/${item.user.id}`}>
          {item.user.username}
        </Link>&nbsp;
        added comment to design&nbsp;
        <Link to={`/design/${item.design.id}`}>
          {item.design.title}
        </Link>&nbsp;
      </ListGroup.Item>
    );
  }
  if (item.type === 'like') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <Link to={`/user/${item.user.id}`}>
          {item.user.username}
        </Link>&nbsp;
        liked design&nbsp;
        <Link to={`/design/${item.design.id}`}>
          {item.design.title}
        </Link>&nbsp;
      </ListGroup.Item>
    );
  }
  return null;
};

export default FeedItem;
