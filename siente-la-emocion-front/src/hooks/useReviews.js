//Hook para coger datos de las reviews
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

const useReviews = () => {
  const { idExperience } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

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

        setReviews(json.data.review);
      } catch (error) {
        setError(error.message);
      }
    };
    loadReviews();
  }, [idExperience]);

  return { reviews, error };
};

export default useReviews;
