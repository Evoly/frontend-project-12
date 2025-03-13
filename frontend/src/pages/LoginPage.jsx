import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks';
import { userRoutes } from '../api/routes';
import api from '../api/requests';

import Login from '../components/Login';

const LoginPage = () => {
  const [isLoginFailed, setLoginFailed] = useState(false);
  const [isSubmitted, setSetsubmitted] = useState(false); // to do setSetsubmitted
  const navigate = useNavigate();
  const auth = useAuth();  // todo

  const { t } = useTranslation();

    const schema = yup.object({
      username: yup.string()
        .required(t('validation.required')),
      password: yup.string()
        .required(t('validation.required')),
    });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setSetsubmitted(true);
      try {
        const res = await api('post', userRoutes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(res.data));
        setLoginFailed(false);
        const { username } = values;
        auth.logIn();
        auth.addUser({ username });
        navigate('/');
      } catch (err) {
        setLoginFailed(true);
        console.log(err)
      }
    },
  });
  
  return (
    <Login props={{isLoginFailed, isSubmitted, formik}}></Login>
  )
};

export default LoginPage;
