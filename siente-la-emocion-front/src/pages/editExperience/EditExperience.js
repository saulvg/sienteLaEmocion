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
  PhotoHeader,
} from '../../components/InputsCompanyForm/InputsCompanyForm';
import Header from '../../components/Header/Header';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import DeleteExperience from '../../components/DeleteExperience/DeleteExperience';
import Loading from '../../components/loading/Loading';

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
  const [companyPhotoHeader, setCompanyPhotoHeader] = useState('');
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
    //como contiene texto y archivos se hace con new Format, el bucle que recorra el objeto, etc.
    try {
      const payload = new FormData();
      for (const [key, value] of Object.entries(activity)) {
        payload.append(key, value);
      }

      //Hacemos 'PUT'
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}`,
        {
          method: 'PUT',
          body: payload,
          headers: {
            Authorization: token,
          },
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
                    <form onSubmit={editExperience}>
                      <CapacityCompany
                        companyCapacity={activity.experience.capacity}
                        setCompanyCapacity={updateActivity('capacity')}
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
                        companyDirection={activity.experience.direction}
                        setCompanyDirection={updateActivity('direction')}
                      />

                      <Text1Company
                        companyText_1={activity.experience.text_1}
                        setCompanyText_1={updateActivity('companyText_1')}
                      />
                      <Text2Company
                        companyText_2={activity.experience.text_2}
                        setCompanyText_2={updateActivity('text_2')}
                      />
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
                      <PhotoHeader
                        companyPhotoHeader={companyPhotoHeader}
                        setCompanyPhotoHeader={setCompanyPhotoHeader}
                      />
                      {error ? <Error>{error}</Error> : null}
                      <div className='buttonForm'>
                        <button type='submit'>Actualizar</button>
                        <span onClick={() => setDeleteModal(true)}>
                          Eliminar experiencia{' '}
                        </span>
                      </div>
                    </form>
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
