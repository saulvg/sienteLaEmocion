/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ################
 * ## Components ##
 * ################
 */
import { InputElement, InputPassword } from './InputElement';
import BlueButton from './BlueButton';
import Error from '../error/Error';
import Loading from '../Loading/Loading';

//Componente que utilizamos para pintar y registrar a un nuevo usuario
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dni_nie, setDni_nie] = useState('');
  const [username, setUsername] = useState('');
  const [done, setDone] = useState('');
  const [error, setError] = useState('');
  //Para redirigir
  const navigate = useNavigate();

  //use effect que se encarga de comprobar si las contraseñas coincide y se refreca cada vez que el valor de los inputs de  password y repit password cambian
  useEffect(() => {
    if (password === repeatPassword) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [password, repeatPassword]);

  //Funcion manejadora del formulario para registrar a un nuevo usuario
  const register = async (e) => {
    e.preventDefault();

    //si las contraseñas no coincide lanzamos un error y detenemos la ejecucion de la funcion
    if (!passwordsMatch) {
      setError('La contraseña no coincide');
      return;
    }
    //Intentamos realizar la peticion de tipo 'POST'
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          phone,
          dni_nie,
          postalCode,
          username,
        }),
      });

      const body = await res.json();

      //Funcion que redirige a la pagina de login
      const redirect = () => navigate('/login');

      //Si todo a ido bien iniciamos un 'setTimeout' de 5 segundos y cambiamos el estado de 'done'
      //Sino cambiamos el valor del estado 'error' a un valor truthy
      if (res.ok) {
        setDone(true);
        setTimeout(redirect, 5000);
      } else {
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Pintamos todo lo que deseamos mostrar dependiendo del valor de los estados
  return (
    <>
      {!done ? (
        <form onSubmit={register}>
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
            <InputPassword
              labelName='Repetir contraseña'
              value={repeatPassword}
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            />

            <InputElement
              labelName='Nombre de usuario'
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <InputElement
              labelName='DNI'
              type='text'
              value={dni_nie}
              onChange={(e) => {
                setDni_nie(e.target.value);
              }}
            />
            <InputElement
              labelName='Teléfono'
              type='number'
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <InputElement
              labelName='Código postal'
              type='text'
              value={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </div>
          {error ? <Error className='error-msg'>{error}</Error> : null}
          <BlueButton name='Registrarse' />
        </form>
      ) : (
        <>
          <Loading className='confirmation'>
            Te has registrado correctamente. Revisa tu correo para validar tu
            cuenta
          </Loading>
        </>
      )}
    </>
  );
};

export default RegisterForm;
