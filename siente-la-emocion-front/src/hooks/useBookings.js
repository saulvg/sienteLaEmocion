//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';
import useUser from './useUser';

const useBookings = () => {
  const { token } = useUser();
  //const { idExperiencesBooking } = useParams();

  const [bookings, setBookings] = useState([]);

  const [error, setError] = useState(null);
  //id experience
  //const [book, setBook] = useState([]);

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

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          return;
        }

        setBookings(json.data.userExperiences);
        console.log('VER DATOS', json.data.userExperiences);
      } catch (error) {
        setError(error.message);
      }
    };

    loadReviews();
  }, [token]);

  return { bookings, error };
};

export default useBookings;
