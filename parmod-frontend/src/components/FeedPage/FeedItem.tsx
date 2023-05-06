import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { Feed, LoggedUser } from '../../types';
import UserLink from '../Links/UserLink';
import DesignLink from '../Links/DesignLink';

interface Props{
    item: Feed,
    loggedUser: LoggedUser
}

const FeedItem = ({item, loggedUser}: Props) => {
  const isFollowing = loggedUser !== null 
        && loggedUser.following.some(u => item.user && u === item.user.id);
  const style = isFollowing ?
    {
      backgroundColor: 'yellow'
    } :
    {};
  if (item.type === 'design') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <UserLink user={item.user}/>&nbsp;
        published new design&nbsp;
        <DesignLink design={item.design}/>
      </ListGroup.Item>
    );
  }
  if (item.type === 'model') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <UserLink user={item.user}/>&nbsp;
        generated model from design&nbsp;
        <DesignLink design={item.design}/>
      </ListGroup.Item>
    );
  }
  if (item.type === 'comment') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <UserLink user={item.user}/>&nbsp;
        added comment to design&nbsp;
        <DesignLink design={item.design}/>
      </ListGroup.Item>
    );
  }
  if (item.type === 'like') {
    return (
      <ListGroup.Item key={item.id} style={style}>
        <UserLink user={item.user}/>&nbsp;
        liked design&nbsp;
        <DesignLink design={item.design}/>
      </ListGroup.Item>
    );
  }
  return null;
};

export default FeedItem;
