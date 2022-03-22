//import './style.css';
//import Avatar from '../Avatar';
/*import formatEmail from "../../helpers/formatEmail";*/
import { useState } from 'react';
import EditUserForm from './EditProfile';
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';

const UserProfile = ({ id, name, avatar, email }) => {
  const { user, token } = useUser();
  return user && token ? (
    <div className='user_profile'>
      <>
        <EditUserForm oldEmail={email} oldName={name} />
      </>
      )
    </div>
  ) : (
    <div>aaaaa</div>
  );
};

export default UserProfile;
