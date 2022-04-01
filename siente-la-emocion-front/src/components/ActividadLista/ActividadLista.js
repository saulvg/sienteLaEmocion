import './actividadLista.css';
import { Link } from 'react-router-dom';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';

/* import useActivities from '../../hooks/useActivities'; */

import CircleHomePage from '../CircleHomePage/CircleHomePage';
import SocialNetwork from '../SocialNetwork/SocialNetwork';
/* import Experience from '../../pages/Experience'; */
import decode from 'jwt-decode';

const ActividadLista = ({ activities, error }) => {
  const { token } = useUser();

  let decod = 'normal';

  try {
    if (token) {
      decod = decode(token);
    }
  } catch (error) {
    console.error(error);
  }

  if (error) return <div>Hubo un error: {error}</div>;

  return activities.length > 0 ? (
    <ul>
      {activities.map((activity) => {
        return (
          <li key={activity.id} id={activity.id}>
            <Link to={`/experiences/${activity.id}`}>
              <section className='actividad'>
                <CircleHomePage
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
    <div id='nExperiences'>
      <div id='nExperiencesStyle'>
        ❗ No se han encontrado experiencias con estos parametros de busqueda
      </div>
    </div>
  );
};
export default ActividadLista;
