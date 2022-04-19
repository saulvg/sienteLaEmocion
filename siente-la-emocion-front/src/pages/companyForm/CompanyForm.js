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
  AdresssCompany,
  CompanyInstagram,
  CompanyFacebook,
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
import { ModalCircle } from '../../components/Forms/ModalCircle';
import {
  InputElement,
  TextareaElement,
} from '../../components/Forms/InputElement';
import BlueButton from '../../components/Forms/BlueButton';

//Pagina que pinta el formulario para que el admin pueda incluir una nueva experiencia
function CompanyForm() {
  const { token } = useUser();
  const navigate = useNavigate();
  //Estados de variables que necesitamos
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');
  //Estados del formulario
  const [companyName, setCompanyName] = useState('');
  const [companyCategory, setCompanyCategory] = useState('');
  const [companyCapacity, setCompanyCapacity] = useState('');
  const [companyPrice, setCompanyPrice] = useState('');
  const [companyDate, setCompanyDate] = useState('');
  const [companyCity, setCompanyCity] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyInstagram, setCompanyInstagram] = useState('');
  const [companyFacebook, setCompanyFacebook] = useState('');
  const [companyText_1, setCompanyText_1] = useState('');
  const [companyText_2, setCompanyText_2] = useState('');
  const [companyText_3, setCompanyText_3] = useState('');
  const [companyText_4, setCompanyText_4] = useState('');
  const [companyText_5, setCompanyText_5] = useState('');
  const [companyText_6, setCompanyText_6] = useState('');
  const [companyPhotoHeader, setCompanyPhotoHeader] = useState('');
  console.log('category', companyCategory);
  console.log('name', companyName);
  console.log('city', companyCapacity);
  console.log('price', companyPrice);
  console.log('companyDate', companyDate);
  console.log('companyCity', companyCity);
  console.log('companyAddress', companyAddress);
  console.log('companyText_1', companyText_1);
  console.log('companyText_2', companyText_2);
  console.log('companyText_3', companyText_3);
  console.log('companyText_4', companyText_4);
  console.log('companyText_5', companyText_5);
  console.log('companyText_6', companyText_6);

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
        direction: companyAddress,
        companyInstagram,
        companyFacebook,
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
        setLoad(body.message);
        setTimeout(redirect, 5000);
      } else {
        console.error('Error', body.message);
        setError(body.message);
      }
    } catch (error) {
      console.error('catch', error);
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
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='M10 19l-7-7m0 0l7-7m-7 7h18'
                        ></path>
                      </svg>
                      <p className='goback'>Volver</p>
                    </button>
                    <p className='circle-name'>Experiencia</p>
                  </div>
                </div>
                <ModalCircle name='Registro'></ModalCircle>
                <div className='modal1'></div>
                <div className='modal2'>
                  <form onSubmit={sendForm}>
                    <div className='flex company-form'>
                      <div className='company-div'>
                        <InputElement
                          labelName='company'
                          type='text'
                          id='company'
                          name='company'
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='experience'
                          type='text'
                          id='experience'
                          name='experience'
                          value={companyCategory}
                          onChange={(e) => {
                            setCompanyCategory(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='capacity'
                          type='text'
                          id='capacity'
                          name='capacity'
                          value={companyCapacity}
                          onChange={(e) => {
                            setCompanyCapacity(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='price'
                          type='text'
                          id='price'
                          name='price'
                          value={companyPrice}
                          onChange={(e) => {
                            setCompanyPrice(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='date'
                          type='datetime-local'
                          id='date'
                          name='company'
                          value={companyDate}
                          onChange={(e) => {
                            setCompanyDate(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='city'
                          type='text'
                          id='city'
                          name='city'
                          value={companyCity}
                          onChange={(e) => {
                            setCompanyCity(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='address'
                          type='text'
                          id='address'
                          name='address'
                          value={companyAddress}
                          onChange={(e) => {
                            setCompanyAddress(e.target.value);
                          }}
                        />
                        <TextareaElement
                          type='text'
                          labelName='Texto 1'
                          id='text1'
                          value={companyText_1}
                          name=''
                          onChange={(e) => setCompanyText_1(e.target.value)}
                        />
                        <TextareaElement
                          type='text'
                          labelName='Texto 2'
                          id='text2'
                          value={companyText_2}
                          name=''
                          onChange={(e) => setCompanyText_2(e.target.value)}
                        />
                      </div>
                      <div className='company-div'>
                        <TextareaElement
                          type='text'
                          labelName='Texto 3'
                          id='text3'
                          value={companyText_3}
                          name=''
                          onChange={(e) => setCompanyText_3(e.target.value)}
                        />
                        <TextareaElement
                          type='text'
                          labelName='Texto 4'
                          id='text4'
                          value={companyText_4}
                          name=''
                          onChange={(e) => setCompanyText_4(e.target.value)}
                        />
                        <TextareaElement
                          type='text'
                          labelName='Texto 5'
                          id='text5'
                          value={companyText_5}
                          name=''
                          onChange={(e) => setCompanyText_5(e.target.value)}
                        />
                        <TextareaElement
                          type='text'
                          labelName='Texto 6'
                          id='text6'
                          value={companyText_6}
                          name=''
                          onChange={(e) => setCompanyText_6(e.target.value)}
                        />

                        <PhotoHeader
                          companyPhotoHeader={companyPhotoHeader}
                          setCompanyPhotoHeader={setCompanyPhotoHeader}
                        />
                      </div>
                    </div>
                    <BlueButton name='Enviar'></BlueButton>
                  </form>
                  <div className='circle-background'></div>
                </div>
              </div>
            </div>
          ) : (
            <Loading>{load}</Loading>
          )}
        </>
      ) : (
        <Error>No tienes permisos</Error>
      )}
    </>
  );
}

export default CompanyForm;
