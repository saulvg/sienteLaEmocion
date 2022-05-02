//Hook para coger datos de las experiencias
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useActivities = (queryString) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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
          console.log(json.message);
          return;
        }
        setActivities(json.data.experiences);
      } catch (error) {
        setError(error.message);
      }
    };

    loadActivities();
  }, [queryString]);

  return { activities, error };
};

export default useActivities;
