import { useEffect, useState } from 'react';
import useUser from './useUser';

const useActivityPhotos = (id) => {
  const [photos, setPhotos] = useState(null);
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

        if (!response.ok) {
          setErrorLoadPhoto(json.message);
          return;
        }

        setPhotos(json.data.photos);
      } catch (error) {
        setErrorLoadPhoto(error.message);
      }
    };

    loadPhotosActivity();
  }, [id]);

  return { photos, errorLoadPhoto };
};

export default useActivityPhotos;
