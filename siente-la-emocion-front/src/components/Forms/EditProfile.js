/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * ################
 * ## Hooks ##
 * ################
 */
import useUser from '../../hooks/useUser';
import useUserInfo from '../../hooks/useUserInfo';

/**
 * ################
 * ## Components ##
 * ################
 */
import { InputElement, TextareaElement } from './InputElement';
import BlueButton from './BlueButton';
import EditAvatar from '../../components/EditAvatar/EditAvatar';
import Loading from '../Loading/Loading';
import Error from '../error/Error';

//Pagina que pinta el formulario para editar el perfil de usuario
const EditProfile = () => {
  const { token, user } = useUser('');
  //Estados de variables que necesitamos
  const [username, setUsername] = useState('');
  const [newEmail, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [biography, setBiography] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [dni_nie, setDni_nie] = useState('');
  const navigate = useNavigate();
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');

  useUserInfo(
    token,
    setUsername,
    setEmail,
    setPhone,
    setBiography,
    setPostalCode,
    setDni_nie
  );

  //Funcion manejadora del formulario actualizar los datos del perfil
  const edit = async (e) => {
    e.preventDefault();
    //intentamos actualizar los datos del formulario con la peticion tipo 'PUT'
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
        setLoad(body.message);
      } else {
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones (token y user ?), sino devolvemos el correspondiente error en Front
  return (
    <>
      {token && user ? (
        <>
          {!load ? (
            <>
              <EditAvatar />
              <form onSubmit={edit}>
                <div className='profile-elements'>
                  <InputElement
                    labelName='Nombre'
                    type='text'
                    id='name'
                    name='name'
                    //placeholder={info.username}
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
                    //placeholder={info.email}
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
                    //placeholder={info.phone}
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
                    //placeholder={info.postalCode}
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
                    //placeholder={info.dni_nie}
                    value={dni_nie}
                    onChange={(e) => {
                      setDni_nie(e.target.value);
                    }}
                  />
                  <TextareaElement
                    labelName='Sobre mí'
                    id='biography'
                    name='biography'
                    //placeholder={info.biography}
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
              {error ? <Error>{error}</Error> : null}
            </>
          ) : (
            <div>
              <div>{load}</div>
              <BlueButton
                name='Pagina principal'
                onClick={() => navigate('/')}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <Loading>{error}</Loading>
        </>
      )}
    </>
  );
};

export default EditProfile;
/**/
