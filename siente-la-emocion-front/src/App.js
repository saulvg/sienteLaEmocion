import { Route, Routes, BrowserRouter } from 'react-router-dom';

/**
 * ###########
 * ## Pages ##
 * ###########
 */
import Footer from './components/Footer/Footer';
import CompanyForm from './pages/companyForm/companyForm';
import HomePage from './pages/homePage/HomePage';
import Register from './pages/Register';
import Experience from './pages/Experience';
import ListaActividades from './pages/listaActividades/ListaActividades';
import LoginPage from './pages/LoginPage';
import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useSessionStorage';

//Componente para envolver a toda la aplicacion con un contexto para que este dispnible en toda la aplicacion de manera implicita el valro de token
export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  //importamos e utilizamos el customHook de 'useLocalStorage' pasandole como parametro el nombre que queramos que tenga esto qua vamos a guardar en el local storage
  const [user, setUser] = useState(null);
  const [token, setToken] = useLocalStorage('token');

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<HomePage />} />
            <Route path='/search' element={<div>{/* <Buscador /> */}</div>} />
            <Route
              path='/contact'
              element={<div>{/* <Contactanos /> */}</div>}
            />
            <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
            <Route path='/register' element={<div>{<Register />}</div>} />
            <Route path='/login' element={<div>{<LoginPage />}</div>} />
            <Route path='/experience' element={<div>{<Experience />}</div>} />
            <Route
              path='/listaActividades'
              element={
                <div>
                  <ListaActividades />
                </div>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/search' element={<div>{/* <Buscador /> */}</div>} />
          <Route path='/contact' element={<div>{/* <Contactanos /> */}</div>} />
          <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
          <Route
            path='/register-login'
            element={<div>{/* <Register-Login /> */}</div>}
          />
          <Route path='/experiences' element={<CompanyForm />} />
          <Route
            path='/listaActividades'
            element={
              <div>
                <ListaActividades />
              </div>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
