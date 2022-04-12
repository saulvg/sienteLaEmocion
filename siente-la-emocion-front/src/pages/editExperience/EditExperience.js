import { useState } from 'react';
import Error from '../../components/error/Error';
import './editExperience.css';
import { useParams, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useActivity from '../../hooks/useActivity';
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
import decode from 'jwt-decode';
import Header from '../../components/Header/Header';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import DeleteExperience from '../../components/DeleteExperience/DeleteExperience';

const EditExperience = () => {
  const { idExperience } = useParams();
  const { activity, error, setActivity } = useActivity(idExperience);
  const { token } = useUser();
  const navigate = useNavigate();

  console.log(activity);
  const [companyPhotoHeader, setCompanyPhotoHeader] = useState('');

  const [deleteModal, setDeleteModal] = useState(false);

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

  const editExperience = async (event) => {
    event.preventDefault();
    try {
      const payload = new FormData();
      for (const [key, value] of Object.entries(activity)) {
        payload.append(key, value);
      }

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

      const redirect = () => navigate(`/`);
      if (response.ok) {
        setTimeout(redirect, 5000);
      } else {
        console.error('Error', body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!token) {
    return <div>No te has registrado</div>;
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
        <div>No tienes permisos</div>
      )}
    </>
  );
};
export default EditExperience;
