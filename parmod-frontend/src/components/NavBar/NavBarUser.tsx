import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import { LoggedUser } from '../../types';

interface Props {
  user : LoggedUser
}

const NavBarUser = ({ user }: Props) => {
  if (user){
    return (
      <>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user.username}
          </Navbar.Text>
        </Navbar.Collapse>
        <Nav.Link href="./logout">
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
        <Nav.Link href="./login">
          <Button variant="light">Login</Button>
        </Nav.Link>
      </>
    );
  }
};

export default NavBarUser;
