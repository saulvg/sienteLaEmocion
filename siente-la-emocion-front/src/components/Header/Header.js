import './header.css';

import { Link } from 'react-router-dom';
import MainHeader from '../MainHeader/MainHeader';
import BodyTitle from './MainHeader/BodyTitle';
import useUser from '../../hooks/useUser';

const MainMenu = () => {
  const { token, user } = useUser();

  return (
    <nav>
      <Link to='/search'>Buscador</Link> <Link to='/contact'>Contactanos</Link>{' '}
      {token ? (
        <>
          {user ? <p>Hola {user.username}</p> : null}
          <Link to='/perfil'>Perfil</Link>
        </>
      ) : (
        <Link to='/login'>Unete</Link>
      )}
    </nav>
  );
};

const HeaderButon = ({ to, children }) => {
  return (
    <Link to={to}>
      <button>{children}</button>
    </Link>
  );
};
const Logo = () => {
  return (
    <Link to='/'>
      <img
        src='https://w7.pngwing.com/pngs/522/295/png-transparent-computer-icons-encapsulated-postscript-mountain-angle-photography-triangle.png'
        alt='logo'
        width={'80px'}
      />
    </Link>
  );
};

const Header = ({ to, button, body }) => {
  return (
    <header>
      <div className='headerTop'>
        <Logo />
        <menu>
          <MainMenu />
        </menu>
      </div>
      {body}
      <div className='headerButton'>
        <HeaderButon to={to} children={button} />
      </div>
    </header>
  );
};
export default Header;

//const Header = () => {
//  return(
//  <header>
//      <div className='headerTop'>
//       <Logo/>
//        <menu>
//          <MainMenu />
//          <Routes>
//            <Route path='/search' element={<div>{/* <Buscador /> */}</div>} />
//            <Route
//              path='/contact'
//              element={<div>{/* <Contactanos /> */}</div>}
//            />
//            <Route path='/perfil' element={<div>{/* <Perfil /> */}</div>} />
//            <Route
//              path='/register-login'
//              element={<div>{/* <Register-Login /> */}</div>}
//            />
//          </Routes>
//        </menu>
//      </div>
//        <MainHeader/>
//        <div className='headerButton'>
//          {/* <button>Atrevete</button> */}
//          <HeaderButon children={'Atevete'}/>
//          <Routes>
//            <Route path='/listaActividades' element={<div><ListaActividades/></div>}/>
//            <Route path='/listaActividades' element={<div><ListaActividades/></div>}/>
//          </Routes>
//        </div>
//    </header>
//  )
//}
//export default Header
//export default Header
