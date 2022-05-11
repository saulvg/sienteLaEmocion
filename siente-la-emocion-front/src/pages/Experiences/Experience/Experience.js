// ## Style ##
import '../../../components/Forms/activityForm.css';
import './experience.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * ################
 * ## Components ##
 * ################
 */
import { ActivityText } from '../../../components/Experiences/ActivityText';
import Header from '../../../components/Header/Header';
import BodyExperience from '../../../components/Header/MainHeader/BodyExperience';
import Error from '../../../components/error/Error';
import Loading from '../../../components/Loading/Loading';
import { Modal } from '../../../components/Modals/Modal';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useActivity from '../../../hooks/useActivity';
import useUser from '../../../hooks/useUser';

//Página que pinta una experiencia en concreto, con todos sus datos
const Experience = () => {
  //Recogemso el id de la experiencia del parametro 'idExperience' de la ruta
  const { idExperience } = useParams();
  //Le pasamos al customHook el id de la experiencia para que nos devuelva sus datos
  const { activity, error } = useActivity(idExperience);
  //conseguimos el token para saber si esta o no logeado
  const { token } = useUser();

  //Devolvemos todos los componentes que deseamos pintar, en alguna seccino si esta logeado devolvemos una cosa y sino otra
  return activity ? (
    <>
      <Header
        bg={
          activity.experience.photoHeader
            ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.experience.photoHeader}`
            : '/img/bus.jpg'
        }
        to={`/experiences/${idExperience}/booking`}
        button={'Reserva'}
        body={<BodyExperience />}
      />
      {activity ? (
        <>
          <ul>
            <li>
              <div className='container experiencia'>
                <div className='company-div-capacity'>
                  <h2>{activity.company}</h2>

                  {token ? (
                    <Modal
                      buttonClass='username-modal'
                      buttonName={`Participantes: ${activity.users_booking.length} / ${activity.experience.capacity}`}
                      titleModal={'Participantes:'}
                      content={
                        <>
                          <>
                            {activity.users_booking.map((user) => {
                              return (
                                <div key={user.id}>
                                  <Modal
                                    buttonClass='username-modal'
                                    buttonName={user.username}
                                    titleModal={user.username}
                                    content={
                                      user.biography
                                        ? 'Biografia: ' + user.biography
                                        : 'Biografia: Sin informacion'
                                    }
                                  ></Modal>
                                </div>
                              );
                            })}
                          </>
                        </>
                      }
                    ></Modal>
                  ) : (
                    <div>{`Participantes: ${activity.users_booking.length} / ${activity.experience.capacity}`}</div>
                  )}
                </div>
                <div className='activities-content'>
                  <div className='element'>
                    <ActivityText
                      image={
                        activity.photos === 1
                          ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.photos[0]?.path}`
                          : 'https://images.pexels.com/photos/9035242/pexels-photo-9035242.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
                      }
                      question={'¿En qué consiste este deporte?'}
                      answer={activity.experience.text_4}
                      questionBox={'question-box'}
                      answerBox={'answer-box'}
                      activityClass='activity'
                    ></ActivityText>
                  </div>
                  <div className='activity-odd element'>
                    <ActivityText
                      image={
                        activity.photos === 2
                          ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.photos[1]?.path}`
                          : 'https://images.pexels.com/photos/9035242/pexels-photo-9035242.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
                      }
                      question={
                        '¿Qué niveles de dificultad hay? ¿Y si no tengo experiencia?'
                      }
                      answer={activity.experience.text_5}
                      questionBox={'question-box-right'}
                      answerBox={'answer-box-right'}
                      activityClass='activity'
                    ></ActivityText>
                  </div>
                  <div className='element'>
                    <ActivityText
                      image={
                        activity.photos === 3
                          ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.photos[2]?.path}`
                          : 'https://images.pexels.com/photos/9035242/pexels-photo-9035242.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
                      }
                      question={'Si ya tienes experiencia...'}
                      answer={activity.experience.text_6}
                      questionBox={'question-box'}
                      answerBox={'answer-box'}
                      activityClass='activity'
                    ></ActivityText>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </>
      ) : (
        <Error>Error: {error}</Error>
      )}
    </>
  ) : (
    <Loading clas={'load-Page'}>{error}</Loading>
  );
};

export default Experience;
