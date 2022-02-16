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
          <h1>Siente la emocion</h1>
          <p>Disfruta el momento</p>
          <button>Atrevete</button>
        </BrowserRouter>
      </header>
    )
}
export default Header