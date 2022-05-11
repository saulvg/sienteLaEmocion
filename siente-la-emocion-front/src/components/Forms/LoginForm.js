/**
 * ###########
 * ## React ##
 * ###########
 */
import { Navigate } from 'react-router-dom';
import { useContext, useState } from 'react';

/**
 * ################
 * ## Components ##
 * ################
 */
import { InputElement, InputPassword } from './InputElement';
import BlueButton from './BlueButton';
import Error from '../error/Error';

import { AuthContext } from '../../App';

//Componente que utilizamos para pintar y dar funcionalidad a la hora de que un usuario se loge
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { token, setToken } = useContext(AuthContext);

  //Funcion manejadora del formulario para que un usuario se loge
  const login = async (e) => {
    e.preventDefault();
    //Intamos reaizar la peticion de tipo 'POST'
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();

      //Si todo a ido bien, cambaimos el estado del token al valor del token que nos devuelve el back
      //Sino lanzamos un error
      if (res.ok) {
        setToken(body.data.token);
      } else {
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Pintamos todo lo que deseamos mostrar, si hay token  redirigimos a 'HomePage'
  return (
    <>
      {token && <Navigate to='/' />}
      <form onSubmit={login}>
        <div className='form-elements'>
          <InputElement
            labelName='Email'
            type='mail'
            id='email'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputPassword
            labelName='Contraseña'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error ? <Error className='error-msg'>{error}</Error> : null}
        <BlueButton name='Iniciar sesión' type='submit' />
      </form>
    </>
  );
};

export default LoginForm;
