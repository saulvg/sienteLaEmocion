import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import useUser from '../../hooks/useUser';
import decode from 'jwt-decode';
import Error from '../../components/error/Error';

const ExperiencePhoto = () => {
  const { token } = useUser();
  const navigate = useNavigate();
  const { idExperience } = useParams();
  //const { activity, error } = useActivity(idExperience);

  const [photos1, setPhotos1] = useState('');
  const [photos2, setPhotos2] = useState('');
  const [photos3, setPhotos3] = useState('');

  const uploadFiles = async (e) => {
    e.preventDefault();
    try {
      let photoBody = new FormData();
      photoBody.append('photo1', photos1);
      photoBody.append('photo2', photos2);
      photoBody.append('photo3', photos3);

      console.log('soy photoBody', photoBody);

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

      const loading = () => {
        const redirect = document.querySelector('.upFiles');
        redirect.innerHTML = `
        <div id='entryCreated' >
          <div>${body.message}</div>
          <div className='loading'></div>
        </div>
      `;
      };
      const redirect = () => navigate('/');
      if (response.ok) {
        console.log('foto subida con exito', body.message);
        loading();
        setTimeout(redirect, 5000);
      } else {
        console.error('Error body', body.message);
      }
    } catch (error) {
      console.error('catch', error);
    }
  };
  const dataPhoto1 = (event) => {
    setPhotos1(event.target.files[0]);
  };
  const dataPhoto2 = (event) => {
    setPhotos2(event.target.files[0]);
  };

  const dataPhoto3 = (event) => {
    setPhotos3(event.target.files[0]);
  };
  if (!token) {
    return <Error>No te has registrado</Error>;
  }
  const decoded = decode(token);

  return (
    <>
      <Header
        to={''}
        button={''}
        body={<BodyHeaderHomePage />}
        className={'simpleHeader'}
      />
      {decoded.role === 'admin' ? (
        <div className='upFiles'>
          <form onSubmit={uploadFiles}>
            <label>
              Selecciona foto 1
              <input type={'file'} onChange={dataPhoto1} required />
            </label>
            <label>
              Selecciona foto 2
              <input type={'file'} onChange={dataPhoto2} required />
            </label>
            <label>
              Selecciona foto 3
              <input type={'file'} onChange={dataPhoto3} required />
            </label>
            <button>Subir</button>
          </form>
        </div>
      ) : (
        <div>No tienes permisos</div>
      )}
    </>
  );
};
export default ExperiencePhoto;
