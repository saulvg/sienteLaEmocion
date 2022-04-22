import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ActivityText1 } from '../components/ActivityAll';
import Header from '../components/Header/Header';
import useActivities from '../hooks/useActivities';
import useActivity from '../hooks/useActivity';
import { useParams } from 'react-router-dom';
import './experience.css';
import BodyExperience from '../components/Header/MainHeader/BodyExperience';
import Error from '../components/error/Error';
import useUser from '../hooks/useUser';

const Experience = () => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);
  const { token } = useUser();
  console.log('activity', activity);
  return (
    <>
      <Header
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
                </div>
                <ActivityText1
                  image={`${process.env.REACT_APP_BACKEND}/uploads/${activity.photos[0].path}`}
                  question={'¿En qué consiste este deporte?'}
                  answer={activity.experience.text_4}
                ></ActivityText1>
                <ActivityText1
                  image={`${process.env.REACT_APP_BACKEND}/uploads/${activity.photos[1].path}`}
                  question={
                    '¿Qué niveles de dificultad hay? ¿Y si no tengo experiencia?'
                  }
                  answer={activity.experience.text_5}
                ></ActivityText1>
                <ActivityText1
                  image={`${process.env.REACT_APP_BACKEND}/uploads/${activity.photos[2].path}`}
                  question={'Si ya tienes experiencia...'}
                  answer={activity.experience.text_6}
                ></ActivityText1>
                <Outlet />
              </div>
            </li>
          </ul>
          <span>
            Participantes:
            {token ? (
              <>
                <div>{`${activity.users_booking.length} / ${activity.experience.capacity}`}</div>
                {activity.users_booking.map((user) => {
                  return (
                    <div key={user.id}>
                      <Link to='/'>{user.username}</Link>
                    </div>
                  );
                })}
              </>
            ) : (
              <div>{`${activity.users_booking} / ${activity.experience.capacity}`}</div>
            )}
          </span>
        </>
      ) : (
        <Error>Error: {error}</Error>
      )}
    </>
  );
};

export default Experience;
