import React from 'react';
import Image from 'react-bootstrap/Image';

import { User } from '../../types';
import { toImageSrc } from '../../utils';

interface Props{
    user: User
}

const ProfilePhoto = ({user}: Props) => {
  if (user.profilePhoto) {
    return (
      <Image
        rounded width='200' height='200'
        src={toImageSrc(user.profilePhoto)}
      />
    );
  }
  return (<div>no profile photo</div>);
};

export default ProfilePhoto;
