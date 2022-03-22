import { useState, useEffect } from 'react';
/*import decodeTokenData from "../helpers/decodeTokenData";*/

const useUserProfile = (id) => {
  const [users, setUser] = useState([]);
  const [errorUsers, setErrorUsers] = useState(null);
  /*const decodedToken = decodeTokenData(token);*/

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/users/` // siempre se ve el perfil del usuario 3. poner id
        );

        const json = await response.json();

        if (!response.ok) {
          setErrorUsers(json.message);
          return;
        }

        setUser(json.data.user);
      } catch (error) {
        setErrorUsers(error.message);
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

  return { users, errorUsers };
};

export default useUserProfile;
