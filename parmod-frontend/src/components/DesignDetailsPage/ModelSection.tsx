import React, {useState} from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import { Model, ModelFileStatus } from '../../types';
import ModelBlock from './ModelBlock';

interface Props{
    models: Model[],
    setShowGenerateModel: React.Dispatch<React.SetStateAction<boolean>>,
    reloadModels: () => void
}

const ModelSection = ({models, setShowGenerateModel, reloadModels}: Props) => {
  const [isRendering, setIsRendering] = useState<boolean>(false);

  if (models.some(m => m.modelFile.status === ModelFileStatus.RENDERING) 
      && !isRendering) {
    setIsRendering(true);
    setTimeout(() => {
      setIsRendering(false);
      reloadModels();
    }, 7500);
  }

  return (
    <Container fluid>
      <h3 className="m-2">Generated models:</h3>
      <Button variant="primary" onClick={() => setShowGenerateModel(true)}>
            Generate New Model
      </Button>
      <ul>
        {models.map((m, i) => (<ModelBlock key={i} model={m} />))}
      </ul>
    </Container>
  );
};

export default ModelSection;
