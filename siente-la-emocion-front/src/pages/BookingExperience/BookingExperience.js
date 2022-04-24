import { AuthContext } from '../../App';
//## Style ##
/**
 * ################
 * ## Components ##
 * ################
 */
import BlueButton from '../../components/Forms/BlueButton';
import Error from '../../components/error/Error';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import Header from '../../components/Header/Header';
import Loading from '../../components/loading/Loading';
import '../../components/Forms/Forms.css';
/**
 * ###########
 * ## React ##
 * ###########
 */
import { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { TextareaElement } from '../../components/Forms/InputElement';

//Pagina que pinta el formulario para qeu los usuarios puedan reservar su actividad
const BookingExperience = () => {
  const { token } = useContext(AuthContext);
  const { idExperience } = useParams();
  const navigate = useNavigate();
  //Estados de variables que necesitamos
  const [done, setDone] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState('');
  //const [bodyLoad, setBodyLoad] = useState('');
  const [message, setUserMessage] = useState('');

  //Funcion que sirve para ir una ventana hacia atras
  const comeBack = (e) => {
    e.preventDefault();
    window.history.go(-1);
  };
  //Funcion asincrona manejadora del boton del formulario
  const bookingExperience = async (e) => {
    e.preventDefault();

    //Intentamos enviar los datos del formulario con una peticion de tipo POST
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}/booking`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ message }),
        }
      );
      const body = await response.json();
      //Funcion que utilizaremos para redirigir a inicio si todo a funcionado
      const redirect = () => navigate('/');
      if (response.ok) {
        //Si todo a ido bien, informamos al usuario cambiamos un estado y mostramos una pantalla de carga, tras x segindos redirigimos al usuario
        console.log('reserva', message);
        setDone(true);
        //setBodyLoad(body.message);
        setLoad(body.message);
        setTimeout(redirect, 5000);
      } else {
        //Si algo a fallado cambamos un estado para mostrar el error por pantalla
        console.error('Error', body.message);
        setError(body.message);
      }
    } catch (error) {
      console.error('catch', error);
    }
  };

  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones (tienes token ?), sino devolvemos el correspondiente error en Front
  return (
    <>
      <Header
        to={''}
        button={''}
        body={<BodyHeaderHomePage />}
        className={'simpleHeader'}
      />
      <>
        <form onSubmit={bookingExperience}>
          <div className='align-modal'>
            <div className='modal-box'>
              <div className='modal1'>
                <h2>Reserva tu experiencia</h2>
              </div>
              <div className='modal3'>
                <div className='circle-background2'></div>
              </div>
              <div className='modal4'>
                <div className='circle-background3'></div>
              </div>
              <div className='modal2'>
                <div className='circle-background'></div>
                {token ? (
                  <>
                    {!error ? (
                      <>
                        {!load ? (
                          <>
                            <div className='flex w-full items-center justify-between bookings'>
                              <div className=' divide'>
                                <label className='label-element'>
                                  Si tienes un mensaje para nosotros:
                                  <TextareaElement
                                    type={'text'}
                                    value={message}
                                    onChange={(e) => {
                                      setUserMessage(e.target.value);
                                      console.log(message);
                                    }}
                                  />
                                </label>
                              </div>
                              <div>
                                <BlueButton
                                  type='submit'
                                  name={'Reservar'}
                                ></BlueButton>
                                <BlueButton name='Cancelar' onClick={comeBack}>
                                  Cancelar
                                </BlueButton>
                              </div>
                            </div>
                          </>
                        ) : (
                          <Loading>{load}</Loading>
                        )}
                      </>
                    ) : (
                      <Error>{error}</Error>
                    )}
                  </>
                ) : (
                  <Error>
                    Antes debes iniciar sesion{' '}
                    <Link to='/login'>Inicia sesion</Link>
                  </Error>
                )}
              </div>
            </div>
          </div>
        </form>
      </>
    </>
  );
};

export default BookingExperience;
