import './header.css';

import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import ModalContactanos from '../ModalContactanos/ModalContactanos';
const MainMenu = () => {
  const { token, user, setToken } = useUser();

  return (
    <nav>
      <Link to='/search'>Buscador</Link> <Link to='/contact'>Contactanos</Link>
      <ModalContactanos />
      {token ? (
        <>
          {user ? <p>Hola {user.username}</p> : null}
          <Link to='/perfil'>Perfil</Link>

          <p
            onClick={() => {
              setToken('');
            }}
          >
            <Link to='/'>Cerrar sesión</Link>
          </p>
        </>
      ) : (
        <Link to='/login' id='login'>
          Unete
        </Link>
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
    <>
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
    </>
  );
};
export default Header;
