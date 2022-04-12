//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';
import useUser from './useUser';

const useActivity = (id) => {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUser();

  //const [book, setBook] = useState([]);

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          console.log(json.message);
          return;
        }

        setActivity(json.data);
        console.log(json.data);
      } catch (error) {
        setError(error.message);
      }
    };

    loadActivity();
  }, [id]);

  return { activity, error, setActivity };
};

export default useActivity;
