// ## Style ##
import './header.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';

/**
 * ################
 * ## Components ##
 * ################
 */
import ModalContactanos from '../Modals/modalContactanos/ModalContactanos';
import ModalSearch from '../Modals/ModalSearch';
import UpDownPage from '../UpDownPage/UpDownPage';

//Componente que pinta un botton en el header de la pagina (redirige depende a donde le indiquemos en el prop de 'to')
const HeaderButon = ({ to, children }) => {
  return (
    <Link to={to}>
      <button>{children}</button>
    </Link>
  );
};
//Componente que pinta el logo en el header de la pagina (siempre redirige la 'HomePage')
const Logo = () => {
  return (
    <Link to='/'>
      <img src='/silueta/logo.png' alt='logo' width={'80px'} />
    </Link>
  );
};

//Componente que pinta el Header de la pagina, tiene diferentes props, bg (el fondo del header), to(prop que le pasa al un componente hijo 'HeaderButton'), button(texto dentro del button), body(contenido del header), className(clase que le podemos pasar para darle diferentes estilos)
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

  //Pintamos todo lo que deseamos mostrar dependendiendo de los estados
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
