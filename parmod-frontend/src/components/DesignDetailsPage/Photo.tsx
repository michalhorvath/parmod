import React from 'react';
import Image from 'react-bootstrap/Image';

import { Design } from '../../types';
import { toImageSrc } from '../../utils';

interface Props{
    design: Design
}

const Photo = ({design}: Props) => {
  if (design.photo) {
    return (
      <Image
        rounded width='200' height='200'
        src={toImageSrc(design.photo)}
      />
    );
  }
  return (<div>no photo</div>);
};

export default Photo;
