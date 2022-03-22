//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useReviews = (id) => {
  const [category, setCategory] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  //id experience
  //const [book, setBook] = useState([]);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences/2/reviews`
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          return;
        }

        setReviews(json.data.review);
        setCategory(json.data.category_name);
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

  return { reviews, category, error };
};

export default useReviews;
