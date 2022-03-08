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
import BodyActivitis from '../../components/Header/MainHeader/BodyActivitis';

/**
 * ###########
 * ## Main ##
 * ###########
 */

const ListaActividades = () => {
  return (
    <div id='listaActividades'>
      <Header
        to={'/listaActividades/senderismo/3'}
        button={'Atrevete'}
        body={<BodyActivitis />}
      />
      <span>Filtrar por ↧</span>
      <ActividadLista />
    </div>
  );
};
export default ListaActividades;
