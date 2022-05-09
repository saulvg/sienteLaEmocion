import './header.css';

import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import ModalContactanos from '../modalContactanos/ModalContactanos';
import ModalSearch from '../ModalSearch/ModalSearch';
import { useEffect, useState } from 'react';
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
      <img src='/silueta/logo.png' alt='logo' width={'80px'} />
    </Link>
  );
};

const Header = ({ bg, to, button, body, className }) => {
  const { token } = useUser();
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
      <header
        className={className}
        style={{
          backgroundImage: `url('${bg}')`,
        }}
      >
        <div className='headerTop'>
          <Logo />
          {formVisible ? <ModalSearch /> : null}
          {toggleMenu || screenWidth > 750 ? (
            <div className='responsive-nav'>
              <menu>
                <button
                  className='toggle-button'
                  onClick={() => {
                    setToggleMenu(false);
                    setFormVisible(false);
                  }}
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
                  <button
                    className='nav-button'
                    onClick={() => setFormVisible(!formVisible)}
                  >
                    Buscador
                  </button>

                  <ModalContactanos />
                  {token ? (
                    <>
                      <button className=' nav-button'>
                        <Link to='/perfil' id='myself'>
                          Perfil
                        </Link>
                      </button>
                    </>
                  ) : (
                    <button className=' nav-button'>
                      <Link to='/login' id='login'>
                        Inicia sesión
                      </Link>
                    </button>
                  )}
                </nav>
              </menu>
            </div>
          ) : (
            <>
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
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 6h16M4 12h16M4 18h16'
                  ></path>
                </svg>
              </button>
            </>
          )}
        </div>
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
