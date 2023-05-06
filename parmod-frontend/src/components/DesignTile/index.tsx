import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import { DesignPreview } from '../../types';
import { toImageSrc } from '../../utils';
import Blank from '../../images/blank.png';

interface Props{
    design: DesignPreview,
}

const DesignTile = ( { design } : Props ) => {

  return (
    <Card style={{ width: '300px' }}>
      <Link to={`/design/${design.id}`}>
        {design.photo ? 
          <Card.Img variant="top" 
            height="200px" width="300px"
            src={toImageSrc(design.photo)} /> : 
          <Card.Img variant="top"
            height="200px" width="300px"
            // eslint-disable-next-line
                    src={Blank}/>}
      </Link>
      <Card.Body>
        <Card.Title>
          <Link to={`/design/${design.id}`}>{design.title}</Link>
        </Card.Title>
        <Card.Text>
          <span>Likes: {design.likes.length}</span><br/>
          <span>Comments: {design.comments.length}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DesignTile;
