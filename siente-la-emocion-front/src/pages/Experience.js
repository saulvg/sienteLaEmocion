import React from 'react';
import { Outlet } from 'react-router-dom';
import { ActivityText1 } from '../components/ActivityText1';
import './experience.css';

export const Experience = () => {
  return (
    <div className='container'>
      <h1>Esta es la página de mensaje</h1>
      <ActivityText1></ActivityText1>
      <Outlet />
    </div>
  );
};
