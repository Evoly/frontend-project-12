import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';

import useAuth from './hooks/index.js';
import AuthContext from './context/index.js';
import { userRoutes } from './api/routes.js';

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
