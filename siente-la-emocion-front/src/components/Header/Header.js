import './header.css'

import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

//pendiente de haccer bien
const token = false;

const MainMenu = () => {
  return (
    <nav>
      <Link to='/search'>Buscador</Link> <Link to='/contact'>Contactanos</Link>{' '}
      {token ? (
        <Link to='/perfil'>Perfil</Link>
      ) : (
        <Link to='/register-login'>Unete</Link>
      )}
    </nav>
  );
};


const Header = () => {
    return(
    <header>
        <BrowserRouter>
        <div className='headerTop'>
          <img
            src='https://w7.pngwing.com/pngs/522/295/png-transparent-computer-icons-encapsulated-postscript-mountain-angle-photography-triangle.png'
            alt='logo'
            width={'80px'}
          />
          <menu>
            <MainMenu />
            <Routes>
              <Route path='/search' element={<div>{/* <Buscador /> */}</div>} />
              <Route
                path='/contact'
                element={<div>{/* <Contactanos /> */}</div>}
              />
              <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
              <Route
                path='/register-login'
                element={<div>{/* <Register-Login /> */}</div>}
              />
            </Routes>
          </menu>
        </div>
          <div className='headerTitle'>
            <h1>Siente la emocion</h1>
            <p>Disfruta el momento</p>
          </div>
          <div className='headerButton'>
            <button>Atrevete</button>
          </div>
        </BrowserRouter>
      </header>
    )
}
export default Header