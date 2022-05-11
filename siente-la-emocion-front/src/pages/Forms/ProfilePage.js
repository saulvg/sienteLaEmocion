/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';

/**
 * ################
 * ## Components ##
 * ################
 */
import EditProfile from '../../components/Forms/EditProfile';
import Header from '../../components/Header/Header';
import DeleteAccount from '../../components/Forms/DeleteAccount';
import UserExperiences from '../../components/Experiences/UserExperiences/UserExperiences';
import PerfilAdmin from '../../components/PerfilAdmin/PerfilAdmin';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import { ModalCircle } from '../../components/Forms/ModalCircle';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import decode from 'jwt-decode';

//Página que pinta el perifil del usuario X o el del admin
const ProfilePage = () => {
  //Conseguimos el token para decodificarlo y saber su rol es admin o normal
  const { token, setToken } = useUser();
  const decoded = decode(token);
  //Navigate para redirigir hacia alguna pagina
  const navigate = useNavigate();
  //Estado
  const [deleteModal, setDeleteModal] = useState(false);

  //Devolvemos todos los componenetes, si es admin una cosa si es usuario normal otra, si el estado 'deleteModal' es true o si es false
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
        <PerfilAdmin />
      ) : (
        <>
          {!deleteModal ? (
            <div className='align-modal'>
              <div className='modal-box'>
                <div className='avatar-div'></div>
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
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
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
                    </Link>
                    <button
                      className='profile-options'
                      onClick={() => {
                        setToken(null);
                        navigate('/');
                      }}
                    >
                      Cerrar sesión
                    </button>
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
