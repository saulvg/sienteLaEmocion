import './companyForm.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import Header from '../../components/Header/Header';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
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

function CompanyForm() {
  const { token } = useUser();
  const navigate = useNavigate();

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

  //Creamos una funcion manejadora del boton del formulario
  const sendForm = async (event) => {
    event.preventDefault();
    //intentamos enviar los datos del formulario con una peticion de tipo POST
    try {
      /* const decoded = decode(token); */

      const dataCompany = {
        companyName: companyName,
        categoryName: companyCategory,
        capacity: companyCapacity,
        price: companyPrice,
        date: companyDate,
        city: companyCity,
        direction: companyDirection,
        text_1: companyText_1,
        text_2: companyText_2,
        text_3: companyText_3,
        text_4: companyText_4,
        text_5: companyText_5,
        text_6: companyText_6,
        photoHeader: companyPhotoHeader,
      };

      const payload = new FormData();

      for (const [key, value] of Object.entries(dataCompany)) {
        payload.append(key, value);
      }

      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences`,
        {
          method: 'POST',
          body: payload,
          headers: {
            Authorization: token,
          },
        }
      );
      const body = await response.json();
      console.log('body', body);
      console.log('datacompany', dataCompany);
      const loading = () => {
        const redirect = document.querySelector('#companyForm');
        redirect.innerHTML = `
          <div id='entryCreated' >
            <div>${body.message}</div>
            <div class='loading'></div>
          </div>
        `;
      };

      console.log(body.data.id);
      //como le digo que es la experiencia con id tal...................................
      const redirect = () => navigate(`/experiences/${body.data.id}/photos`);
      if (response.ok) {
        loading();
        setTimeout(redirect, 5000);
      } else {
        console.error('Error', body.message);
      }
    } catch (error) {
      console.error('catch', error);
    }
  };
  if (!token) {
    return <div>No te has registrado</div>;
  }
  /* ................................................ */
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
        <div id='companyForm'>
          <form onSubmit={sendForm}>
            <Company
              companyName={companyName}
              setCompanyName={setCompanyName}
              placeholder={'Escribe aqui...'}
            />
            <ExperiencesCategory
              companyCategory={companyCategory}
              setCompanyCategory={setCompanyCategory}
              placeholder={'Escribe aqui...'}
            />
            <CapacityCompany
              companyCapacity={companyCapacity}
              setCompanyCapacity={setCompanyCapacity}
              placeholder={'Escribe aqui...'}
            />
            <PriceCompany
              companyPrice={companyPrice}
              setCompanyPrice={setCompanyPrice}
              placeholder={'Escribe aqui...'}
            />
            <DateCompany
              companyDate={companyDate}
              setCompanyDate={setCompanyDate}
              //placeholder={'DD/MM/AA  hh:mm'}
            />
            <CityCompany
              companyCity={companyCity}
              setCompanyCity={setCompanyCity}
              placeholder={'Escribe aqui...'}
            />
            <DirectionCompany
              companyDirection={companyDirection}
              setCompanyDirection={setCompanyDirection}
              placeholder={'Escribe aqui...'}
            />

            <Text1Company
              companyText_1={companyText_1}
              setCompanyText_1={setCompanyText_1}
              placeholder={'Escribe aqui...'}
            />
            <Text2Company
              companyText_2={companyText_2}
              setCompanyText_2={setCompanyText_2}
              placeholder={'Escribe aqui...'}
            />
            <Text3Company
              companyText_3={companyText_3}
              setCompanyText_3={setCompanyText_3}
              placeholder={'Escribe aqui...'}
            />
            <Text4Company
              companyText_4={companyText_4}
              setCompanyText_4={setCompanyText_4}
              placeholder={'Escribe aqui...'}
            />
            <Text5Company
              companyText_5={companyText_5}
              setCompanyText_5={setCompanyText_5}
              placeholder={'Escribe aqui...'}
            />
            <Text6Company
              companyText_6={companyText_6}
              setCompanyText_6={setCompanyText_6}
              placeholder={'Escribe aqui...'}
            />
            <PhotoHeader
              companyPhotoHeader={companyPhotoHeader}
              setCompanyPhotoHeader={setCompanyPhotoHeader}
            />
            <div className='buttonForm'>
              <button type='submit'>Enviar</button>
            </div>
          </form>
        </div>
      ) : (
        <div>No tienes permisos</div>
      )}
    </>
  );
}

export default CompanyForm;

//................................................
/* const PhotoHeader = ({ companyPhotoHeader, setCompanyPhotoHeader }) => {
  const valueCompanyPhotoHeader = (event) => {
    console.log(event.target);
    const fil = event.target.files[0];
    setCompanyPhotoHeader(fil);
  };
  return (
    <div className='companyPhotoHeader'>
      <label>
        Foto principal:
        <input
          id='xCompany'
          type={'file'}
          value={companyPhotoHeader}
          onChange={valueCompanyPhotoHeader}
          placeholder={'Escribe aqui'}
        />
      </label>
    </div>
  );
};
 */
