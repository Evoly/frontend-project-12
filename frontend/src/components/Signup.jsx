import { Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Signup = ({ props }) => {
  const { isLoginFailed, isSubmitted, formik } = props;
  const { t } = useTranslation();

  return (
    <main className='container-fluid h-100'>
      <Row className='row justify-content-center align-content-center h-100'>
        <Col className='col-12 col-md-8 col-xxl-6'>
          <div className='shadow-sm row' style={{ backgroundColor: 'var(--bs-body-bg)' }}>
            <div className='d-flex col-12 col-md-6 justify-content-center align-content-center p-5'>
              <img className="rounded-circle" src="./public/img-1.jpg" alt="Войти" />
            </div>
            <div className='col-12 col-md-6 mt-3 mt-md-0 text-center p-4'>
              <h1>{t('forms.registrationTitle')}</h1>
                  <Form className='mb-4' onSubmit={formik.handleSubmit}>
                    <Form.Group className="form-floating mb-3" controlId="username">
                      <Form.Control
                        type="text"
                        name="username"
                        autoComplete="username"
                        required=""
                        placeholder={t('forms.registrationName')}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                        className={formik.errors.username && formik.touched.username ? 'is-invalid' : ''}
                        />
                    <Form.Label className="form-label">{t('forms.registrationName')}</Form.Label>
                      {formik.errors.username && formik.touched.username ? (<div className="invalid-tooltip">{formik.errors.username}</div>) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="password">
                      <Form.Control
                        name="password"
                        aria-describedby="passwordHelpBlock"
                        required="" autoComplete="new-password"
                        type="password"
                        placeholder={t('forms.password')}
                        className={formik.errors.password && formik.touched.password ? 'is-invalid' : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    value={formik.values.password}
                      />
                  <Form.Label className="form-label">{t('forms.password')}</Form.Label>
                      {formik.errors.password && formik.touched.password ? (<div className="invalid-tooltip">{formik.errors.password}</div>) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-3" controlId="confirmPassword">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        aria-describedby="passwordHelpBlock" 
                        required="" autoComplete="new-password"
                        placeholder={t('forms.confirmPassword')}
                        className={formik.errors.confirmPassword && formik.touched.confirmPassword ? 'is-invalid' : ''}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                      />
                  <Form.Label className="form-label">{t('forms.confirmPassword')}</Form.Label>
                      {formik.errors.confirmPassword && formik.touched.confirmPassword ? (<div className="invalid-tooltip">{formik.errors.confirmPassword}</div>) : null}
                    </Form.Group>
                <Button className='w-100 mb-3 btn btn-primary' type="submit">{t('forms.registrationButton')}</Button>
                  </Form>
            </div>
          </div>
        </Col>
      </Row>
    </main>
  )
};

export default Signup;
