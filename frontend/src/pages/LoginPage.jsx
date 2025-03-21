import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import useAuth from "../hooks";
import { userRoutes } from "../api/routes";
import api from "../api/requests";

import Login from "../components/Login";

const LoginPage = () => {
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const { t } = useTranslation();

  const schema = yup.object({
    username: yup.string().required(t("validation.required")),
    password: yup.string().required(t("validation.required")),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values) => {
      setIsAuthFailed(false);
      auth.updateAuthError(null);
      try {
        const res = await api("post", userRoutes.loginPath(), values);
        localStorage.setItem("userId", JSON.stringify(res.data));
        const { username } = values;
        auth.logIn();
        auth.addUser({ username });
        navigate("/");
      } catch (err) {
        setIsAuthFailed(true);
        const authError = err.status ?? err.code;
        auth.updateAuthError(authError);
        const test = t(`errors.900`) ?? "";
        console.log("test:", test);

        if (authError === 401) return;
        toast.error(t([`errors.${authError}`, `errors.default`])); // TODO move to api ?
      }
    },
  });

  return <Login props={{ isAuthFailed, formik, err: auth.authError }}></Login>;
};

export default LoginPage;
