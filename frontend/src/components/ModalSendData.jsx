import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form } from 'react-bootstrap';

import Modal from 'react-bootstrap/Modal';


const ModalSendData = ({ channels, handleSubmit, show , handleClose}) => {


  const schema = yup.object({
    name: yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .required()
      .test('is name uniq', 'channel already exist', (val) => !channels.some(({ name }) => name === val)),
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

  return (
    <>
      <Modal show={show} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton className='text-center'>
          <Modal.Title className='w-100'>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate className='py-1 d-flex flex-wrap justify-content-between' onSubmit={formik.handleSubmit}>
            <Form.Control
              type='text'
              name="name"
              aria-label=""
              placeholder="Введите smth."
              className={inputClasses}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-danger w-100">{formik.errors.name}</div>
            ) : null}
            <Button variant="secondary" type='reset' className='' onClick={() => {formik.resetForm(); handleClose()}}>
              Reset
            </Button>
            <Button variant="primary" type='submit' className='' disabled={!formik.isValid}>
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSendData;