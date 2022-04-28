import './UserExperiences.css';

import useBookings from '../../hooks/useBookings';
import { Booking } from '../Review/Review';

const UserExperiences = () => {
  const { bookings, error } = useBookings();

  if (error) return <p>Hubo un error cargando bookings</p>;
  return (
    <>
      <ul>
        {bookings.length > 0 ? (
          <ul className='my-experiences'>
            {bookings.map((book) => {
              return (
                <li key={book.id} className='my-experience'>
                  <Booking book={book} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            ¿Todavía no has realizado ninguna experiencia? ¡Atrévete! boton
          </div>
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
