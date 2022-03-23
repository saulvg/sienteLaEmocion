//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useFilterActivities = (term) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/search?search=${term}`
        );

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
  }, [term]);

  return { activities, error };
};

export default useFilterActivities;
