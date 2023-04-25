import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Model } from '../../types';
import ModelBlock from './ModelBlock';

interface Props{
    models: Model[],
    setShowGenerateModel: React.Dispatch<React.SetStateAction<boolean>>,
    reloadModels: () => void
}

const ModelSection = ({models, setShowGenerateModel, reloadModels}: Props) => {
  return (
    <Container fluid>
      <h3 className="m-2">Generated models:</h3>
      <Button variant="primary" onClick={() => setShowGenerateModel(true)}>
            Generate New Model
      </Button>
      <ul>
        {models.map((m, i) => (<ModelBlock key={i} model={m} 
          reloadModels={reloadModels}/>))}
      </ul>
    </Container>
  );
};

export default ModelSection;
