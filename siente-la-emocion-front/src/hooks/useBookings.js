//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';
import useUser from './useUser';

const useBookings = () => {
  const { token } = useUser();

  const [bookings, setBookings] = useState('');

  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/bookings`,
          {
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          }
        );

        const body = await response.json();

        if (response.ok) {
          setBookings(body.data.userExperiencesBooking);
        } else {
          setError(body.message);
        }
      } catch (error) {
        setError('ERROR ', error.message);
      }
    };

    loadReviews();
  }, [token]);

  return { bookings, error };
};

export default useBookings;
