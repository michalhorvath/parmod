import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import designService from '../../services/designs';
import { Design } from '../../types';

const DesignDetailsPage = () => {
  const { id } = useParams();
  const designId = id;
  const [design, setDesign] = useState<Design>();

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

  if (!designId || typeof designId !== 'string' || !design){
    return null;
  }


  console.log(design);

  return (
    <Container>
      <h2 className="m-2">Design {design.title}</h2>
      <div>Author: {design.author.username}</div>
      <div>Description: {design.description}</div>
      <div>Code: {design.code}</div>
      <div>Likes: {design.likes.length}</div>
      <div>
        <div>Comments:</div>
        <ul>
          {design.comments.map(e => (<li>{e.text}</li>))}
        </ul>
      </div>
    </Container>
  );
};

export default DesignDetailsPage;
