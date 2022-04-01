import './header.css';

import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import ModalContactanos from '../modalContactanos/ModalContactanos';
import ModalSearch from '../ModalSearch/ModalSearch';

const MainMenu = () => {
  const { token, user } = useUser();

  return (
    <nav>
      {/* <Link to='/search' id='search'>
        Buscador
      </Link> */}
      <ModalSearch /> <ModalContactanos />{' '}
      {token ? (
        <>
          {user ? <p>Hola {user.username}</p> : null}
          <Link to='/perfil' id='myself'>
            Perfil
          </Link>
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

const Header = ({ to, button, body, className }) => {
  return (
    <>
      <header className={className}>
        <div className='headerTop'>
          <Logo />
          <div id='modal-bg-Search'>
            <div id='modal-fg-Search'></div>
          </div>
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
