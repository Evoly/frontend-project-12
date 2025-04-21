import { Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks";
import { pagesRoutes } from "../api/routes";

const RenderLogOut = () => {
  const auth = useAuth();

  return (
    <Button type="button" className="btn-primary" onClick={auth.logOut}>
      Выйти
    </Button>
  );
};

const Header = () => {
  const auth = useAuth();

  return (
    <header className="shadow-sm bg-white ">
      <Navbar className=" navbar-expand-lg container justify-content-between">
        <Link to={pagesRoutes.chat()} className="navbar-brand">
          Hexlet Chat
        </Link>
        {auth.loggedIn && <RenderLogOut />}
      </Navbar>
    </header>
  );
};

export default Header;
