//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useActivities = (term) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  console.log('escalada', term);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(
          term
            ? `${process.env.REACT_APP_BACKEND}/experiences?category=${term}`
            : `${process.env.REACT_APP_BACKEND}/experiences`
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          console.log(json.message);
          return;
        }
        setActivities(json.data.experiences);
        console.log('soy jsonata', json.data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadActivities();
  }, [term]);

  return { activities, error };
};

export default useActivities;
