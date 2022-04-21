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

/**
 * ################
 * ## Components ##
 * ################
 */
import ActividadLista from '../../components/ActividadLista/ActividadLista';
import Header from '../../components/Header/Header';
import BodyExperiencesList from '../../components/Header/MainHeader/BodyExperiencesList';
import { useState } from 'react';
import { Calendar } from 'react-calendar';

//Pagina que pinta la lista de todas las experiencias disponibles en la Web
const ListaActividades = () => {
  const [filter, setFilter] = useState(false);

  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const navigate = useNavigate();
  //navigate(`${prueba}`);
  const [params] = useSearchParams();
  const term = params.get('category');
  const { activities, error } = useActivities(term);

  console.log('soy activities', activities);

  return (
    <div id='listaActividades'>
      <Header
        to={`/experiences/:idExperience`}
        button={'Atrevete'}
        body={<BodyExperiencesList />}
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
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=escalada`)
                        : setCategory('');
                    }}
                  ></div>
                  <div
                    className='icon-filterStyle ciclismo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=ciclismo`)
                        : setCategory('');
                    }}
                  >
                    Ciclismo
                  </div>
                  <div
                    className='icon-filterStyle paracaidismo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=paracaidismo`)
                        : setCategory('');
                    }}
                  >
                    Paracaidismo
                  </div>
                  <div
                    className='icon-filterStyle esqui'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=esqui`)
                        : setCategory('');
                    }}
                  >
                    Esqui
                  </div>
                  <div
                    className='icon-filterStyle buceo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=buceo`)
                        : setCategory('');
                    }}
                  >
                    Buceo
                  </div>
                  <div
                    className='icon-filterStyle piraguismo'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=piraguismo`)
                        : setCategory('');
                    }}
                  >
                    Piraguismo
                  </div>
                  <div
                    className='icon-filterStyle yoga'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=yoga`)
                        : setCategory('');
                    }}
                  >
                    Yoga
                  </div>
                  <div
                    className='icon-filterStyle motorBike'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=motorBike`)
                        : setCategory('');
                    }}
                  >
                    MotorBike
                  </div>
                  <div
                    className='icon-filterStyle espeleologia'
                    onClick={() => {
                      /* ${window.location.href} */
                      !category
                        ? setCategory(`?category=espeleologia`)
                        : setCategory('');
                    }}
                  >
                    Esperiologio
                  </div>
                  {console.log('ruta', category)}; Escalada
                  {/* <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg> */}
                  {/* <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg>
                  <svg
                    className='svg-filter '
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                    ></path>
                  </svg> */}
                </div>
              </div>
              <div className='filter-section filter-map'>
                <h3 class='filter-title'>map</h3>
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
                    class='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    class='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    class='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    class='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                  <svg
                    class='star-svg'
                    fill='gray'
                    stroke='gray'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                    ></path>
                  </svg>
                </div>
              </div>
              {/* .... */}
              <div id='precios' className='filter-section'>
                <h3 className='filter-title'>precios</h3>
                <div className='flex items-center filter-checkbox'>
                  <input className='price-filter' type={'checkbox'}></input>
                  <label>0 - 20 €</label>
                </div>
                <div className='flex items-center filter-checkbox'>
                  <input className='price-filter' type={'checkbox'}></input>
                  <label>20 - 40 €</label>
                </div>
                <div className='flex items-center filter-checkbox'>
                  <input className='price-filter' type={'checkbox'}></input>
                  <label>40 - 60 €</label>
                </div>
                <div className='flex items-center filter-checkbox'>
                  <input className='price-filter' type={'checkbox'}></input>
                  <label> {'> 60 €'}</label>
                </div>
              </div>
              <div id='calendar' className='filter-section'>
                <h3 className='filter-title'>Fechas</h3>
                <Calendar />
              </div>
              <button onClick={() => navigate(category)}>Filtrar</button>
            </div>
          ) : null}
        </div>

        <ActividadLista activities={activities} error={error} />
      </div>
    </div>
  );
};
export default ListaActividades;
