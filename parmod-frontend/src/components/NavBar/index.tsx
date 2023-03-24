import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LoggedUser } from '../../types';
import NavBarUser from './NavBarUser';

interface Props {
  user : LoggedUser
}

const NavBar = ({ user }: Props) => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="./">Parmod</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="./">Home</Nav.Link>
          <Nav.Link href="./best-designs">Best</Nav.Link>
          <Nav.Link href="./recent-designs">Recent</Nav.Link>
          <Nav.Link href="./add-design">Add</Nav.Link>
        </Nav>
        <Nav>
          <NavBarUser user={user}/>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
