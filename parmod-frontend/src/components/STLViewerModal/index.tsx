import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Buffer } from 'buffer';
import {StlViewer} from 'react-stl-viewer';

import { Model } from '../../types';

interface Props{
    model: Model | null,
    show: boolean,
    onHide: () => void,
}

const STLViewerModal = ({model, show, onHide}: Props) => {
  if (!model){
    return null;
  }

  const style = {
    width: '100%',
    height: '50vh',
    backgroundColor: '#AAAAAA'
  };

  const buffer = Buffer.from(model.modelFile.data.data);
  const blob = new Blob([buffer]);
  const url =  URL.createObjectURL(blob);

  return (
    <Modal size="lg" centered show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Model Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {url ? 
          <StlViewer
            style={style}
            orbitControls
            shadows
            url={url}
            modelProps={{
              color: '#3d0d8e'
            }}
          />
          : <div>loading</div>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default STLViewerModal;
