import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from './locales/index.js';

import useAuth from './hooks/index.js';
import AuthContext from './context/index.js';

import Header from './components/Header';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import NotFound from './pages/NotFound';
import ChatPage from './pages/ChatPage';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const logIn = () => setLoggedIn(true);

  const addUser = (currentUser) => setUser(currentUser);
  console.log('user', user)
  const getUser = () => user;

  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut, addUser, getUser }}>
      {children}
    </AuthContext.Provider>
  )
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();

  return auth.loggedIn ? children : <Navigate to="/login" />
}
/*
i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'ru',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

*/
const App = () => {
  return (
    <AuthProvider>
      <>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path='/' element={(<PrivateRoute><ChatPage /></PrivateRoute>)} />
            <Route path='login' element={<LoginPage />} />
            <Route path='signup' element={<SignupPage />} />            
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    </AuthProvider >
  )
}

export default App

/*
todo:
element={<Navigate to="/" replace />}
To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
*/
