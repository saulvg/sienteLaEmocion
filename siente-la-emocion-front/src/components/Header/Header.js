import './header.css';

import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import ModalContactanos from '../modalContactanos/ModalContactanos';
import ModalSearch from '../ModalSearch/ModalSearch';
import { useEffect, useState } from 'react';

const MainMenu = () => {
  const { token, user } = useUser();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      console.log('cambiando');
    };

    window.addEventListener('resize', changeWidth);
  }, []);

  /*   useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
      console.log('eliminando');
    };
    return () => {
      window.removeEventListener('resize', changeWidth);
    };
  }, []); */

  return (
    <>
      {toggleMenu || screenWidth > 600 ? (
        <div class='responsive-nav'>
          <menu>
            <button class='toggle-button1' onClick={() => setToggleMenu(false)}>
              <svg
                className='close-nav'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18L18 6M6 6l12 12'
                ></path>
              </svg>
            </button>
            <nav>
              {/* <Link to='/search' id='search'>
        Buscador
      </Link> */}
              <ModalSearch />
              <ModalContactanos />
              {token ? (
                <>
                  {user ? (
                    <span className='nav-button'>Hola {user.username}</span>
                  ) : null}
                  <Link
                    to='/perfil'
                    id='myself'
                    className='nav-element nav-button'
                  >
                    Perfil
                  </Link>
                </>
              ) : (
                <Link to='/login' id='login' className='nav-element'>
                  Unete
                </Link>
              )}
            </nav>
          </menu>
        </div>
      ) : (
        <button
          className='toggle-button'
          onClick={() => {
            setToggleMenu(true);
          }}
        >
          <svg
            class='toggle-menu'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M4 6h16M4 12h16M4 18h16'
            ></path>
          </svg>
        </button>
      )}
    </>
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
          <MainMenu />
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
