import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks';
import { userRoutes } from '../api/routes';
import api from '../api/requests';

import Signup from '../components/Signup';

const SignupPage = () => {
  const [isSubmitted, setSubmitted] = useState(false);
  const [isRegistartionFailed, setRegistrationFailed] = useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  const { t } = useTranslation();

  const schema = yup.object({
    username: yup.string()
      .min(3, t('validation.signup.nameLength'))
      .max(20, t('validation.signup.nameLength'))
      .required(t('validation.required')),
    password: yup.string()
      .min(6, t('validation.signup.passwordLength'))
      .required(t('validation.required')),
    confirmPassword: yup.string()
      .required(t('validation.required'))
      .min(6, t('validation.signup.passwordLength'))
      .oneOf([yup.ref('password')], t('validation.signup.notConfirmPassword'))
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setSubmitted(true);
      try {
        const res = await api('post', userRoutes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        const { username } = values;
        auth.logIn();
        auth.addUser({ username });
        navigate('/');
      } catch (err) {
        setRegistrationFailed(true);
        console.log('err', err.message);
      }
    },
  });

  return <Signup props={{ isRegistartionFailed, isSubmitted, formik }}></Signup>
};

export default SignupPage;