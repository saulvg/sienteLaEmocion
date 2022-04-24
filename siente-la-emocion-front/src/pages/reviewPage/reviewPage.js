import React from 'react';
import Route, { useParams } from 'react-router';
//import useAvatar, { Avatar } from '../../components/Avatar/Avatar';
import useReviews from '../../hooks/useReviews';
import './review.css';
import useCompanies from '../../hooks/useCompanies';
//import { Perfil } from '../perfil/GUARDARPERFIL';
import useUserProfile from '../../hooks/useUserProfile';
import useUser from '../../hooks/useUser';
import Header from '../../components/Header/Header';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';
import { Modal } from '../../components/Modal/Modal';
import useActivity from '../../hooks/useActivity';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';

// COMPONENTE PARA REVIEW
export const Review = ({ avatar, userName }) => {
  //const { users } = useUserProfile();
  const { user, token } = useUser();
  // const decoded = decode(token);

  const { reviews, error } = useReviews();
  if (error) return <div>Hubo un error: {error}</div>;
  console.log('VER REVIEWS', reviews);
  return reviews.length > 0 ? (
    <>
      <ul className='single-review'>
        {reviews.map((review) => {
          return (
            <li key={review.id} className='review'>
              <article className='list-reviews'>
                <ul className='user'>
                  <img
                    className='avatar'
                    src={'http://localhost:4000/uploads/' + review.avatar}
                    alt='aaaaa'
                  />
                  {token ? (
                    <div className='username'>
                      <Modal
                        buttonClass='username-modal'
                        buttonName={review.username}
                        titleModal={review.username}
                        content={review.biography}
                      ></Modal>
                    </div>
                  ) : (
                    <div className='username'>{review.username}</div>
                  )}
                </ul>
                <div className='texto-review'>
                  <p className='texto'>``{review.review}´´</p>
                  <p className='voto'>
                    Puntuación:{' '}
                    {review.vote === 5 ? (
                      <div>★★★★★ </div>
                    ) : review.vote === 4 ? (
                      <div>★★★★</div>
                    ) : review.vote === 3 ? (
                      <div>★★★</div>
                    ) : review.vote === 2 ? (
                      <div>★★</div>
                    ) : review.vote === 1 ? (
                      <div>★</div>
                    ) : (
                      <div></div>
                    )}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    </>
  ) : (
    <div>No hay reviews</div>
  );
};
/*import React from 'react';
import Route from 'react-router';
//import useAvatar, { Avatar } from '../../components/Avatar/Avatar';
import useReviews from '../../hooks/useReviews';
import './review.css';
import { Perfil } from '../perfil/Perfil';
import useUser from '../../hooks/useUser';
// COMPONENTE PARA REVIEW
export const Review = ({ avatar, userName }) => {
  const { user } = useUser();
  const { reviews, error } = useReviews();
  if (error) return <div>Hubo un error: {error}</div>;

  return reviews.length > 0 ? (
    <ul>
      {reviews.map((review) => {
        return (
          <li key={review.id}>
            <section className='actividad'>
              <article className='review'>
                <div className='user'>
                  <img
                    src={'http://localhost:4000/uploads/' + review.avatar}
                    alt='aaaaa'
                  />

                  {console.log(review)}
                </div>
                <div className='texto'>
                  <p>VALORACIÓN:{review.review}</p>
                  <p>VOTO: {review.vote}</p>
                  <p>{review.id_experiences}</p>
                  <p>{review.id_user}</p>
                  <a href={`/perfil` /* ID DE USUARIO PARA IR A SU PERFIL}>
                    {review.username}
                  </a>{' '}
                </div>
              </article>
            </section>
          </li>
        );
      })}
    </ul>
  ) : (
    <div>No hay reviews</div>
  );
};
*/
/*
id INT PRIMARY KEY AUTO_INCREMENT,
            id_experiences INT NOT NULL,
            vote TINYINT,
            review VARCHAR(255),
            createdAt DATETIME NOT NULL,
            id_user INT NOT NULL,
            FOREIGN KEY(id_user) REFERENCES users(id),
            //FOREIGN KEY (id_experiences) REFERENCES experiences(id) ON DELETE CASCADE */

export const ReviewPage = () => {
  const { idExperience } = useParams();
  const { company, error } = useCompanies();
  const { activity } = useActivity(idExperience);
  //console.log('QUE EXPERIENCIA ES:', idExperience);

  return activity ? (
    <>
      <Header
        bg={
          'https://images.pexels.com/photos/3880059/pexels-photo-3880059.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        }
        to={''}
        body={<BodyHeaderHomePage />}
        button={''}
        className={'simpleHeader'}
      />

      <main className='listaReviews'>
        <section className='reviews'>
          <h2 className='empresa'>
            {activity.experiences_category} en {activity.company}
          </h2>{' '}
          <Review className='article' />
        </section>
      </main>
    </>
  ) : (
    <div>No hay reviews de esta experiencia</div>
  );
};
/* <article className='review'>
<img
                    className='avatar'
                    src={`../../../sienteLaEmocion-BACK/static/uploads/${review.avatar}`}
                    alt='avatar'
                  />







                  
              <div className='user'>
                <img
                  className='avatar'
                  src='https://images.vexels.com/media/users/3/200285/isolated/lists/43b5f8e9ee27cfd488a57d23e7b1dcdc-avatar-anonimo-hombre-pelo-corto-y-rizado.png'
                  alt='avatar'
                />{' '}
              </div>
              <div className='texto'>
                <h3>Antonio Marín</h3>
                <p>
                  Cras nulla ex, accumsan in nibh sed, aliquam molestie magna.
                  Ut ac tincidunt ligula, sit amet ornare risus. Donec fringilla
                  pulvinar justo ut pulvinar. Cras eu facilisis eros. Sed
                  imperdiet, risus rhoncus tincidunt finibus, nunc augue
                  tincidunt sapien, non dapibus ligula odio sed dolor. Phasellus
                  eu mattis neque, et lobortis turpis. Aliquam tincidunt
                  fringilla faucibus. Cras nulla ex, accumsan in nibh sed,
                  aliquam molestie magna. Ut ac tincidunt ligula, sit amet
                  ornare risus. Donec fringilla pulvinar justo ut pulvinar. Cras
                  eu facilisis eros. Sed imperdiet, risus rhoncus tincidunt
                  finibus, nunc augue tincidunt sapien, non dapibus ligula odio
                  sed dolor. Phasellus eu mattis neque, et lobortis turpis.
                  Aliquam tincidunt fringilla faucibus. Cras nulla ex, accumsan
                  in nibh sed, aliquam molestie magna. Ut ac tincidunt ligula,
                  sit amet ornare risus. Donec fringilla pulvinar justo ut
                  pulvinar. Cras eu facilisis eros. Sed imperdiet, risus rhoncus
                  tincidunt finibus, nunc augue tincidunt sapien, non dapibus
                  ligula odio sed dolor. Phasellus eu mattis neque, et lobortis
                  turpis. Aliquam tincidunt fringilla faucibus. Cras nulla ex,
                  accumsan in nibh sed, aliquam molestie magna. Ut ac tincidunt
                  ligula, sit amet ornare risus. Donec fringilla pulvinar justo
                  ut pulvinar. Cras eu facilisis eros. Sed imperdiet, risus
                  rhoncus tincidunt finibus, nunc augue tincidunt sapien, non
                  dapibus ligula odio sed dolor. Phasellus eu mattis neque, et
                  lobortis turpis. Aliquam tincidunt fringilla faucibus. Cras
                  nulla ex, accumsan in nibh sed, aliquam molestie magna. Ut ac
                  tincidunt ligula, sit amet ornare risus. Donec fringilla
                  pulvinar justo ut pulvinar. Cras eu facilisis eros. Sed
                  imperdiet, risus rhoncus tincidunt finibus, nunc augue
                  tincidunt sapien, non dapibus ligula odio sed dolor. Phasellus
                  eu mattis neque, et lobortis turpis. Aliquam tincidunt
                  fringilla faucibus. Cras nulla ex, accumsan in nibh sed,
                  aliquam molestie magna. Ut ac tincidunt ligula, sit amet
                  ornare risus. Donec fringilla pulvinar justo ut pulvinar. Cras
                  eu facilisis eros. Sed imperdiet, risus rhoncus tincidunt
                  finibus, nunc augue tincidunt sapien, non dapibus ligula odio
                  sed dolor. Phasellus eu mattis neque, et lobortis turpis.
                  Aliquam tincidunt fringilla faucibus. Cras nulla ex, accumsan
                  in nibh sed, aliquam molestie magna. Ut ac tincidunt ligula,
                  sit amet ornare risus. Donec fringilla pulvinar justo ut
                  pulvinar. Cras eu facilisis eros. Sed imperdiet, risus rhoncus
                  tincidunt finibus, nunc augue tincidunt sapien, non dapibus
                  ligula odio sed dolor. Phasellus eu mattis neque, et lobortis
                  turpis. Aliquam tincidunt fringilla faucibus.
                </p>
                <p>
                  CALIFICACIÓN
                  <div>estrellitas</div>
                </p>
              </div>
            </article>
            <article className='review'>
              <div className='user'>
                <img
                  className='avatar'
                  src='https://images.vexels.com/media/users/3/158258/isolated/lists/f57b7958fe1cc98bf3f02633723d84cd-mujer-de-pelo-recto-avatar.png'
                  alt='avatar'
                />{' '}
              </div>
              <div className='texto'>
                <h3>María Santana</h3>
                <p>
                  Cras nulla ex, accumsan in nibh sed, aliquam molestie magna.
                  Ut ac tincidunt ligula, sit amet ornare risus. Donec fringilla
                  pulvinar justo ut pulvinar. Cras eu facilisis eros. Sed
                  imperdiet, risus rhoncus tincidunt finibus, nunc augue
                  tincidunt sapien, non dapibus ligula odio sed dolor. Phasellus
                  eu mattis neque, et lobortis turpis. Aliquam tincidunt
                  fringilla faucibus.
                </p>
                <p>
                  CALIFICACIÓN
                  <div>estrellitas</div>
                </p>
              </div>
            </article>
            <article className='review'>
              <div className='user'>
                <img
                  className='avatar'
                  src='https://images.vexels.com/media/users/3/158258/isolated/lists/f57b7958fe1cc98bf3f02633723d84cd-mujer-de-pelo-recto-avatar.png'
                  alt='avatar'
                />{' '}
              </div>
              <div className='texto'>
                <h3>María Santana</h3>
                <p>
                  Cras nulla ex, accumsan in nibh sed, aliquam molestie magna.
                  Ut ac tincidunt ligula, sit amet ornare risus. Donec fringilla
                  pulvinar justo ut pulvinar. Cras eu facilisis eros. Sed
                  imperdiet, risus rhoncus tincidunt finibus, nunc augue
                  tincidunt sapien, non dapibus ligula odio sed dolor. Phasellus
                  eu mattis neque, et lobortis turpis. Aliquam tincidunt
                  fringilla faucibus.
                </p>
                <p>
                  CALIFICACIÓN
                  <div>estrellitas</div>
                </p>
              </div>
            </article>
            <article className='review'>
              <div className='user'>
                <img
                  className='avatar'
                  src='https://images.vexels.com/media/users/3/158258/isolated/lists/f57b7958fe1cc98bf3f02633723d84cd-mujer-de-pelo-recto-avatar.png'
                  alt='avatar'
                />{' '}
              </div>
              <div className='texto'>
                <h3>María Santana</h3>
                <p>
                  Cras nulla ex, accumsan in nibh sed, aliquam molestie magna.
                  Ut ac tincidunt ligula, sit amet ornare risus. Donec fringilla
                  pulvinar justo ut pulvinar. Cras eu facilisis eros. Sed
                  imperdiet, risus rhoncus tincidunt finibus, nunc augue
                  tincidunt sapien, non dapibus ligula odio sed dolor. Phasellus
                  eu mattis neque, et lobortis turpis. Aliquam tincidunt
                  fringilla faucibus. Cras nulla ex, accumsan in nibh sed,
                  aliquam molestie magna. Ut ac tincidunt ligula, sit amet
                  ornare risus. Donec fringilla pulvinar justo ut pulvinar. Cras
                  eu facilisis eros. Sed imperdiet, risus rhoncus tincidunt
                  finibus, nunc augue tincidunt sapien, non dapibus ligula odio
                  sed dolor. Phasellus eu mattis neque, et lobortis turpis.
                  Aliquam tincidunt fringilla faucibus.
                </p>
                <p>
                  CALIFICACIÓN
                  <div>estrellitas</div>
                </p>
              </div>
            </article>*/

/**
 * ###########
 * ## Hooks ##
 * ###########
 */

/*
useReviews;

import useReviews from '../../hooks/useReviews';

export const ListaReviews = () => {
  const { reviews, error } = useReviews();

  if (error) return <div>Hubo un error: {error}</div>;

  return reviews.length > 0 ? (
    <ul>
      {reviews.map((review) => {
        return (
          <li key={review.id}>
            <section className='actividad'>
              <div>
                id={'idActividad'}
                clas={'listaActividades'}
                children={review.review}
              </div>
            </section>
          </li>
        );
      })}
    </ul>
  ) : (
    <div>No hay reviews</div>
  );
};
export default ListaReviews;
*/
