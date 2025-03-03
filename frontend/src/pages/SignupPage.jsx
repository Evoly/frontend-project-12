import { useState } from 'react';
import { Field, Formik } from 'formik';
import * as yup from 'yup';

import Signup from '../components/Signup';

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

const SignupPage = () => {
  const [isSubmit, setSubmit] = useState(false);

  return <Signup props={ isSubmit }></Signup>
};

export default SignupPage;
