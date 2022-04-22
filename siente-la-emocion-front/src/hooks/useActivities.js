//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useActivities = (termCategory, termPrice1, termPrice2) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  console.log('escalada', termCategory);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const ruta = `${process.env.REACT_APP_BACKEND}/experiences`;
        let response = await fetch(ruta);
        if (termCategory) {
          response = await fetch(`${ruta}?category=${termCategory}`);
        }
        if (termPrice1 && termPrice2) {
          response = await fetch(
            `${ruta}?price1=${termPrice1}&price2=${termPrice1}`
          );
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
  }, [termCategory, termPrice1, termPrice2]);

  return { activities, error };
};

export default useActivities;
