import { useEffect, useState } from 'react';
import { InputElement, InputPassword } from './InputElement';
import BlueButton from './BlueButton';
import { Navigate, useNavigate } from 'react-router-dom';
import Error from '../error/Error';
import Loading from '../loading/Loading';

const RegisterForm = () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dni_nie, setDni_nie] = useState('');
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [done, setDone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
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
      const redirect = () => navigate('/login');

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
