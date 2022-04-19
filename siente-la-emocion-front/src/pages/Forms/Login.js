import LoginForm from '../../components/Forms/LoginForm';
import { Link, Outlet } from 'react-router-dom';
import { ModalCircle } from '../../components/Forms/ModalCircle';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import '../../components/Forms/Forms.css';

const LoginPage = () => {
  const { token, error } = useContext(AuthContext);
  return (
    <div className='align-modal'>
      <div className='modal-box'>
        <div className='form-titles'>
          <div className='circle-content'>
            <button
              className='flex'
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
            <p className='circle-name'>Inicio de sesión</p>
          </div>
        </div>
        <ModalCircle name='Inicio de sesión'></ModalCircle>
        <div className='modal1'></div>
        <div className='modal2'>
          <LoginForm />
          <div className='circle-background'></div>
          <p className='login-register'>
            ¿No tienes cuenta?
            <Link to='/register'>¡Regístrate!</Link>
          </p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default LoginPage;
