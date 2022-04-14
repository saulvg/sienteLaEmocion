// ## Style ##
import './listaActividades.css';

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

//Pagina que pinta la lista de todas las experiencias disponibles en la Web
const ListaActividades = () => {
  const { activities, error } = useActivities();
  console.log('soy activities', activities);

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
