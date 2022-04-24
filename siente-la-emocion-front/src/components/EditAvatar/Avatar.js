import './EditAvatar.css';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
/*
const Av = ({ putAvatar, setPutAvatar }) => {
  const { user } = useUser();

  const editAvatar = (event) => {
    setPutAvatar(event.target.files[0]);
  };
  return (
    <div onSubmit={editAvatar} className='forem-profile'>
      <label htmlFor='avaar'>
        {' '}
        hola
        <img
          className='user-avatar'
          src={'http://localhost:4000/uploads/' + user.avatar}
          alt='aaaaa'
        />
      </label>
      <input
        type='file'
        id='avaar'
        style={{ display: 'none' }}
        accept='image/*'
        onChange={editAvatar}
      />
    </div>
  );
};
*/
export const Avatar = () => {
  const { token, user } = useUser();
  const [avatar, setAvatar] = useState('');

  const editAvatar = async (event) => {
    event.preventDefault();
    setAvatar(event.target.files[0]);

    try {
      const dataAvatar = {
        avatar: avatar,
      };
      const payload = new FormData();
      for (const [key, value] of Object.entries(dataAvatar)) {
        payload.append(key, value);
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/edit/avatar`,

        {
          method: 'PUT',
          body: payload,
          headers: {
            Authorization: token,
          },
        }
      );
      const body = await response.json();
      console.log('SIIIII', avatar);
      /*  */

      if (response.ok) {
        console.log('correcto');
      } else {
        console.error('Error', body.message);
      }
      /*  */
    } catch (error) {
      console.error(error);
    }
  };
  if (!token) {
    return <div>No te has registrado</div>;
  }

  return (
    <>
      <>
        <div onSubmit={editAvatar} className='forem-profile'>
          <label htmlFor='avaar'>
            {' '}
            hola
            <img
              className='user-avatar'
              src={'http://localhost:4000/uploads/' + user.avatar}
              alt='aaaaa'
            />
          </label>
          <input
            type='file'
            id='avaar'
            style={{ display: 'none' }}
            accept='image/*'
            onChange={editAvatar}
          />
          <div className='buttonForm'>
            <button type='submit' className='submit'>
              Actualizar
            </button>
          </div>
          ;
        </div>
        ; )
      </>
      )
    </>
  );
};
