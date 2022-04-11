import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../../hooks/useReviews';
import useUser from '../../hooks/useUser';
import BlueButton from '../Forms/BlueButton';
import { InputElement, TextareaElement } from '../Forms/InputElement';
import { Modal } from '../Modal/Modal';
export const Booking = ({ book }) => {
  const [vote, setVote] = useState('');
  const [review, setReview] = useState('');
  const { token } = useUser();
  const { reviews, error } = useReviews();
  console.log(book);
  const createReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${book.experienceId}/votes`,
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
  return (
    <>
      <h2>{book.company}</h2>
      <h3>{book.category}</h3>
      <p>{book.city}</p>
      <p>{book.vote}</p>
      {new Date(book.date) < new Date() ? (
        <div className='modal-review'>
          <Modal
            buttonName='Añadir valoración'
            content={
              <form onSubmit={createReview}>
                <div className='form-elements'>
                  <TextareaElement
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
                      <Link to={`/experiences/${book.id}/reviews`}></Link>
                    )
                  }
                >
                  {' '}
                  <div
                    name='entry_votes_input'
                    onChange={(e, newValue) => {
                      e.stopPropagation();
                      createReview(newValue);
                    }}
                  />
                </BlueButton>
              </form>
            }
          />
        </div>
      ) : (
        <div>
          <h1>la experiencia aun no pasó</h1>
        </div>
      )}
    </>
  );
};
