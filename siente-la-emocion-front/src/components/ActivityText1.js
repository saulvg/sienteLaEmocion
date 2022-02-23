/* import React, { useState } from 'react'; */
import './activityForm.css';

export const ActivityText1 = ({ margin, children }) => {
  return (
    <div className='activity'>
      <img
        className='activity-img'
        src='https://w7.pngwing.com/pngs/522/295/png-transparent-computer-icons-encapsulated-postscript-mountain-angle-photography-triangle.png'
        alt='logo'
      />
      <div className='question-box' style={margin}>
        <p className='question'>Hola</p>
      </div>
      <div className='answer-box'>
        <p className='answer'>hola</p>
      </div>
    </div>
  );
};
