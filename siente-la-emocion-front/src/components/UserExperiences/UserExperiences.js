// ## Style ##
import './UserExperiences.css';

/**
 * ################
 * ## Hooks ##
 * ################
 */
import useBookings from '../../hooks/useBookings';
/**
 * ################
 * ## Components ##
 * ################
 */
import Error from '../error/Error';
import ModalVoteExperience from '../Modal/ModalVoteExperience';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

//Componente que pinta y envia los datos 
const UserExperiences = () => {
  const { bookings, error } = useBookings();
  const navigate = useNavigate();

  //Estado para abrir y cerrar el modal
  const [openModal, setOpenModal] = useState('')
 

  if (error) return <Error>Hubo un error cargando bookings</Error>;
  return (
    <>
      <ul className='my-experiences'>
        {bookings.length > 0 ? (
          <>
            {bookings.map((book) => {
              //Con este map devolvemos cada una de las actividades que el usuario a reservado
              //Formateamos la fecha para que el usuario la lea lo mas comodamente posible
              const experienceDate = new Date(book?.date)
              const formatDate =`${experienceDate.getDate()}-${experienceDate.getMonth()}-${experienceDate.getFullYear()}`
              //Pintamos todos los datos que queremso mostrar
              return (
                <li key={book.id} className='my-experience'>
                 <Link to={`/experiences/${book.id}`}><div className='my-experience-img' style={{ backgroundImage: book.photoHeader ? `url(${process.env.REACT_APP_BACKEND}/uploads/${book.photoHeader}` : "url('https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80')" }}  /></Link>
                  <div className='flex flex-column justify-between my-experience-content'>
                    <h2>
                      Exp: {book.category}<br/>Comp: {book.company}
                    </h2>
                    <div className='flex justify-between items-center'>
                      <span>{formatDate}</span>
                      {new Date(book.date) < new Date() ? (
                        <>
                        {!book.votes_entry ? (
                          <button className={'add-review-button'} onClick={()=>setOpenModal('open')}>
                          Añadir Valoracion
                        </button>
                        ) : (<span >{book.votes_entry === 1 ? '★' : book.votes_entry === 2 ? '★★' : book.votes_entry === 3 ? '★★★':book.votes_entry === 4 ? '★★★★':book.votes_entry === 5 ? '★★★★★': ''}</span>) }
                        </>
                      ) : (
                        <div className='experience-error'>
                          <span>Aun no has vivido esta experiencia</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {openModal ? <div className={`modal open`}  onClick={() => setOpenModal('')}  ><ModalVoteExperience book={book} /></div> : null}
                </li>
              );
            })}
          </>
        ) : (
          <Error>
            ¿Todavía no has realizado ninguna experiencia?{' '}
            <span
              className='span-atrevete'
              onClick={() => navigate('/allexperiences')}
            >
              ¡Atrévete!
            </span>
          </Error>
        )}
      </ul>
    </>
  );
};

export default UserExperiences;

