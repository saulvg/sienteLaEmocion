/**
 * ###########
 * ## Hooks ##
 * ###########
 */
import useActivity from '../../../hooks/useActivity';

/**
 * ################
 * ## Components ##
 * ################
 */
import SocialNetwork from '../../SocialNetwork/SocialNetwork';

//Componente que carga el cuerpo de la cabezera con una proxima experiencia aleatoria
//Le pasamos como prop el id de una actividad proxima aleatoria
const BodyExperiencesList = ({ activity }) => {
  //Le pasamos al Hook que carga una experiencia el id para que nos devuelva sus datos
  //Si todo va bien en el hook pintamso la actividad con sus datos, sino el mensaje de error
  return (
    <div className='activity-header-body'>
      <h1>Sientelo pronto...</h1>
      <div className='activity-description'>
        <h3>{activity.company}</h3>
        <p>{activity.experience.text_4}</p>
        <div className='social-networks flex flex-end'>
          <SocialNetwork
            id={'miniInstagram'}
            children={'instagram'}
            className={'mini'}
          />
          <SocialNetwork
            id={'miniFacebook'}
            href={'https:/es-es.facebook.com/'}
            children={'facebook'}
            className={'mini'}
          />
        </div>
      </div>
    </div>
  );
};
export default BodyExperiencesList;
