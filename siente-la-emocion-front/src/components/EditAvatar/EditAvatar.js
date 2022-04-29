import React from 'react';

import './EditAvatar.css';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
const Avatar = ({ putAvatar, setPutAvatar, button }) => {
  const { user } = useUser();

  const editAvatar = (event) => {
    setPutAvatar(event.target.files[0]);
  };
  return (
    <div onSubmit={editAvatar} className='forem-profile'>
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
            onChange={editAvatar}
            button={button}
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
            onChange={editAvatar}
            button={button}
          />
        </div>
      )}{' '}
    </div>
  );
};

const EditAvatar = () => {
  const { token } = useUser();
  const [putAvatar, setPutAvatar] = useState('');

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

  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <>
        <div id='compm'>
          <form onSubmit={editAvatar}>
            {/* <Company
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  placeholder={activity.company}
                />
                <ExperiencesCategory
                  companyCategory={companyCategory}
                  setCompanyCategory={setCompanyCategory}
                  placeholder={activity.experiences_category}
                /> 
                
                
                
                
                
                */}

            <Avatar putAvatar={putAvatar} setPutAvatar={setPutAvatar}>
              {' '}
            </Avatar>
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
