import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

import DesignService from '../../services/designs';
import ImageService from '../../services/images';
import { DesignFormValues, ParameterFormValues, Design } from '../../types';

const EditDesignPage = () => {
  const { id } = useParams();
  const designId = id;
  const [design, setDesign] = useState<Design>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [parameters, setParameters] = useState<ParameterFormValues[]>([]);
  const [error, setError] = useState<string>();
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesign = async () => {
      if (!designId){
        return;
      }
      const design = await DesignService.get(designId);
      setDesign(design);
    };
    void fetchDesign();
  }, [designId]);

  useEffect(()=> {
    if (design){
      setTitle(design.title);
      setDescription(design.description);
      setCode(design.code);
      setParameters(design.parameters);
    }
  }, [design]);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    try {
      event.preventDefault();
      if(!design){
        return;
      }

      let photo = null;
      if (photoFile){
        photo = await ImageService.upload(photoFile);
      }

      const updateDesign: DesignFormValues = {
        title, description, code, parameters
      };
      if (photo){
        updateDesign.photo = photo.id;
      }

      await DesignService.update(design.id, updateDesign);

      navigate(`/design/${design.id}`);
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

  const handleAddParemeter = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setParameters(parameters.concat({
      name: '',
      variable: '',
      defaultValue: '',
      type: 'string'
    }));
  };

  const handleRemoveParameter = (event: React.SyntheticEvent, i: number) => {
    event.preventDefault();
    const parametersCopy = parameters.map(p => ({...p}))
      .filter((p,j) => j !== i); 
    setParameters(parametersCopy);
  };

  const handlePhotoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length >= 1){
      const file = e.target.files[0];
      setPhotoFile(file);
    }
  };

  return (
    <Container>
      <h2 className="m-2">Edit design</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="justify-content-md-center">
          <Col>
            {error ? (
              <Alert variant="danger">
                {error}
              </Alert>
            ) : undefined }
            <Form.Group className="mb-3">
              <Form.Label>Title:</Form.Label>
              <Form.Control type="text" placeholder="Enter title" 
                value={title} onChange={({ target }) => setTitle(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Photo:</Form.Label>
              <Form.Control type="file"
                accept=".jpg,.png"  multiple={false}
                onChange={handlePhotoFileChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" 
                value={description} onChange={({ target }) => setDescription(target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>OpenSCAD code:</Form.Label>
              <Form.Control as="textarea" rows={20} placeholder="Enter code" 
                value={code} onChange={({ target }) => setCode(target.value)}/>
            </Form.Group>
          </Col>
        </Row>
        <Form.Label>Parameters:</Form.Label>
        {parameters.map((p, i) => (
          <Row className="justify-content-md-left mb-3" key={i}>
            <Col xs={4}>
              <Form.Control placeholder="Name" 
                value={parameters[i].name}
                onChange={({ target}) => {
                  const parametersCopy = parameters.map(p => ({...p})); 
                  parametersCopy[i].name = target.value;
                  setParameters(parametersCopy);
                }}/>
            </Col>
            <Col xs={4}>
              <Form.Control placeholder="Variable Name" 
                value={parameters[i].variable}
                onChange={({ target}) => {
                  const parametersCopy = parameters.map(p => ({...p})); 
                  parametersCopy[i].variable = target.value;
                  setParameters(parametersCopy);
                }}/>
            </Col>
            <Col>
              <Form.Control placeholder="Default Value" 
                value={parameters[i].defaultValue}
                onChange={({ target}) => {
                  const parametersCopy = parameters.map(p => ({...p})); 
                  parametersCopy[i].defaultValue = target.value;
                  setParameters(parametersCopy);
                }}/>
            </Col>
            <Col xs={1}>
              <Button variant="outline-danger"
                onClick={(e) => handleRemoveParameter(e,i)}>
                remove
              </Button>
            </Col>
          </Row>
        ))}
        <Row className="justify-content-md-left mb-5">
          <Col>
            <Button variant="outline-secondary" onClick={handleAddParemeter}>
                add
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Col>
            <Form.Group className="mb-3">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditDesignPage;
