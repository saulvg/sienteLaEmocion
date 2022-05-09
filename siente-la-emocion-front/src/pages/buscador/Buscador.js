/**
 * ###########
 * ## React ##
 * ###########
 */
import { useSearchParams } from 'react-router-dom';
/**
 * ################
 * ## Components ##
 * ################
 */
import ActividadLista from '../../components/ActividadLista/ActividadLista';
import Header from '../../components/Header/Header';
import BodyExperiencesList from '../../components/Header/MainHeader/BodyExperiencesList';
import Error from '../../components/error/Error';
import '../Forms/formsPages.css';
/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useFilterActivities from '../../hooks/useFilterActivities';
import useActivity from '../../hooks/useActivity';
import Loading from '../../components/Loading/Loading';

//Pagina que pinta todas las expereincias que conincidan con nuestros parametros de busqueda
function Buscador() {
  const [params] = useSearchParams();
  const { activity } = useActivity('random');
  console.log('Buscador', activity);

  //Recoge todos los parametros de busqueda de search
  const term = params.get('search');
  //Al Hook 'useFilterActivies' le pasamos los parametros de busqueda, para que nos devuelva todas las actividades que encuentre cumpliendo esta condicion
  const { activities, error } = useFilterActivities(term);

  //Devolvemos todos los componentes que deseamos pintar si se cumplen las condiciones (error ?), sino devolvemos el correspondiente error en Front
  return activity ? (
    <>
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
      {!error ? (
        <div className='container search-activity'>
          <ActividadLista activities={activities} error={error} />
        </div>
      ) : (
        <Error>{error}</Error>
      )}
    </>
  ) : (
    <Loading clas={'load-Page'}></Loading>
  );
}

export default Buscador;
