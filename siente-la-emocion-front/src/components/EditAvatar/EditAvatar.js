/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';
/**
 * #################
 * ## Componenets ##
 * #################
 */

import Error from '../error/Error';
import Header from '../Header/Header';
import BodyHeaderHomePage from '../Header/MainHeader/BodyHeaderHomePage';

/**
 * ###########
 * ## React ##
 * ###########
 */
import React, { useEffect } from 'react';
import { useState } from 'react';

const EditAvatar = () => {
  const [av, setAv] = useState('');
  const { user, token } = useUser();
  const { error, setError } = useState('');

  useEffect(() => {
    //creamos una funcion manejadora del boton del formulario
    const updateAvatar = async (e) => {
      //Actualizamos la foto del avatar con una peticion de tipo 'PUT'
      //Al ser de tipo archivo, segimos el proceso de new FormData(), append , etc.
      //NO TE OLVIDES, EL BACK ESTA ESPERANDO POR EL MISMO NOMBRE, en este caso 'avatar'.
      try {
        if (av) {
          let avatar = new FormData();
          avatar.append('avatar', av);

          //Actualizamos
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND}/users/edit/avatar`,
            {
              method: 'PUT',
              body: avatar,
              headers: {
                Authorization: token,
              },
            }
          );
          const body = await response.json();
          if (response.ok) {
            //refrescamos la pagina si todo a ido bien para mostrar el avatar seleccionado por el usuario sin necesidad de un boton
            window.location.reload(true);
          } else {
            setError(body.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateAvatar();
  }, [av]);

  //Creamos la funcion que va a controlar la imagen
  const photoAvatar = (event) => {
    setAv(event.target.files[0]);
  };

  //si no tienes token no puedes editar perfil, por lo tanto no puedes llegar aqui
  if (!token) {
    return (
      <>
        <Header
          bg={'/img/principal.jpg'}
          to={''}
          button={''}
          body={<BodyHeaderHomePage />}
          className={'simpleHeader'}
        />
        <Error>No te has registrado</Error>
      </>
    );
  }

  //Devolvemos lo que deseamos pintar si tienes token
  return (
    <>
      <form className='forem-profile'>
        <div>
          <label>
            <input
              type='file'
              id='avaar'
              style={{ display: 'none' }}
              onChange={photoAvatar}
            />
            <img
              className='user-avatar'
              /* porque no funciona? 
            src={
                user.avatar
                  ? `${process.env.REACT_APP_BACKEND}/uploads/${user.avatar}}`
                  : 'https://images.pexels.com/photos/9035242/pexels-photo-9035242.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
              } */
              /* src={'http://localhost:4000/uploads/' + user.avatar} */
              src={
                user.avatar
                  ? 'http://localhost:4000/uploads/' + user.avatar
                  : 'https://affinitaslegal.com/wp-content/uploads/2020/08/imagen-perfil-sin-foto.jpg'
              }
              alt='Avatar'
            />
          </label>
        </div>
      </form>
      {error ? <Error>{error}</Error> : null}
    </>
  );
};
export default EditAvatar;
