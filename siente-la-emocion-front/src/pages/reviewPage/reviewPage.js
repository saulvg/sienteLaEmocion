// ## Style ##
import './review.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import React from 'react';
import { useParams } from 'react-router';
/**
 * ################
 * ## Components ##
 * ################
 */
import Error from '../../components/error/Error';
import Header from '../../components/Header/Header';
import { Modal } from '../../components/Modal/Modal';
import BodyHeaderHomePage from '../../components/Header/MainHeader/BodyHeaderHomePage';
import Loading from '../../components/Loading/Loading';
/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useReviews from '../../hooks/useReviews';
import useUser from '../../hooks/useUser';
import useActivity from '../../hooks/useActivity';

//Pagina que pinta las reviews que los usuarios han tenido sobre una experiencia en relacion a una compañia
const ReviewPage = () => {
  const { idExperience } = useParams();
  const { activity } = useActivity(idExperience);
  const { token } = useUser();
  const { reviews, error } = useReviews('');

  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones (error, token ?), sino devolvemos el correspondiente error en Front
  return activity ? (
    <>
      <Header
        bg={'/img/principal.jpg'}
        to={''}
        body={<BodyHeaderHomePage />}
        button={''}
        className={'simpleHeader'}
      />

      <main className='listaReviews'>
        <section className='reviews'>
          <h2 className='empresa'>
            {activity.experiences_category} con <br /> {activity.company}
          </h2>
          {error ? (
            <Error>{error}</Error>
          ) : (
            <>
              {reviews.length > 0 ? (
                <>
                  {reviews.map((review) => {
                    return (
                      <ul className='single-review'>
                        <li key={review.id} className='review'>
                          <div className='user'>
                            <img
                              className='avatar'
                              src={
                                review.avatar
                                  ? 'http://localhost:4000/uploads/' +
                                    review.avatar
                                  : 'https://affinitaslegal.com/wp-content/uploads/2020/08/imagen-perfil-sin-foto.jpg'
                              }
                              alt='Avatar'
                            />
                            {token ? (
                              <div className='username'>
                                <Modal
                                  buttonClass='username-modal'
                                  buttonName={review.username}
                                  titleModal={review.username}
                                  content={
                                    review.biography
                                      ? 'Biografia:' + review.biography
                                      : 'Biografia: Sin informacion'
                                  }
                                ></Modal>
                              </div>
                            ) : (
                              <div className='username'>{review.username}</div>
                            )}
                            <div className='texto-review'>
                              <p className='texto'>{review.review}</p>
                              <div className='voto'>
                                Puntuación:{' '}
                                {review.vote === 5 ? (
                                  <span>★★★★★ </span>
                                ) : review.vote === 4 ? (
                                  <span>★★★★</span>
                                ) : review.vote === 3 ? (
                                  <span>★★★</span>
                                ) : review.vote === 2 ? (
                                  <span>★★</span>
                                ) : review.vote === 1 ? (
                                  <span>★</span>
                                ) : (
                                  <span></span>
                                )}
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    );
                  })}
                </>
              ) : (
                <Error>
                  Todavia no hay valoraciones en relacion a la compañia
                </Error>
              )}
            </>
          )}
        </section>
      </main>
    </>
  ) : (
    <Loading>Cargando Valoraciones</Loading>
  );
};
export default ReviewPage;
