import { Link } from 'react-router-dom';

import { UserShort } from '../../types';

interface Props{
    user: UserShort | null,
}

const UserLink = ({ user }: Props) => {
  if (!user){
    return (
      <span>
        [deleted user]
      </span>
    );
  }

  return (
    <Link to={`/user/${user.id}`}>
      {user.username}
    </Link>
  );
};

export default UserLink;
