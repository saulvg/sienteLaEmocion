//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  //const [book, setBook] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences`
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          console.log(json.message);
          return;
        }

        setActivities(json.data.experiences);
        console.log(activities);
        console.log(json.data.experiences);
      } catch (error) {
        setError(error.message);
      }
      console.log(activities);
    };

    /*    const loadBook = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND}/`)
      } catch (error) {
        setError(error.message);
      }
    }; */

    loadActivities();
  }, []);

  return { activities, error };
};

export default useActivities;
