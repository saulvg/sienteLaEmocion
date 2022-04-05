// ## Style ##
import './actividadLista.css';

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
    <ul>
      {/* Cada actividadad es un li dentro de un ul con su Link, etc, si eres admin puedes editarlas desde aqui, sino no */}
      {activities.map((activity) => {
        return (
          <li key={activity.id}>
            <Link to={`/experiences/${activity.id}`}>
              <section className='actividad'>
                <CircleActivities
                  id={'idActividad'}
                  clas={'listaActividades'}
                  children={activity.category}
                />

                <div className='descriptionActivity'>
                  <div className='headerActiviti'>
                    <h3>{activity.company}</h3>
                    {decod.role === 'admin' ? (
                      <Link
                        to={`/editExperiences/${activity.id}`}
                        className='edit'
                      >
                        <div className='lapiz'>Lapiz</div>
                      </Link>
                    ) : (
                      /* ..................... */
                      <div className='socialNetworks'>
                        <SocialNetwork
                          id={'miniInstagram'}
                          href={
                            activity.instagram || 'https://www.instagram.com/'
                          }
                          children={'instagram'}
                          className={'mini'}
                        />
                        <SocialNetwork
                          id={'miniFacebook'}
                          href={'https:/es-es.facebook.com/'}
                          children={'facebook'}
                          className={'mini'}
                        />
                      </div>
                      /* ............. */
                    )}
                  </div>
                  <p>{activity.text_1 || 'Sin descripción'}</p>
                  <div className='actividadF_P'>
                    <p>{new Date(activity.date).toLocaleDateString()} </p>
                    <p>{`3 / ${activity.capacity}`}</p>
                  </div>
                </div>
              </section>
            </Link>
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
