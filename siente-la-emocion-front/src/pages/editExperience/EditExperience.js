// ## Style ##
import './editExperience.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import decode from 'jwt-decode';
/**
 * ################
 * ## Hooks ##
 * ################
 */
import useUser from '../../hooks/useUser';
import useActivity from '../../hooks/useActivity';
/**
 * ################
 * ## Components ##
 * ################
 */

import Error from '../../components/error/Error';
import {
  CapacityCompany,
  PriceCompany,
  DateCompany,
  CityCompany,
  DirectionCompany,
  Text1Company,
  Text2Company,
  Text3Company,
  Text4Company,
  Text5Company,
  Text6Company,
} from '../../components/InputsCompanyForm/InputsCompanyForm';
import Header from '../../components/Header/Header';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import DeleteExperience from '../../components/DeleteExperience/DeleteExperience';
import Loading from '../../components/loading/Loading';
import BlueButton from '../../components/Forms/BlueButton';
import { ModalCircle } from '../../components/Forms/ModalCircle';

//Pagina que pinta el formulario para que el admin pueda editar casi todos los campos de una experiencia
const EditExperience = () => {
  const { idExperience } = useParams();
  const { token } = useUser();
  const navigate = useNavigate();
  //Estados de variables que necesitamos
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [load, setLoad] = useState('');

  //Estados del formulario
  //No necesitamos volver a crear los estado porque estos ya los tenemso en el formulario de 'CompanyForm', lo que queremso es obtener esos estados, y asi poder editarlos 'SetActivity'
  const { activity, setActivity } = useActivity(idExperience);
  //Funcion que recibe el nombre de un campo y lo edita la funcion que contiene con el valor qeu recibe
  const updateActivity = (field) => {
    return (value) => {
      setActivity({
        ...activity,
        experience: {
          ...activity.experience,
          [field]: value,
        },
      });
    };
  };

  //Funcion manejadora del formulario actualizar la experiencia
  const editExperience = async (event) => {
    event.preventDefault();
    //intentamos actualizar los datos del formulario con la peticion tipo 'PUT'
    try {
      const payload = {
        text_1: activity.experience.text_1,
        text_2: activity.experience.text_2,
        text_3: activity.experience.text_3,
        text_4: activity.experience.text_4,
        text_5: activity.experience.text_5,
        text_6: activity.experience.text_6,
        capacity: activity.experience.capacity,
        price: activity.experience.price,
        date: activity.experience.date.replace('Z', ''),
        city: activity.experience.city,
        direction: activity.experience.direction,
      };

      //Hacemos 'PUT'
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}`,
        {
          method: 'PUT',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      const body = await response.json();

      //Funcion que redirigira si todo a ido bien a al pagina principal
      const redirect = () => navigate(`/`);
      if (response.ok) {
        setLoad(body.message);
        setTimeout(redirect, 5000);
      } else {
        console.error('Error', body.message);
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  //Si ni tienes token no puedes llegar hasta aqui
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
  const decoded = decode(token);
  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones (eres admin ?), sino devolvemos el correspondiente error en Front
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
              {activity ? (
                <div id='companyForm'>
                  {!deleteModal ? (
                    <div className='align-modal'>
                      <div className='modal-box'>
                        <div className='form-titles'>
                          <div className='circle-content'>
                            <button
                              className='flex'
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
                            <p className='circle-name'>Editar Experiencia</p>
                          </div>
                        </div>
                        <ModalCircle name='Registro'></ModalCircle>
                        <div className='modal1'></div>
                        <div className='modal3'>
                          <div className='circle-background2'></div>
                        </div>
                        <div className='modal4'>
                          <div className='circle-background3'></div>
                        </div>
                        <div className='modal2'>
                          <form onSubmit={editExperience}>
                            <div className='flex company-form'>
                              <div className='company-div'>
                                <CapacityCompany
                                  companyCapacity={activity.experience.capacity}
                                  setCompanyCapacity={updateActivity(
                                    'capacity'
                                  )}
                                />
                                <PriceCompany
                                  companyPrice={activity.experience.price}
                                  setCompanyPrice={updateActivity('price')}
                                />
                                <DateCompany
                                  companyDate={activity.experience.date}
                                  setCompanyDate={updateActivity('date')}
                                />
                                {/* ... */}

                                <CityCompany
                                  companyCity={activity.experience.city}
                                  setCompanyCity={updateActivity('city')}
                                />
                                <DirectionCompany
                                  companyDirection={
                                    activity.experience.direction
                                  }
                                  setCompanyDirection={updateActivity(
                                    'direction'
                                  )}
                                />
                                <Text1Company
                                  companyText_1={activity.experience.text_1}
                                  setCompanyText_1={updateActivity(
                                    'companyText_1'
                                  )}
                                />
                                <Text2Company
                                  companyText_2={activity.experience.text_2}
                                  setCompanyText_2={updateActivity('text_2')}
                                />
                              </div>
                              <div className='company-div'>
                                <Text3Company
                                  companyText_3={activity.experience.text_3}
                                  setCompanyText_3={updateActivity('text_3')}
                                />
                                <Text4Company
                                  companyText_4={activity.experience.text_4}
                                  setCompanyText_4={updateActivity('text_4')}
                                />
                                <Text5Company
                                  companyText_5={activity.experience.text_5}
                                  setCompanyText_5={updateActivity('text_5')}
                                />
                                <Text6Company
                                  companyText_6={activity.experience.text_6}
                                  setCompanyText_6={updateActivity('text_6')}
                                />
                                {error ? <Error>{error}</Error> : null}
                              </div>
                            </div>
                            <div className='buttonForm'>
                              <button type='submit'>Actualizar</button>
                              <span onClick={() => setDeleteModal(true)}>
                                Eliminar experiencia{' '}
                              </span>
                            </div>
                          </form>
                          <div className='circle-background'></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <DeleteExperience />
                  )}
                </div>
              ) : (
                <Error>Esa experiencia no esta disponible</Error>
              )}
            </>
          ) : (
            <Loading>{load}</Loading>
          )}
        </>
      ) : (
        <div>No tienes permisos</div>
      )}
    </>
  );
};
export default EditExperience;
