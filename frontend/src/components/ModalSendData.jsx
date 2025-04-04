import { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import filter from "leo-profanity";

import { Button, Form, Modal } from "react-bootstrap";

const ModalSendData = ({ channels, handleSubmit, show, handleClose, type }) => {
  const { t } = useTranslation();

  const modalRef = useRef(null);
  useEffect(() => {
    if (show && modalRef.current) {
      modalRef.current.select();
    }
  }, [show]);

  filter.add(filter.getDictionary("ru"));

  const schema = yup.object({
    name: yup
      .string()
      .min(3, t("validation.channelsValidation.length"))
      .max(20, t("validation.channelsValidation.length"))
      .required(t("validation.required"))
      .test(
        "is name uniq",
        t("validation.channelsValidation.duplicate"),
        (val) => !channels.some(({ name }) => name === val),
      )
  });
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values) => {
      const name = filter.clean(values.name);
      try {
        await handleSubmit({ name });
      } catch (err) {
        console.log("err", err.message);
      }
    },
  });

  const inputClasses =
    formik.touched.name && formik.errors.name
      ? "is-invalid p-2 ps-1 border rounded-2 mb-2"
      : "p-1 ps-2 border rounded-2 mb-3";

  const title = `modal.${type}`;

  return (
    <>
      <Modal show={show} size="lg" centered onHide={handleClose}>
        <Modal.Header closeButton className="text-center">
          <Modal.Title className="w-100">{t(title)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            className="py-1 d-flex flex-wrap justify-content-between"
            onSubmit={formik.handleSubmit}
          >
            <Form.Group className="mb-3 w-100" controlId="channel">
              <Form.Control
                type="text"
                name="name"
                aria-label=""
                className={inputClasses}
                onChange={formik.handleChange}
                value={formik.values.name}
                ref={modalRef}
              />
              <Form.Label className="visually-hidden">{t("channel.channelName")}</Form.Label>
              {formik.touched.name && formik.errors.name ? (
                <div className="text-danger w-100">{formik.errors.name}</div>
              ) : null}
          </Form.Group>
            <Button
              variant="secondary"
              type="reset"
              onClick={() => {
                formik.resetForm();
                handleClose();
              }}
            >
              {t("modal.cancelButton")}
            </Button>
            <Button variant="primary" type="submit">
              {t("modal.submit")}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalSendData;
