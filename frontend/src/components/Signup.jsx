import { Row, Col, Form, Button } from 'react-bootstrap';
import { Field, Formik } from 'formik';
import * as yup from 'yup';

const SignupSchema = yup.object({
  username: yup.string()
    .min(3, 'От 3 до 20 символо')
    .max(20, 'От 3 до 20 символо')
    .required('Обязательное поле'),
  password: yup.string()
    .min(6, 'Не менее 6 символов')
    .required('Обязательное поле'),
  confirmPassword: yup.string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать')
});

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
              <Formik
                initialValues={{ username: "", password: "", confirmPassword: ""}}
                validationSchema={SignupSchema}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form className='mb-4' noValidate>
                    <Form.Group className="form-floating mb-3" controlId="username">
                      <Field
                        type="text"
                        placeholder="От 3 до 20 символов"
                        name="username"
                        autoComplete="username"
                        required=""
                        className={errors.username && touched.username ? 'form-control is-invalid' : 'form-control'}
                        />
                      <Form.Label className="form-label">Имя пользователя</Form.Label>
                      {errors.username && touched.username ? (<div className="invalid-tooltip">{errors.username}</div>) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="password">
                      <Field placeholder="Не менее 6 символов" name="password"
                        aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password"
                        className={errors.password && touched.password ? 'form-control is-invalid' : 'form-control'}
                      />
                      <Form.Label className="form-label">Пароль</Form.Label>
                      {errors.password && touched.password ? (<div className="invalid-tooltip">{errors.password}</div>) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="confirmPassword">
                      <Field placeholder="Пароли должны совпадать" name="confirmPassword"
                        aria-describedby="passwordHelpBlock" required="" autoComplete="new-password" type="password"
                        className={errors.confirmPassword && touched.confirmPassword ? 'form-control is-invalid' : 'form-control'}
                      />
                      <Form.Label className="form-label">Подтвердите пароль</Form.Label>
                      {errors.confirmPassword && touched.confirmPassword ? (<div className="invalid-tooltip">{errors.confirmPassword}</div>) : null}
                    </Form.Group>
                    <Button className='w-100 mb-3 btn btn-primary' type="submit">Зарегистрироваться</Button>
                    <div>{JSON.stringify(errors)}</div>
                    <div>{JSON.stringify(touched)}</div>
                    <div>{errors.email}</div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  )
};

export default Signup;
