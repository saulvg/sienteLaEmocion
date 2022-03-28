import './bodyExperience.css';
import useActivity from '../../../hooks/useActivity';
import { Link, useParams } from 'react-router-dom';

const BodyActivitis = () => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);

  return activity ? (
    <div className='headerBody bodyExperience'>
      <h1>{activity.experiences_category}</h1>
      <div>
        <section className='queIncluye textHeaderLeft'>
          <h3>Que incluye?</h3>
          {
            /* activity ? ( */
            <p>{activity.text_1}</p>
            /*)  : (
            <p>
              <div className='loading'></div>
            </p>
          ) */
          }
        </section>
        <section className='queNecesitas textHeaderRigth'>
          <h3>Que necesitas?</h3>
          <p>{activity.text_2}</p>
        </section>
        <section className='cuantoDura textHeaderLeft'>
          <h3>
            Cuanto dura la experiencia?
            <br />
            Cuando se realiza?
          </h3>
          <p>{activity.text_3}</p>
        </section>
        <section className='valoraciones textHeaderRigth'>
          {
            <Link to={`/experiences/${idExperience}/reviews`}>
              <h3>Valoraciones</h3>
              {console.log(activity.id)}
            </Link>
          }
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </section>
      </div>
    </div>
  ) : (
    <div id='loading'>
      Error: {error ?? 'No se encuentra informacion de esta actividad'}
      <div className='loading'></div>
    </div>
  );
};
export default BodyActivitis;
