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
          <div className='background-color-3'>
            <div className='background-color-4'>
              <div className='my-experiences'>
                {bookings.map((book) => {
                  return (
                    <li key={book.id}>
                      <Booking book={book} />
                    </li>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div>nose</div>
        )}
      </ul>
    </>
  );
};

export default UserExperiences;
/**/
