//Hook para coger datos de las experiencias
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useActivities = (queryString) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    const loadActivities = async () => {
      try {
        navigate('/allexperiences');
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences`
        );
        if (queryString) {
          response = await fetch(
            `${process.env.REACT_APP_BACKEND}/experiences?${queryString}`
          );
          navigate(`?${queryString}`);
        }

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          return;
        }
        if (mounted.current) setActivities(json.data.experiences);
      } catch (error) {
        if (mounted.current) setError(error.message);
      }
    };

    loadActivities();

    return () => {
      mounted.current = false;
    };
  }, [queryString, navigate]);

  return { activities, error };
};

export default useActivities;
