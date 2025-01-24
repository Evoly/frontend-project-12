import { Row, Col, Form, Button } from 'react-bootstrap';

const Signup = () => {

  return (
    <main className='container-fluid h-100'>
      <Row className='row justify-content-center align-content-center h-100'>
        <Col className='col-12 col-md-8 col-xxl-6'>
          <div className='shadow-sm row' style={{ backgroundColor: 'var(--bs-body-bg)' }}>
            <div className='d-flex col-12 col-md-6 justify-content-center align-content-center p-5'>
              <img className="rounded-circle" src="./public/img-1.jpg" alt="Войти" />
            </div>
            <div className='col-12 col-md-6 mt-3 mt-md-0 text-center p-4'>
              <h1>Регистрация</h1>
              <Form className='mb-4'>
                <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control type="text" className="form-control" placeholder="От 3 до 20 символов" name="username" autoComplete="username"
                    required="" value="" />
                  <Form.Label className="form-label">Имя
                    пользователя</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="password">
                  <Form.Control placeholder="Не менее 6 символов" name="password"
                    aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password"
                    className="form-control" value="" />
                  <Form.Label className="form-label">Пароль</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-3" controlId="confirmPassword">
                  <Form.Control placeholder="Пароли должны совпадать" name="confirmPassword"
                    aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password"
                    className="form-control" value="" />
                  <Form.Label  className="form-label">Подтвердите пароль</Form.Label>
                </Form.Group>
                <Button className='w-100 mb-3 btn btn-primary' type="submit">Зарегистрироваться</Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  )
};

export default Signup;
