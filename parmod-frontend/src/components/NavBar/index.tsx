import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { LoggedUser, UserRole } from '../../types';
import NavBarUser from './NavBarUser';

interface Props {
  loggedUser : LoggedUser
}

const NavBar = ({ loggedUser }: Props) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="./">Parmod</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="./">Home</Nav.Link>
          <Nav.Link as={Link} to="./best-designs">Best</Nav.Link>
          <Nav.Link as={Link} to="./recent-designs">Recent</Nav.Link>
          {loggedUser !== null && (loggedUser.role === UserRole.DESIGNER ||
            loggedUser.role === UserRole.MODERATOR || 
            loggedUser.role === UserRole.ADMIN) ?
            <Nav.Link as={Link} to="./add-design">Add</Nav.Link>
            : null
          }
        </Nav>
        <Nav>
          <NavBarUser loggedUser={loggedUser}/>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
