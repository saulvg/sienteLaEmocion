import React from 'react';
import { Outlet } from 'react-router-dom';
import { ModalCircle } from '../components/ModalCircle';
import RegisterForm from '../components/RegisterForm';

const Register = (props) => {
  
  return (
    <div className='align-modal'>
      <div className='modal-box'>
        <ModalCircle name='Registro'></ModalCircle>
        <div className='modal1'></div>
        <div className='modal2'>
          <RegisterForm />
          <div className='circle-background'></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Register;
