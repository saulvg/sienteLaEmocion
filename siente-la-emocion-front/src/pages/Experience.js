import React from 'react';
import { Outlet } from 'react-router-dom';
import { ActivityText1 } from '../components/ActivityAll';
import Header from '../components/Header/Header';
import useActivities from '../hooks/useActivities';
import useActivity from '../hooks/useActivity';
import { useParams } from 'react-router-dom';
import './experience.css';
import BodyExperience from '../components/Header/MainHeader/BodyExperience';

const Experience = () => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);
  console.log('activity', activity);

  return (
    <>
      {activity ? (
        <ul>
          <li>
            <Header
              to={'/booking'}
              button={'Reserva'}
              body={<BodyExperience />}
            />
            <div className='container experiencia'>
              <div className='company-div'>
                <h2>{activity.company}</h2>
              </div>
              <ActivityText1
                question={'¿En qué consiste este deporte?'}
                answer={activity.experience.text_1}
              ></ActivityText1>
              <ActivityText1
                question={
                  '¿Qué niveles de dificultad hay? ¿Y si no tengo experiencia?'
                }
                answer={activity.text_1}
              ></ActivityText1>
              <ActivityText1
                question={'Si ya tienes experiencia...'}
                answer={activity.text_1}
              ></ActivityText1>
              <Outlet />
            </div>
          </li>
        </ul>
      ) : (
        <div>Error</div>
      )}
    </>
  );
};

export default Experience;
