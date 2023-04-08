import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import { DesignPreview } from '../../types';
import designService from '../../services/designs';

const DesignsListPage = () => {
  const [filter, setFilter] = useState<string>('');
  const [designs, setDesigns] = useState<DesignPreview[]>([]);

  useEffect(() => {
    const fetchDesignList = async () => {
      const designs = await designService.getAll();
      setDesigns(designs);
    };
    void fetchDesignList();
  }, []);

  const filteredDesigns = filter === '' ?
    designs :
    designs.filter(d => d.title.includes(filter));

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3 mt-3" as={Row}>
          <Form.Label column sm={1}>Search:</Form.Label>
          <Col sm={11}>
            <Form.Control type="text" placeholder="Search" 
              value={filter} onChange={({ target }) => setFilter(target.value)}/>
          </Col>
        </Form.Group>
      </Form>
      <ListGroup>
        {filteredDesigns.map(d => (
          <ListGroup.Item key={d.id}>
            <Link to={`/designs/${d.id}`}>{d.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default DesignsListPage;

