// ## Style ##
import './experiencePhoto.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

/**
 * ################
 * ## Components ##
 * ################
 */
import Header from '../../../components/Header/Header';
import BodyHeaderHomePage from '../../../components/Header/MainHeader/BodyHeaderHomePage';
import Error from '../../../components/error/Error';
import Loading from '../../../components/Loading/Loading';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../../hooks/useUser';
import BlueButton from '../../../components/Forms/BlueButton';

//Pagina que pinta el formulario para que el admin pueda incluir 3 fotos de una experiencia
const ExperiencePhoto = () => {
  //Estados de variables que necesitamos
  const { token } = useUser();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [load, setLoad] = useState('');
  //Parametro del id de la experienia que cogemos de la ruta
  const { idExperience } = useParams();
  //Estados del formulario
  const [photos1, setPhotos1] = useState('');
  const [photos2, setPhotos2] = useState('');
  const [photos3, setPhotos3] = useState('');

  //Creamos una funcion manejadora del boton del formulario
  const uploadFiles = async (e) => {
    e.preventDefault();
    //intentamos enviar los datos del formulario con una peticion de tipo POST
    //Al ser de tipo archivo, segimos el proceso de new FormData(), append , etc.
    //NO TE OLVIDES, EL BACK ESTA ESPERANDO POR EL MISMO NOMBRE, en este caso photoBody, photo1, ...
    try {
      let photoBody = new FormData();
      photoBody.append('photo1', photos1);
      photoBody.append('photo2', photos2);
      photoBody.append('photo3', photos3);
      //Posteamos
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}/photos`,
        {
          method: 'POST',
          body: photoBody,
          headers: {
            Authorization: token,
          },
        }
      );
      const body = await response.json();

      const redirect = () => navigate('/');
      //Si todo a ido bien informamos al usuario modificando el DOM, mostramos una pantalla de carga y redirigimos a la siguiente ventana
      if (response.ok) {
        setLoad(body.message);
        setTimeout(redirect, 5000);
      } else {
        console.error('Error body', body.message);
        setErrorMessage(body.message);
      }
    } catch (error) {
      console.error('catch', error);
    }
  };
  //Creamos las funciones que van a controlar cada una de las imagenes 'Componentes', como solo las utilizamos aqui las creamos aqui
  const dataPhoto1 = (event) => {
    setPhotos1(event.target.files[0]);
  };
  const dataPhoto2 = (event) => {
    setPhotos2(event.target.files[0]);
  };

  const dataPhoto3 = (event) => {
    console.log('soy event photo experience', event.target);
    setPhotos3(event.target.files[0]);
  };

  //Si no tienes token no puedes llegar hasta aqui
  if (!token) {
    return (
      <>
        <Header
          bg={'/img/principal.jpg'}
          to={''}
          button={''}
          body={<BodyHeaderHomePage />}
          className={'simpleHeader'}
        />
        <Error>No te has registrado</Error>
      </>
    );
  }
  //Decodificamos el token para mas adelante saber si eres admin o no. gracias a 'jwt-decode' y el token que tenemos de forma global en toda la App
  const decoded = decode(token);

  //Devolvemso lo que desamos pintar si se cumplen las condiciones (eres admin ?), sino devolvemos el correspondiente error en Front
  return (
    <>
      <Header
        bg={'/img/principal.jpg'}
        to={''}
        button={''}
        body={<BodyHeaderHomePage />}
        className={'simpleHeader'}
      />
      {decoded.role === 'admin' ? (
        <>
          {!load ? (
            <>
              {!errorMessage ? (
                <div className='photos-form container'>
                  <form onSubmit={uploadFiles}>
                    <h2 className='photo-form-title'>
                      Añade el resto de fotos
                    </h2>
                    <div className='flex-form-photos'>
                      <label className='label-element'>
                        Selecciona foto 1
                        <input
                          type={'file'}
                          className='w-full'
                          onChange={dataPhoto1}
                          required
                        />
                      </label>
                      <label className='label-element'>
                        Selecciona foto 2
                        <input
                          type={'file'}
                          className='w-full'
                          onChange={dataPhoto2}
                          required
                        />
                      </label>
                      <label className='label-element'>
                        Selecciona foto 3
                        <input
                          type={'file'}
                          className='w-full'
                          onChange={dataPhoto3}
                          required
                        />
                      </label>
                    </div>
                    <BlueButton name='Subir'></BlueButton>
                  </form>
                </div>
              ) : (
                <Error>{errorMessage}</Error>
              )}
            </>
          ) : (
            <Loading>{load}</Loading>
          )}
        </>
      ) : (
        <Error>No tienes permisos</Error>
      )}
    </>
  );
};
export default ExperiencePhoto;
