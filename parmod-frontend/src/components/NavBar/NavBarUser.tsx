import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import { LoggedUser } from '../../types';

interface Props {
  loggedUser : LoggedUser
}

const NavBarUser = ({ loggedUser }: Props) => {
  if (loggedUser){
    return (
      <>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link as={Link} to={`/user/${loggedUser.id}`}>{loggedUser.username}</Nav.Link>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="./logout">
          <Button variant="light">Logout</Button>
        </Nav.Link>
      </>
    );
  } else {
    return (
      <>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
                no user logged in
          </Navbar.Text>
        </Navbar.Collapse>
        <Nav.Link as={Link} to="./login">
          <Button variant="light">Login</Button>
        </Nav.Link>
      </>
    );
  }
};

export default NavBarUser;
