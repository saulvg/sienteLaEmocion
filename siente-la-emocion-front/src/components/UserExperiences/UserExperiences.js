import './UserExperiences.css';

import useBookings from '../../hooks/useBookings';
import { Booking } from '../Review/Review';
import Error from '../error/Error';
import { useNavigate } from 'react-router-dom';

const UserExperiences = () => {
  const { bookings, error } = useBookings();
  const navigate = useNavigate();

  if (error) return <Error>Hubo un error cargando bookings</Error>;
  return (
    <>
      <ul className='my-experiences'>
        {bookings.length > 0 ? (
          <>
            {bookings.map((book) => {
              return (
                <li key={book.id} className='my-experience'>
                  <Booking book={book} />
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
    /* return token && user ? (
    <ul className='my-experiences'>
      {bookings.length > 0 ? (
        <>
          {bookings.map((book) => {
            return (
              <li key={book.id} className='my-experience'>
                <div className='flex w-full '>
                  <span className='experience-avatar'></span>
                  <div className='experience-content'>
                    <div>
                      <h2>
                        {book.category} ({book.company})
                      </h2>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <button className='add-review-button'>
                        Añadir valoración
                      </button>
                      <p>{book.date}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </>
      ) : (
        <div>nose</div>
      )}
    </ul>
  ) : (
    <div></div> */
  );
};

export default UserExperiences;
/**/
