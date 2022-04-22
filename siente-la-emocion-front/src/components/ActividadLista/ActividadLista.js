// ## Style ##
import './actividadLista.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

/**
 * ################
 * ## Components ##
 * ################
 */
import { CircleActivities } from '../CircleHomePage/CircleHomePage';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
import Error from '../error/Error';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';

//Componente que utilizamos para pintar todas las actividades disponibles de nuestra web
const ActividadLista = ({ activities, error }) => {
  const { token } = useUser();
  let decod = 'normal';

  try {
    //si se a logeado el usuario decodificamos el token, para saber mas adelante si es admin, sino lo hemos inicidado a normal
    if (token) {
      decod = decode(token);
    }
  } catch (error) {
    console.error(error);
  }

  //si existe algun error de la peticion al back que se hace en el Hook de useActivies y se le pasan estos parametros en Lista de actividades, pintamos un error
  if (error) return <Error>Hubo un error:{error}</Error>;

  //si no ha habido ningun error pero no hay actividades pintamos que no las hay y sino las avtividades con todos sus datos
  return activities.length > 0 ? (
    <ul class='w-full activities container'>
      {/* Cada actividadad es un li dentro de un ul con su Link, etc, si eres admin puedes editarlas desde aqui, sino no */}
      {activities.map((activity) => {
        console.log(activity);
        return (
          <li key={activity.id} className='activity-flex w-full '>
            <Link
              className='w-full actividad w-full flex'
              to={`/experiences/${activity.id}`}
            >
              <CircleActivities
                id={'idActividad'}
                clas={'experience-list'}
                children={activity.category}
                image={`${process.env.REACT_APP_BACKEND}/uploads/${activity.photoHeader}`}
              />

              <div className='description-activity'>
                <div className='header-activity'>
                  <h3>{activity.company}</h3>
                </div>
                <p className='texto'>{activity.text_1 || 'Sin descripción'}</p>
                <div className='experience-date'>
                  <p>{new Date(activity.date).toLocaleDateString()} </p>
                </div>
              </div>
            </Link>
            <div class='activity-right'>
              {decod.role === 'admin' ? (
                <Link to={`/editExperiences/${activity.id}`} className='edit'>
                  <div className='lapiz'>Lapiz</div>
                </Link>
              ) : (
                /* ..................... */
                <div className='social-networks'>
                  {activity.companyInstagram ? (
                    <SocialNetwork
                      id={'miniInstagram'}
                      href={activity.companyInstagram}
                      children={'instagram'}
                      className={'mini'}
                    />
                  ) : null}
                  {activity.companyFacebook ? (
                    <SocialNetwork
                      id={'miniFacebook'}
                      href={activity.companyFacebook}
                      children={'facebook'}
                      className={'mini'}
                    />
                  ) : null}
                </div>
                /* ............. */
              )}
            </div>
          </li>
        );
      })}
    </ul>
  ) : (
    <Error>
      No se han encontrado experiencias con estos parametros de busqueda
    </Error>
  );
};
export default ActividadLista;
