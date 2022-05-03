//Hook para coger las categorias de las experiencias
import { useEffect, useState } from 'react';

const useCategories = () => {
  const [companyCategories, setCompanyCategories] = useState([]);
  const [errorCategory, setErrorCategory] = useState(null);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/experiences`
        );

        const json = await response.json();

        if (!response.ok) {
          setErrorCategory(json.message);
          return;
        }

        setCompanyCategories(json.data.categories);
      } catch (error) {
        setErrorCategory(error.message);
      }
    };

    loadCategory();
  }, []);

  return { companyCategories, errorCategory };
};

export default useCategories;
