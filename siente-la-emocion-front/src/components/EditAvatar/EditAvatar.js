import { useState } from 'react';
import useUser from '../../hooks/useUser';
import BlueButton from '../Forms/BlueButton';

import './EditAvatar.css';

export const EditAvatar = ({ imageInputRef }) => {
  //const { users } = useUserProfile();
  //const { user } = useUser();
  const { user, error, token } = useUser();
  const [newAvatar, setNewAvatar] = useState(user.avatar);
  const [didUserUpdateAvatar, setDidUserUpdateAvatar] = useState(false);
  if (error) return <div>Hubo un error: {error}</div>;
  const edit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/users/edit/avatar`,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
          },
        }
      );

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

  return user && token ? (
    <div className='editable_avatar'>
      <label htmlFor='avatar'>
        <img
          className='user-avatar'
          src={'http://localhost:4000/uploads/' + user.avatar}
          alt='aaaaa'
        />
      </label>
      <input
        ref={imageInputRef}
        type='file'
        id='avatar'
        style={{ display: 'none' }}
        accept='image/*'
        onChange={(e) => {
          setDidUserUpdateAvatar(true);
          setNewAvatar(URL.createObjectURL(e.target.files[0]));
        }}
      />
    </div>
  ) : (
    <div></div>
  );
};

export default EditAvatar;
/*
<img
  className='user-avatar'
  src={'http://localhost:4000/uploads/' + user.avatar}
  alt='aaaaa'
/>;*/
