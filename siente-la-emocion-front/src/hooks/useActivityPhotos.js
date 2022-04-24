import { useEffect, useState } from 'react';
import useUser from './useUser';

const useActivityPhotos = (id) => {
  const [photo, setPhoto] = useState(null);
  const [errorLoadPhoto, setErrorLoadPhoto] = useState(null);
  const { token } = useUser();

  //const [book, setBook] = useState([]);

  useEffect(() => {
    const loadPhotosActivity = async () => {
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

        console.log('photoJson', json);
        const pH = json.data.experience.photoHeader;

        if (!response.ok) {
          setErrorLoadPhoto(json.message);
          return;
        }

        setPhoto(json.data.experience.photoHeader);
        console.log('photoHeader', pH);
      } catch (error) {
        setErrorLoadPhoto(error.message);
      }
    };

    loadPhotosActivity();
  }, [id]);

  return { photo, errorLoadPhoto };
};

export default useActivityPhotos;
