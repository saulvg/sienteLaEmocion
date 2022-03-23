//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useActivity from './useActivity';

const useReviews = (id) => {
  const { idExperience } = useParams();
  const { activity, error } = useActivity(idExperience);
  const [reviews, setReviews] = useState([]);
  const [err, setError] = useState(null);
  //id experience
  //const [book, setBook] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}/reviews`
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          return;
        }

        console.log(json.data);
        setReviews(json.data.review);
      } catch (error) {
        setError(error.message);
      }
    };

    /*    const loadBook = async () => {
      try {
        HACER USE HOOK DE AVATAR COMPONENTE USERS/3  PARA COGER EL AVATAAAAAAAR
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/`)
      } catch (error) {
        setError(error.message);
      }
    }; */

    loadReviews();
  }, [id]);

  return { reviews, activity, error };
};

export default useReviews;
