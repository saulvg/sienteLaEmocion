//Hook para coger datos de las actividades
import { useEffect, useRef, useState } from 'react';
import useUser from './useUser';

const useActivity = (id) => {
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);
  const { token } = useUser();

  const mounted = useRef(false);

  //const [book, setBook] = useState([]);

  useEffect(() => {
    mounted.current = true;
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
          return;
        }

        if (mounted.current) setActivity(json.data);
      } catch (error) {
        if (mounted.current) setError(error.message);
      }
    };

    loadActivity();

    return () => {
      mounted.current = false;
    };
  }, [id, token]);

  return { activity, error, setActivity };
};

export default useActivity;
