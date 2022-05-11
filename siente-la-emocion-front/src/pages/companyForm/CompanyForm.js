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
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import Error from '../../components/error/Error';
import { PhotoHeader } from '../../components/InputsCompanyForm/InputsCompanyForm';
import { ModalCircle } from '../../components/Forms/ModalCircle';
import {
  InputElement,
  TextareaElement,
} from '../../components/Forms/InputElement';
import BlueButton from '../../components/Forms/BlueButton';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useUser from '../../hooks/useUser';
import useCategories from '../../hooks/useCategories';

//Pagina que pinta el formulario para que el admin pueda incluir una nueva experiencia
function CompanyForm() {
  const { token } = useUser();
  const navigate = useNavigate();
  //Estados de variables que necesitamos
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');
  //Estados del formulario
  const [companyName, setCompanyName] = useState('');
  const [companyCategoryExistente, setCompanyCategoryExistente] = useState('');
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

  const { companyCategories } = useCategories('');

  //Creamos una funcion manejadora del boton del formulario
  const sendForm = async (event) => {
    event.preventDefault();
    //intentamos enviar los datos del formulario con una peticion de tipo POST
    //como contiene texto y archivos se hace con new Format, el bucle que recorra el objeto, etc.
    try {
      const dataCompany = {
        companyName: companyName,
        categoryName: companyCategoryExistente
          ? companyCategoryExistente
          : companyCategory,
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
  //Decodificamos el token para mas adelante saber si eres admin o no. gracias a 'jwt-decode' y el token que tenemos de forma global en toda la App
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
                    <p className='circle-name'>Experiencia</p>
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
                  <form onSubmit={sendForm}>
                    <div className='flex company-form'>
                      <div className='company-form-div'>
                        <InputElement
                          labelName='Empresa'
                          type='text'
                          id='company'
                          name='company'
                          required='required'
                          value={companyName}
                          onChange={(e) => {
                            setCompanyName(e.target.value);
                          }}
                        />
                        <select
                          id='select-category-form-company'
                          onChange={(e) =>
                            e.target.value !== 'allexperiences'
                              ? setCompanyCategoryExistente(e.target.value)
                              : setCompanyCategoryExistente('')
                          }
                        >
                          <option value={'allexperiences'}>
                            {'Busaca por nombre (todas)'}
                          </option>
                          {companyCategories.map((companyCategory) => (
                            <option
                              value={companyCategory.name}
                              key={companyCategory.name}
                            >
                              {companyCategory.name}
                            </option>
                          ))}
                        </select>
                        <InputElement
                          labelName='Categoria'
                          type='text'
                          id='experience'
                          required={companyCategoryExistente ? '' : 'required'}
                          name='experience'
                          value={
                            companyCategoryExistente
                              ? companyCategoryExistente
                              : companyCategory
                          }
                          onChange={(e) => {
                            setCompanyCategory(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Capacidad'
                          type='text'
                          id='capacity'
                          required='required'
                          name='capacity'
                          value={companyCapacity}
                          onChange={(e) => {
                            setCompanyCapacity(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Precio'
                          type='text'
                          id='price'
                          required='required'
                          name='price'
                          value={companyPrice}
                          onChange={(e) => {
                            setCompanyPrice(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Fecha'
                          type='datetime-local'
                          id='date'
                          required='required'
                          name='company'
                          value={companyDate}
                          onChange={(e) => {
                            setCompanyDate(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Ciudad'
                          type='text'
                          id='city'
                          required='required'
                          name='city'
                          value={companyCity}
                          onChange={(e) => {
                            setCompanyCity(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Dirección'
                          type='text'
                          id='address'
                          required='required'
                          name='address'
                          value={companyAddress}
                          onChange={(e) => {
                            setCompanyAddress(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Instagram'
                          type='text'
                          name='instagram'
                          value={companyInstagram}
                          onChange={(e) => {
                            setCompanyInstagram(e.target.value);
                          }}
                        />
                        <InputElement
                          labelName='Facebook'
                          type='text'
                          name='facebook'
                          value={companyFacebook}
                          onChange={(e) => {
                            setCompanyFacebook(e.target.value);
                          }}
                        />
                      </div>
                      <div className='company-form-div'>
                        <TextareaElement
                          labelName='¿Qué incluye?'
                          type='Texto 1'
                          id='text1'
                          value={companyText_1}
                          name=''
                          onChange={(e) => setCompanyText_1(e.target.value)}
                        />
                        <TextareaElement
                          labelName='¿Qué necesitas?'
                          type='Texto 2'
                          id='text2'
                          value={companyText_2}
                          name=''
                          onChange={(e) => setCompanyText_2(e.target.value)}
                        />
                        <TextareaElement
                          labelName='¿Cuánto dura la experiencia? ¿Cuánto se realiza?'
                          type='Texto 3'
                          id='text3'
                          value={companyText_3}
                          name=''
                          onChange={(e) => setCompanyText_3(e.target.value)}
                        />
                        <TextareaElement
                          labelName='¿En qué consiste este deporte?'
                          type='Texto 4'
                          id='text4'
                          required='required'
                          value={companyText_4}
                          name=''
                          onChange={(e) => setCompanyText_4(e.target.value)}
                        />
                        <TextareaElement
                          labelName='¿Qué nivel de dificultad hay? ¿Y si no tengo experiencia?'
                          type='Texto 5'
                          id='text5'
                          value={companyText_5}
                          name=''
                          onChange={(e) => setCompanyText_5(e.target.value)}
                        />
                        <TextareaElement
                          labelName='Si ya tienes experiencia...'
                          type='Texto 6'
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
                    {error ? <Error>{error}</Error> : ''}
                    <BlueButton name='Enviar' type='submit'></BlueButton>
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
