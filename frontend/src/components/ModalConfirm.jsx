import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const ModalConfirm = ({ handleSubmit, show, title, handleClose }) => {

  return (
    <>
      <Modal show={show} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton className='text-center'>
          <Modal.Title className='w-100'>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div> are you sure ?</div>
          <Form noValidate className='py-1 ' onSubmit={handleSubmit}>
            <Button variant="primary" type='submit' className='d-block m-auto' >
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalConfirm;
