import { Row, Col, Form, Button } from 'react-bootstrap';

const Login = () => {

  return (
    <main className='container-fluid h-100'>
      <Row className='row justify-content-center align-content-center h-100'>
        <Col className='col-12 col-md-8 '>
          <div className='shadow-sm row ' style={{ backgroundColor: 'var(--bs-body-bg)'}}>
            <div className='d-flex col-12 col-md-6 justify-content-center align-content-center p-5'>
              <img className="rounded-circle" src="./public/img-1.jpg" alt="Войти" />
            </div>
            <div className='col-12 col-md-6 mt-3 mt-md-0 text-center p-4'>
              <h1>Войти</h1>
              <Form className='mb-4'>
                <Form.Group className="form-floating mb-3" controlId="username">                  
                  <Form.Control type="text" className="form-control" placeholder="Ваш ник" name="username" autoComplete="username" required="" />
                  <Form.Label className="form-label">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control name="password" autoComplete="current-password" required=""
                    placeholder="Пароль" type="password" className="form-control" />
                  <Form.Label className="form-label">Пароль</Form.Label>
                </Form.Group>
                <Button className='w-100 mb-3 btn btn-primary' type="submit">Войти</Button>
              </Form>
            </div>
            <div className='col-12 shadow-sm text-center p-3 bg-light'>
              <span>Нет аккаунта? </span>
              <a href="/signup"> Регистрация</a>
            </div>

          </div>
        </Col>
      </Row>
    </main>
  )
};

export default Login;
// var(--bs-body-bg)