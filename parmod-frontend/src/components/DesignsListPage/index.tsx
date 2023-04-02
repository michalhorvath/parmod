import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { DesignPreview } from '../../types';
import designService from '../../services/designs';

const DesignsListPage = () => {
  const [designs, setDesigns] = useState<DesignPreview[]>([]);

  useEffect(() => {
    const fetchDesignList = async () => {
      const designs = await designService.getAll();
      setDesigns(designs);
    };
    void fetchDesignList();
  }, []);

  return (
    <Container>
      <ListGroup>
        {designs.map(d => (
          <ListGroup.Item key={d.id}>
            <Link to={`/designs/${d.id}`}>{d.title}</Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default DesignsListPage;

