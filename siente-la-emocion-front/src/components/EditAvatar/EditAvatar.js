import React from 'react';

import './EditAvatar.css';
import { useState } from 'react';
import useUser from '../../hooks/useUser';

const EditAvatar = () => {
  const { token } = useUser();
  const [putAvatar, setPutAvatar] = useState('');
  const { user } = useUser();

  const newAvatar = (event) => {
    setPutAvatar(event.target.files[0]);
  };

  const editAvatar = async (event) => {
    event.preventDefault();
    try {
      const dataAvatar = {
        avatar: putAvatar,
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
      console.log('SIIIII', putAvatar);
      /*  */

      if (response.ok) {
        console.log('correcto');
        function refreshPage() {
          window.location.reload(false);
        }
        refreshPage();
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

  const refreshPage = () => {
    window.location.reload(false);
  };

  return (
    <>
      <>
        <div id='compm' className='avatar-div'>
          <form onSubmit={editAvatar}>
            <div className='forem-profile'>
              {!user.avatar ? (
                <>
                  <label htmlFor='avaar'>
                    <img
                      className='user-avatar'
                      src={
                        'http://localhost:4000/uploads/3871b0f9-4f40-4c39-ba68-9860a73fe5a5.jpg'
                      }
                      alt='aaaaa'
                    />{' '}
                  </label>
                  <input
                    type='file'
                    id='avaar'
                    style={{ display: 'none' }}
                    accept='image/*'
                    onChange={newAvatar}
                    /* button={button} */
                  />
                </>
              ) : (
                <div>
                  {' '}
                  <label htmlFor='avaar'>
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
                    onChange={newAvatar}
                    /* button={button} */
                  />
                </div>
              )}{' '}
            </div>
            <div className='buttonForm'>
              <button type='submit' className='submit'>
                Actualizar
              </button>
            </div>
          </form>
        </div>
      </>
    </>
  );
};
export default EditAvatar;
