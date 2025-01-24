import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <header className='shadow-sm bg-white '>
    <Navbar className=' navbar navbar-expand-lg navbar-light container'>
      <Link to="/" className='navbar-brand'>Hexlet Chat</Link>   
    </Navbar>
  </header>
);

export default Header;