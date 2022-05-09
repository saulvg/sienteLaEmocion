import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ActivityText1 } from '../components/ActivityAll';
import Header from '../components/Header/Header';
import useActivity from '../hooks/useActivity';
import { useParams } from 'react-router-dom';
import './experience.css';
import BodyExperience from '../components/Header/MainHeader/BodyExperience';
import Error from '../components/error/Error';
import useUser from '../hooks/useUser';
import '../components/Forms/activityForm.css';
import Loading from '../components/Loading/Loading';
import { Modal } from '../components/Modal/Modal';

const Experience = () => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);
  const { token } = useUser();
  return activity ? (
    <>
      <Header
        bg={
          activity.experience.photoHeader
            ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.experience.photoHeader}`
            : '/img/bus.jpg'
        }
        to={`/experiences/${idExperience}/booking`} /* ................ */
        button={'Reserva'}
        body={<BodyExperience />}
      />
      {activity ? (
        <>
          <ul>
            <li>
              <div className='container experiencia'>
                <div className='company-div'>
                  <h2>{activity.company}</h2>
                  <span>
                    Participantes:
                    {token ? (
                      <>
                        <div>{`${activity.users_booking.length} / ${activity.experience.capacity}`}</div>
                        {activity.users_booking.map((user) => {
                          return (
                            <div key={user.id}>
                              <Modal
                                buttonClass='username-modal'
                                buttonName={user.username}
                                titleModal={user.username}
                                content={
                                  user.biography
                                    ? 'Biografia:' + user.biography
                                    : 'Biografia: Sin informacion'
                                }
                              ></Modal>
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div>{`${activity.users_booking} / ${activity.experience.capacity}`}</div>
                    )}
                  </span>
                </div>
                <div className='activities-content'>
                  <div className='element'>
                    <ActivityText1
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
                    ></ActivityText1>
                  </div>
                  <div className='activity-odd element'>
                    <ActivityText1
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
                    ></ActivityText1>
                  </div>
                  <div className='element'>
                    <ActivityText1
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
                    ></ActivityText1>
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
