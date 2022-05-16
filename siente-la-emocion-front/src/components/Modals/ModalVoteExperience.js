// ## Style ##
import './modalComponent.css';
/**
 * ###########
 * ## React ##
 * ###########
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
/**
 * ################
 * ## Hooks ##
 * ################
 */
import useUser from '../../hooks/useUser';
/**
 * ################
 * ## Components ##
 * ################
 */
import { TextareaElement } from '../Forms/InputElement';
import BlueButton from '../Forms/BlueButton';
import Error from '../error/Error';
import Loading from '../Loading/Loading';

//Componente para pintar el modal de votar una expriencia que el usuario ya haya realizado, en esta se puede votar del 1 al 5 y dejar una review
const ModalVoteExperience = ({ book }) => {
  const [vote, setVotes] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState('');
  const redirect = useNavigate();
  const [resOk, setResOk] = useState('');
  const { token } = useUser();

  //Funcion que se encarga de que parar la propagacion del 'click' para que no se nos cierre el modal a no ser que hagamos 'click' fuera
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  //Funcion que se encarga de realizar la peticion de tipo 'POST' con la review del usuario
  const createReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${book.id}/votes`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vote, review }),
        }
      );
      //Funcion que utilizamos para redirigir al usuario una vez haya realizado la review
      const redir = () => {
        redirect('/');
      };
      const body = await res.json();
      //Si la peticion a ido bien cambiamos el estado de 'resOk' a truthy e iniciamos un setTimeout para que nos rediriga
      //sino cambiamos el estado de error a truthy
      if (res.ok) {
        console.log(body.message);
        setResOk(body.message);
        setTimeout(redir, 5000);
      } else {
        setError(body.message);
        console.error('Error', body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones, sino devolvemos el correspondiente error en Front
  return (
    <div className='modal-container' onClick={handleModalClick}>
      <form onSubmit={createReview}>
        {!resOk ? (
          <>
            <div className='modal1'>
              <h2 class='review-title'>Valoración</h2>
            </div>
            <div className='modal3'>
              <div className='circle-background2'></div>
            </div>
            <div className='modal4'>
              <div className='circle-background3'></div>
            </div>
            <div className='modal2'>
              <div className='circle-background'></div>
              <TextareaElement
                labelName='Déjanos tu comentario de valoración'
                type='text'
                id='review'
                name='review'
                value={review}
                onChange={(e) => {
                  setReview(e.target.value);
                }}
              />
              <div id='ratings' className='filter-section'>
                <h3 className='filter-title'>puntuación</h3>
                <div className='ratings'>
                  <svg
                    className='star-svg'
                    fill={vote >= 1 ? 'yellow' : 'grey'}
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      !vote ? setVotes(1) : setVotes(0);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    className={'star-svg'}
                    fill={vote >= 2 ? 'yellow' : 'grey'}
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      !vote ? setVotes(2) : setVotes(0);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    className={'star-svg'}
                    fill={vote >= 3 ? 'yellow' : 'grey'}
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      !vote ? setVotes(3) : setVotes(0);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    className='star-svg'
                    fill={vote >= 4 ? 'yellow' : 'grey'}
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      !vote ? setVotes(4) : setVotes(0);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>

                  <svg
                    className='star-svg'
                    fill={vote >= 5 ? 'yellow' : 'grey'}
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      !vote ? setVotes(5) : setVotes(0);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
            {error ? <Error>{error}</Error> : null}
            <BlueButton
              name='Añadir valoracion'
              type='submit'
              onClick={(e) => {
                e.stopPropagation();
              }}
            ></BlueButton>
          </>
        ) : (
          <Loading>{resOk}</Loading>
        )}
      </form>
    </div>
  );
};
export default ModalVoteExperience;
