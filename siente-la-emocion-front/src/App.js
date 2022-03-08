//import logo from './logo.svg';
//import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

/**
 * ###########
 * ## Pages ##
 * ###########
 */
import Footer from './components/Footer/Footer';
import HomePage from './pages/homePage/HomePage';
import Register from './pages/Register';
import Experience from './pages/Experience';
import ListaActividades from './pages/listaActividades/ListaActividades';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='*' element={<HomePage />} />
          <Route path='/search' element={<div>{/* <Buscador /> */}</div>} />
          <Route path='/contact' element={<div>{/* <Contactanos /> */}</div>} />
          <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
<<<<<<< Updated upstream
          <Route
            path='/register-login'
            element={<div>{/* <Register-Login /> */}</div>}
          />
=======
          <Route path='/register' element={<div>{<Register />}</div>} />
          <Route path='/experience' element={<div>{<Experience />}</div>} />
>>>>>>> Stashed changes
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
