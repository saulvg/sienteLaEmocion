import './perfilAdmin.css';
import { Link } from 'react-router-dom';

const PerfilAdmin = () => {
  return (
    <div id='adminProfile'>
      <h2 className='title-profile'>Mi perfil </h2>
      <ul>
        <li>
          <Link to={''}> Diferentes opciones del Admin </Link>
        </li>
        <li>
          <Link to={'/experiences'}> Crea una nueva experiencia </Link>
        </li>
      </ul>
    </div>
  );
};
export default PerfilAdmin;
