import React from 'react';
import { Outlet } from 'react-router-dom';
import { ActivityText1 } from '../components/ActivityText1';
import Header from '../components/Header/Header';
import useActivities from '../hooks/useActivities';
import './experience.css';
import BodyExperience from '../components/Header/MainHeader/BodyExperience';

const Experience = () => {
  const { activities, error } = useActivities();
<<<<<<< Updated upstream
=======
  console.log(activities.company);
>>>>>>> Stashed changes
  return (
    <>
      {activities ? (
        <ul>
          <li>
            <Header
              to={'/booking'}
              button={'Reserva'}
              body={<BodyExperience />}
            />
            <div className='container experiencia'>
              <div className='company-div'>
                <h2>{activities.company}</h2>
              </div>
              <ActivityText1
                question={'¿En qué consiste este deporte?'}
                answer={activities.text_1}
              ></ActivityText1>
              <ActivityText1
                question={
                  '¿Qué niveles de dificultad hay? ¿Y si no tengo experiencia?'
                }
                answer={activities.text_1}
              ></ActivityText1>
              <ActivityText1
                question={'Si ya tienes experiencia...'}
                answer={activities.text_1}
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
