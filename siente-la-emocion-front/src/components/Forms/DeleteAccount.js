// ## Style ##
import './Forms.css';

/**
 * ################
 * ## Components ##
 * ################
 */
import Loading from '../Loading/Loading';
import BlueButton from './BlueButton';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../App';
import decode from 'jwt-decode';

//Componente que utilizamos para que un usuario elimine su cuenta
const DeleteAccount = () => {
  //Conseguimos el token y la posibilidad de cambiar su valor
  const { token, setToken } = useContext(AuthContext);
  //Para redirigir
  const navigate = useNavigate();
  const redirect = () => navigate('/');
  //Estado para controlar el componente
  const [done, setDone] = useState('');

  //Declaramos una variable para asignarle el valor del token decodificado del usuario
  let idUser;
  if (token) {
    idUser = decode(token);
  }
  //Funicon manejadora pare llevar a cabo la peticion 'DELETE' que eliminara la cuenta del usuario
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

    //si todo a ido bien cambiamos el estado del token a null
    if (res.ok) {
      setDone(true);
      setTimeout(redirect, 5000);
      setToken(null);
    } else {
      console.log(body.message);
    }
  };

  //pintamos el componente
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
