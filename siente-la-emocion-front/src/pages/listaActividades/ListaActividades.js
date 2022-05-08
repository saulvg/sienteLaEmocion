// ## Style ##
import './listaActividades.css';

/**
 * ###########
 * ## React ##
 * ###########
 */
import { DatePicker } from '@material-ui/pickers';
import { useState } from 'react';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useActivities from '../../hooks/useActivities';
import useActivity from '../../hooks/useActivity';
import useCategories from '../../hooks/useCategories';

/**
 * ################
 * ## Components ##
 * ################
 */
import ActividadLista from '../../components/ActividadLista/ActividadLista';
import Header from '../../components/Header/Header';
import BodyExperiencesList from '../../components/Header/MainHeader/BodyExperiencesList';
import Loading from '../../components/loading/Loading';

//Pagina que pinta la lista de todas las experiencias disponibles en la Web
const ListaActividades = () => {
  //Para cargar una actividad random en la cabezera de la lista de actividades
  const { activity } = useActivity('random');
  //Parametros para crear el 'queryString' que tendra el valor de la ruta que le pasaremos a activities
  const [category, setCategory] = useState('');
  const { companyCategories, setErrorCategory } = useCategories('');
  const [price, setPrice] = useState('');
  const [votes, setVotes] = useState('');
  const [date, setDate] = useState('');
  const [queryString, setQueryString] = useState('');
  //Estados que usamos con 'DatePicker'
  const [selectDate, setSelectDate] = useState(new Date());

  //si le pasamso un valor a 'queryString' nos devuleve unos valores filtrados, sino todas las experiencias
  const { activities, error } = useActivities(queryString);

  //Funcion encargada de aplicar el filtro cambiar el estado de 'queryString' y asi repintar la pagina segun el filtro
  const handleFilter = (e) => {
    e.preventDefault();
    //Construimos un objeto params al que le vamos implementando propiedades si se cumplen las condiciones
    const params = {};
    if (category) params.category = category;
    if (price) params.price = price;
    if (votes) params.votes = votes;
    if (date) params.date = date;
    //usando el querystring, creamos un objeto del tipo URLSearchParams que transformamos en String y el pasamos a 'useActivities'
    setQueryString(new URLSearchParams(params).toString());
  };
  //Funcion encargada de cambiar el estado de 'date' para  'queryString' y marcar la fecha seleccionada en el input de 'DatePicker'
  const fecha = (selectDate) => {
    setSelectDate(selectDate);
    setDate(selectDate.toISOString().slice(0, 10));
  };

  //Devolvemos todos los compnenetes que deseamos pintar si se cumplen las condiciones (activity ?), sino devolvemos el correspondiente error en Front
  return activity ? (
    <div id='listaActividades'>
      <Header
        bg={
          activity.experience.photoHeader
            ? `${process.env.REACT_APP_BACKEND}/uploads/${activity.experience.photoHeader}`
            : '/img/bus.jpg'
        }
        to={`/experiences/${activity.experience.id}`}
        button={'Atrevete'}
        body={<BodyExperiencesList activity={activity} />}
      />
      <div className='container flex activity-content'>
        <div className='filter'>
          {/* ........Filtro por categorias........ */}
          <div className='filter-content '>
            <div id='aventura' className='filter-section'>
              <h3 className='filter-title'>aventura</h3>
              <div className='adventure-grid '>
                <div
                  className='icon-filter-style escalada'
                  onClick={() => {
                    !category ? setCategory(`escalada`) : setCategory('');
                  }}
                ></div>
                <div
                  className='icon-filter-style ciclismo'
                  onClick={() => {
                    !category ? setCategory(`ciclismo`) : setCategory('');
                  }}
                >
                  Ciclismo
                </div>
                <div
                  className='icon-filter-style paracaidismo'
                  onClick={() => {
                    !category ? setCategory(`paracaidismo`) : setCategory('');
                  }}
                >
                  Paracaidismo
                </div>
                <div
                  className='icon-filter-style esqui'
                  onClick={() => {
                    !category ? setCategory(`esqui`) : setCategory('');
                  }}
                >
                  Esqui
                </div>
                <div
                  className='icon-filter-style buceo'
                  onClick={() => {
                    !category ? setCategory(`buceo`) : setCategory('');
                  }}
                >
                  Buceo
                </div>
                <div
                  className='icon-filter-style piraguismo'
                  onClick={() => {
                    !category ? setCategory(`piraguismo`) : setCategory('');
                  }}
                >
                  Piraguismo
                </div>
                <div
                  className='icon-filter-style yoga'
                  onClick={() => {
                    !category ? setCategory(`yoga`) : setCategory('');
                  }}
                >
                  Yoga
                </div>
                <div
                  className='icon-filter-style motorBike'
                  onClick={() => {
                    !category ? setCategory(`motorBike`) : setCategory('');
                  }}
                >
                  MotorBike
                </div>
                <div
                  className='icon-filter-style espeleologia'
                  onClick={() => {
                    !category ? setCategory(`espeleologia`) : setCategory('');
                  }}
                >
                  Esperiologio
                </div>
              </div>
              <select
                onChange={(e) =>
                  e.target.value !== 'allexperiences'
                    ? setCategory(e.target.value)
                    : setCategory('')
                }
              >
                <option value={'allexperiences'}>
                  {'Busaca por nombre (todas)'}
                </option>
                {companyCategories.map((companyCategory) => (
                  <option value={companyCategory.name}>
                    {companyCategory.name}
                  </option>
                ))}
              </select>
            </div>
            {/* ........Filtro por votos........ */}
            <div id='ratings' className='filter-section'>
              <h3 className='filter-title'>puntuación</h3>
              <div className='ratings'>
                <svg
                  className='star-svg'
                  fill={votes >= 1 ? 'yellow' : 'grey'}
                  stroke='gray'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                    !votes ? setVotes(1) : setVotes(0);
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
                  className={'star-svg'}
                  fill={votes >= 2 ? 'yellow' : 'grey'}
                  stroke='gray'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                    !votes ? setVotes(2) : setVotes(0);
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
                  className={'star-svg'}
                  fill={votes >= 3 ? 'yellow' : 'grey'}
                  stroke='gray'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                    !votes ? setVotes(3) : setVotes(0);
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
                  fill={votes >= 4 ? 'yellow' : 'grey'}
                  stroke='gray'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                    !votes ? setVotes(4) : setVotes(0);
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
                  fill={votes >= 5 ? 'yellow' : 'grey'}
                  stroke='gray'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  onClick={() => {
                    !votes ? setVotes(5) : setVotes(0);
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
            {/* ........Filtro por precios........ */}
            <div id='precios' className='filter-section'>
              <h3 className='filter-title'>precios</h3>
              <div className='flex items-center filter-checkbox'>
                <input
                  name='price'
                  className='price-filter'
                  type={'radio'}
                  onClick={() => setPrice(20)}
                ></input>
                <label>{'< 20 €'}</label>
              </div>
              <div className='flex items-center filter-checkbox'>
                <input
                  name='price'
                  className='price-filter'
                  type={'radio'}
                  onClick={() => setPrice(40)}
                ></input>
                <label> {'< 40 €'}</label>
              </div>
              <div className='flex items-center filter-checkbox'>
                <input
                  name='price'
                  className='price-filter'
                  type={'radio'}
                  onClick={() => setPrice(60)}
                ></input>
                <label> {'< 60 €'}</label>
              </div>
              <div className='flex items-center filter-checkbox'>
                <input
                  name='price'
                  className='price-filter'
                  type={'radio'}
                  onClick={() => setPrice(1000)}
                ></input>
                <label> {'> 60 €'}</label>
              </div>
            </div>
            {/* ........Filtro por fechas........ */}
            <div id='calendar' className='filter-section'>
              <h3 className='filter-title'>Fechas</h3>
              <DatePicker value={selectDate} onChange={fecha} />
              <button onClick={() => setDate('')}>Limpiar fecha</button>
            </div>
            <button onClick={handleFilter}>Filtrar</button>
          </div>
        </div>

        <ActividadLista activities={activities} error={error} />
      </div>
    </div>
  ) : (
    <Loading clas={'load-Page'}>{error ? error : setErrorCategory}</Loading>
  );
};
export default ListaActividades;
