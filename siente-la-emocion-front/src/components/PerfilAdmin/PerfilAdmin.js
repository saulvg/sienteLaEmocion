// ## Style ##
import './perfilAdmin.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { Link, useNavigate } from 'react-router-dom';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';

//Componente que pinta el perfil del admin
const PerfilAdmin = () => {
  const navigate = useNavigate();
  const { setToken } = useUser();
  return (
    <div id='adminProfile'>
      <h2 className='title-profile'>Mi perfil </h2>
      <ul>
        <li>
          <Link to={'/experiences'}> Crea una nueva experiencia </Link>
        </li>
        <li>
          <button
            onClick={() => {
              setToken(null);
              navigate('/');
            }}
          >
            Cerrar sesión
          </button>
        </li>
        <li>
          <Link to='/editPassword'>Cambia tu contraseña</Link>
        </li>
      </ul>
    </div>
  );
};
export default PerfilAdmin;
