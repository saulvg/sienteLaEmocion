import './actividadLista.css';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useActivities from '../../hooks/useActivities';

import CircleHomePage from '../CircleHomePage/CircleHomePage';
import SocialNetwork from '../SocialNetwork/SocialNetwork';

const ActividadLista = () => {
  const { activities, error } = useActivities();

  if (error) return <div>Hubo un error: {error}</div>;

  return activities.length > 0 ? (
    <ul>
      {activities.map((activity) => {
        return (
          <li key={activity.id}>
            <section className='actividad'>
              <CircleHomePage
                id={'idActividad'}
                clas={'listaActividades'}
                children={activity.category}
              />

              <div className='socialNetwortEmpty'>
                <h3>{activity.company}</h3>
                {/* <SocialNetwork href={'https://www.instagram.com/'} children={'instagram'}/>
                <SocialNetwork href={'https:/es-es.facebook.com/'} children={'facebook'}/> */}

                <p>{activity.text_1 || 'Sin descripción'}</p>
                <div className='actividadF_P'>
                  <p>{new Date(activity.date).toLocaleDateString()} </p>
                  <p>{`3 / ${activity.capacity}`}</p>
                </div>
              </div>
            </section>
          </li>
        );
      })}
    </ul>
  ) : (
    <div>No hay actividades</div>
  );
};
export default ActividadLista;
