// ## Style ##
import './App.css';
/**
 * ###########
 * ## React ##
 * ###########
 */
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useSessionStorage';

/**
 * ################
 * ## Components ##
 * ################
 */
import Footer from './components/Footer/Footer';
import ModalContactanos from './components/modalContactanos/ModalContactanos';
import Review from './components/Review/Review';
import EditPassword from './components/Forms/EditPassword';

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
import { ReviewPage } from './pages/reviewPage/reviewPage';
import ProfilePage from './pages/perfil/ProfilePage';
import BookingExperience from './pages/BookingExperience/BookingExperience';
import ExperiencePhoto from './pages/experiencePhoto/ExperiencePhoto';
import EditExperience from './pages/editExperience/EditExperience';
import Buscador from './pages/buscador/Buscador';
import LoginPage from './pages/Forms/Login';

//Componente para envolver a toda la aplicacion con un contexto para que este dispnible en toda la aplicacion de manera implicita el valro de token
export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  //importamos e utilizamos el customHook de 'useLocalStorage' pasandole como parametro el nombre que queramos que tenga esto qua
  //vamos a guardar en el local storage
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
            {/**
             * ##############
             * ## Usuarios ##
             * ##############
             */}
            <Route path='/' element={<HomePage />} />
            <Route path='/contact' element={<ModalContactanos />} />
            <Route
              path='/perfil'
              element={
                <div>
                  <ProfilePage />
                </div>
              }
            />
            <Route path='/search' element={<Buscador />} />
            <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/editPassword' element={<EditPassword />} />
            <Route
              path='/experiences/:idExperience/reviews'
              element={<ReviewPage />}
            />
            <Route
              path='/experiences/:idExperience/votes'
              element={<Review />}
            />
            <Route
              path='/experiences/:idExperience/booking'
              element={<BookingExperience />}
            />
            <Route path='/listaActividades' element={<ListaActividades />} />

            {/**
             * ############
             * ## Admins ##
             * ############
             */}
            <Route path='/experiences/:idExperience' element={<Experience />} />
            <Route
              path='/experiences/:idExperience/photos'
              element={<ExperiencePhoto />}
            />

            <Route path='/experiences' element={<CompanyForm />} />
            <Route
              path='/editExperiences/:idExperience'
              element={<EditExperience />}
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
