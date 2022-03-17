import React from 'react';
import { Outlet } from 'react-router-dom';
import { ActivityText1 } from '../components/ActivityText1';
import Header from '../components/Header/Header';
import './experience.css';
import BodyExperience from '../components/Header/MainHeader/BodyExperience';

const Experience = () => {
  return (
    <>
      <Header to={'/booking'} button={'Reserva'} body={<BodyExperience />} />
      <div className='container experiencia'>
        <h1>Esta es la página de mensaje</h1>
        <ActivityText1 margin={{ marginTop: '500px' }}></ActivityText1>
        <ActivityText1></ActivityText1>
        <ActivityText1></ActivityText1>
        <Outlet />
      </div>
    </>
  );
};

export default Experience;
