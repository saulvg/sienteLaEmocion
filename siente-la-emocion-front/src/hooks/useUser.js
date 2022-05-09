import { useContext, useEffect } from 'react';
import { AuthContext } from '../App';
import decode from 'jwt-decode';

const useUser = () => {
  const { token, setToken, user, setUser } = useContext(AuthContext);
  useEffect(() => {
    const loadUser = async () => {
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

        if (!response.ok) {
          setToken('');
        } else {
          const { data } = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        setToken('');
      }
    };

    if (token && !user) {
      loadUser();
    }
  }, [token, setUser, user, setToken]);

  return { token, user, setToken, setUser };
};

export default useUser;
