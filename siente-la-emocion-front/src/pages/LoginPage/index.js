import LoginForm from '../../components/LoginForm';
import { Link, Outlet } from 'react-router-dom';
import { ModalCircle } from '../../components/ModalCircle';

const LoginPage = () => {
  return (
    <div className='align-modal'>
      <div className='modal-box'>
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
