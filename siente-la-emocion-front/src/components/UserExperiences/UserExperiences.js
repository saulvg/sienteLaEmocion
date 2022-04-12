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
    <ul className='my-experiences'>
      {bookings.length > 0 ? (
        <>
          {bookings.map((book) => {
            return (
              <li key={book.id} className='my-experience'>
                <div className='flex w-full '>
                  <span className='experience-avatar'></span>
                  <div className='experience-content'>
                    <div>
                      <h2>
                        {book.category} ({book.company})
                      </h2>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                      <button className='add-review-button'>
                        Añadir valoración
                      </button>
                      <p>{book.date}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </>
      ) : (
        <div>nose</div>
      )}
    </ul>
  ) : (
    <div></div>
  );
};

export default UserExperiences;
/**/
