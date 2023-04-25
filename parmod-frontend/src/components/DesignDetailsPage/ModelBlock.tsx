import React from 'react';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import { Buffer } from 'buffer';

import { Model, ModelFileStatus } from '../../types';
import { toDate, toTime } from '../../utils';

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
  
  const modelDetailsPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Parameter values:</Popover.Header>
      <Popover.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {model.parameterValues.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.value}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Popover.Body>
    </Popover>
  );

  return (
    <li>{model.id} ({toTime(model.generatedDate)} - {toDate(model.generatedDate)})&nbsp;
      <Button 
        variant={model.modelFile.status === ModelFileStatus.FAILED ?
          'outline-danger' : 'outline-primary'}
        size="sm" 
        disabled={model.modelFile.status !== ModelFileStatus.OK}
        onClick={download}>
        {model.modelFile.status === ModelFileStatus.RENDERING ?
          (<Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />) : undefined}
        {(() => {switch (model.modelFile.status){
        case ModelFileStatus.OK:
          return 'download';
        case ModelFileStatus.RENDERING:
          return ' rendering...';
        case ModelFileStatus.FAILED:
          return 'failed';
        }})()}
      </Button>
      <OverlayTrigger trigger="click" placement="right" overlay={modelDetailsPopover}>
        <Button variant="link" size="sm">details</Button>
      </OverlayTrigger>
    </li>
  );
};

export default ModelBlock;
