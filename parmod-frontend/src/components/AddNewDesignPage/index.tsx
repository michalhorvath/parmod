import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import DesignService from '../../services/designs';
import { ParameterFormValues  } from '../../types';

const AddNewDesignPage = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [parameters, setParameters] = useState<ParameterFormValues[]>([]);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const design = await DesignService.create({
        title, description, code, parameters
      });
      navigate(`/design/${design.id}`);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data?.error && typeof e?.response?.data?.error === 'string') {
          const message = e.response.data.error as string;
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <Container>
      <h2 className="m-2">Add new design</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col>
            {error ? (
              <Alert variant="danger">
                {error}
              </Alert>
            ) : undefined }
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter title" 
                value={title} onChange={({ target }) => setTitle(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" 
                value={description} onChange={({ target }) => setDescription(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>OpenSCAD code:</Form.Label>
              <Form.Control as="textarea" rows={20} placeholder="Enter code" 
                value={code} onChange={({ target }) => setCode(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddNewDesignPage;
