import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import decode from 'jwt-decode';
import useActivities from '../../hooks/useActivities';
import { useParams } from 'react-router-dom';
import './UserExperiences.css';
import { EditAvatar } from '../EditAvatar/EditAvatar';
import { InputElement, TextareaElement } from '../Forms/InputElement';
import BlueButton from '../Forms/BlueButton';
import { Modal } from '../Modal/Modal';
import Review from '../Review/Review';
import useBookings from '../../hooks/useBookings';
import useActivity from '../../hooks/useActivity';

const UserExperiences = () => {
  const { token, user } = useUser();
  const { idUser } = useParams();

  const [vote, setVote] = useState('');
  const [review, setReview] = useState('');
  const { idExperiencesBooking } = useParams();
  //const { activity, error } = useActivity();
  //const { idExperience } = useParams();
  const { bookings } = useBookings(idExperiencesBooking);

  const reviews = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperiencesBooking}/votes`,
        {
          method: 'POST',
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vote, review }),
        }
      );

      const body = await res.json();
      if (res.ok) {
        console.log(body);
      } else {
        console.error('Error', body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const decoded = decode(token);

  //decoded.id === idUser
  bookings ? (
    bookings.map((a) => {
      const data = bookings[0].date;
      const DATA = new Date(data);
      console.log('A VER FECHAAAAAAA', DATA.toLocaleDateString());

      console.log('ID DE LA ACTIVIDAD', a.id);
      return (
        <>
          <div>{a.id}</div>

          <p></p>
        </>
      );
    })
  ) : (
    <div></div>
  );
  const fecha = new Date().getTime();
  console.log('HOLAAAAAAAAA', fecha);
  /*const date = experiences[0].date;
  const dateFormat = `${date.toLocaleDateString()} a las ${date.toLocaleTimeString()}`;*/
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
                      <h1>{book.vote}</h1>
                      <p>
                        {console.log(
                          'FECHA ACTIVIDAD',
                          new Date(book.date).getTime()
                        )}
                      </p>

                      {new Date(book.date).getTime() < fecha ? (
                        <form onSubmit={reviews}>
                          <div className='form-elements'>
                            <InputElement
                              labelName='Review'
                              type='text'
                              id='review'
                              name='review'
                              value={review}
                              onChange={(e) => {
                                setReview(e.target.value);
                              }}
                            />
                            <InputElement
                              labelName='voto'
                              type='number'
                              value={vote}
                              onChange={(e) => {
                                setVote(e.target.value);
                              }}
                            />
                          </div>
                          <BlueButton
                            name='aaaa'
                            onClick={(e) =>
                              e.stopPropagation(
                                <Link
                                  to={`/experiences/${book.id}/votes`}
                                ></Link>
                              )
                            }
                          >
                            {' '}
                            <div
                              name='entry_votes_input'
                              onChange={(e, newValue) => {
                                e.stopPropagation();
                                reviews(newValue);
                              }}
                            />
                          </BlueButton>

                          {console.log('review')}
                        </form>
                      ) : (
                        <div>
                          <h1>la experiencia aun no pasó</h1>
                        </div>
                      )}
                    </li>
                  );
                })}
              </div>
            </div>
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
