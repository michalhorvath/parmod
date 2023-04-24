import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

import ModelService from '../../services/models';
import { Design, ParameterValueFormValues } from '../../types';

interface Props{
    design: Design,
    show: boolean,
    onHide: () => void,
}

const GenerateNewModelModal = ({design, show, onHide}: Props) => {
  const [parameterValues, setParameterValues] 
        = useState<ParameterValueFormValues[]>(
          design.parameters.map(p => { return {
            name: p.variable,
            value: p.defaultValue
          };}));
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      const model = await ModelService.create({
        design: design.id,
        parameterValues
      });
      onHide();
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Generate model</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-md-center">
            <Col>
              {error ? (
                <Alert variant="danger">
                  {error}
                </Alert>
              ) : undefined }
            </Col>
          </Row>
          <Form.Label>Parameter values:</Form.Label>
          {parameterValues.length === 0 ? 
            (<div>this design has no parameters</div>) : null}
          {parameterValues.map((p, i) => (
            <Row className="justify-content-md-left align-items-md-end mb-3" key={i}>
              <Col xs={'auto'}>
                <Form.Label>{design.parameters[i].name}</Form.Label>
              </Col>
              <Col>
                <Form.Control placeholder="Value" 
                  value={parameterValues[i].value}
                  onChange={({ target}) => {
                    const parameterValuesCopy = parameterValues.map(p => ({...p})); 
                    parameterValuesCopy[i].value = target.value;
                    setParameterValues(parameterValuesCopy);
                  }}/>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
            Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
            Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default GenerateNewModelModal;
