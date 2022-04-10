import { AuthContext } from '../../App';

/* 
* ###########
* ## React ##
* ###########
*/
import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';

/* 
* ###############
* ## Component ##
* ###############
*/
import BlueButton from '../Forms/BlueButton';
import Error from '../error/Error';



const DeleteExperience = () => {
    const { token } = useContext(AuthContext);
    console.log(token);
    const {idExperience} = useParams()
    const [done, setDone] = useState('');
    console.log(idExperience);

    
    const deleteExperience = async (event)=> {
        event.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND}/experiences/${idExperience}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                  },
            })
            const body = await response.json()
            if(response.ok) {
                console.log('Experiencia eliminada con exito');
                setDone(true);

            }else {
                console.error('Error', body.message);
            }
        } catch (error) {
            console.error(error)   
           
        }
    }

    return(
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
                  <p className='delete-message'>
                    ¿Seguro que quieres eliminar la experiencia?
                  </p>
                  <div className='delete-buttons'>
                    <BlueButton name='Eliminar' onClick={deleteExperience} />
                    <BlueButton name='Cancelar' />
                  </div>
                </>
              ) : (
                <p className='confirmation'>La experiencia ha sido eliminada</p>
              )}
            </div>
          </div>
        </div>
      </form>
    )


        
    
}
export default DeleteExperience