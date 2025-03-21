import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

const ModalConfirm = ({ handleSubmit, show, handleClose }) => {
  const { t } = useTranslation();
    const modalRef = useRef(null);
    useEffect(() => {
      console.log('modalRef.current', modalRef.current)
      if (show && modalRef.current) {
        modalRef.current.focus();
      }
    }, [show]);

  return (
    <>
      <Modal show={show} size="sm" centered onHide={handleClose}>
        <Modal.Header closeButton className='text-center'>
          <Modal.Title className='w-100'>{t('modal.removeChannel')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center'>{t('modal.confirmText')}</div>

        </Modal.Body>
        <Modal.Footer>
          <Form noValidate className='py-1 d-flex flex-wrap justify-content-end gap-3' onSubmit={(e) => { e.preventDefault(); handleSubmit()}}>
            <Button variant="secondary" type='reset' onClick={handleClose}>
              {t('modal.cancelButton')}
            </Button>
            <Button variant="primary" type='submit' ref={modalRef}>
              {t('modal.removeButton')}
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalConfirm;
