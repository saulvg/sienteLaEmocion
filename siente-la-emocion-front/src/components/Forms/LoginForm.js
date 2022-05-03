import { useContext, useState } from 'react';
import { InputElement, InputPassword } from './InputElement';
import BlueButton from './BlueButton';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import Error from '../error/Error';

const LoginForm = () => {
  const [togglePassword, setTogglePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token, setToken } = useContext(AuthContext);
  const [error, setError] = useState('');

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const body = await res.json();
      if (res.ok) {
        setToken(body.data.token);
        console.log('iniciado');
      } else {
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <BlueButton name='Iniciar sesión' />
      </form>
    </>
  );
};

export default LoginForm;
