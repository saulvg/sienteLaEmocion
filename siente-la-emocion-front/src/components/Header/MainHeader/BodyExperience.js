// ## Style ##
import './bodyExperience.css';
/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useActivity from '../../../hooks/useActivity';
/**
 * ###########
 * ## React ##
 * ###########
 */
import { Link, useParams } from 'react-router-dom';

//Componente que pinta la cabezera cuando entramos en una actividad en concreto
const BodyActivitis = () => {
  //parametro de la ruta para saber a que id de experiencia hacemos referencia
  const { idExperience } = useParams();
  //le pasamso al Hook de 'useActivity el valor del id para que nos devuelva los datos de esa experiencia
  const { activity, error } = useActivity(idExperience);

  //Formateamos la fecha para que el usuario la lea lo mas comodamente posible
  const experienceDate = new Date(activity?.experience.date);
  const formatDate = experienceDate.toLocaleString();

  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones (activity  ?), sino devolvemos el correspondiente error en Front
  return activity ? (
    <div className='header-body bodyExperience container'>
      <h1>{activity.experiences_category}</h1>
      <div className='experience-texts'>
        <section className='queIncluye text-header'>
          <div className='experience-text-container'>
            <div
              className='experience-description-content'
              data-aos='fade-up-right'
            >
              <h3>¿Que incluye?</h3>
              <p>{activity.experience.text_1}</p>
            </div>
          </div>
        </section>
        <section className='queNecesitas text-header'>
          <div className='experience-text-container'>
            <div
              className='experience-description-content '
              data-aos='fade-up-left'
            >
              <h3>¿Que necesitas?</h3>
              <p>{activity.experience.text_2}</p>
            </div>
          </div>
        </section>
        <section className='cuantoDura text-header'>
          <div className='experience-text-container'>
            <div
              className='experience-description-content'
              data-aos='fade-up-right'
            >
              <h3>
                Cuanto dura la experiencia?
                <br />
                ¿Cuando y donde se realiza?
              </h3>
              <p>
                {activity.experience.text_3} <br />
                El {formatDate} en {activity.experience.city}
              </p>
            </div>
          </div>
        </section>
        <section className='valoraciones text-header'>
          <button className='experience-text-container'>
            <div
              className='experience-description-content'
              data-aos='fade-up-left'
            >
              {
                <Link
                  to={`/experiences/${idExperience}/reviews`}
                  className='prueba'
                >
                  <h3 className='comments'>Valoraciones</h3>
                  <p>
                    Si quieres saber que comentarios tiene esta empresa puedes
                    mirarlo aqui <br />
                    Media:
                    {activity.experience.votes_entry === '5.0000' ? (
                      <span>★★★★★ </span>
                    ) : activity.experience.votes_entry === '4.0000' ? (
                      <span>★★★★</span>
                    ) : activity.experience.votes_entry === '3.0000' ? (
                      <span>★★★</span>
                    ) : activity.experience.votes_entry === '2.0000' ? (
                      <span>★★</span>
                    ) : activity.experience.votes_entry === '1.0000' ? (
                      <span>★</span>
                    ) : (
                      <span>Sin votos</span>
                    )}
                  </p>
                </Link>
              }
            </div>
          </button>
        </section>
      </div>
    </div>
  ) : (
    <div id='loading'>
      {error}
      <div className='loading'></div>
    </div>
  );
};
export default BodyActivitis;
