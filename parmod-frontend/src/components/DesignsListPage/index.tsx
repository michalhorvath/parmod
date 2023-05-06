import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DesignPreview } from '../../types';
import designService from '../../services/designs';
import DesignTile from '../DesignTile';

interface Props{
  type: 'best' | 'recent'
}

const DesignsListPage = ({ type }: Props) => {
  const [filter, setFilter] = useState<string>('');
  const [designs, setDesigns] = useState<DesignPreview[]>([]);

  useEffect(() => {
    const fetchDesignList = async () => {
      const designs = await designService.getAll();
      setDesigns(designs);
    };
    void fetchDesignList();
  }, []);

  let filteredDesigns = filter === '' ?
    designs :
    designs.filter(d => d.title.includes(filter));

  if (type == 'recent'){
    filteredDesigns = filteredDesigns.sort((x, y) => {
      if (x.publishedDate < y.publishedDate) {
        return 1;
      }
      if (x.publishedDate > y.publishedDate) {
        return -1;
      }
      return 0;
    });
  }
  if (type == 'best'){
    filteredDesigns = filteredDesigns.sort((x, y) => {
      if (x.likes.length < y.likes.length) {
        return 1;
      }
      if (x.likes.length > y.likes.length) {
        return -1;
      }
      return 0;
    });
  }

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
      <Row xs={1} md={4} className="g-4">
        {filteredDesigns.map(d => (
          <Col key={d.id}>
            <DesignTile design={d} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DesignsListPage;

