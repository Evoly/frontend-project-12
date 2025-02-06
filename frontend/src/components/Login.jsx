import { Link } from 'react-router-dom';

import { Row, Col, Form, Button } from 'react-bootstrap';

const Login = ({ props }) => {
  const { isLoginFailed, isSubmitted, formik } = props;
  
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
              <Form className='mb-4' onSubmit={formik.handleSubmit}>
                  <Form.Group className="form-floating mb-3" controlId="username">
                  <Form.Control
                      type = 'text'
                      className={isLoginFailed && isSubmitted ? 'is-invalid' : ''}
                      placeholder="Ваш ник"
                      name="username"
                      autoComplete="username"
                      required=""
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />                
                    <Form.Label>Ваш ник</Form.Label>
                  </Form.Group>
                  <Form.Group className="form-floating mb-4" controlId="password">
                  <Form.Control
                      type='password'
                      className={isLoginFailed && isSubmitted ? 'is-invalid' : ''}
                      placeholder="Пароль"
                      name="password"
                      autoComplete="current-password"
                      required=""
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />    
                    <Form.Label>Пароль</Form.Label>
                    {isLoginFailed && isSubmitted ? (<div className="invalid-tooltip">Неверные имя пользователя или пароль</div>) : null}
                  </Form.Group>
                  <Button className='w-100 mb-3 btn btn-primary' type="submit">Войти</Button>
                {isLoginFailed && <div>the username or password is incorrect.</div>}
                </Form>
            </div>
            <div className='col-12 shadow-sm text-center p-3 bg-light'>
              <span>Нет аккаунта? </span>
              <Link to="/signup"> Регистрация</Link>
            </div>

          </div>
        </Col>
      </Row>
    </main>
  )
};

export default Login;
