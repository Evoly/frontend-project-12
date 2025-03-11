import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { Button, Form, Modal } from 'react-bootstrap';

const ModalSendData = ({ channels, handleSubmit, show , handleClose, type}) => {

  const { t } = useTranslation();

  const schema = yup.object({
    name: yup.string()
      .min(3, t('channelsValidation.length'))
      .max(20, t('channelsValidation.length'))
      .required(t('validation.required'))
      .test('is name uniq', t('channelsValidation.duplicate'), (val) => !channels.some(({ name }) => name === val)),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validateOnMount: true,
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values) => {
      try {
        await handleSubmit(values);    
      } catch (err) {
        console.log('err', err.message)
      }
    },
  });

  const inputClasses = formik.touched.name && formik.errors.name
    ? 'is-invalid p-2 ps-1 border rounded-2 mb-2'
    : 'p-1 ps-2 border rounded-2 mb-3';

  const title = `modal.${type}`; // todo

  return (
    <>
      <Modal show={show} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton className='text-center'>
          <Modal.Title className='w-100'>{t(title)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate className='py-1 d-flex flex-wrap justify-content-between' onSubmit={formik.handleSubmit}>
            <Form.Control
              type='text'
              name="name"
              aria-label=""
              className={inputClasses}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger w-100">{formik.errors.name}</div>
            ) : null}
            <Button variant="secondary" type='reset' onClick={() => {formik.resetForm(); handleClose()}}>
              {t('modal.cancelButton')}
            </Button>
            <Button variant="primary" type='submit' disabled={!formik.isValid}>
              {t('modal.submit')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSendData;