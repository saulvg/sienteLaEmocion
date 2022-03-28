import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import decode from 'jwt-decode';
import useActivities from '../../hooks/useActivities';
import Header from '../Header/Header';
import { useParams } from 'react-router-dom';

import './UserExperiences.css';
import { EditAvatar } from '../EditAvatar/EditAvatar';
import { InputElement, TextareaElement } from '../Forms/InputElement';
import BlueButton from '../Forms/BlueButton';
import DeleteAccount from '../Forms/DeleteAccount';
import { Modal } from '../Modal/Modal';
import Review from '../Review/Review';
import useBookings from '../../hooks/useBookings';
//username, newEmail, phone, biography, postalCode, dni_nie
const UserExperiences = ({ oldName, oldEmail }) => {
  const { token, user } = useUser();
  const [username, setUsername] = useState('');
  const [newEmail, setEmail] = useState(''); // FUNCIONA RARO
  const [phone, setPhone] = useState('');
  const [biography, setBiography] = useState('');
  const { idUser } = useParams();
  const [postalCode, setPostalCode] = useState('');

  const [dni_nie, setDni_nie] = useState('');
  const { bookings } = useBookings();
  //decoded.id === idUser

  return token && user ? (
    <>
      <ul>
        {bookings.length > 0 ? (
          <div className='background-color-3'>
            <div className='background-color-4'>
              <div className='my-experiences'>
                {bookings.map((book) => {
                  return (
                    <li key={book.id}>
                      <h2>{book.company}</h2>
                      <h3>{book.category}</h3>
                      <p>{book.city}</p>
                      <p>{book.date}</p>
                      <Modal
                        className='reviews'
                        buttonName='Añadir valoración'
                        content={<Review />}
                      />
                    </li>
                  );
                })}
              </div>
            </div>
            ) : (<div>aaaaa</div>)
          </div>
        ) : (
          <div>nose</div>
        )}
      </ul>
    </>
  ) : (
    <div></div>
  );
};

export default UserExperiences;
/**/
