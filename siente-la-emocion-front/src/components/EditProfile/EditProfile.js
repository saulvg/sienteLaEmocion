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
        console.error('Error', body.message);
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
                  labelName='Nombre'
                  type='text'
                  id='name'
                  name='name'
                  placeholder={user.username}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />

                <InputElement
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
                  labelName='Teléfono'
                  type='number'
                  id='phone'
                  name='phone'
                  placeholder={user.phone}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
                <InputElement
                  labelName='Código Postal'
                  type='number'
                  id='postalCode'
                  name='postalCode'
                  placeholder={user.postalCode}
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                  }}
                />
                <InputElement
                  labelName='DNI / NIE'
                  type='text'
                  id='dni_nie'
                  name='dni_nie'
                  placeholder={user.dni_nie}
                  value={dni_nie}
                  onChange={(e) => {
                    setDni_nie(e.target.value);
                  }}
                />
                <TextareaElement
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
          </div>{' '}
        </div>
      ) : (
        <>
          <div className='otro'>FALTA PERFIL DE OTRO USUARIO</div>
        </>
      )}
    </>
  );
};

export default EditProfile;
/**/
