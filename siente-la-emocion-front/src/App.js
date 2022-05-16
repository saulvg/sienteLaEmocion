// ## Style ##
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
/**
 * ###########
 * ## React ##
 * ###########
 */
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import { useLocalStorage } from './hooks/useSessionStorage';

/**
 * ################
 * ## Components ##
 * ################
 */
import Footer from './components/Footer/Footer';
import EditPassword from './components/Forms/EditPassword';
import ModalContactanos from './components/Modals/modalContactanos/ModalContactanos';

/**
 * ###########
 * ## Pages ##
 * ###########
 */
import CompanyForm from './pages/companyForm/CompanyForm';
import HomePage from './pages/homePage/HomePage';
import Register from './pages/Forms/Register';
import Experience from './pages/Experiences/Experience/Experience';
import ExperiencesList from './pages/Experiences/ExperiencesList/ExperiencesList';
import ReviewPage from './pages/reviewPage/reviewPage';
import ProfilePage from './pages/Forms/ProfilePage';
import BookingExperience from './pages/Experiences/BookingExperience';
import ExperiencePhoto from './pages/Experiences/experiencePhoto/ExperiencePhoto';
import Buscador from './pages/buscador/Buscador';
import EditExperience from './pages/Experiences/editExperience/EditExperience';
import LoginPage from './pages/Forms/LoginPage';

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
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
            <Route path='/perfil' element={<ProfilePage />} />
            <Route path='/search' element={<Buscador />} />

            <Route path='/experiences/:idExperience' element={<Experience />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/editPassword' element={<EditPassword />} />
            <Route
              path='/experiences/:idExperience/reviews'
              element={<ReviewPage />}
            />

            <Route
              path='/experiences/:idExperience/booking'
              element={<BookingExperience />}
            />
            <Route path='/allexperiences' element={<ExperiencesList />} />

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
