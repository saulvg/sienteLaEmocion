/**
 * ###########
 * ## React ##
 * ###########
 */
import { useEffect, useState } from 'react';

//Hook para coger datos de las actividades
const useFilterActivities = (term) => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  //useEffect que se ejecutara cada vez que 'term' (unos nuevos parametros de busqueda), se actualice.
  useEffect(() => {
    //como useEffect no puede ser asincono, cremaos una funcion que si lo sea
    //se encarga de hacer la correspondiente peticion y si todo a ido bien devolver las actividades filtradas por 'search', en contra devolvera un error
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
