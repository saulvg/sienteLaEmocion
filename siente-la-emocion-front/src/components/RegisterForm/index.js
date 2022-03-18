import { useState } from 'react';
import { InputElement } from '../InputElement';
import BlueButton from '../BlueButton';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dni_nie, setDni_nie] = useState('');
  const [username, setUsername] = useState('');
  const [done, setDone] = useState('');

  const register = async (e) => {
    e.preventDefault();

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

    if (res.ok) {
      setDone(true);
    } else {
      const error = await res.json();
    }
  };

  return (
    <>
      {!done ? (
        <form onSubmit={register}>
          <div class='form-elements'>
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
            <InputElement
              labelName='Contraseña'
              type='text'
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
          <BlueButton name='registrarse' />
        </form>
      ) : (
        <div className='confirmation'>
          Te has registrado correctamente. Revisa tu correo para validar tu
          cuenta
        </div>
      )}
    </>
  );
};

export default RegisterForm;
