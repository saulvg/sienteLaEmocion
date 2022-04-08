import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import decode from 'jwt-decode';
import useActivities from '../../hooks/useActivities';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';

import './EditProfile.css';
import { EditAvatar } from '../EditAvatar/EditAvatar';
import { InputElement, TextareaElement } from '../Forms/InputElement';
import BlueButton from '../Forms/BlueButton';
import DeleteAccount from '../Forms/DeleteAccount';
import { Modal } from '../Modal/Modal';
//username, newEmail, phone, biography, postalCode, dni_nie
const EditProfile = ({ oldName, oldEmail }) => {
  const { token, user } = useUser();
  const [username, setUsername] = useState('');
  const [newEmail, setEmail] = useState(''); // FUNCIONA RARO
  const [phone, setPhone] = useState('');
  const [biography, setBiography] = useState('');
  const { idUser } = useParams();
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');

  const [dni_nie, setDni_nie] = useState('');

  const edit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND}/users/edit`, {
        method: 'PUT',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          newEmail,
          phone,
          biography,
          postalCode,
          dni_nie,
        }),
      });

      const body = await res.json();
      if (res.ok) {
        console.log(body);
      } else {
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //const usuario = Number(idUser);
  //const decoded = decode(token);
  return (
    <>
      {token && user ? (
        <div className='background-color-1'>
          <div className='background-color-2'>
            <div className='avatar-profile'>
              <EditAvatar />
            </div>{' '}
            <form onSubmit={edit} className='form-profile'>
              <div>
                <InputElement
                  classLabel='label-profile'
                  labelName='Nombre'
                  className='input-profile'
                  type='text'
                  id='name'
                  name='name'
                  pattern='[a-z]{1,15}'
                  title='Debe contener letra minúscula'
                  placeholder={user.username}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />

                <InputElement
                  className='input-profile'
                  classLabel='label-profile'
                  labelName='Email'
                  type='email'
                  id='email'
                  name='email'
                  placeholder={user.email}
                  value={newEmail}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <InputElement
                  className='input-profile'
                  classLabel='label-profile'
                  labelName='Teléfono'
                  type='tel'
                  id='tel'
                  name='tel'
                  pattern='[0-9]{9}'
                  placeholder={user.phone}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <InputElement
                  className='input-profile'
                  labelName='Código Postal'
                  classLabel='label-profile'
                  type='number'
                  id='postalCode'
                  name='postalCode'
                  pattern='[0-9]{9}'
                  placeholder={user.postalCode}
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
                <InputElement
                  className='input-profile'
                  classLabel='label-profile'
                  labelName='DNI / NIE'
                  type='text'
                  id='dni_nie'
                  name='dni_nie'
                  pattern='[0-9]{8}[A-Za-z]{1}'
                  title='Debe poner 8 números y una letra'
                  placeholder={user.dni_nie}
                  value={dni_nie}
                  onChange={(e) => {
                    setDni_nie(e.target.value);
                  }}
                />
                <TextareaElement
                  classLabel='label-profile'
                  className='textarea-profile'
                  labelName='Sobre mí'
                  id='biography'
                  name='biography'
                  placeholder={user.biography}
                  value={biography}
                  onChange={(e) => {
                    setBiography(e.target.value);
                  }}
                />
              </div>
              <BlueButton
                className='button-save'
                name='Guardar cambios'
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  name='entry_votes_input'
                  onChange={(e, newValue) => {
                    e.stopPropagation();
                    edit(newValue);
                  }}
                />
              </BlueButton>
            </form>
            {error ?? <div className='error-msg-profile'>{error}</div>}
          </div>{' '}
        </div>
      ) : (
        <>
          <div></div>
        </>
      )}
    </>
  );
};

export default EditProfile;
/**/
