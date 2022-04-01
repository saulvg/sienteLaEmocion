/**
 * ###########
 * ## Style ##
 * ###########
 */
import './listaActividades.css';

/**
 * ###########
 * ## Hooks ##
 * ###########
 */
//import useFilterActivities from '../../hooks/useFilterActivities';
import useActivities from '../../hooks/useActivities';

/**
 * ################
 * ## Components ##
 * ################
 */
import ActividadLista from '../../components/ActividadLista/ActividadLista';
import Header from '../../components/Header/Header';
import BodyExperiencesList from '../../components/Header/MainHeader/BodyExperiencesList';

//const decodeToken = decod(token)
//console.log(token);
/**
 * ###########
 * ## Main ##
 * ###########
 */

const ListaActividades = () => {
  const { activities, error } = useActivities();

  return (
    <div id='listaActividades'>
      <Header
        to={`/experiences/:idExperience`}
        button={'Atrevete'}
        body={<BodyExperiencesList />}
      />
      <span>Filtrar por ↧</span>
      <ActividadLista activities={activities} error={error} />
    </div>
  );
};
export default ListaActividades;
