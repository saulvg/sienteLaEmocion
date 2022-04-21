//import './style.css';
import useUser from '../../hooks/useUser';
import { Navigate, useParams } from 'react-router';
import EditProfile from '../../components/Forms/EditProfile';
import useActivities from '../../hooks/useActivities';
import { Modal } from '../../components/Modal/Modal';
import Review from '../../components/Review/Review';
import Header from '../../components/Header/Header';
import DeleteAccount from '../../components/Forms/DeleteAccount';
import UserExperiences from '../../components/UserExperiences/UserExperiences';
import decode from 'jwt-decode';
import useUserProfile from '../../hooks/useUserProfile';
import Error from '../../components/error/Error';
import PerfilAdmin from '../../components/PerfilAdmin/PerfilAdmin';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import { ModalCircle } from '../../components/Forms/ModalCircle';
import EditAvatar from '../../components/EditAvatar/EditAvatar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProfilePage = () => {
  const { token, setToken, user } = useUser();
  const { activities } = useActivities();
  const { idUser } = useParams();
  const usuario = Number(idUser);
  const { users } = useUserProfile();
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  //decoded.id === usuario && user ?
  /* 
  if (!token) {
    return <Error>No te has registrado</Error>;
  } */
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
        <PerfilAdmin />
      ) : (
        <>
          {!deleteModal ? (
            <div className='align-modal'>
              <div className='modal-box'>
                <div className='avatar-div'>
                  <EditAvatar />
                </div>
                <div className='form-titles'>
                  <div className='circle-content'>
                    <button
                      className='flex back-button'
                      onClick={() => {
                        window.history.go(-1);
                      }}
                    >
                      <svg
                        className='back-svg'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M10 19l-7-7m0 0l7-7m-7 7h18'
                        ></path>
                      </svg>
                      <p className='goback'>Volver</p>
                    </button>
                    <p className='circle-name'>Perfil</p>
                  </div>
                </div>
                <ModalCircle name='Registro'></ModalCircle>
                <div className='modal1-profile'></div>
                <div className='modal3'>
                  <div className='circle-background2'></div>
                </div>
                <div className='modal4'>
                  <div className='circle-background3'></div>
                </div>
                <div className='modal2'>
                  <div className='profile-flex'>
                    <div className='profile'>
                      <EditProfile />
                    </div>
                    <section className=' profile'>
                      <h2 className='experiences-title'>Mis experiencias </h2>
                      <UserExperiences />
                    </section>
                  </div>
                  <div className='circle-background'></div>
                  <div>
                    <Link className='profile-options' to='/editPassword'>
                      Cambia tu contraseña
                      <button
                        className='profile-options'
                        onClick={() => {
                          setToken(null);
                          navigate('/');
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </Link>
                    <button
                      className='profile-options'
                      onClick={() => {
                        setDeleteModal(true);
                      }}
                    >
                      Eliminar cuenta
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <DeleteAccount />
          )}
        </>
      )}
    </>
  );
};

export default ProfilePage;
