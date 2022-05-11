import { AuthContext } from '../../../App';

/*
 * ###########
 * ## React ##
 * ###########
 */
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

/*
 * ###############
 * ## Component ##
 * ###############
 */
import BlueButton from '../../Forms/BlueButton';
import Error from '../../error/Error';
import Loading from '../../Loading/Loading';

//Componente que utilizamos para pintar y borrar una experiencia
const DeleteExperience = () => {
  //Necesitamos el token porque el backend exige autorization
  const { token } = useContext(AuthContext);
  //Recogemos el id de la experiencia del parametro 'idExperience' de la ruta
  const { idExperience } = useParams();
  //Para redirigir
  const navigate = useNavigate();
  //Estados que utilizaremos para pintar y dar funcionalidad al componente
  const [done, setDone] = useState('');
  const [load, setLoad] = useState('');
  const [error, setError] = useState('');

  //Funcion manejadora asincroma que lleva a cabo la peticion para borrar una experiencia
  const deleteExperience = async (event) => {
    event.preventDefault();
    try {
      //Realizamos la peticion 'DELETE'
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND}/experiences/${idExperience}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: token,
          },
        }
      );
      const body = await response.json();

      //Funcion para redirigir a 'HomePage'
      const redirect = () => navigate('/');

      //Si todo a ido bien cambiamos el estado de 'load' a truthy, iniciamos un setTimeOut para que nos rediriga y cambiamso el estado de done
      //Sino mostramos cambiamos elestado de 'error' para que nos muestre un mensaje por pantalla
      if (response.ok) {
        setLoad(body.message);
        setTimeout(redirect, 5000);
        setDone(true);
      } else {
        console.error('Error', body.message);
        setError(body.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Devolvemos lo que deseamos pintar
  return (
    <>
      {!load ? (
        <form>
          <div className='align-modal'>
            <div className='modal-box'>
              <div className='modal1'></div>
              <div className='modal3'>
                <div className='circle-background2'></div>
              </div>
              <div className='modal4'>
                <div className='circle-background3'></div>
              </div>
              <div className='modal2'>
                <div className='circle-background'></div>
                {!done ? (
                  <>
                    {error ? <Error>{error}</Error> : null}
                    <p className='delete-message'>
                      ¿Seguro que quieres eliminar la experiencia?
                    </p>
                    <div className='delete-buttons'>
                      <BlueButton name='Eliminar' onClick={deleteExperience} />
                      <BlueButton name='Cancelar' />
                    </div>
                  </>
                ) : (
                  <p className='confirmation'>
                    La experiencia ha sido eliminada
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
      ) : (
        <Loading>{load}</Loading>
      )}
    </>
  );
};
export default DeleteExperience;
