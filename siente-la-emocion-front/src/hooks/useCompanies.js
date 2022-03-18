//Hook para coger datos de las actividades
import { useEffect, useState } from 'react';

const useCompanies = () => {
  const [company, setCompany] = useState([]);
  const [error, setError] = useState(null);

  //const [book, setBook] = useState([]);

  useEffect(() => {
    const loadCompany = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences`
        );

        const json = await response.json();

        if (!response.ok) {
          setError(json.message);
          return;
        }

        setCompany(json.data.experiences);
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

    loadCompany();
  }, []);

  return { company, error };
};

export default useCompanies;
