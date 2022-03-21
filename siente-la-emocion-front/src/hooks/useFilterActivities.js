//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useFilterActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/search`);

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          console.log(json.message);
          return;
        }

        setActivities(json.data.experiences);
        console.log(json.data.experiences);
      } catch (error) {
        setError(error.message);
      }
    };

    loadActivities();
  }, []);

  console.log(activities);

  return { activities, error };
};

export default useFilterActivities;
