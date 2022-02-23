import React from 'react';
import { Outlet } from 'react-router-dom';
import { InputElement } from '../components/InputElement';
import { ModalCircle } from '../components/ModalCircle';

export const Register = (props) => {
  return (
    <div className='modal-box'>
      <ModalCircle name='Registro'></ModalCircle>
      <div className='modal1'></div>
      <div className='modal2'>
        <div class='form-elements'>
          <InputElement name='Email o teléfono' />
          <InputElement name='Contraseña' />
          <InputElement name='Confirmar contraseña' />
          <InputElement name='Nombre de usuario' />
        </div>
        <div className='circle-background'></div>
      </div>
      <Outlet />
    </div>
  );
};
