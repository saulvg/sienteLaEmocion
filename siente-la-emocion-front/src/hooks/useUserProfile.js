import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import useUser from './useUser';
/*import decodeTokenData from "../helpers/decodeTokenData";*/

const useUserProfile = (id) => {
  const [users, setUsers] = useState([]);
  const { idUser } = useParams();

  //const { activity, error } = useUser(idExperience);
  /*const decodedToken = decodeTokenData(token);*/

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/users/${idUser}` // siempre se ve el perfil del usuario 3. poner id
        );

        const json = await response.json();

        if (!response.ok) {
          return;
        }

        setUsers(json.data.user);
        console.log('USUARIOS A VER', json.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    /*    const loadBook = async () => {
        try {
          HACER USE HOOK DE AVATAR COMPONENTE USERS/3  PARA COGER EL AVATAAAAAAAR
          const response = await fetch(`${process.env.REACT_APP_BACKEND}/`)
        } catch (error) {
          setError(error.message);
        }
      }; */

    loadUsers();
  }, [id]);

  return { users, setUsers };
};

export default useUserProfile;
