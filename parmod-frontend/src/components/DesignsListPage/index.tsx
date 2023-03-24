import { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';

import { DesignPreview } from '../../types';
import designService from '../../services/designs';

const DesignsListPage = () => {
  const [designs, setDesigns] = useState<DesignPreview[]>([]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const designs = await designService.getAll();
      setDesigns(designs);
    };
    void fetchPatientList();
  }, []);

  return (
    <Container>
      <ListGroup>
        {designs.map(d => (
          <ListGroup.Item key={d.id}>{d.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default DesignsListPage;

