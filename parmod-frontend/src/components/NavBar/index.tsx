import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

import { LoggedUser } from '../../types';
import NavBarUser from './NavBarUser';

interface Props {
  user : LoggedUser
}

const NavBar = ({ user }: Props) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="./">Parmod</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="./">Home</Nav.Link>
          <Nav.Link as={Link} to="./best-designs">Best</Nav.Link>
          <Nav.Link as={Link} to="./recent-designs">Recent</Nav.Link>
          <Nav.Link as={Link} to="./add-design">Add</Nav.Link>
        </Nav>
        <Nav>
          <NavBarUser user={user}/>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
