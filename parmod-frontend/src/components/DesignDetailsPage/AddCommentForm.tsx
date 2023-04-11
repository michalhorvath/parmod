import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import designService from '../../services/designs';
import { Comment } from '../../types';

interface Props{
    designId: string, 
    onSubmit: (comment: Comment) => void
}

const AddCommentForm = ({designId, onSubmit}: Props) => {
  const [text, setText] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const addedComment = await designService.addComment(designId, {text});
      onSubmit(addedComment);
      setText('');
      setError('');
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
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-md-bottom">
          <Col>
            {error ? (
              <Alert variant="danger">
                {error}
              </Alert>
            ) : undefined }
            <Form.Group className="mb-3 align-items-end" as={Row}>
              <Col sm={10}>
                <Form.Control as="textarea" rows={3} placeholder="Add new comment"
                  value={text} onChange={({ target }) => setText(target.value)}/>
              </Col>
              <Col sm={2}>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddCommentForm;
