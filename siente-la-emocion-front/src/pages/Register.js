import React from 'react';
import { Outlet } from 'react-router-dom';
import { InputElement } from '../components/InputElement';
import { ModalCircle } from '../components/ModalCircle';
import BlueButton from './BlueButton';

const Register = (props) => {
  return (
    <div className='align-modal'>
      <div className='modal-box'>
        <ModalCircle name='Registro'></ModalCircle>
        <div className='modal1'></div>
        <div className='modal2'>
          <form>
            <div class='form-elements'>
              <InputElement name='Email o teléfono' type='mail' />
              <InputElement name='Contraseña' type='text' />
              <InputElement name='Confirmar contraseña' type='text' />
              <InputElement name='Nombre de usuario' type='text' />
            </div>
            <BlueButton name='registrarse' />
          </form>
          <div className='circle-background'></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Register;
