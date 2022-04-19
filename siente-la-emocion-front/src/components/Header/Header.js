import './header.css';

import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import ModalContactanos from '../modalContactanos/ModalContactanos';
import ModalSearch from '../ModalSearch/ModalSearch';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import UpDownPage from '../UpDownPage/UpDownPage';

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
  const { token, setToken } = useUser();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [toggleMenu, setToggleMenu] = useState(false);

  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);
  }, []);

  return (
    <>
      <header className={className}>
        <div className='headerTop'>
          <Logo />
          {formVisible ? <ModalSearch /> : null}
          {screenWidth > 750 ? (
            <div className='responsive-nav'>
              <menu>
                <button
                  className='toggle-button1'
                  onClick={() => setToggleMenu(false)}
                >
                  <svg
                    className='close-nav'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M6 18L18 6M6 6l12 12'
                    ></path>
                  </svg>
                </button>
                <nav>
                  {/* <Link to='/search' id='search'>
        Buscador
      </Link> */}

                  <button
                    className='nav-button'
                    onClick={() => setFormVisible(!formVisible)}
                  >
                    Buscador
                  </button>

                  <ModalContactanos />
                  {token ? (
                    <>
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
                      Inicia sesión
                    </Link>
                  )}
                </nav>
              </menu>
            </div>
          ) : null}
        </div>
        {toggleMenu && screenWidth < 750 ? (
          <div className='mobile-nav'>
            <menu>
              <button
                className='toggle-button1'
                onClick={() => setToggleMenu(false)}
              >
                <svg
                  className='close-nav'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  ></path>
                </svg>
              </button>
              <nav>
                {/* <Link to='/search' id='search'>
    Buscador
  </Link> */}

                <button
                  className='nav-button'
                  onClick={() => setFormVisible(!formVisible)}
                >
                  Buscador
                </button>

                <ModalContactanos />
                {token ? (
                  <>
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
                    Inicia sesión
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
              className='toggle-menu'
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
        {body}
        <div className='headerButton'>
          <HeaderButon to={to} children={button} />
        </div>
        <UpDownPage />
      </header>
    </>
  );
};
export default Header;
