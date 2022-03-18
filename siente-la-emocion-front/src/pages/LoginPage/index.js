import LoginForm from '../../components/LoginForm';
import { Link, Outlet } from 'react-router-dom';
import { ModalCircle } from '../../components/ModalCircle';

const LoginPage = () => {
  return (
    <div className='align-modal'>
      <div className='modal-box'>
        <div className='flex'>
          <svg
            className='back-svg'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            ></path>
          </svg>
          <p className='goback'>Volver</p>
        </div>
        <p className='circle-name'>Inicio de sesión</p>
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
