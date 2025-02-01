import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useState } from 'react';
import useAuth from './hooks/index.js';
import AuthContext from './context/index.js';

import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Header from './components/Header';
import ChatPage from './components/Chat';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
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
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />            
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    </AuthProvider >
  )
}

export default App

/*
element={<Navigate to="/" replace />}
To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
*/
