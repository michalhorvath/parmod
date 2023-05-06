import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const WelcomePage = () => {
  return (
    <Container>
      <h1 className="m-2">Welcome to Parmod</h1>
      <div>
        Parmod is web application for sharing parametric 3D models made in OpenSCAD.
      </div>
      <div>
        As a User you can browse designs and generate model suited exactly for your your needs.
      </div>
      <div>
          As a Designer you can share your work with public.
      </div>
      <div>
          Please continue by <Link to="/register">registering</Link> or <Link to="/login">logging in</Link>.
      </div>
    </Container>
  );
};

export default WelcomePage;
