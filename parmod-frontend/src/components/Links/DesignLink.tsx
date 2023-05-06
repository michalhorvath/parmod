import { Link } from 'react-router-dom';

import { DesignShort } from '../../types';

interface Props{
    design: DesignShort | null,
}

const DesignLink = ({ design }: Props) => {
  if (!design){
    return (
      <span>
        [deleted design]
      </span>
    );
  }

  return (
    <Link to={`/design/${design.id}`}>
      {design.title}
    </Link>
  );
};

export default DesignLink;
