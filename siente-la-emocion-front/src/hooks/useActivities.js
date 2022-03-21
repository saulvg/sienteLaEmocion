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
          `${process.env.REACT_APP_BACKEND}/experiences/7`
        );
        console.log(response.json());
        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          console.log(json.message);
          return;
        }

<<<<<<< Updated upstream
        setActivities(json.data.experiences);
        console.log(json.data.experiences);
=======
        setActivities(json.data.experience);
>>>>>>> Stashed changes
      } catch (error) {
        setError(error.message);
      }
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
