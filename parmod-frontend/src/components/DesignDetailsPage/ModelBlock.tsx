import React from 'react';
import Button from 'react-bootstrap/Button';
import { Buffer } from 'buffer';

import { Model, ModelFileStatus } from '../../types';

interface Props{
    model: Model,
    reloadModels: () => void
}

const ModelBlock = ({ model, reloadModels }: Props) => {
  if (model.modelFile.status === ModelFileStatus.RENDERING) {
    setTimeout(() => {
      reloadModels();
    }, 10000);
  }

  const download = () => {
    const buffer = Buffer.from(model.modelFile.data.data);
    const blob = new Blob([buffer]);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = `${model.id}.stl`;
    a.target = '_self';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <li>{model.id} 
      <Button 
        variant={model.modelFile.status === ModelFileStatus.FAILED ?
          'outline-danger' : 'outline-primary'}
        size="sm" 
        disabled={model.modelFile.status !== ModelFileStatus.OK}
        onClick={download}>
        {(() => {switch (model.modelFile.status){
        case ModelFileStatus.OK:
          return 'download';
        case ModelFileStatus.RENDERING:
          return 'rendering...';
        case ModelFileStatus.FAILED:
          return 'failed';
        }})()}
      </Button></li>
  );
};

export default ModelBlock;
