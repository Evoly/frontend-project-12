import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import useAuth from '../hooks';

import { userRoutes } from '../api/routes';
import api from '../api/requests';

import Login from '../components/Login';

const LoginPage = () => {
  const [isLoginFailed, setLoginFailed] = useState(false);
  const [isSubmitted, setSetsubmitted] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();  // todo

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setSetsubmitted(true);
      try {
        const res = await api('post', userRoutes.loginPath(), values);
        console.log('res login', res)
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
