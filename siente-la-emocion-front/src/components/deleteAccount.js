import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import BlueButton from './BlueButton';
import './Forms.css';

const DeleteAccount = () => {
  const { token } = useContext(AuthContext);
  const [done, setDone] = useState('');
  const deleteUser = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/7`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    });

    if (res.ok) {
      console.log('Usuario eliminado');
      setDone(true);
    } else {
      const error = await res.json();
      console.log('error');
    }
    console.log('eee');
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
                <p className='confirmation'>Tu cuenta ha sido eliminada</p>
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
