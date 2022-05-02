import { useEffect, useState } from 'react';
import useUser from './useUser';

const useUploadAvatar = (av) => {
  /* const [av, setAv] = useState(''); */
  const { user, token } = useUser();
  console.log('soy av', av);

  //creamos una funcion manejadora del boton del formulario

  const updateAvatar = async () => {
    //Actualizamos la foto del avatar con una peticion de tipo 'PUT'
    //Al ser de tipo archivo, segimos el proceso de new FormData(), append , etc.
    //NO TE OLVIDES, EL BACK ESTA ESPERANDO POR EL MISMO NOMBRE, en este caso 'avatar'.
    if (av) {
      try {
        let avatar = new FormData();
        avatar.append('avatar', av);

        //Actualizamos
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/users/edit/avatar`,
          {
            method: 'PUT',
            body: avatar,
            headers: {
              Authorization: token,
            },
          }
        );
        const body = await response.json();
        if (response.ok) {
          console.log(body.message);
        } else {
          console.error(body.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(updateAvatar, 1000);
    return () => clearInterval(timer);
  }, []);
  /* useEffect(() => {
    updateAvatar();
  }, [av]); */
};
export default useUploadAvatar;
