import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useState } from 'react'

import Login from './components/Login';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import Header from './components/Header';

function App() {
  //  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
      <Routes>
        <Route path='/' element={<Navigate to="login"/>} />
        <Route path='login' element={<Login />} />        
        <Route path='signup' element={<Signup />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>  
  )
}

export default App

/*
element={<Navigate to="/" replace />}
To keep the history clean, you should set replace prop. This will avoid extra redirects after the user click back.
*/
