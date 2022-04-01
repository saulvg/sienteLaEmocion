import { useState, useEffect, useContext } from 'react';
import './Forms.css';
import { InputElement } from './InputElement';
import { ModalCircle } from './ModalCircle';
import BlueButton from './BlueButton';
import { AuthContext } from '../../App';
import { Navigate } from 'react-router-dom';

const EditPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const [doPasswordsMatch, setDoPasswordMatch] = useState(false);
  const { token, setToken } = useContext(AuthContext);
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (newPassword === repeatNewPassword) {
      setDoPasswordMatch(true);
    } else {
      setDoPasswordMatch(false);
    }
  }, [newPassword, repeatNewPassword]);

  const editPassword = async (e) => {
    e.preventDefault();

    if (!doPasswordsMatch) {
      return;
    }

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND}/users/edit/password`,
      {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      }
    );

    if (res.ok) {
      console.log('Contraseña actualizada, inicia sesión de nuevo');
      setToken('');
      setDone(true);
    } else {
      const error = await res.json();
      console.error(error.message);
    }
  };

  return (
    <>
      (
      <form onSubmit={editPassword}>
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
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M10 19l-7-7m0 0l7-7m-7 7h18'
                    ></path>
                  </svg>
                  <p className='goback'>Volver</p>
                </button>
                <p className='circle-name'>Contraseña</p>
              </div>
            </div>
            <ModalCircle />
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
                  <InputElement
                    id='oldPassword'
                    labelName='Contraseña actual'
                    type='password'
                    value={oldPassword}
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  ></InputElement>
                  <InputElement
                    labelName='Contraseña nueva'
                    id='newPassword'
                    type='password'
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  ></InputElement>
                  <InputElement
                    labelName='Contraseña nueva'
                    type='password'
                    id='repeatNewPassword'
                    value={repeatNewPassword}
                    onChange={(e) => {
                      setRepeatNewPassword(e.target.value);
                    }}
                  ></InputElement>
                  <div className='delete-buttons'>
                    <BlueButton name='Cambiar' type='submit' />
                    <BlueButton name='Cancelar' />
                  </div>
                </>
              ) : (
                <p className='confirmation'>Tu contraseña se ha actualizado</p>
              )}
            </div>
          </div>
        </div>
      </form>
      )
    </>
  );
};

export default EditPassword;
