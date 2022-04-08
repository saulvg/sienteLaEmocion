import { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import decode from 'jwt-decode';
import useActivities from '../../hooks/useActivities';
import { InputElement } from '../Forms/InputElement';
import BlueButton from '../Forms/BlueButton';
import useBookings from '../../hooks/useBookings';
import { useParams } from 'react-router';

const Review = ({ id }) => {
  const [vote, setVote] = useState('');
  const [review, setReview] = useState('');
  const { token } = useUser();
  const { idExperience } = useParams();
  const { bookings } = useBookings();
  const { idExperienceBookings } = useParams();
  const reviews = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}/votes`,
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
  return (
    <>
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
        {bookings ? (
          bookings.map((book) => {
            return (
              <BlueButton
                name='aaaa'
                onClick={<Link to={`/experiences/${book.id}/votes`}></Link>}
              >
                <div
                  name='entry_votes_input'
                  onChange={(e, newValue) => {
                    e.stopPropagation();
                    reviews(newValue);
                  }}
                />
              </BlueButton>
            );
          })
        ) : (
          <div></div>
        )}
        {console.log('review')}
      </form>
      )
    </>
  );
};

export default Review;
/*
<div onClick={(e) => e.stopPropagation()}>
<Rating
  name='entry_votes_input'
  onChange={(e, newValue) => {
    e.stopPropagation();
    voteEntry(newValue);
  }}
/>
</div>


*/
