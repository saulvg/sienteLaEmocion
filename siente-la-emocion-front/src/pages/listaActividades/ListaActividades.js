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
  return (
    <div id='listaActividades'>
      <Header
        to={`/experiences/:idExperience`}
        button={'Atrevete'}
        body={<BodyExperiencesList />}
      />
      <span>Filtrar por ↧</span>
      <ActividadLista />
    </div>
  );
};
export default ListaActividades;
