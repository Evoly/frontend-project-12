import { Navbar } from 'react-bootstrap';

const Header = () => (
  <header className='shadow-sm bg-white '>
    <Navbar className=' navbar navbar-expand-lg navbar-light container'>
      <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>   
    </Navbar>
  </header>
);

export default Header;