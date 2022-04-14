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
/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useFilterActivities from '../../hooks/useFilterActivities';

//Pagina que pinta todas las expereincias que conincidan con nuestros parametros de busqueda
function Buscador() {
  const [params] = useSearchParams();

  //Recoge todos los parametros de busqueda de search
  const term = params.get('search');
  //Al Hook 'useFilterActivies' le pasamos los parametros de busqueda, para que nos devuelva todas las actividades que encuentre cumpliendo esta condicion
  const { activities, error } = useFilterActivities(term);

  //Devolvemos todos los componentes que deseamos pintar si se cumplen las condiciones (error ?), sino devolvemos el correspondiente error en Front
  return (
    <>
      <Header
        to={`/experiences/:idExperience`}
        button={'Atrevete'}
        body={<BodyExperiencesList />}
      />
      {!error ? (
        <ActividadLista activities={activities} error={error} />
      ) : (
        <Error>{error}</Error>
      )}
    </>
  );
}

export default Buscador;
