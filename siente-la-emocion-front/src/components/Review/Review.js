import { useState } from 'react';
import { Link } from 'react-router-dom';
import useReviews from '../../hooks/useReviews';
import useUser from '../../hooks/useUser';
import BlueButton from '../Forms/BlueButton';
import { InputElement, TextareaElement } from '../Forms/InputElement';
import { Modal } from '../Modal/Modal';
import './review.css';
export const Booking = ({ book }) => {
  let [vote, setVote] = useState('');
  const [review, setReview] = useState('');
  const { token } = useUser();
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
  return token ? (
    <>
      <div class='my-experience-img'></div>
      <div className='flex flex-column justify-between my-experience-content'>
        <h2>
          {book.category} ({book.company})
        </h2>
        <div className='flex justify-between items-center'>
          <span>{book.date}</span>
          {new Date(book.date) < new Date() && !book.vote ? (
            <Modal
              buttonName='Añadir valoración'
              buttonClass='add-review-button'
              content={
                <form onSubmit={createReview}>
                  <div className='modal1'>
                    <h2>Valoración</h2>
                  </div>
                  <div className='modal3'>
                    <div className='circle-background2'></div>
                  </div>
                  <div className='modal4'>
                    <div className='circle-background3'></div>
                  </div>
                  <div className='modal2'>
                    <div className='circle-background'></div>
                    <TextareaElement
                      labelName='Déjanos tu comentario de valoración'
                      type='text'
                      id='review'
                      name='review'
                      value={review}
                      onChange={(e) => {
                        setReview(e.target.value);
                      }}
                    />
                    <div className='ranking'>
                      <input
                        className='stars'
                        id='radio1'
                        type='radio'
                        name='estrellas'
                        value={(vote = 5)}
                        onChange={(e) => {
                          setVote(e.target.value);
                        }}
                      />
                      <label className='label-stars' htmlFor='radio1'>
                        ★
                      </label>

                      <input
                        className='stars'
                        id='radio2'
                        type='radio'
                        name='estrellas'
                        value={(vote = 4)}
                        onChange={(e) => {
                          setVote(e.target.value);
                        }}
                      />
                      <label className='label-stars' htmlFor='radio2'>
                        ★
                      </label>
                      <input
                        className='stars'
                        id='radio3'
                        type='radio'
                        name='estrellas'
                        value={(vote = 3)}
                        onChange={(e) => {
                          setVote(e.target.value);
                        }}
                      />
                      <label className='label-stars' htmlFor='radio3'>
                        ★
                      </label>

                      <input
                        className='stars'
                        id='radio4'
                        type='radio'
                        name='estrellas'
                        value={(vote = 2)}
                        onChange={(e) => {
                          setVote(e.target.value);
                        }}
                      />
                      <label className='label-stars' htmlFor='radio4'>
                        ★
                      </label>
                      <input
                        className='stars'
                        id='radio5'
                        type='radio'
                        name='estrellas'
                        value={(vote = 1)}
                        onChange={(e) => {
                          setVote(e.target.value);
                        }}
                      />
                      <label className='label-stars' htmlFor='radio5'>
                        ★
                      </label>
                    </div>
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
          ) : (
            <div className='experience-error'>
              <h1>la experiencia aun no pasó</h1>
            </div>
          )}
        </div>
      </div>
      <div>{console.log('A VER ESTO, VOTOS , 1 Y 0 DEBERIA SER', book)}</div>

      {book.vote === 5 ? (
        <div>★★★★★ </div>
      ) : book.vote === 4 ? (
        <div>★★★★</div>
      ) : book.vote === 3 ? (
        <div>★★★</div>
      ) : book.vote === 2 ? (
        <div>★★</div>
      ) : book.vote === 1 ? (
        <div>★</div>
      ) : (
        <div></div>
      )}
    </>
  ) : (
    <div></div>
  );
};
/*
<form>
  <p class="clasificacion">
    <input id="radio1" type="radio" name="estrellas" value="5"><!--
    --><label for="radio1">★</label><!--
    --><input id="radio2" type="radio" name="estrellas" value="4"><!--
    --><label for="radio2">★</label><!--
    --><input id="radio3" type="radio" name="estrellas" value="3"><!--
    --><label for="radio3">★</label><!--
    --><input id="radio4" type="radio" name="estrellas" value="2"><!--
    --><label for="radio4">★</label><!--
    --><input id="radio5" type="radio" name="estrellas" value="1"><!--
    --><label for="radio5">★</label>
  </p>
  value='5'
                      onChange={(e) => {
                        setVote(e.target.value);
                      }}
</form>*/
