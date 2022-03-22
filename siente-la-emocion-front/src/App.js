import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useSessionStorage';

/**
 * ###########
 * ## Components ##
 * ###########
 */
import Footer from './components/Footer/Footer';

/**
 * ###########
 * ## Pages ##
 * ###########
 */
import CompanyForm from './pages/companyForm/CompanyForm';
import HomePage from './pages/homePage/HomePage';
import Register from './pages/Forms/Register';
import Experience from './pages/Experience';
import ListaActividades from './pages/listaActividades/ListaActividades';
import PruebaBooking from './pages/pruebaBooking/PruebaBooking'; /* 
import ModalContactanos from './components/modalContactanos/ModalContactanos';
import UpExperiencesPhotos from './pages/upExperiencesPhotos/UpExperiencesPhotos'; */
import Login from './pages/Forms/Login';
import DeleteAccount from './components/Forms/DeleteAccount';
import BookingExperience from './pages/BookingExperience/BookingExperience';
import EditPassword from './components/Forms/EditPassword';

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
            {/* <Route path='/contact' element={<ModalContactanos />} /> */}
            <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
            <Route path='/register' element={<div>{<Register />}</div>} />
            <Route path='/login' element={<div>{<Login />}</div>} />
            <Route path='/delete' element={<div>{<DeleteAccount />}</div>} />
            <Route
              path='/editPassword'
              element={<div>{<EditPassword />}</div>}
            />
            <Route
              path='/booking'
              element={<div>{<BookingExperience />}</div>}
            />
            <Route
              path='/experiences/:idExperience'
              element={<div>{<Experience />}</div>}
            />
            <Route
              path='/listaActividades'
              element={
                <div>
                  <ListaActividades />
                </div>
              }
            />
            <Route path='/experiences' element={<CompanyForm />} />
            <Route
              path='/experiences/:idExperience/booking'
              element={<PruebaBooking />}
            />
          </Routes>
          <Footer />
          <div id='modal-bg'>
            <div id='modal-fg'></div>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
