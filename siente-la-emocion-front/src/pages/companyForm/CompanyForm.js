// ## Style ##
import './companyForm.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import decode from 'jwt-decode';

/**
 * ################
 * ## Components ##
 * ################
 */
import Loading from '../../components/loading/Loading';
import Header from '../../components/Header/Header';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import Error from '../../components/error/Error';
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
/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';
import ButtonForm from '../../components/ButtonForm/ButtonForm';

//Pagina que pinta el formulario para que el admin pueda incluir una nueva actividad
function CompanyForm() {
  const { token } = useUser();
  const navigate = useNavigate();
  //Estados de variables que necesitamos
  const [load, setLoad] = useState(false);
  const [bodyLoad, setBodyLoad] = useState('');
  //Estados del formulario
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
    //como contiene texto y archivos se hace con new Format, el bucle que recorra el objeto, etc.
    try {
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
      //Object.entries devuelve una matriz de pares [[companyName, elNombre], [categoryName, elNombre], [], ...]
      //Y en cada vuelta del bucle añadimos new Format()
      for (const [key, value] of Object.entries(dataCompany)) {
        payload.append(key, value);
      }
      //Postemaos
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

      //Como tenemos que implementar fotos a la experiencia redirigimos hacia subir fotos a esta experiencia si todo a ido bien para eso utilizamos 'useNavigate()'
      const redirect = () => navigate(`/experiences/${body.data.id}/photos`);
      if (response.ok) {
        //Si todo a ido bien informamos al usuario, cambiamos un estado y mostramos una pantalla de carga y redirigimos a la siguiente ventana
        setBodyLoad(body.message);
        setLoad(true);
        setTimeout(redirect, 5000);
      } else {
        console.error('Error', body.message);
      }
    } catch (error) {
      console.error('catch', error);
    }
  };
  //Si ni tienes token no puedes llegar hasta aqui
  if (!token) {
    return <Error>No te has registrado</Error>;
  }
  //Decodificamos el token para mas adelante saber si eres admin o no. gracias a 'jwt-decode' y el token que tenemos de forma global en toda la App
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
            <div id='companyForm '>
              <form onSubmit={sendForm}>
                <div className='formFlex'>
                  <div>
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

                    
                  </div>
                  <div>
                  <DateCompany
                      companyDate={companyDate}
                      setCompanyDate={setCompanyDate}
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
                    <PhotoHeader
                      companyPhotoHeader={companyPhotoHeader}
                      setCompanyPhotoHeader={setCompanyPhotoHeader}
                    />
                  </div>
                  
                </div>
                <div>
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
                  </div>
                  
                <ButtonForm>Enviar</ButtonForm>
              </form>
            </div>
          ) : (
            <Loading>{bodyLoad}</Loading>
          )}
        </>
      ) : (
        <Error>No tienes permisos</Error>
      )}
    </>
  );
}

export default CompanyForm;
