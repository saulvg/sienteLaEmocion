import { useRef, useState } from 'react';
import useUser from '../../hooks/useUser';
import BlueButton from '../Forms/BlueButton';

//import './EditAvatar.css';

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
          body: file[0],
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

  return user && token ? (
    <form onSubmit={edit} className='forem-profile'>
      <label htmlFor='avaar'>
        {' '}
        hola
        <img
          className='user-avaar'
          src={'http://localhost:4000/uploads/' + user.avatar}
          alt='aaaaa'
        />
      </label>
      <input
        type='file'
        id='avaar'
        style={{ display: 'none' }}
        accept='image/*'
        onChange={(e) => {
          setAvatar(e.target.files[0]);
        }}
      />
    </form>
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
<input
          id='xCompany'
          type={'file'}
          onChange={valueCompanyPhotoHeader}
          required
        />
      </label>



/>;*/
