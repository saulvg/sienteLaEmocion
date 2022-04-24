import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import BlueButton from './BlueButton';
import './Forms.css';
import decode from 'jwt-decode';
import Loading from '../loading/Loading';

const DeleteAccount = () => {
  const { token, setToken } = useContext(AuthContext);
  const [done, setDone] = useState('');
  const navigate = useNavigate();
  const redirect = () => navigate('/');
  let idUser;
  if (token) {
    idUser = decode(token);
    console.log(idUser.id);
  }
  const deleteUser = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/users/${idUser.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: token,
        },
      }
    );

    const body = await res.json();

    if (res.ok) {
      console.log('Usuario eliminado');
      setDone(true);
      setTimeout(redirect, 5000);
      setToken(null);
    } else {
      console.log(body.message);
      console.log('error');
    }
    console.log('ee');
  };

  return (
    <>
      (
      <form>
        <div className='align-modal'>
          <div className='modal-box'>
            <div className='modal1'></div>
            <div className='modal3'>
              <div className='circle-background2'></div>
            </div>
            <div className='modal4'>
              <div className='circle-background3'></div>
            </div>
            <div className='modal2'>
              <div className='circle-background'></div>
              {!done ? (
                <>
                  <p className='delete-message'>
                    ¿Seguro que quieres eliminar tu cuenta?
                  </p>
                  <div className='delete-buttons'>
                    <BlueButton name='Eliminar' onClick={deleteUser} />
                    <BlueButton name='Cancelar' />
                  </div>
                </>
              ) : (
                <Loading className='confirmation'>
                  Tu cuenta ha sido eliminada
                </Loading>
              )}
            </div>
          </div>
        </div>
      </form>
      )
    </>
  );
};

export default DeleteAccount;
