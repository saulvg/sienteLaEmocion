/*import { useRef, useState } from 'react';
import useUser from '../../hooks/useUser';
import BlueButton from '../Forms/BlueButton';

import './EditAvatar.css';
//aaaa
export const EditAvatar = () => {
  //const { users } = useUserProfile();
  //const { user } = useUser();
  const { user, error, token } = useUser();
  const [avatar, setAvatar] = useState('');
  const imageInputRef = useRef();
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [didUserUpdateAvatar, setDidUserUpdateAvatar] = useState(false);
  if (error) return <div>Hubo un error: {error}</div>;
  const edit = async (e) => {
    //e.preventDefault();

    try {
      let file = new FormData();
      file.append('image', avatar);
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/edit/avatar`,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
          },
          body: file,
        }
      );

      //....

      const body = await res.json();
      if (res.ok) {
        console.log(body);
      } else {
        console.error('Error', body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onFileChange = (event) => {
    console.log('AVATAR SUBIDO', event.target.files[0]);
    setAvatar(event.target.files[0]);
  };
  return user && token ? (
    <form onSubmit={edit} className='forem-profile'>
      <label htmlFor='avaar'>
        {' '}
        hola
        <img
          className='user-avatar'
          src={'http://localhost:4000/uploads/' + user.avatar}
          alt='aaaaa'
        />
        <input
          type='file'
          id='avaar'
          style={{ display: 'none' }}
          accept='image/*'
          onChange={onFileChange}
        />
      </label>
      <button>Subir</button>
    </form>
  ) : (
    <div></div>
  );
};
/*
<img
  className='user-avatar'
  src={'http://localhost:4000/uploads/' + user.avatar}
  alt='aaaaa'
<input
          id='xCompany'
          type={'file'}
          onChange={valueCompanyPhotoHeader}
          required
        />
      </label>
/>;*/
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
  );
};

export const EditAvatar = () => {
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
