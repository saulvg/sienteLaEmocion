import './bodyExperience.css';
import useActivity from '../../../hooks/useActivity';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const BodyActivitis = () => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);
  const [text, setText] = useState(false);
  console.log('asasd', activity);

  return activity ? (
    <div className='header-body bodyExperience container'>
      <h1>{activity.experiences_category}</h1>
      <div className='experience-texts'>
        <section className='queIncluye text-header'>
          <div className='experience-text-container'>
            <div class='experience-description-content'>
              <h3>¿Que incluye?</h3>
              <p>{activity.experience.text_1}</p>
            </div>
          </div>
        </section>
        <section className='queNecesitas text-header'>
          <div className='experience-text-container'>
            <div class='experience-description-content'>
              <h3>¿Que necesitas?</h3>
              <p>{activity.experience.text_2}</p>
            </div>
          </div>
        </section>
        <section className='cuantoDura text-header'>
          <div className='experience-text-container'>
            <div class='experience-description-content'>
              <h3>
                Cuanto dura la experiencia?
                <br />
                ¿Cuando se realiza?
              </h3>
              <p>{activity.experience.text_3}</p>
            </div>
          </div>
        </section>
        <section className='valoraciones text-header'>
          <button className='experience-text-container'>
            <div class='experience-description-content'>
              {
                <h3>
                  <Link to={`/experiences/${idExperience}/reviews`}>
                    Valoraciones
                  </Link>
                </h3>
              }
              <p>
                Si quieres saber que valoraciones tiene esta empresa haz click
                aqui
              </p>
            </div>
          </button>
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
