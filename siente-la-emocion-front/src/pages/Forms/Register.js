import React from 'react';
import { Outlet } from 'react-router-dom';
import { ModalCircle } from '../../components/Forms/ModalCircle';
import RegisterForm from '../../components/Forms/RegisterForm';

const Register = (props) => {
  return (
    <div className='align-modal'>
      <div className='modal-box'>
        <div className='form-titles'>
          <div className='circle-content'>
            <button
              className='flex back-button'
              onClick={() => {
                window.history.go(-1);
              }}
            >
              <svg
                className='back-svg'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                ></path>
              </svg>
              <p className='goback'>Volver</p>
            </button>
            <p className='circle-name'>Registro</p>
          </div>
        </div>
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
