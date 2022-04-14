//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useActivity from './useActivity';
import useUser from './useUser';

const useBookings = (id) => {
  const { token } = useUser();
  //const { idExperiencesBooking } = useParams();
  const { idExperiencesBooking } = useParams();
  const { activity, error } = useActivity(idExperiencesBooking);
  const [bookings, setBookings] = useState([]);
  const [err, setError] = useState(null);
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
      } catch (error) {
        setError(error.message);
      }
    };

    loadReviews();
  }, [id]);

  return { bookings, activity, error };
};

export default useBookings;
