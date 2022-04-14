import './bodyExperience.css';
import useActivity from '../../../hooks/useActivity';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';

const BodyActivitis = () => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);
  const [text, setText] = useState(false);

  return activity ? (
    <div className='header-body bodyExperience'>
      <h1>{activity.experiences_category}</h1>
      {/* <div className='experience-texts'>
        <section className='queIncluye text-header'>
          <div className='experience-text-container'>
            <div class='experience-description-content'>
              <h3>Que incluye?</h3>
              
          
                <p>{activity.text_1}</p>
         
              }
            </div>
          </div>
        </section>
        <section className='queNecesitas text-header'>
          <div className='experience-text-container'>
            <h3>Que necesitas?</h3>
            <p>{activity.text_2}</p>
          </div>
        </section>
        <section className='cuantoDura text-header'>
          <div className='experience-text-container'>
            <h3>
              Cuanto dura la experiencia?
              <br />
              Cuando se realiza?
            </h3>
            <p>{activity.text_3}</p>
          </div>
        </section>
        <section className='valoraciones text-header'>
          <button
            onClick={() => {
              setText(!text);
              console.log('hola');
            }}
            className='experience-text-container'
          >
            <div class='experience-description-content'>
              {
                <h3>
                  <Link to={`/experiences/${idExperience}/reviews`}>
                    Valoraciones
                  </Link>
                </h3>
              }
              {text ? (
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              ) : null}
            </div>
          </button> */}
      <div>
        <section className='queIncluye textHeaderLeft'>
          <h3>Que incluye?</h3>
          <p>{activity.experience.text_1}</p>
        </section>
        <section className='queNecesitas textHeaderRigth'>
          <h3>Que necesitas?</h3>
          <p>{activity.experience.text_2}</p>
        </section>
        <section className='cuantoDura textHeaderLeft'>
          <h3>
            Cuanto dura la experiencia?
            <br />
            Cuando se realiza?
          </h3>
          <p>{activity.experience.text_3}</p>
        </section>
        <section className='valoraciones textHeaderRigth'>
          {
            <Link to={`/experiences/${idExperience}/reviews`}>
              <h3>Valoraciones</h3>
            </Link>
          }
          <p>
            Haz click aqui para disfrutar de todas las valoraione que tuvo esta
            experiencia
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
