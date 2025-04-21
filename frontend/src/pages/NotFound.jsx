import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { pagesRoutes } from "../api/routes";

const NotFound = () => (
  <main className="container-fluid h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col sm={12} md={8} lg={5} className="text-center">
        <img
          className="img-fluid h-25"
          src="./public/404.svg"
          alt="страница не найдена"
        />
        <h1 className="text-muted">Страница не найдена</h1>
        <p>
          {" "}
          Но вы можете перейти
          <Link to={pagesRoutes.chat()}> на главную страницу</Link>
        </p>
      </Col>
    </Row>
  </main>
);

export default NotFound;
