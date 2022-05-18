import { useEffect, useState } from 'react';
import decode from 'jwt-decode';

const useUserInfo = (
  token,
  setUsername,
  setEmail,
  setPhone,
  setBiography,
  setPostalCode,
  setDni_nie
) => {
  //const { token, setToken, user, setUser } = useContext(AuthContext);
  //const [info, setInfo] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    const loadInfo = async () => {
      try {
        const decoded = decode(token);

        const response = await fetch(
          `${process.env.REACT_APP_BACKEND}/users/${decoded.id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const body = await response.json();
        console.log('body en hook', body.data.user);

        if (response.ok) {
          setUsername(body.data.user.username);
          setEmail(body.data.user.email);
          setPhone(body.data.user.phone);
          setBiography(body.data.user.biography);
          setPostalCode(body.data.user.postalCode);
          setDni_nie(body.data.user.dni_nie);
        } else {
          setError(body.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadInfo();
  }, [token]);

  return { error };
};

export default useUserInfo;
