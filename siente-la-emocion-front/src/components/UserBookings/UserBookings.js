/*import { useContext, useState } from 'react';
import useBookings from '../../hooks/useBookings';

import useUser from '../../hooks/useUser';

//username, newEmail, phone, biography, postalCode, dni_nie
const UserBookings = ({ oldName, oldEmail }) => {
  const { userExperiences } = useBookings();

  const { token, user } = useUser();
  console.log(userExperiences);
  return (
    <>
      {token && user && userExperiences ? (
        <>
          <div className='container-profile'>
            HOLAAAA {userExperiences.city}
          </div>
        </>
      ) : (
        <>
          <div>FALTA PERFIL DE OTRO USUARIO</div>
        </>
      )}
    </>
  );
};

export default UserBookings;
/**/
