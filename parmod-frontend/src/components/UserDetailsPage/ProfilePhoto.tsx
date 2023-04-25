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
        rounded width='600' height='400'
        src={toImageSrc(user.profilePhoto)}
      />
    );
  }
  return (<div>no profile photo</div>);
};

export default ProfilePhoto;
