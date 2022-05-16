// ## Style ##
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './footer.css';

//Componente que pinta el pie de pagina
const Footer = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <footer>
      <h2>Experiencia diferente</h2>
      <div className='footerMain'>
        <section id='visitanos'>
          <h3>Visitanos</h3>
          <p>calle XXXXXX pascual manual</p>
        </section>
        <section id='llamanos'>
          <h3>Llamanos</h3>
          <p>123456789</p>
        </section>
        <section id='llamanos'>
          <h3>Cookies</h3>
          <p>
            <a href='cookies'>Enlace de cookies</a>
          </p>
        </section>
      </div>
      <p>todos los derechos estan reservados a bla bla</p>
    </footer>
  );
};
export default Footer;
