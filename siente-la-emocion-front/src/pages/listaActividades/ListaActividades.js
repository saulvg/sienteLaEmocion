// ## Style ##
import './listaActividades.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useActivities from '../../hooks/useActivities';
import useActivity from '../../hooks/useActivity';

/**
 * ################
 * ## Components ##
 * ################
 */
import ActividadLista from '../../components/ActividadLista/ActividadLista';
import Header from '../../components/Header/Header';
import BodyExperiencesList from '../../components/Header/MainHeader/BodyExperiencesList';
import { useState } from 'react';
import useActivityPhotosHeader from '../../hooks/useActivityPhotoHeader';
import Error from '../../components/error/Error';
//import { Calendar } from 'react-calendar';

//Pagina que pinta la lista de todas las experiencias disponibles en la Web
const ListaActividades = () => {
  const { activity } = useActivity('random'); /* ................. */

  const [filter, setFilter] = useState(false);

  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [votes, setVotes] = useState('');

  const navigate = useNavigate();
  const [params] = useSearchParams();
  const termCategory = params.get('category');
  const termPrice1 = params.get('price1');
  const termPrice2 = params.get('price2');

  const { activities, error } = useActivities(
    termCategory,
    termPrice1,
    termPrice2
  );

  /*  //Recogemos todos los id de las experiencias que estan disponibles
  const idExperiences = activities.map((id) => id.id);

  //Generamos un numero aleatoria dentro del numero de id que hay
  const randomIdExperience = Math.floor(Math.random() * idExperiences.length);
  //Seleccionamos el id aleatorio para mas adelante pasarselo como prop a 'BodyExperienceList'
  let randomExperience;
  if (activities[randomIdExperience]?.id) {
    randomExperience = activities[randomIdExperience].id;
  } */

  const handleFilter = (e) => {
    e.preventDefault();

    const params = {};
    if (category) params.category = category;
    if (price) {
      params.price1 = price[0];
      params.price2 = price[1];
    }
    if (votes) params.votes = votes;

    const queryString = new URLSearchParams(params).toString();

    navigate(`?${queryString}`);
  };
  /* const today = new Date();
  console.log(today);
  const allActivies = activities.map(
    (activity) => activity.date === new Date()
    );
    console.log('filtradas', allActivies); */
  //const { photos, errorLoadPhoto } = useActivityPhotos(1);
  //console.log('photo', photos);

  //console.log(activity.experience.photoHeader);

  console.log(activity);
  return activity ? (
    <div id='listaActividades'>
      <Header
        bg={
          activity.experience.photoHeader
            ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.experience.photoHeader}`
            : 'https://images.pexels.com/photos/386009/pexels-photo-386009.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        }
        to={`/experiences/${activity.experience.id}`}
        button={'Atrevete'}
        body={<BodyExperiencesList activity={activity} />}
      />
      <div className='container flex activity-content'>
        <div className='filter'>
          <button
            className='filter-by'
            onClick={() => {
              setFilter(!filter);
            }}
          >
            Filtrar por ↧
          </button>
          {filter ? (
            <div className='filter-content filter-section'>
              <div id='aventura'>
                <h3 className='filter-title'>aventura</h3>
                <div className='icon-filterStyle adventure-grid '>
                  <div
                    className='icon-filterStyle escalada'
                    onClick={() => {
                      !category ? setCategory(`escalada`) : setCategory('');
                    }}
                  ></div>
                  <div
                    className='icon-filterStyle ciclismo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`ciclismo`) : setCategory('');
                    }}
                  >
                    Ciclismo
                  </div>
                  <div
                    className='icon-filterStyle paracaidismo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`paracaidismo`) : setCategory('');
                    }}
                  >
                    Paracaidismo
                  </div>
                  <div
                    className='icon-filterStyle esqui'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`esqui`) : setCategory('');
                    }}
                  >
                    Esqui
                  </div>
                  <div
                    className='icon-filterStyle buceo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`buceo`) : setCategory('');
                    }}
                  >
                    Buceo
                  </div>
                  <div
                    className='icon-filterStyle piraguismo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`piraguismo`) : setCategory('');
                    }}
                  >
                    Piraguismo
                  </div>
                  <div
                    className='icon-filterStyle yoga'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`yoga`) : setCategory('');
                    }}
                  >
                    Yoga
                  </div>
                  <div
                    className='icon-filterStyle motorBike'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`motorBike`) : setCategory('');
                    }}
                  >
                    MotorBike
                  </div>
                  <div
                    className='icon-filterStyle espeleologia'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category ? setCategory(`espeleologia`) : setCategory('');
                    }}
                  >
                    Esperiologio
                  </div>
                  {console.log('rutaCategory', category)}; Escalada
                </div>
              </div>
              <div className='filter-section filter-map'>
                <h3 className='filter-title'>map</h3>
                <input
                  type={'search'}
                  placeholder='Busca aquí...'
                  className='map-input'
                ></input>
                <button className='map-search'>Buscador</button>
                <div className='w-full map'></div>
              </div>
              <div id='ratings' className='filter-section'>
                <h3 className='filter-title'>puntuación</h3>
                <div className='ratings'>
                  <svg
                    className='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      setVotes(1);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    className='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      setVotes(2);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    className='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      setVotes(3);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    className='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      setVotes(4);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>

                  <svg
                    className='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    onClick={() => {
                      setVotes(5);
                    }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                </div>
              </div>
              {/* .... */}
              <div id='precios' className='filter-section'>
                <h3 className='filter-title'>precios</h3>
                <div className='flex items-center filter-checkbox'>
                  <input
                    name='price'
                    className='price-filter'
                    type={'radio'}
                    onClick={() => setPrice([0, 20])}
                  ></input>
                  <label for='0-20'>0 - 20 €</label>
                </div>
                <div className='flex items-center filter-checkbox'>
                  <input
                    name='price'
                    className='price-filter'
                    type={'radio'}
                    onClick={() => setPrice([20, 40])}
                  ></input>
                  <label>20 - 40 €</label>
                </div>
                <div className='flex items-center filter-checkbox'>
                  <input
                    name='price'
                    className='price-filter'
                    type={'radio'}
                    onClick={() => setPrice([40, 60])}
                  ></input>
                  <label>40 - 60 €</label>
                </div>
                {/*                 <div className='flex items-center filter-checkbox'>
                  <input
                    name='price'
                    className='price-filter'
                    type={'radio'}
                  ></input>
                  <label> {'> 60 €'}</label>
                </div> */}
                {console.log('rutaPrice', price)}; Escalada
              </div>
              <div id='calendar' className='filter-section'>
                <h3 className='filter-title'>Fechas</h3>
              </div>
              <button onClick={handleFilter}>Filtrar</button>
            </div>
          ) : null}
        </div>

        <ActividadLista activities={activities} error={error} />
      </div>
    </div>
  ) : (
    <Error>{error}</Error>
  );
};
export default ListaActividades;
