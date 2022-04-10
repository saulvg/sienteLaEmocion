import { useState } from 'react';
import Error from '../../components/error/Error';
import './editExperience.css';
import { useParams, useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useActivity from '../../hooks/useActivity';
import {
  Company,
  ExperiencesCategory,
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
  const { activity, error } = useActivity(idExperience);
  const { token } = useUser();
  const navigate = useNavigate();

  const [deleteModal, setDeleteModal] = useState(false)

  const [companyName, setCompanyName] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  const [companyCapacity, setCompanyCapacity] = useState('');
  const [companyPrice, setCompanyPrice] = useState('');
  const [companyDate, setCompanyDate] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyDirection, setCompanyDirection] = useState('');
  const [companyText_1, setCompanyText_1] = useState('');
  const [companyText_2, setCompanyText_2] = useState('');
  const [companyText_3, setCompanyText_3] = useState('');
  const [companyText_4, setCompanyText_4] = useState('');
  const [companyText_5, setCompanyText_5] = useState('');
  const [companyText_6, setCompanyText_6] = useState('');
  const [companyPhotoHeader, setCompanyPhotoHeader] = useState('');

  const editExperience = async (event) => {
    event.preventDefault();
    try {
      const dataCompany = {
        text_1: companyText_1,
        text_2: companyText_2,
        text_3: companyText_3,
        text_4: companyText_4,
        text_5: companyText_5,
        text_6: companyText_6,
        capacity: companyCapacity,
        price: companyPrice,
        date: companyDate,
        city: companyCity,
        direction: companyDirection,
        photoHeader: companyPhotoHeader,
      };
      const payload = new FormData();
      for (const [key, value] of Object.entries(dataCompany)) {
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
      /*  */
      const loading = () => {
        const redirect = document.querySelector('#companyForm');
        redirect.innerHTML = `
          <div id='entryCreated' >
            <div>${body.message}</div>
            <div className='loading'></div>
          </div>
        `;
      };

      const redirect = () => navigate(`/`);
      if (response.ok) {
        loading();
        setTimeout(redirect, 5000);
      } else {
        console.error('Error', body.message);
      }
      /*  */
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
                {/* <Company
                  companyName={companyName}
                  setCompanyName={setCompanyName}
                  placeholder={activity.company}
                />
                <ExperiencesCategory
                  companyCategory={companyCategory}
                  setCompanyCategory={setCompanyCategory}
                  placeholder={activity.experiences_category}
                /> */}
                <CapacityCompany
                  companyCapacity={companyCapacity}
                  setCompanyCapacity={setCompanyCapacity}
                  placeholder={activity.experience.capacity}
                />
                <PriceCompany
                  companyPrice={companyPrice}
                  setCompanyPrice={setCompanyPrice}
                  placeholder={activity.experience.price}
                />
                <DateCompany
                  companyDate={companyDate}
                  setCompanyDate={setCompanyDate}
                  placeholder={activity.experience.date}
                />
                <div>{activity.experience.date}</div>

                <CityCompany
                  companyCity={companyCity}
                  setCompanyCity={setCompanyCity}
                  placeholder={activity.experience.city}
                />
                <DirectionCompany
                  companyDirection={companyDirection}
                  setCompanyDirection={setCompanyDirection}
                  placeholder={activity.experience.direction}
                />

                <Text1Company
                  companyText_1={companyText_1}
                  setCompanyText_1={setCompanyText_1}
                  placeholder={activity.experience.text_1}
                />
                <Text2Company
                  companyText_2={companyText_2}
                  setCompanyText_2={setCompanyText_2}
                  placeholder={activity.experience.text_2}
                />
                <Text3Company
                  companyText_3={companyText_3}
                  setCompanyText_3={setCompanyText_3}
                  placeholder={activity.experience.text_3}
                />
                <Text4Company
                  companyText_4={companyText_4}
                  setCompanyText_4={setCompanyText_4}
                  placeholder={activity.experience.text_4}
                />
                <Text5Company
                  companyText_5={companyText_5}
                  setCompanyText_5={setCompanyText_5}
                  placeholder={activity.experience.text_5}
                />
                <Text6Company
                  companyText_6={companyText_6}
                  setCompanyText_6={setCompanyText_6}
                  placeholder={activity.experience.text_6}
                />
                <PhotoHeader
                  companyPhotoHeader={companyPhotoHeader}
                  setCompanyPhotoHeader={setCompanyPhotoHeader}
                />
                <div className='buttonForm'>
                  <button type='submit'>Actualizar</button>
                  <span onClick={()=>setDeleteModal(true)}>Eliminar experiencia </span>
                </div>
              </form>) : (
                <DeleteExperience/>
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
